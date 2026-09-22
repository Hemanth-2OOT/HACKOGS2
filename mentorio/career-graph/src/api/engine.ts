import { skills, interests, careers, edges, preferences } from '../data/mockData';
import type { GraphEdge, GraphNode } from '../data/mockData';
import type { ExplorationMode } from '../context/AppContext';
import type { AcademicProfile } from '../context/AppContext';
import { calculateSemanticSimilarity } from './embeddings';

export const SCORING_WEIGHTS = {
  skills: 0.45,
  interests: 0.25,
  preferences: 0.15,
  academic_context: 0.10,
  exploration_context: 0.05
};

export interface MatchFactor {
  name: string;
  weight: number;
}

export interface SkillGap {
  skill: GraphNode;
  impact: number;
  is_core: boolean;
}

export interface ScoreBreakdown {
  skills: { earned: number; max: number };
  interests: { earned: number; max: number };
  preferences: { earned: number; max: number };
  academic: { score: number; max: 100 };
  semantic?: { earned: number; max: number };
}

export interface RecommendationResult {
  career: GraphNode;
  final_match_score: number;
  breakdown: ScoreBreakdown;
  
  matched_skills: MatchFactor[];
  missing_skills: SkillGap[];
  next_best_skill: SkillGap | null;
  
  matched_interests: MatchFactor[];
  matched_preferences: MatchFactor[];
  
  academic_factors: string[];
  why_not_higher: string[];
}

export interface RecommendResponse {
  recommendations: RecommendationResult[];
  profileCoverage: {
    score: number;
    label: string;
    details: string[];
  };
}

export interface ValidationResponse {
  isValid: boolean;
  errors: string[];
  suggestions: Record<string, string>;
}

// 1. Validation
export const validate_profile = (_selectedSkills: string[], _selectedInterests: string[]): ValidationResponse => {
  const response: ValidationResponse = { isValid: true, errors: [], suggestions: {} };
  return response;
};

// 1.5 Academic Relevance Calculation (Preserved)
const careerStreamMap: Record<string, string[]> = {
  'c_ds': ['Science', 'Commerce'],
  'c_ai': ['Science'],
  'c_frontend': ['Science', 'Commerce', 'Arts/Humanities', 'Vocational', 'Other'],
  'c_ux': ['Arts/Humanities', 'Science', 'Other'],
  'c_cyberanalyst': ['Science', 'Vocational'],
  'c_sysadmin': ['Science', 'Vocational'],
  'c_digmkt': ['Commerce', 'Arts/Humanities', 'Other'],
  'c_prodm': ['Commerce', 'Science', 'Other'],
};

const careerDegreeMap: Record<string, string[]> = {
  'c_ds': ['B.Tech / B.E.', 'B.Sc', 'MCA', 'M.Tech'],
  'c_ai': ['B.Tech / B.E.', 'MCA', 'M.Tech'],
  'c_frontend': ['B.Tech / B.E.', 'BCA', 'B.Sc', 'MCA'],
  'c_ux': ['B.Tech / B.E.', 'BA', 'BCA', 'Other'],
  'c_cyberanalyst': ['B.Tech / B.E.', 'BCA', 'MCA'],
  'c_sysadmin': ['BCA', 'B.Tech / B.E.', 'B.Sc'],
  'c_digmkt': ['BBA', 'B.Com', 'BA', 'MBA'],
  'c_prodm': ['MBA', 'B.Tech / B.E.', 'BBA'],
};

