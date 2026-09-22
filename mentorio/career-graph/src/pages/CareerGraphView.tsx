import { useState, useMemo, useRef } from 'react';
import { GraphCanvas } from '../components/graph/GraphCanvas';
import type { GraphCanvasRef } from '../components/graph/GraphCanvas';
import { GraphControls } from '../components/graph/GraphControls';
import { GraphLegend } from '../components/graph/GraphLegend';
import { Sidebar } from '../components/layout/Sidebar';
import { allNodes, edges } from '../data/mockData';
import type { GraphNode } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { calculate_recommendations } from '../api/engine';
import { applyGraphFilters } from '../utils/graphFilters';
import './CareerGraphView.css';

export const CareerGraphView = () => {
  const navigate = useNavigate();
  const graphRef = useRef<GraphCanvasRef>(null);
  const { selectedSkills, selectedInterests, selectedPreferences, academicProfile, explorationMode } = useApp();
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [mode, setMode] = useState<'full' | 'my' | 'explore' | 'focus'>(
    (selectedSkills.length > 0 || selectedInterests.length > 0) ? 'my' : 'full'
  );
  
  const recommendedCareers = useMemo(() => {
    if (selectedSkills.length === 0 && selectedInterests.length === 0) return [];
    const res = calculate_recommendations(selectedSkills, selectedInterests, selectedPreferences, academicProfile, explorationMode);
    // Take top 3 as the highly recommended ones to highlight
    return res.recommendations.slice(0, 3).map(r => r.career.id);
  }, [selectedSkills, selectedInterests, selectedPreferences, academicProfile, explorationMode]);

  const [searchQuery, setSearchQuery] = useState('');
  
  const CATEGORIES = ['Development', 'Data & AI', 'Cybersecurity', 'Design', 'Marketing'];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Simple mock clustering mapping
  const categoryMap: Record<string, string[]> = {
    'Development': ['c_frontend', 'c_backend', 'c_fullstack', 's_js', 's_ts', 's_react', 's_node', 's_java', 's_csharp'],
    'Data & AI': ['c_ds', 'c_ml', 'c_ai', 'c_dataeng', 's_python', 's_ml', 's_stats', 's_sql', 's_eda'],
    'Cybersecurity': ['c_cyberanalyst', 'c_seceng', 'c_pentester', 's_netsec', 's_linux'],
    'Design': ['c_ux', 'c_proddes', 's_figma', 's_uidesign', 's_userres'],
    'Marketing': ['c_digmkt', 'c_seo', 's_seo', 's_comm', 's_content'],
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const { displayNodes, displayEdges } = useMemo(() => {
    return applyGraphFilters({
      mode, allNodes, edges,
      selectedSkills, selectedInterests, selectedPreferences,
      recommendedCareers, selectedNodeId: selectedNode?.id,
      searchQuery: searchQuery, selectedCategories, categoryMap
    });
  }, [mode, selectedSkills, selectedInterests, selectedPreferences, recommendedCareers, selectedNode?.id, searchQuery, selectedCategories]);

  // Search logic
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    const match = allNodes.find(n => n.label.toLowerCase().includes(searchQuery.toLowerCase()));
    if (match) {
      setSelectedNode(match);
      if (mode === 'focus') setMode('explore'); // Reset focus to explore if searching something else
    }
  };

  // Clone data for react-force-graph because it mutates source/target into object references
  const graphDataNodes = useMemo(() => displayNodes.map(n => ({ ...n })), [displayNodes]);
  const graphDataEdges = useMemo(() => displayEdges.map(e => ({ ...e })), [displayEdges]);

  return (
    <div className="career-graph-view">
      <div className="graph-header-overlay">
        <h1 className="graph-title">Career Graph</h1>
        <p className="graph-subtitle">Explore how skills, interests, and careers connect.</p>
        
        <div className="graph-mode-toggle mt-md" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            className={`mode-btn ${mode === 'full' ? 'active' : ''}`}
            onClick={() => setMode('full')}
          >
            Full Knowledge Graph
          </button>
          
          {(selectedSkills.length > 0 || selectedInterests.length > 0 || selectedPreferences.length > 0) && (
            <button 
              className={`mode-btn ${mode === 'my' ? 'active' : ''}`}
              onClick={() => setMode('my')}
            >
              My Relevant Graph
            </button>
          )}
          <div style={{ width: '1px', background: 'var(--border)', margin: '0 8px' }} />
          <button 
            className={`mode-btn ${mode === 'explore' || mode === 'full' || mode === 'my' ? 'active' : ''}`}
            onClick={() => setMode(mode === 'focus' ? 'explore' : mode)}
          >
            Explore
          </button>
          <button 
            className={`mode-btn ${mode === 'focus' ? 'active' : ''}`}
            onClick={() => { if(selectedNode) setMode('focus'); }}
            disabled={!selectedNode}
            style={{ opacity: !selectedNode ? 0.5 : 1, cursor: !selectedNode ? 'not-allowed' : 'pointer' }}
          >
            Focus
          </button>
        </div>
        
        <div className="graph-filters mt-md" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', position: 'relative' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: '10px', top: '8px', fontSize: '18px', color: 'var(--text-muted)' }}>search</span>
            <input 
              type="text"  
              placeholder="Search graph..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ padding: '8px 12px 8px 34px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface)' }}
            />
          </form>
          
          <div className="category-toggles" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px' }}>Categories:</span>
            {CATEGORIES.map(cat => (
              <label key={cat} style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="graph-container">
        <GraphCanvas 
          ref={graphRef}
          nodes={graphDataNodes} 
          edges={graphDataEdges} 
          onNodeClick={setSelectedNode}
          onNodeHover={n => setHoveredNodeId(n ? n.id : null)}
          focusedNodeId={selectedNode?.id}
          hoveredNodeId={hoveredNodeId}
          userSkills={selectedSkills}
          userInterests={selectedInterests}
          userPreferences={selectedPreferences}
          recommendedCareers={recommendedCareers}
        />
        <GraphControls 
          onZoomIn={() => graphRef.current?.zoomIn()}
          onZoomOut={() => graphRef.current?.zoomOut()}
          onFit={() => graphRef.current?.fitGraph()}
        />
        <GraphLegend />
      </div>

      <Sidebar
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(null)}
        title={selectedNode?.label}
      >
        {selectedNode && (() => {
          const isUserSkill = selectedNode.type === 'skill' && selectedSkills.includes(selectedNode.id);
          const isMissingSkill = selectedNode.type === 'skill' && !selectedSkills.includes(selectedNode.id);
          const isUserInterest = selectedNode.type === 'interest' && selectedInterests.includes(selectedNode.id);
          const isRecommendedCareer = selectedNode.type === 'career' && recommendedCareers.includes(selectedNode.id);

          // Get connected edges
          const nodeEdges = edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id);

          return (
          <div className="node-details">
            <div className="node-type-badge">
              {isUserSkill && '✓ Your Skill'}
              {isMissingSkill && '✱ Skill to Develop'}
              {isUserInterest && '● Interest'}
              {isRecommendedCareer && '★ Recommended Career'}
              {!isUserSkill && !isMissingSkill && !isUserInterest && !isRecommendedCareer && selectedNode.type}
            </div>
            
            <p className="node-desc mt-md">{selectedNode.description || 'No description available.'}</p>
            
            {isMissingSkill && (
              <>
                <h3 className="connected-title mt-lg">Benefits these Recommended Careers:</h3>
                <ul className="connected-list">
                  {nodeEdges
                    .filter(e => e.source === selectedNode.id && recommendedCareers.includes(e.target))
                    .map(e => {
                      const careerNode = allNodes.find(n => n.id === e.target);
                      return (
                        <li key={e.target} className="connected-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>★ {careerNode?.label}</span>
                          <span style={{ color: 'var(--text-muted)' }}>Weight: {e.weight}</span>
                        </li>
                      );
                  })}
                  {nodeEdges.filter(e => e.source === selectedNode.id && recommendedCareers.includes(e.target)).length === 0 && (
                    <li className="connected-item text-muted">No highly recommended careers use this.</li>
                  )}
                </ul>
              </>
            )}

            {selectedNode.type === 'career' && (
              <>
                <h3 className="connected-title mt-lg">Required Profile</h3>
                
                <h4 className="mt-md text-sm" style={{ color: '#10b981' }}>✓ Skills You Possess</h4>
                <ul className="connected-list">
                  {nodeEdges.filter(e => e.target === selectedNode.id && e.source.startsWith('s_') && selectedSkills.includes(e.source)).map(e => {
                    const skill = allNodes.find(n => n.id === e.source);
                    return <li key={e.source} className="connected-item"><span>{skill?.label}</span><span className="text-muted">+{e.weight}</span></li>;
                  })}
                </ul>

                <h4 className="mt-md text-sm" style={{ color: '#94a3b8' }}>✱ Skills to Develop</h4>
                <ul className="connected-list">
                  {nodeEdges.filter(e => e.target === selectedNode.id && e.source.startsWith('s_') && !selectedSkills.includes(e.source)).map(e => {
                    const skill = allNodes.find(n => n.id === e.source);
                    return <li key={e.source} className="connected-item"><span>{skill?.label} {e.is_prerequisite ? '(Core)' : ''}</span><span className="text-muted">weight: {e.weight}</span></li>;
                  })}
                </ul>

                <h4 className="mt-md text-sm" style={{ color: '#8b5cf6' }}>● Matching Interests</h4>
                <ul className="connected-list">
                  {nodeEdges.filter(e => e.target === selectedNode.id && e.source.startsWith('i_') && selectedInterests.includes(e.source)).map(e => {
                    const interest = allNodes.find(n => n.id === e.source);
                    return <li key={e.source} className="connected-item"><span>{interest?.label}</span><span className="text-muted">+{e.weight}</span></li>;
                  })}
                </ul>
              </>
            )}

            {selectedNode.type !== 'career' && !isMissingSkill && (
              <>
                <h3 className="connected-title mt-lg">Connections</h3>
                <ul className="connected-list">
                  {nodeEdges.map(e => {
                    const connectedId = e.source === selectedNode.id ? e.target : e.source;
                    const connectedNode = allNodes.find(n => n.id === connectedId);
                    return (
                      <li key={e.source + e.target} className="connected-item">
                        {connectedNode?.label}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            {selectedNode.type === 'career' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '24px' }}>
                <Button 
                  variant={mode === 'focus' ? 'outline' : 'primary'}
                  fullWidth 
                  onClick={() => setMode(mode === 'focus' ? 'explore' : 'focus')}
                >
                  {mode === 'focus' ? 'Exit Focus Mode' : 'Focus on this career'}
                </Button>
                <Button 
                  variant="outline"
                  fullWidth 
                  onClick={() => navigate(`/career/${selectedNode.id}`)}
                >
                  View Career Details
                </Button>
              </div>
            )}
          </div>
          );
        })()}
      </Sidebar>
    </div>
  );
};
