import { allNodes, edges } from '../data/mockData';

// Simulated TF-IDF / Semantic Similarity abstraction layer
// In a production environment, this would be swapped with @xenova/transformers or an API call to an embedding model.

export const calculateSemanticSimilarity = (naturalLanguageInput: string, careerId: string): number => {
  if (!naturalLanguageInput || naturalLanguageInput.trim().length === 0) return 0;

  const career = allNodes.find(n => n.id === careerId);
  if (!career) return 0;

  // 1. Build a "Career Document" to match against
  const docTokens = new Set<string>();
  
  const tokenize = (text: string) => {
    return text.toLowerCase().replace(/[^\w\s]/gi, '').split(/\s+/).filter(t => t.length > 2);
  };

  // Add career label and description tokens
  tokenize(career.label).forEach(t => docTokens.add(t));
  if (career.description) {
    tokenize(career.description).forEach(t => docTokens.add(t));
  }

  // Find all skills associated with this career to enrich the document
  const relatedEdges = edges.filter(e => {
    const targetId = typeof e.target === 'object' ? (e.target as any).id : e.target;
    return targetId === careerId;
  });

  relatedEdges.forEach(e => {
    const sourceId = typeof e.source === 'object' ? (e.source as any).id : e.source;
    const skillNode = allNodes.find(n => n.id === sourceId);
    if (skillNode) {
      tokenize(skillNode.label).forEach(t => docTokens.add(t));
    }
  });

  // 2. Tokenize User Input
  const inputTokens = tokenize(naturalLanguageInput);
  if (inputTokens.length === 0) return 0;

  // 3. Calculate Simple Jaccard/Overlap Similarity (Simulating Cosine Similarity)
  let matches = 0;
  
  // Basic synonyms mapping to improve matching without real embeddings
  const synonyms: Record<string, string[]> = {
    'ai': ['artificial', 'intelligence', 'machine', 'learning', 'ml'],
    'data': ['analysis', 'analytics', 'statistics', 'math', 'database'],
    'web': ['frontend', 'backend', 'html', 'css', 'react', 'site'],
    'app': ['mobile', 'application', 'ios', 'android'],
    'design': ['art', 'creative', 'visual', 'ui', 'ux', 'drawing'],
    'people': ['hr', 'human', 'resources', 'management', 'team', 'lead'],
    'money': ['finance', 'accounting', 'investment', 'economics'],
    'health': ['medical', 'patient', 'doctor', 'nurse', 'care', 'medicine'],
    'protect': ['security', 'cyber', 'hack', 'defense']
  };

  const expandedInputTokens = new Set<string>(inputTokens);
  inputTokens.forEach(t => {
    if (synonyms[t]) {
      synonyms[t].forEach(syn => expandedInputTokens.add(syn));
    }
    // Also reverse lookup
    Object.keys(synonyms).forEach(key => {
      if (synonyms[key].includes(t)) expandedInputTokens.add(key);
    });
  });

  expandedInputTokens.forEach(token => {
    if (docTokens.has(token)) {
      matches += 1;
    }
  });

  // Calculate score (0 to 1)
  // We cap the denominator to prevent long sentences from diluting the score too much
  const maxExpectedKeywords = Math.min(expandedInputTokens.size, 10); 
  let score = matches / maxExpectedKeywords;
  
  // Normalize
  return Math.min(Math.max(score, 0), 1);
};