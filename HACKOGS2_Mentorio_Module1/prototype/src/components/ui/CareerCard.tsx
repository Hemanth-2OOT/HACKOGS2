import type { RecommendationResult } from '../../api/engine';
import { Button } from './Button';
import { CircularGauge } from './CircularGauge';
import './CareerCard.css';

interface CareerCardProps {
  recommendation: RecommendationResult;
  rank: number;
  onClick: () => void;
}

export const CareerCard = ({ recommendation, rank, onClick }: CareerCardProps) => {
  const { career, final_match_score, matched_skills, missing_skills, next_best_skill } = recommendation;

  return (
    <div className="career-card" onClick={onClick}>
      <div className="card-header">
        <div className="card-rank">#{rank}</div>
        <div className="card-title-area">
          <h3>{career.label}</h3>
          <p>{career.description}</p>
        </div>
        <div className="card-score-wrapper">
          <CircularGauge value={final_match_score} size={64} />
          <div className="score-label mt-sm">Match Score</div>
        </div>
      </div>

      <div className="card-body">
        <div className="fit-section">
          <h4 style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
            <span className="material-symbols-outlined" style={{color: '#004AC6'}}>psychology</span>
            Why it fits you:
          </h4>
          <ul className="fit-list">
            {matched_skills.slice(0, 4).map(s => (
              <li key={s.name}>
                <span className="material-symbols-outlined" style={{fontSize: '16px'}}>check_circle</span> 
                {s.name}
              </li>
            ))}
            {matched_skills.length === 0 && <li className="text-muted">No direct technical skills matched.</li>}
          </ul>
        </div>

        <div className="gap-section">
          <h4 style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
            <span className="material-symbols-outlined" style={{color: '#390B00'}}>warning</span>
            Skill Gap: {missing_skills.length} important skills
          </h4>
          {next_best_skill && (
            <div className="next-best-skill">
              <strong>Next Best Step:</strong> Learn {next_best_skill.skill.label}
              <span className="impact-badge">+{next_best_skill.impact} Impact</span>
            </div>
          )}
        </div>
      </div>

      <div className="card-footer">
        <Button variant="outline" onClick={(e) => { e.stopPropagation(); onClick(); }}>
          Explore Path
          <span className="material-symbols-outlined" style={{fontSize: '18px'}}>arrow_forward</span>
        </Button>
      </div>
    </div>
  );
};
