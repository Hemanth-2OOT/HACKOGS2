import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import * as d3 from 'd3-force';
import { allNodes, edges } from '../../data/mockData';

export const HeroForceGraph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
  const [hoverNode, setHoverNode] = useState<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    setDimensions({ width: clientWidth, height: clientHeight });
    
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const graphData = useMemo(() => {
    const includedIds = new Set([
      'c_ai', 'c_ds', 'c_mle', 'c_de', 'c_da',
      's_python', 's_ml', 's_dl', 's_stats', 's_sql', 's_dataviz', 's_aws', 's_nlp'
    ]);
    
    const subsetNodes = allNodes.filter(n => includedIds.has(n.id));
    const subsetEdges = edges.filter(e => 
      includedIds.has(typeof e.source === 'string' ? e.source : (e.source as any).id) && 
      includedIds.has(typeof e.target === 'string' ? e.target : (e.target as any).id)
    );
    
    return {
      nodes: subsetNodes.map(n => ({ ...n })),
      links: subsetEdges.map(e => ({ ...e }))
    };
  }, []);

  const getConnectedNodes = useCallback((node: any) => {
    if (!node) return new Set();
    const connected = new Set([node.id]);
    graphData.links.forEach(l => {
      const sourceId = typeof l.source === 'string' ? l.source : (l.source as any).id;
      const targetId = typeof l.target === 'string' ? l.target : (l.target as any).id;
      if (sourceId === node.id) connected.add(targetId);
      if (targetId === node.id) connected.add(sourceId);
    });
    return connected;
  }, [graphData.links]);

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge').strength(-1200); 
      fgRef.current.d3Force('link').distance(200);    
      fgRef.current.d3Force('collide', d3.forceCollide().radius((node: any) => {
        return node.type === 'career' ? 120 : 60;
      }).iterations(3));
    }
  }, [graphData]);

  const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const isHovered = hoverNode && node.id === hoverNode.id;
    const isConnected = hoverNode && getConnectedNodes(hoverNode).has(node.id);
    const isDimmed = hoverNode && !isHovered && !isConnected;

    // Apply Dimming
    ctx.globalAlpha = isDimmed ? 0.2 : 1.0;

    const label = node.label;
    const isCareer = node.type === 'career';
    
    if (isCareer) {
      // Career Node (Strong, Bold, Glow)
      const fontSize = 14 / globalScale;
      ctx.font = `600 ${fontSize}px Inter, sans-serif`;
      const textWidth = ctx.measureText(label).width;
      const paddingX = fontSize * 1.5;
      const paddingY = fontSize * 1.0;
      const bckgDimensions = [textWidth + paddingX, fontSize + paddingY];

      // Draw shadow/glow
      ctx.shadowColor = isDark ? 'rgba(99, 102, 241, 0.4)' : 'rgba(79, 70, 229, 0.3)';
      ctx.shadowBlur = isHovered ? 15 : 8;
      
      // Draw background pill
      ctx.fillStyle = isDark ? '#1e1b4b' : '#312e81'; // Deep indigo
      ctx.beginPath();
      const r = bckgDimensions[1] / 2;
      const x = node.x - bckgDimensions[0] / 2;
      const y = node.y - bckgDimensions[1] / 2;
      const w = bckgDimensions[0];
      const h = bckgDimensions[1];
      ctx.roundRect(x, y, w, h, r); // Use roundRect for cleaner path
      ctx.fill();

      // Reset shadow
      ctx.shadowBlur = 0;

      // Draw border
      ctx.strokeStyle = isDark ? '#4f46e5' : '#4338ca';
      ctx.lineWidth = 1.5 / globalScale;
      ctx.stroke();

      // Draw text
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(label, node.x, node.y);

      node.__bckgDimensions = bckgDimensions;
      } else {
        // Skill Node (Subtle, elegant data-viz dot with text)
        const fontSize = 12 / globalScale;
        ctx.font = `600 ${fontSize}px Inter, sans-serif`;
        
        // Draw small dot
        ctx.beginPath();
        ctx.arc(node.x, node.y - fontSize, 4 / globalScale, 0, 2 * Math.PI, false);
        ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
        if (isConnected) ctx.fillStyle = isDark ? '#818cf8' : '#4f46e5';
        ctx.fill();

        // Draw text
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = isDark ? '#f8fafc' : '#1e293b';
        if (isConnected) ctx.fillStyle = isDark ? '#c7d2fe' : '#312e81';
        ctx.fillText(label, node.x, node.y + (4 / globalScale));
      
      // Estimate hit box for hover
      const textWidth = ctx.measureText(label).width;
      node.__bckgDimensions = [textWidth + 10, fontSize * 3];
    }
    
    ctx.globalAlpha = 1.0;
  }, [hoverNode, getConnectedNodes]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'visible', background: 'transparent', cursor: hoverNode ? 'pointer' : 'grab' }}>
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeCanvasObject={paintNode}
        nodePointerAreaPaint={(node: any, color, ctx) => {
          const bckgDimensions = node.__bckgDimensions;
          if (bckgDimensions) {
            ctx.fillStyle = color;
            ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);
          }
        }}
        onNodeHover={(node) => setHoverNode(node || null)}
        nodeLabel={(node: any) => {
          if (node.type === 'career') {
            const connectedCount = getConnectedNodes(node).size - 1;
            return `<div style="background: rgba(15,23,42,0.9); color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-family: Inter, sans-serif; border: 1px solid rgba(255,255,255,0.1);">${node.label}<br/><span style="color: #94a3b8">${connectedCount} connected skills</span></div>`;
          }
          return `<div style="background: rgba(15,23,42,0.9); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-family: Inter, sans-serif;">${node.label}</div>`;
        }}
        linkColor={(link: any) => {
          const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
          const sourceId = typeof link.source === 'string' ? link.source : (link.source as any).id;
          const targetId = typeof link.target === 'string' ? link.target : (link.target as any).id;
          
          if (hoverNode) {
            if (sourceId === hoverNode.id || targetId === hoverNode.id) {
              return isDark ? 'rgba(129, 140, 248, 0.5)' : 'rgba(79, 70, 229, 0.4)';
            }
            return isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
          }
          return isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
        }}
        linkWidth={(link: any) => {
          const sourceId = typeof link.source === 'string' ? link.source : (link.source as any).id;
          const targetId = typeof link.target === 'string' ? link.target : (link.target as any).id;
          if (hoverNode && (sourceId === hoverNode.id || targetId === hoverNode.id)) return 1.5;
          return 1;
        }}
        linkDirectionalParticles={1}
        linkDirectionalParticleSpeed={() => 0.002}
        linkDirectionalParticleWidth={(link: any) => {
          const sourceId = typeof link.source === 'string' ? link.source : (link.source as any).id;
          const targetId = typeof link.target === 'string' ? link.target : (link.target as any).id;
          if (hoverNode && (sourceId === hoverNode.id || targetId === hoverNode.id)) return 3;
          return 1.5;
        }}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
        cooldownTicks={150}
        enableNodeDrag={true}
        enablePanInteraction={false}
        enableZoomInteraction={false}
        onEngineStop={() => fgRef.current?.zoomToFit(400, 100)}
      />
    </div>
  );
};