export const calculate_academic_relevance = (profile: AcademicProfile | null, career: GraphNode): { score: number, factors: string[] } | null => {
  if (!profile || Object.keys(profile).length === 0) return null;

  let score = 50;
  const factors: string[] = [];

  const preferredStreams = careerStreamMap[career.id] || ['Science', 'Commerce', 'Arts/Humanities', 'Vocational', 'Other'];
  if (preferredStreams.includes(profile.stream)) {
    score += 15;
    factors.push("✓ Relevant academic stream");
  }

  const preferredDegrees = careerDegreeMap[career.id] || ['B.Tech / B.E.', 'B.Sc', 'BA', 'B.Com', 'BBA', 'BCA'];
  if (preferredDegrees.includes(profile.degree)) {
    score += 20;
    factors.push("🎓 Highly relevant degree program");
  }

  if (profile.specialization) {
    const spec = profile.specialization.toLowerCase();
    const cid = career.id;
    let matchedSpec = false;
    
    if (spec.includes('ai') || spec.includes('data')) {
      if (['c_ds', 'c_mle', 'c_ai', 'c_da', 'c_de', 'c_quant'].includes(cid)) matchedSpec = true;
    }
    else if (spec.includes('cyber')) {
      if (['c_cyberanalyst', 'c_seceng', 'c_pentester', 'c_secops'].includes(cid)) matchedSpec = true;
    }
    else if (spec.includes('cs') || spec.includes('it')) {
      if (['c_swe', 'c_frontend', 'c_backend', 'c_fullstack', 'c_mobile', 'c_gamedev', 'c_sdet', 'c_devops', 'c_cloudeng'].includes(cid)) matchedSpec = true;
    }
    else if (spec.includes('business') || spec.includes('management') || spec.includes('finance') || spec.includes('accounting')) {
      if (['c_accountant', 'c_finadvisor', 'c_investmentbanker', 'c_economist', 'c_hrmanager', 'c_opsmanager', 'c_prodm', 'c_bizanal', 'c_pm'].includes(cid)) matchedSpec = true;
    }
    else if (spec.includes('mechanical') || spec.includes('electronics') || spec.includes('civil')) {
      if (['c_ioteng', 'c_roboticseng', 'c_hardware'].includes(cid)) matchedSpec = true;
    }
    else if (spec.includes('arts') || spec.includes('humanities')) {
      if (['c_graphicdes', 'c_artdir', 'c_copywriter', 'c_prspec', 'c_ux', 'c_ui'].includes(cid)) matchedSpec = true;
    }

    if (matchedSpec) {
      score += 25; // Large boost for exact specialization
      factors.push("🎯 Specialization perfectly matches this career");
    }
  }

  const g10 = Number(profile.grade10) || 0;
  const g12 = Number(profile.grade12) || 0;
  
  if (g10 > 80 && g12 > 80) {
    score += 15;
    factors.push("✓ Strong academic performance");
  } else if (g10 > 60 && g12 > 60) {
    score += 5;
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    factors
  };
};

const get_reachable_edges = (mode: ExplorationMode): GraphEdge[] => {
  if (mode === 'DFS') {
    return edges.filter(e => e.weight >= 6); 
  }
  return edges; 
};

// BFS Inference
const get_inferred_skills = (explicitSkills: string[]): Map<string, number> => {
  const inferred = new Map<string, number>();
  
  explicitSkills.forEach(skill => {
    // Only infer Prerequisites (Source) from Advanced skills (Target).
    // e.g. If you know Machine Learning (target), we infer you know Python (source).
    // NOT the other way around. Knowing Python does not mean you know Machine Learning.
    const incomingEdges = edges.filter(e => {
      const eSource = typeof e.source === 'object' ? (e.source as any).id : e.source;
      const eTarget = typeof e.target === 'object' ? (e.target as any).id : e.target;
      return eTarget === skill && eSource.startsWith('s_');
    });
    incomingEdges.forEach(edge => {
      const eSource = typeof edge.source === 'object' ? (edge.source as any).id : edge.source;
      if (!explicitSkills.includes(eSource)) inferred.set(eSource, 0.5);
    });
  });

  return inferred;
};

