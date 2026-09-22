import React from 'react';
import { Card } from '../ui/Card';
import { MatchScore } from '../ui/MatchScore';
import { Button } from '../ui/Button';
import './CareerDetail.css';

interface CareerDetailProps {
  career: {
    id: string;
    label: string;
    description?: string;
  };
  matchScore?: number;
  matchingSkills: string[];
  matchingInterests: string[];
  coreSkills: string[];
  onViewGraph: () => void;
}

export const CareerDetail: React.FC<CareerDetailProps> = ({
  career,
  matchScore,
  matchingSkills,
  matchingInterests,
  coreSkills,
  onViewGraph,
}) => {
  return (
    <div className="career-detail">
      <div className="career-detail-header">
        <div>
          <h1 className="career-detail-title">{career.label}</h1>
          <p className="career-detail-desc">{career.description}</p>
        </div>
        {matchScore !== undefined && (
          <div className="career-detail-score">
            <MatchScore score={matchScore} />
          </div>
        )}
      </div>

      <div className="career-detail-grid">
        <div className="career-detail-main">
          {matchScore !== undefined && (
            <Card className="career-detail-section">
              <h2 className="section-title">Why it matches</h2>
              
              <div className="match-lists-container">
                <div className="match-list-col">
                  <h3 className="sub-section-title">Skills</h3>
                  <ul className="check-list">
                    {matchingSkills.map(s => (
                      <li key={s}>✓ {s}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="match-list-col">
                  <h3 className="sub-section-title">Interests</h3>
                  <ul className="check-list">
                    {matchingInterests.map(i => (
                      <li key={i}>✓ {i}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          )}

          <Card className="career-detail-section mt-lg">
            <h2 className="section-title">Core Skills</h2>
            <div className="core-skills-tags">
              {coreSkills.map(skill => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </Card>
        </div>

        <div className="career-detail-sidebar">
          <Card className="career-detail-section">
            <h2 className="section-title">Career Connections</h2>
            <div className="mini-graph-placeholder">
              {/* This would be a mini GraphCanvas in a real app */}
              <div className="mini-graph-visual">
                <div className="mg-node center"></div>
                <div className="mg-node top-left"></div>
                <div className="mg-node bottom-right"></div>
                <div className="mg-line line1"></div>
                <div className="mg-line line2"></div>
              </div>
              <p className="text-center text-sm text-muted mt-md">Interactive graph view available</p>
            </div>
            <Button fullWidth className="mt-md" onClick={onViewGraph}>View Graph</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
