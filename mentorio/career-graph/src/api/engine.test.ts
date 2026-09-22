import { describe, it, expect } from 'vitest';
import { calculate_recommendations } from './engine';

describe('Recommendation Engine v2', () => {
  it('calculates recommendations based on skills, interests, and preferences', () => {
    const result = calculate_recommendations(['s_python', 's_ml'], ['i_data'], ['p_research'], null, 'BFS');
    
    expect(result.recommendations.length).toBeGreaterThan(0);
    expect(result.profileCoverage.score).toBeGreaterThan(0);
    
    // Check if Data Scientist is highly recommended
    const ds = result.recommendations.find(r => r.career.id === 'c_ds');
    expect(ds).toBeDefined();
    
    // Should have missing skills
    expect(ds?.missing_skills.length).toBeGreaterThan(0);
  });

  it('applies dealbreaker logic for missing core skills', () => {
    // DS requires s_stats as a core prerequisite (weight 10, is_prerequisite true)
    // Providing python but not stats should penalize the score
    const withStats = calculate_recommendations(['s_python', 's_sql', 's_stats'], ['i_data'], [], null, 'BFS');
    const withoutStats = calculate_recommendations(['s_python', 's_sql'], ['i_data'], [], null, 'BFS');
    
    const dsWith = withStats.recommendations.find(r => r.career.id === 'c_ds')!;
    const dsWithout = withoutStats.recommendations.find(r => r.career.id === 'c_ds')!;
    
    expect(dsWith.final_match_score).toBeGreaterThan(dsWithout.final_match_score);
    // why_not_higher should mention core requirement missing
    expect(dsWithout.why_not_higher.some(s => s.includes('core requirement'))).toBe(true);
  });

  it('calculates next best skill', () => {
    const result = calculate_recommendations(['s_python'], [], [], null, 'BFS');
    const ds = result.recommendations.find(r => r.career.id === 'c_ds');
    
    expect(ds?.next_best_skill).toBeDefined();
    expect(ds?.next_best_skill?.impact).toBeGreaterThan(0);
  });
});