// 2. Engine Logic
export const calculate_recommendations = (
  selectedSkills: string[] = [], 
  selectedInterests: string[] = [], 
  selectedPreferences: string[] = [],
  academicProfile: AcademicProfile | null = null,
  naturalLanguageInput: string = '',
  mode: ExplorationMode = 'BFS',
  weights: any = SCORING_WEIGHTS
): RecommendResponse => {
  
  const validGraphEdges = get_reachable_edges(mode);
  const inferredSkills = get_inferred_skills(selectedSkills);

  const results: RecommendationResult[] = careers.map(career => {
    const careerEdges = validGraphEdges.filter(e => {
      const eTarget = typeof e.target === 'object' ? (e.target as any).id : e.target;
      return eTarget === career.id;
    });
    
    const breakdown: ScoreBreakdown = {
      skills: { earned: 0, max: 0 },
      interests: { earned: 0, max: 0 },
      preferences: { earned: 0, max: 0 },
      academic: { score: 0, max: 100 }
    };

    const matched_skills: MatchFactor[] = [];
    const missing_skills: SkillGap[] = [];
    const matched_interests: MatchFactor[] = [];
    const matched_preferences: MatchFactor[] = [];
    let missing_prerequisite = false;

    careerEdges.forEach(edge => {
      const sourceId = typeof edge.source === 'object' ? (edge.source as any).id : edge.source;
      
      const isSkill = sourceId.startsWith('s_');
      const isInterest = sourceId.startsWith('i_');
      const isPreference = sourceId.startsWith('p_');
      
      const nodeArray = isSkill ? skills : isInterest ? interests : preferences;
      const node = nodeArray.find(n => n.id === sourceId);
      if (!node) return;

      if (isSkill) {
        breakdown.skills.max += edge.weight;
        const isExplicit = selectedSkills.includes(sourceId);
        const isInferred = inferredSkills.has(sourceId);
        
        if (isExplicit) {
          breakdown.skills.earned += edge.weight;
          matched_skills.push({ name: node.label, weight: edge.weight });
        } else if (isInferred) {
          const partial = edge.weight * 0.5;
          breakdown.skills.earned += partial;
          matched_skills.push({ name: `${node.label} (Inferred)`, weight: partial });
        } else {
          missing_skills.push({ skill: node, impact: edge.weight, is_core: !!edge.is_prerequisite });
          if (edge.is_prerequisite) missing_prerequisite = true;
        }
      } else if (isInterest) {
        breakdown.interests.max += edge.weight;
        if (selectedInterests.includes(sourceId)) {
          breakdown.interests.earned += edge.weight;
          matched_interests.push({ name: node.label, weight: edge.weight });
        }
      } else if (isPreference) {
        breakdown.preferences.max += edge.weight;
        if (selectedPreferences.includes(sourceId)) {
          breakdown.preferences.earned += edge.weight;
          matched_preferences.push({ name: node.label, weight: edge.weight });
        }
      }
    });

    // Score calculations based on weights
    let final_score = 0;
    
    // Skills
    let skillScore = breakdown.skills.max > 0 ? (breakdown.skills.earned / breakdown.skills.max) * 100 : 0;
    if (missing_prerequisite) skillScore *= 0.5; // Dealbreaker penalty applies to skill score
    final_score += (skillScore * weights.skills);
    
    // Interests
    let interestScore = breakdown.interests.max > 0 ? (breakdown.interests.earned / breakdown.interests.max) * 100 : 0;
    final_score += (interestScore * weights.interests);
    
    // Preferences
    let prefScore = breakdown.preferences.max > 0 ? (breakdown.preferences.earned / breakdown.preferences.max) * 100 : 0;
    final_score += (prefScore * weights.preferences);
    
    // Academic
    const academicResult = calculate_academic_relevance(academicProfile, career);
    let academicFactors: string[] = [];
    if (academicResult) {
      breakdown.academic.score = academicResult.score;
      academicFactors = academicResult.factors;
      final_score += (academicResult.score * weights.academic_context);
    } else {
      // If skipped, redistribute academic weight to skills
      final_score += (skillScore * weights.academic_context);
    }
    
    // Semantic Similarity
    let semanticScore = 0;
    if (naturalLanguageInput && weights.semantic_similarity) {
      const sim = calculateSemanticSimilarity(naturalLanguageInput, career.id);
      semanticScore = sim * 100;
      breakdown.semantic = { earned: semanticScore, max: 100 };
      final_score += (semanticScore * weights.semantic_similarity);
    } else if (weights.semantic_similarity) {
      // If skipped, redistribute to skills
      final_score += (skillScore * weights.semantic_similarity);
    }

    // Exploration Mode
    // DFS gives slight bonus to careers with dense core connections
    if (mode === 'DFS' && (skillScore > 70)) {
      final_score += (100 * weights.exploration_context);
    } else if (mode === 'BFS' && (skillScore + interestScore > 50)) {
      final_score += (100 * weights.exploration_context);
    }

    // Sort missing skills by impact
    missing_skills.sort((a, b) => b.impact - a.impact);
    const next_best_skill = missing_skills.length > 0 ? missing_skills[0] : null;

    // Why Not Higher
    const why_not_higher: string[] = [];
    if (skillScore < 60) why_not_higher.push("Missing key foundational skills for this role.");
    if (missing_prerequisite) why_not_higher.push("Lacking a critical core requirement.");
    if (interestScore < 40) why_not_higher.push("Limited alignment with your personal interests.");
    if (naturalLanguageInput && semanticScore < 30) why_not_higher.push("Your written goals didn't strongly align with the core themes of this career.");

    return {
      career,
      final_match_score: Math.max(0, Math.min(100, Math.round(final_score))),
      breakdown,
      matched_skills,
      missing_skills,
      next_best_skill,
      matched_interests,
      matched_preferences,
      academic_factors: academicFactors,
      why_not_higher
    };
  });

  // Coverage
  let coverageScore = 0;
  const coverageDetails = [];
  if (selectedSkills.length > 0) { coverageScore += 35; coverageDetails.push(`✓ ${selectedSkills.length} selected skills`); }
  if (selectedInterests.length > 0) { coverageScore += 25; coverageDetails.push(`✓ ${selectedInterests.length} selected interests`); }
  if (selectedPreferences.length > 0) { coverageScore += 20; coverageDetails.push(`✓ ${selectedPreferences.length} preferences`); }
  if (academicProfile && Object.keys(academicProfile).length > 0) { coverageScore += 20; coverageDetails.push(`✓ Academic context provided`); }

  const profileCoverage = {
    score: coverageScore,
    label: coverageScore >= 80 ? "High" : coverageScore >= 50 ? "Medium" : "Low",
    details: coverageDetails
  };

  // Sort by final score
  results.sort((a, b) => b.final_match_score - a.final_match_score);

  return {
    recommendations: results,
    profileCoverage
  };
};

