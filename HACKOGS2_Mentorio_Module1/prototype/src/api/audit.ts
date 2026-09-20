import { allNodes, edges, careers, skills, interests } from '../data/mockData';

export interface AuditResult {
  totalNodes: number;
  totalEdges: number;
  totalCareers: number;
  totalSkills: number;
  totalInterests: number;
  isolatedSkills: string[];
  isolatedInterests: string[];
  isolatedCareers: string[];
  bottlenecks: { name: string; count: number }[];
}

export const run_graph_audit = (): AuditResult => {
  const result: AuditResult = {
    totalNodes: allNodes.length,
    totalEdges: edges.length,
    totalCareers: careers.length,
    totalSkills: skills.length,
    totalInterests: interests.length,
    isolatedSkills: [],
    isolatedInterests: [],
    isolatedCareers: [],
    bottlenecks: []
  };

  // 1. Find isolated nodes
  skills.forEach(s => {
    const isConnected = edges.some(e => e.source === s.id || e.target === s.id);
    if (!isConnected) result.isolatedSkills.push(s.label);
  });

  interests.forEach(i => {
    const isConnected = edges.some(e => e.source === i.id || e.target === i.id);
    if (!isConnected) result.isolatedInterests.push(i.label);
  });

  careers.forEach(c => {
    const isConnected = edges.some(e => e.source === c.id || e.target === c.id);
    if (!isConnected) result.isolatedCareers.push(c.label);
  });

  // 2. Find bottlenecks (skills/interests connected to > 50% of careers)
  const degrees: Record<string, number> = {};
  edges.forEach(e => {
    degrees[e.source] = (degrees[e.source] || 0) + 1;
  });

  const threshold = careers.length * 0.5; // connected to more than 50% of roles

  Object.entries(degrees).forEach(([id, count]) => {
    if (count > threshold) {
      const node = allNodes.find(n => n.id === id);
      if (node && node.type !== 'career') {
        result.bottlenecks.push({ name: node.label, count });
      }
    }
  });

  return result;
};
