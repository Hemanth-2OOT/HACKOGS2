import { useState } from 'react';
import { MatchScore } from '../ui/MatchScore';
import { SkillChip } from '../ui/SkillChip';
import type { MatchFactor } from '../../api/engine';
import './ExplanationPanel.css';

interface ExplanationPanelProps {
  careerName: string;
  matchScore: number;
  academicScore: number | null;
  finalScore: number;
  matchingSkills: MatchFactor[];
  matchingInterests: MatchFactor[];
  missingSkills?: string[];
  academicFactors?: string[];
}

export const ExplanationPanel = ({ 
  careerName, 
  matchScore,
  academicScore,
  finalScore, 
  matchingSkills, 
  matchingInterests,
  missingSkills = [],
  academicFactors = []
}: ExplanationPanelProps) => {
  const [showScoreExplainer, setShowScoreExplainer] = useState(false);

  return (
    <div className="explanation-panel">
      <div className="explanation-header">
        <h3 className="explanation-title">{careerName}</h3>
        <MatchScore score={finalScore} size="lg" />
      </div>

      {academicScore !== null && (
        <div className="score-breakdown">
          <div className="score-row">
            <span>Skill & Interest Match</span>
            <span>{matchScore}%</span>
          </div>
          <div className="score-row">
            <span>Academic Relevance</span>
            <span>{academicScore}%</span>
          </div>
          <button 
            className="score-explainer-btn"
            onClick={() => setShowScoreExplainer(!showScoreExplainer)}
          >
            How is this score calculated?
          </button>
          
          {showScoreExplainer && (
            <div className="score-explainer-box">
              <p><strong>80%</strong> comes from your skills and interests.</p>
              <p><strong>20%</strong> comes from your academic profile.</p>
              <p className="mt-xs text-muted" style={{ fontSize: '12px' }}>
                Academic information personalizes recommendations; it does not determine your career.
              </p>
            </div>
          )}
        </div>
      )}

      <p className="explanation-intro mt-md">
        This career was recommended based on your skills and interests and their weighted connections in the career graph.
      </p>

      {matchingSkills.length > 0 && (
        <div className="explanation-section">
          <h4 className="explanation-subtitle">Matching Skills</h4>
          <ul className="explanation-list">
            {matchingSkills.map(skill => (
              <li key={skill.name} className="explanation-item">
                <SkillChip label={skill.name} variant="matched" />
                <span className="explanation-weight">Weight: {skill.weight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {matchingInterests.length > 0 && (
        <div className="explanation-section">
          <h4 className="explanation-subtitle">Matching Interests</h4>
          <ul className="explanation-list">
            {matchingInterests.map(interest => (
              <li key={interest.name} className="explanation-item">
                <SkillChip label={interest.name} variant="interest" />
                <span className="explanation-weight">Weight: {interest.weight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {academicFactors.length > 0 && (
        <div className="explanation-section">
          <h4 className="explanation-subtitle">Academic Relevance</h4>
          <ul className="explanation-list" style={{ gap: '4px' }}>
            {academicFactors.map(factor => (
              <li key={factor} style={{ fontSize: '14px', color: 'var(--text-main)' }}>
                {factor}
              </li>
            ))}
          </ul>
        </div>
      )}

      {missingSkills.length > 0 && (
        <div className="explanation-section" style={{ marginTop: 'var(--spacing-xl)' }}>
          <h4 className="explanation-subtitle" style={{ color: 'var(--text-muted)' }}>Skills that could strengthen this path</h4>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--spacing-sm)' }}>
            These are core skills highly relevant to this career that are not currently in your profile.
          </p>
          <div className="explanation-list" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
            {missingSkills.map(skill => (
              <SkillChip key={skill} label={skill} variant="neutral" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
