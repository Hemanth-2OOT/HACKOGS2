import { useRef, useEffect, useState, useMemo, forwardRef, useImperativeHandle } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { forceCollide, forceY, forceX } from 'd3-force';
import type { GraphNode, GraphEdge } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

interface GraphCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onNodeClick: (node: GraphNode) => void;
  focusedNodeId?: string | null;
  hoveredNodeId?: string | null;
  onNodeHover?: (node: GraphNode | null) => void;
  layout?: 'force' | 'radial' | 'hierarchical'; // Future support
  userSkills?: string[];
  userInterests?: string[];
  userPreferences?: string[];
  recommendedCareers?: string[];
}

export interface GraphCanvasRef {
  zoomIn: () => void;
  zoomOut: () => void;
  fitGraph: () => void;
}

export const GraphCanvas = forwardRef<GraphCanvasRef, GraphCanvasProps>(({ 
  nodes, 
  edges, 
  onNodeClick, 
  focusedNodeId,
  hoveredNodeId,
  onNodeHover,
  userSkills = [],
  userInterests = [],
  userPreferences = [],
  recommendedCareers = []
}, ref) => {
  // Using `any` here because `ForceGraphMethods` requires deeply nested strict generics 
  // that do not easily match our custom `GraphNode` interface, resulting in TS2322 type mismatch errors.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight - 64 });
  const { theme } = useApp();

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - 64, // Subtract navbar height
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Layout configuration
  useEffect(() => {
    if (fgRef.current) {
      const fg = fgRef.current;
      
      // Collision radius (prevents overlap) - Must be less than half of link distance to prevent jitter!
      fg.d3Force('collide', forceCollide().radius(35).iterations(2)); 
      
      // Hierarchical grouping based on type
      fg.d3Force('y', forceY().y((node: any) => {
        if (node.type === 'interest') return -250;
        if (node.type === 'skill') return 0;
        if (node.type === 'career') return 250;
        return 0;
      }).strength(0.3));

      // Strong repulsion to spread nodes out solidly like Obsidian
      if (fg.d3Force('charge')) {
        fg.d3Force('charge').strength(-400).distanceMax(500);
      }

      // Gentle X pull to center to keep it unified
      fg.d3Force('x', forceX().x(0).strength(0.1));

      // Adjust link distance so they don't fight collision
      fg.d3Force('link').distance(120);

      // Re-heat simulation
      fg.d3ReheatSimulation();
    }
  }, [nodes]); // Re-run when data changes completely

  // Expose controls via ref
  useImperativeHandle(ref, () => ({
    zoomIn: () => {
      if (fgRef.current) {
        const currentZoom = fgRef.current.zoom();
        fgRef.current.zoom(currentZoom * 1.5, 400);
      }
    },
    zoomOut: () => {
      if (fgRef.current) {
        const currentZoom = fgRef.current.zoom();
        fgRef.current.zoom(currentZoom / 1.5, 400);
      }
    },
    fitGraph: () => {
      if (fgRef.current) {
        fgRef.current.zoomToFit(600, 50); // 600ms duration, 50px padding
      }
    }
  }));

  // Zoom to focused node
  useEffect(() => {
    if (focusedNodeId && fgRef.current) {
      const node = nodes.find(n => n.id === focusedNodeId) as any;
      if (node && node.x !== undefined && node.y !== undefined) {
        fgRef.current.centerAt(node.x, node.y, 1000);
        fgRef.current.zoom(2.5, 1000);
      }
    }
  }, [focusedNodeId, nodes]);

  // Derived sets for highlighting
  const { highlightedNodes, highlightedLinks } = useMemo(() => {
    const activeNodeId = hoveredNodeId || focusedNodeId;
    const hNodes = new Set<string>();
    const hLinks = new Set<string>();
    
    if (activeNodeId) {
      hNodes.add(activeNodeId);
      edges.forEach(edge => {
        // Handle edges that might be object references from force graph
        const sourceId = typeof edge.source === 'object' ? (edge.source as any).id : edge.source;
        const targetId = typeof edge.target === 'object' ? (edge.target as any).id : edge.target;
        
        if (sourceId === activeNodeId || targetId === activeNodeId) {
          hLinks.add(`${sourceId}-${targetId}`);
          hNodes.add(sourceId);
          hNodes.add(targetId);
        }
      });
    }
    return { highlightedNodes: hNodes, highlightedLinks: hLinks };
  }, [edges, focusedNodeId, hoveredNodeId]);

  const getNodeColor = (node: GraphNode) => {
    switch (node.type) {
      case 'skill': return '#3b82f6'; // Blue
      case 'interest': return '#8b5cf6'; // Violet
      case 'career': return '#f43f5e'; // Rose
      default: return '#94a3b8';
    }
  };

  const getBgColor = () => (theme === 'dark' ? '#0f172a' : '#f8fafc');
  const getTextColor = () => (theme === 'dark' ? '#f8fafc' : '#0f172a');
  const getLinkColor = (link: any) => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    const isHighlighted = highlightedLinks.has(`${sourceId}-${targetId}`);
    
    if (highlightedNodes.size > 0) {
      return isHighlighted 
        ? (theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)')
        : (theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)');
    }
    return theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
  };

  const graphData = useMemo(() => ({ nodes: nodes as any, links: edges as any }), [nodes, edges]);

  return (
    <div style={{ width: '100%', height: '100%', background: getBgColor() }}>
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        d3VelocityDecay={0.6}
        d3AlphaDecay={0.05}
        nodeId="id"
        nodeLabel="" // We draw labels manually
        nodeColor={getNodeColor}
        nodeRelSize={6}
        linkColor={getLinkColor}
        linkWidth={(link: any) => {
          const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
          const targetId = typeof link.target === 'object' ? link.target.id : link.target;
          return highlightedLinks.has(`${sourceId}-${targetId}`) ? 3 : 1;
        }}
        linkDirectionalParticles={(link: any) => {
          const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
          const targetId = typeof link.target === 'object' ? link.target.id : link.target;
          return highlightedLinks.has(`${sourceId}-${targetId}`) ? 4 : 0;
        }}
        linkDirectionalParticleWidth={3}
        linkDirectionalParticleSpeed={0.005}
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={1}
        onNodeClick={(node: any) => onNodeClick(node as GraphNode)}
        onNodeHover={(node: any) => {
          if (onNodeHover) onNodeHover(node as GraphNode | null);
          // Change cursor on hover
          document.body.style.cursor = node ? 'pointer' : 'default';
        }}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.label;
          const fontSize = 12 / globalScale;
          const isHighlighted = highlightedNodes.has(node.id);
          const hasHighlights = highlightedNodes.size > 0;
          const isFaded = hasHighlights && !isHighlighted;
          
          // Set opacity based on focus state
          ctx.globalAlpha = isFaded ? 0.2 : 1;
          ctx.font = `${fontSize}px Inter, Sans-Serif`;

          // Draw node based on state
          const isUserSkill = node.type === 'skill' && userSkills.includes(node.id);
          const isMissingSkill = node.type === 'skill' && !userSkills.includes(node.id);
          const isUserInterest = node.type === 'interest' && userInterests.includes(node.id);
          // Assuming userPreferences is passed, but we can just use yellow for all preferences for now
          const isPreference = node.type === 'preference';
          const isRecommendedCareer = node.type === 'career' && recommendedCareers.includes(node.id);

          const nodeRadius = node.type === 'career' ? 10 : 7;
          
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI, false);
          
          if (node.type === 'career') {
            ctx.fillStyle = isRecommendedCareer ? '#f59e0b' : '#f43f5e'; // Amber if recommended, Rose if not
          } else if (node.type === 'skill') {
            ctx.fillStyle = isUserSkill ? '#10b981' : '#94a3b8'; // Emerald if possessed, Gray if missing
          } else if (isPreference) {
            ctx.fillStyle = '#eab308'; // Yellow for preferences
          } else {
            ctx.fillStyle = isUserInterest ? '#8b5cf6' : '#cbd5e1'; // Violet if possessed, light gray if not
          }
          
          // Focus effect (glow)
          if (focusedNodeId === node.id || hoveredNodeId === node.id) {
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = 10;
          } else {
            ctx.shadowBlur = 0;
          }
          
          ctx.fill();

          // Draw icons inside nodes
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = `${nodeRadius}px Arial`;
          
          if (node.type === 'career' && isRecommendedCareer) {
            ctx.fillText('★', node.x, node.y + 1); // Star for recommended
          } else if (isUserSkill) {
            ctx.fillText('✓', node.x, node.y + 1); // Check for possessed skills
          } else if (isMissingSkill) {
            ctx.fillText('✱', node.x, node.y + 2); // Asterisk for missing skills
          } else if (node.type === 'preference') {
            ctx.fillText('⭐', node.x, node.y + 1);
          } else if (node.type === 'interest') {
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeRadius / 2.5, 0, 2 * Math.PI);
            ctx.fill(); // Solid dot for interests
          }

          // Reset shadow for text
          ctx.shadowBlur = 0;

          // Intelligent label rendering logic
          // To prevent crowding, show label if:
          // 1. It is hovered/focused or directly connected to hovered/focused (isHighlighted)
          // 2. OR global scale is high enough (zoomed in > 1.2)
          // 3. OR it's a Career node (we always want to see the careers)
          // 4. OR it's a skill/interest the user actually possesses
          const isUserOwned = isUserSkill || isUserInterest || (node.type === 'preference' && userPreferences?.includes(node.id));
          
          const showLabel = 
            isHighlighted || 
            globalScale > 1.2 || 
            node.type === 'career' || 
            isUserOwned;

          if (showLabel && !isFaded) {
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = getTextColor();
            ctx.fillText(label, node.x, node.y + nodeRadius + fontSize);
          }
          
          // Reset global alpha for next node
          ctx.globalAlpha = 1;
        }}
      />
    </div>
  );
});

GraphCanvas.displayName = 'GraphCanvas';
