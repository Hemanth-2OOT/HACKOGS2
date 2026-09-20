import { useRef, useEffect } from 'react';

export const InteractiveString = ({ color = 'var(--primary)', height = 100, strokeWidth = 2 }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  
  const state = useRef({
    x: 500,
    y: 50,
    vx: 0,
    vy: 0,
    isHovered: false
  });

  useEffect(() => {
    let animationFrame: number;
    const tension = 0.15;
    const friction = 0.75;
    
    const render = () => {
      const s = state.current;
      
      if (!s.isHovered) {
        // Spring back to center (500, 50)
        s.vx += (500 - s.x) * tension;
        s.vx *= friction;
        s.x += s.vx;

        s.vy += (50 - s.y) * tension;
        s.vy *= friction;
        s.y += s.vy;
      }

      if (pathRef.current) {
        pathRef.current.setAttribute('d', 'M 0 50 Q ' + s.x + ' ' + s.y + ' 1000 50');
      }

      animationFrame = requestAnimationFrame(render);
    };
    
    render();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    
    const relativeX = ((clientX - rect.left) / rect.width) * 1000;
    const relativeY = ((clientY - rect.top) / rect.height) * 100;
    
    state.current.isHovered = true;
    state.current.x = relativeX;
    
    // Amplify the Y movement slightly for better feel, clamped safely
    const pullY = relativeY;
    state.current.y = pullY;
  };

  const handleMouseLeave = () => {
    state.current.isHovered = false;
  };

  return (
    <div 
      className="interactive-string-container"
      style={{ 
        width: '100%', 
        height: height + 'px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'crosshair',
        padding: '20px 0'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseLeave}
    >
      <svg 
        ref={svgRef}
        viewBox="0 0 1000 100" 
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <path 
          ref={pathRef}
          d="M 0 50 Q 500 50 1000 50" 
          fill="transparent" 
          stroke={color} 
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};