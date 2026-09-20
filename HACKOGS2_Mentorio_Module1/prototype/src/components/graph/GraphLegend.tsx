
import './GraphLegend.css';

export const GraphLegend = () => {
  return (
    <div className="graph-legend">
      <h4 className="legend-title">Legend</h4>
      <div className="legend-items">
        <div className="legend-item">
          <span className="legend-icon" style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
          <span className="legend-label">Your Skills</span>
        </div>
        <div className="legend-item">
          <span className="legend-icon" style={{ color: '#94a3b8', fontWeight: 'bold' }}>✱</span>
          <span className="legend-label">Skills to Develop</span>
        </div>
        <div className="legend-item">
          <span className="legend-icon" style={{ color: '#8b5cf6', fontSize: '10px' }}>●</span>
          <span className="legend-label">Interests</span>
        </div>
        <div className="legend-item">
          <span className="legend-icon" style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>
          <span className="legend-label">Recommended Careers</span>
        </div>
        <div className="legend-item" style={{ marginTop: '8px' }}>
          <span className="legend-arrow">→</span>
          <span className="legend-label">Prerequisite / Connection</span>
        </div>
      </div>
    </div>
  );
};
