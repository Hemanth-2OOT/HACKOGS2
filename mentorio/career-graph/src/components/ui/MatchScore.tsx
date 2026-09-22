
import './MatchScore.css';

interface MatchScoreProps {
  score: number;
  size?: 'md' | 'lg';
}

export const MatchScore = ({ score, size = 'md' }: MatchScoreProps) => {
  return (
    <div className={`match-score-container size-${size}`}>
      <div className="match-score-label">Match Score</div>
      <div className="match-score-value">{score}%</div>
    </div>
  );
};
