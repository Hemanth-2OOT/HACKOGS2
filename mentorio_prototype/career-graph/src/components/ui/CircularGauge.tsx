import { useEffect, useState } from 'react';
import './CircularGauge.css';

interface CircularGaugeProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
}

export const CircularGauge = ({ value, max = 100, size = 64, strokeWidth = 6 }: CircularGaugeProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / max) * circumference;

  const getGaugeClass = () => {
    const percent = (value / max) * 100;
    if (percent >= 75) return 'gauge-high';
    if (percent >= 50) return 'gauge-medium';
    return 'gauge-low';
  };

  return (
    <div className="circular-gauge" style={{ width: size, height: size }}>
      <svg width={size} height={size} overflow="visible">
        <circle
          className="circular-gauge-bg"
          strokeWidth={strokeWidth}
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        <circle
          className={`circular-gauge-progress ${getGaugeClass()}`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
      </svg>
      <div className="circular-gauge-text">
        <span style={{ fontSize: size * 0.28, lineHeight: 1 }}>{Math.round(value)}</span>
      </div>
    </div>
  );
};

