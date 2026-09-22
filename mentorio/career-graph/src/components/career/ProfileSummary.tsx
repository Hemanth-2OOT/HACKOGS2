import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { skills, interests } from '../../data/mockData';
import './ProfileSummary.css';

interface ProfileSummaryProps {
  onEditClick: () => void;
}

export const ProfileSummary: React.FC<ProfileSummaryProps> = ({ onEditClick }) => {
  const { selectedSkills, selectedInterests, explorationMode } = useApp();

  const skillNames = selectedSkills.map(id => skills.find(s => s.id === id)?.label).filter(Boolean);
  const interestNames = selectedInterests.map(id => interests.find(i => i.id === id)?.label).filter(Boolean);

  return (
    <Card className="profile-summary">
      <div className="profile-summary-header">
        <h3 className="profile-summary-title">Your Profile</h3>
        <Button variant="ghost" size="sm" onClick={onEditClick}>Edit</Button>
      </div>
      
      <div className="profile-summary-content">
        <div className="summary-group">
          <div className="summary-label">Skills</div>
          <div className="summary-values">
            {skillNames.length > 0 ? skillNames.join(', ') : 'None selected'}
          </div>
        </div>

        <div className="summary-group">
          <div className="summary-label">Interests</div>
          <div className="summary-values">
            {interestNames.length > 0 ? interestNames.join(', ') : 'None selected'}
          </div>
        </div>
        
        <div className="summary-group">
          <div className="summary-label">Mode</div>
          <div className="summary-values">
            {explorationMode === 'BFS' ? 'Broad Exploration' : 'Focused Exploration'}
          </div>
        </div>
      </div>
    </Card>
  );
};
