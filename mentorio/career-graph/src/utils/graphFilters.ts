import type { GraphNode, GraphEdge } from '../data/mockData';

interface FilterOptions {
  mode: 'full' | 'my' | 'explore' | 'focus';
  allNodes: GraphNode[];
  edges: GraphEdge[];
  selectedSkills: string[];
  selectedInterests: string[];
  selectedPreferences: string[];
  recommendedCareers: string[];
  selectedNodeId?: string | null;
  searchQuery: string;
  selectedCategories: string[];
  categoryMap: Record<string, string[]>;
}

export function applyGraphFilters(options: FilterOptions) {
  const {
    mode, allNodes, edges, selectedSkills, selectedInterests, 
    selectedPreferences, recommendedCareers, selectedNodeId,
    searchQuery, selectedCategories, categoryMap
  } = options;

  let filtered = allNodes;

  if (mode === 'my') {
    const userProfileIds = new Set([...selectedSkills, ...selectedInterests, ...selectedPreferences]);
    const myNodeIds = new Set<string>(userProfileIds);
    
    recommendedCareers.forEach(id => myNodeIds.add(id));

    edges.forEach(e => {
      if (recommendedCareers.includes(e.target) && e.source.startsWith('s_')) {
        myNodeIds.add(e.source);
      }
    });

    filtered = allNodes.filter(n => myNodeIds.has(n.id));
  } else if (mode === 'focus' && selectedNodeId) {
    const neighbors = new Set<string>([selectedNodeId]);
    edges.forEach(e => {
      if (e.source === selectedNodeId) neighbors.add(e.target);
      if (e.target === selectedNodeId) neighbors.add(e.source);
    });
    filtered = allNodes.filter(n => neighbors.has(n.id));
  }

  if (searchQuery) {
    const lowerQ = searchQuery.toLowerCase();
    filtered = filtered.filter(n => 
      n.label.toLowerCase().includes(lowerQ) || 
      (n.description && n.description.toLowerCase().includes(lowerQ))
    );
  }

  if (selectedCategories.length > 0) {
    const allowedIds = new Set<string>();
    selectedCategories.forEach(cat => {
      const ids = categoryMap[cat] || [];
      ids.forEach(id => allowedIds.add(id));
    });
    filtered = filtered.filter(n => allowedIds.has(n.id));
  }

  const displayNodes = filtered;
  const filteredIds = new Set(displayNodes.map(n => n.id));
  
  const displayEdges = edges.filter(
    e => filteredIds.has(e.source) && filteredIds.has(e.target)
  );

  return { displayNodes, displayEdges };
}

