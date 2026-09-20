import type { RecommendationResult } from '../../api/engine';
import './CareerComparison.css';

interface CareerComparisonProps {
  recommendations: RecommendationResult[];
}

export const CareerComparison = ({ recommendations }: CareerComparisonProps) => {
  if (recommendations.length === 0) return null;

  return (
    <div className="career-comparison-container">
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="feature-col">Feature</th>
              {recommendations.map(r => (
                <th key={r.career.id}>{r.career.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="feature-col">Match Score</td>
              {recommendations.map(r => (
                <td key={r.career.id} className="score-cell">{r.final_match_score}</td>
              ))}
            </tr>
            <tr>
              <td className="feature-col">Skills Matched</td>
              {recommendations.map(r => (
                <td key={r.career.id}>{r.matched_skills.length}</td>
              ))}
            </tr>
            <tr>
              <td className="feature-col">Missing Skills</td>
              {recommendations.map(r => (
                <td key={r.career.id}>{r.missing_skills.length}</td>
              ))}
            </tr>
            <tr>
              <td className="feature-col">Interest Alignment</td>
              {recommendations.map(r => {
                const count = r.matched_interests.length;
                const label = count > 2 ? 'High' : count > 0 ? 'Medium' : 'Low';
                return <td key={r.career.id}>{label}</td>;
              })}
            </tr>
            <tr>
              <td className="feature-col">Skill Gap</td>
              {recommendations.map(r => {
                const count = r.missing_skills.length;
                const label = count > 5 ? 'High' : count > 2 ? 'Medium' : 'Low';
                return <td key={r.career.id}>{label}</td>;
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