export const fetchRecommendations = async (
  skills: string[],
  interests: string[],
  preferences: string[],
  academicProfile: AcademicProfile | null,
  naturalLanguageInput: string,
  mode: ExplorationMode,
  weights: any
): Promise<RecommendResponse> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(calculate_recommendations(skills, interests, preferences, academicProfile, naturalLanguageInput, mode, weights));
    }, 600);
  });
};
// --- Multi-Step Roadmap (Dijkstra-ish / BFS Shortest Path) ---
export interface RoadmapStep {
  id: string;
  label: string;
  type: string;
}

export const calculate_shortest_path = (userSkills: string[], targetCareerId: string): RoadmapStep[] => {
  if (userSkills.length === 0) return [];

  const adj = new Map<string, string[]>();
  edges.forEach(e => {
    const s = typeof e.source === 'object' ? (e.source as any).id : e.source;
    const t = typeof e.target === 'object' ? (e.target as any).id : e.target;
    if (!adj.has(s)) adj.set(s, []);
    if (!adj.has(t)) adj.set(t, []);
    adj.get(s)!.push(t);
    adj.get(t)!.push(s);
  });

  const queue: string[] = [...userSkills];
  const visited = new Set<string>(userSkills);
  const parent = new Map<string, string>();

  let found = false;
  while (queue.length > 0) {
    const curr = queue.shift()!;
    if (curr === targetCareerId) {
      found = true;
      break;
    }
    const neighbors = adj.get(curr) || [];
    for (const n of neighbors) {
      if (!visited.has(n)) {
        visited.add(n);
        parent.set(n, curr);
        queue.push(n);
      }
    }
  }

  if (!found) return [];

  const path: string[] = [];
  let curr = targetCareerId;
  while (curr) {
    path.unshift(curr);
    if (userSkills.includes(curr)) break;
    curr = parent.get(curr)!;
  }

  const allMap = new Map();
  skills.forEach(s => allMap.set(s.id, s));
  interests.forEach(s => allMap.set(s.id, s));
  preferences.forEach(s => allMap.set(s.id, s));
  careers.forEach(s => allMap.set(s.id, s));

  return path.map(id => allMap.get(id)).filter(Boolean) as RoadmapStep[];
};

