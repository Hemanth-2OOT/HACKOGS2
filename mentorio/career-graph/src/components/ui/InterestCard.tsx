import React from 'react';
import './InterestCard.css';
import { Card } from './Card';

interface InterestCardProps {
  id: string;
  title: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
}

const getIcon = (id: string) => {
  let iconName = 'psychology';
  switch (id) {
    case 'i_creative': iconName = 'palette'; break;
    case 'i_analytical': iconName = 'psychology'; break;
    case 'i_social': iconName = 'group'; break;
    case 'i_tech': iconName = 'memory'; break;
    case 'i_business': iconName = 'work'; break;
    default: 
      if (id.startsWith('p_')) iconName = 'star';
      break;
  }
  return <span className="material-symbols-outlined interest-icon">{iconName}</span>;
};

export const InterestCard: React.FC<InterestCardProps> = ({
  id,
  title,
  description,
  selected = false,
  onClick,
}) => {
  return (
    <button 
      type="button" 
      className={`interest-card ${selected ? 'selected' : ''}`} 
      onClick={onClick}
      style={{ textAlign: 'left', background: 'transparent', border: 'none', padding: 0, font: 'inherit', display: 'block', width: '100%' }}
    >
      <Card hoverable className="interest-card-inner">
        <div className="interest-icon-wrapper">
          {getIcon(id)}
        </div>
        <h3 className="interest-title">{title}</h3>
        <p className="interest-desc">{description}</p>
      </Card>
    </button>
  );
};
