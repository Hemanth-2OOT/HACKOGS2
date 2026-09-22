import { allNodes } from '../data/mockData';

export interface ExtractedSkillPayload {
  name: string;
  category: string;
  status: 'verified' | 'inferred';
  evidence: string;
}

export interface MappedSkill extends ExtractedSkillPayload {
  matchedId: string | null;
  matchedLabel: string | null;
}

const ALIASES: Record<string, string> = {
  'reactjs': 'react',
  'react.js': 'react',
  'react': 'react',
  'node.js': 'node',
  'nodejs': 'node',
  'vue.js': 'vue',
  'vuejs': 'vue',
  'c': 'c language',
  'c programming': 'c language',
  'c++': 'c++',
  'cplusplus': 'c++',
  'c#': 'c#',
  'csharp': 'c#',
  'ml': 'machine learning',
  'ai': 'artificial intelligence',
  'html': 'html/css',
  'css': 'html/css',
  'html5': 'html/css',
  'css3': 'html/css',
  'javascript': 'javascript',
  'js': 'javascript',
  'typescript': 'typescript',
  'ts': 'typescript',
  'postgres': 'postgresql',
  'postgresql': 'postgresql',
};

function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9+#]/g, '');
}

export function normalizeSkillName(name: string): string {
  const rawName = name.toLowerCase().trim();
  const resolvedName = ALIASES[rawName] || rawName;
  return normalize(resolvedName);
}

export function mapSkillsToIds(extractedSkills: ExtractedSkillPayload[]): MappedSkill[] {
  const skillNodes = allNodes.filter(n => n.type === 'skill');
  
  const mapped = extractedSkills.map(skill => {
    const normalizedTarget = normalizeSkillName(skill.name);
    
    // 2. Strict match against node label
    const match = skillNodes.find(n => normalizeSkillName(n.label) === normalizedTarget);
    
    return {
      ...skill,
      matchedId: match ? match.id : `custom_${normalizedTarget}`,
      matchedLabel: match ? match.label : skill.name
    };
  });

  console.log("\n[Mapper] 6. Final Mapper Result:");
  console.log(JSON.stringify(mapped, null, 2));
  
  return mapped;
}
