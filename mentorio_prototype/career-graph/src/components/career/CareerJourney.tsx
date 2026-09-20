import type { RecommendationResult } from '../../api/engine';
import { edges, allNodes } from '../../data/mockData';
import './CareerJourney.css';

interface CareerJourneyProps {
  recommendation: RecommendationResult;
}

export const CareerJourney = ({ recommendation }: CareerJourneyProps) => {
  const { career, matched_skills, missing_skills, final_match_score } = recommendation;

  // Find similar careers by finding other careers that require the same core skills
  const coreSkillIds = edges
    .filter(e => e.target === career.id && e.source.startsWith('s_') && e.is_prerequisite)
    .map(e => typeof e.source === 'object' ? (e.source as any).id : e.source);

  const similarCareers = allNodes
    .filter(n => n.type === 'career' && n.id !== career.id)
    .map(n => {
      const shared = edges.filter(e => {
        const eTarget = typeof e.target === 'object' ? (e.target as any).id : e.target;
        const eSource = typeof e.source === 'object' ? (e.source as any).id : e.source;
        return eTarget === n.id && coreSkillIds.includes(eSource);
      }).length;
      return { career: n, shared };
    })
    .filter(c => c.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 2);

  return (
    <div className="career-journey-container">
      <div className="journey-step">
        <div className="journey-node current">
          <div className="journey-title">YOU ARE HERE</div>
          <ul className="journey-list">
            {matched_skills.slice(0, 3).map(s => <li key={s.name}>{s.name} ✓</li>)}
            {matched_skills.length === 0 && <li className="text-muted">Starting fresh</li>}
          </ul>
        </div>
      </div>

      <div className="journey-connector">↓</div>

      <div className="journey-step">
        <div className="journey-node target">
          <div className="journey-title">{career.label.toUpperCase()}</div>
          <div className="journey-score">{final_match_score} MATCH SCORE</div>
        </div>
      </div>

      <div className="journey-connector">↓</div>

      <div className="journey-step">
        <div className="journey-node action">
          <div className="journey-title">TO STRENGTHEN THIS PATH</div>
          <ul className="journey-list">
            {missing_skills.slice(0, 3).map(s => <li key={s.skill.id}>{s.skill.label} +</li>)}
            {missing_skills.length === 0 && <li className="text-muted">Fully qualified!</li>}
          </ul>
        </div>
      </div>

      {similarCareers.length > 0 && (
        <>
          <div className="journey-connector">↓</div>
          <div className="journey-step">
            <div className="journey-node future">
              <div className="journey-title">FUTURE RELATED PATHS</div>
              <ul className="journey-list">
                {similarCareers.map(c => <li key={c.career.id}>{c.career.label}</li>)}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
