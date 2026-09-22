import React from 'react';
import './GraphControls.css';

interface GraphControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFit?: () => void;
}

export const GraphControls: React.FC<GraphControlsProps> = ({ onZoomIn, onZoomOut, onFit }) => {
  return (
    <div className="graph-controls">
      <button className="graph-control-btn" onClick={onZoomIn} aria-label="Zoom In">
        <span className="material-symbols-outlined">zoom_in</span>
      </button>
      <button className="graph-control-btn" onClick={onZoomOut} aria-label="Zoom Out">
        <span className="material-symbols-outlined">zoom_out</span>
      </button>
      <div className="graph-control-divider" />
      <button className="graph-control-btn" onClick={onFit} aria-label="Fit to Screen">
        <span className="material-symbols-outlined">fit_screen</span>
      </button>
    </div>
  );
};
