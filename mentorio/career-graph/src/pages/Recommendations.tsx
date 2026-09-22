import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { fetchRecommendations } from '../api/engine';
import type { RecommendResponse } from '../api/engine';
import { CareerCard } from '../components/ui/CareerCard';
import { Button } from '../components/ui/Button';
import { CareerComparison } from '../components/career/CareerComparison';
import { CareerJourney } from '../components/career/CareerJourney';
import './Recommendations.css';

export const Recommendations = () => {
  const navigate = useNavigate();
  const { selectedSkills, selectedInterests, selectedPreferences, academicProfile, naturalLanguageInput, explorationMode, engineWeights, setEngineWeights } = useApp();
  const [data, setData] = useState<RecommendResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showComparison, setShowComparison] = useState(false);
  const [showTuner, setShowTuner] = useState(false);

  useEffect(() => {
    // We handle empty state visually in the render instead of redirecting
    if (selectedSkills.length === 0 && selectedInterests.length === 0) {
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      const res = await fetchRecommendations(selectedSkills, selectedInterests, selectedPreferences, academicProfile, naturalLanguageInput, explorationMode, engineWeights);
      setData(res);
      setLoading(false);
    };
    load();
  }, [selectedSkills, selectedInterests, selectedPreferences, academicProfile, naturalLanguageInput, explorationMode, engineWeights, navigate]);

  if (selectedSkills.length === 0 && selectedInterests.length === 0) {
    return (
      <div className="recommendations-dashboard container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <span className="material-symbols-outlined mb-md" style={{ fontSize: '48px', color: 'var(--text-muted)' }}>account_circle</span>
        <h2>Your career graph starts with you.</h2>
        <p className="text-muted mt-md mb-lg" style={{ maxWidth: '400px' }}>
          Tell us about your skills and interests, and we'll help you explore connected career paths.
        </p>
        <Button size="lg" variant="primary" onClick={() => navigate('/profile')}>
          Start Discovery
        </Button>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="loading-container container">
        <div className="loader"></div>
        <h2>Analyzing your profile...</h2>
        <p>Traversing the knowledge graph to find your best matches.</p>
      </div>
    );
  }

  const topCareers = data.recommendations.slice(0, 3);

  const isLimitedProfile = selectedSkills.length + selectedInterests.length < 3;

  return (
    <div className="recommendations-dashboard container">
      {isLimitedProfile && (
        <div className="limited-profile-banner" style={{ background: 'var(--surface-hover)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--warning)' }}>info</span>
              Your profile is just getting started.
            </h4>
            <p className="text-muted text-sm" style={{ margin: 0 }}>Add a few more skills or interests to make your career paths more personalized.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/profile')}>Improve My Profile</Button>
        </div>
      )}

      <header className="dashboard-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Your Career Discovery</h1>
          <Button variant="outline" size="sm" onClick={() => setShowTuner(!showTuner)}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', marginRight: '6px' }}>tune</span>
            Algorithm Tuner
          </Button>
        </div>
        
        {showTuner && (
          <div className="algorithm-tuner mt-md" style={{ background: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h3 style={{ marginBottom: '16px' }}>Tune the Recommendation Engine</h3>
            <p className="text-muted text-sm" style={{ marginBottom: '24px' }}>Adjust how much weight the algorithm places on different parts of your profile.</p>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                  Skills Weight
                  <span>{Math.round(engineWeights.skills * 100)}%</span>
                </label>
                <input type="range" min="0" max="100" value={engineWeights.skills * 100} onChange={e => setEngineWeights({...engineWeights, skills: parseInt(e.target.value) / 100})} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                  Interests Weight
                  <span>{Math.round(engineWeights.interests * 100)}%</span>
                </label>
                <input type="range" min="0" max="100" value={engineWeights.interests * 100} onChange={e => setEngineWeights({...engineWeights, interests: parseInt(e.target.value) / 100})} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                  Preferences Weight
                  <span>{Math.round(engineWeights.preferences * 100)}%</span>
                </label>
                <input type="range" min="0" max="100" value={engineWeights.preferences * 100} onChange={e => setEngineWeights({...engineWeights, preferences: parseInt(e.target.value) / 100})} style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        )}
        
        <div className="coverage-panel mt-md">
          <div className="coverage-header">
            <h3>Profile Coverage</h3>
            <span className={`coverage-badge ${data.profileCoverage.label.toLowerCase()}`}>
              {data.profileCoverage.label} Confidence
            </span>
          </div>
          <div className="coverage-bar-bg">
            <div 
              className="coverage-bar-fill" 
              style={{ width: `${data.profileCoverage.score}%` }}
            ></div>
          </div>
          <ul className="coverage-details">
            {data.profileCoverage.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </div>
      </header>

      <section className="dashboard-section mt-xl">
        <h2>Your Top Career Paths</h2>
        <p className="text-muted mb-md">Based on your skills, interests, and preferences.</p>
        
        <div className="career-grid">
          {topCareers.map((rec, index) => (
            <CareerCard 
              key={rec.career.id} 
              recommendation={rec} 
              rank={index + 1}
              onClick={() => navigate(`/career/${rec.career.id}`)}
            />
          ))}
        </div>

        <div className="comparison-toggle-container mt-lg">
          <Button 
            variant="outline" 
            onClick={() => setShowComparison(!showComparison)}
            fullWidth
          >
            {showComparison ? 'Hide Comparison' : 'Compare Career Paths'}
          </Button>
        </div>

        {showComparison && (
          <div className="fade-in mt-md">
            <CareerComparison recommendations={topCareers} />
          </div>
        )}
      </section>

      <hr className="dashboard-divider" />

      <section className="dashboard-section">
        <h2>Your Career Journey</h2>
        <p className="text-muted mb-md">A visual path of where you are and where you can go.</p>
        <CareerJourney recommendation={topCareers[0]} />
      </section>

      <hr className="dashboard-divider" />

      <section className="dashboard-section explore-action-section">
        <h2>Explore Your Graph</h2>
        <p className="text-muted mb-md">Dive into the actual knowledge graph to see exactly how your skills connect to careers.</p>
        <Button variant="primary" onClick={() => navigate('/graph')}>
          Open Interactive Graph
        </Button>
      </section>
    </div>
  );
};

