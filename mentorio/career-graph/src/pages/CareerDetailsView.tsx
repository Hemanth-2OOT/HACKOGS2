import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { calculate_recommendations, calculate_shortest_path } from '../api/engine';
import { careers } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { CircularGauge } from '../components/ui/CircularGauge';
import { getCareerTasks, getLearningResources } from '../utils/careerEnrichment';
import './CareerDetailsView.css';

export const CareerDetailsView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedSkills, selectedInterests, selectedPreferences, academicProfile, naturalLanguageInput, explorationMode, engineWeights } = useApp();

  const career = careers.find(c => c.id === id);

  if (!career) {
    return (
      <div className="container mt-xl text-center">
        <h2>Career not found</h2>
        <Button onClick={() => navigate('/graph')} className="mt-md">Back to Graph</Button>
      </div>
    );
  }

  // Generate real dynamic data instead of mocks
  const recData = calculate_recommendations(selectedSkills, selectedInterests, selectedPreferences, academicProfile, naturalLanguageInput, explorationMode, engineWeights);
  const recommendation = recData.recommendations.find(r => r.career.id === id);
  const roadmapPath = calculate_shortest_path(selectedSkills, id || '');

  if (!recommendation) {
    return <div>Loading...</div>;
  }

  const { final_match_score, breakdown, matched_skills, missing_skills, next_best_skill, why_not_higher } = recommendation;

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/recommendations');
    }
  };

  return (
    <div className="career-details-view container">
      <button className="back-link" onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '500' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
        Back
      </button>
      
      <div className="mt-lg">
        <div className="career-detail-header">
          <div>
            <h1>{career.label}</h1>
            <p>{career.description}</p>
            
            <div className="mt-md" style={{ background: 'var(--surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>What does a {career.label} do?</h4>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-main)', fontSize: '15px' }}>
                {getCareerTasks(career.label).map((task, idx) => (
                  <li key={idx}>{task}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="match-score-badge" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularGauge value={final_match_score} size={80} strokeWidth={8} />
            <span className="label mt-sm" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Match Score</span>
          </div>
        </div>

        <div className="breakdown-grid">
          <div className="breakdown-section">
            <h2>How your match was calculated</h2>
            
            <div className="score-row">
              <span>Skills ({Math.round(engineWeights.skills * 100)}% weight)</span>
              <div className="bar-bg"><div className="bar-fill" style={{width: `${(breakdown.skills.earned / (breakdown.skills.max || 1)) * 100}%`}}></div></div>
              <span>{Math.round(breakdown.skills.earned)} / {breakdown.skills.max}</span>
            </div>
            
            {breakdown.semantic && (
              <div className="score-row" style={{ background: 'rgba(99, 102, 241, 0.05)', padding: '8px', borderRadius: '8px', margin: '-8px -8px 8px -8px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Semantic Alignment ({Math.round((engineWeights as any).semantic_similarity * 100)}% weight)</span>
                <div className="bar-bg"><div className="bar-fill" style={{width: `${(breakdown.semantic.earned / breakdown.semantic.max) * 100}%`, background: 'var(--primary)'}}></div></div>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{Math.round(breakdown.semantic.earned)} / {breakdown.semantic.max}</span>
              </div>
            )}

            <div className="score-row">
              <span>Interests ({Math.round(engineWeights.interests * 100)}% weight)</span>
              <div className="bar-bg"><div className="bar-fill" style={{width: `${(breakdown.interests.earned / (breakdown.interests.max || 1)) * 100}%`}}></div></div>
              <span>{Math.round(breakdown.interests.earned)} / {breakdown.interests.max}</span>
            </div>
            
            <div className="score-row">
              <span>Preferences ({Math.round(engineWeights.preferences * 100)}% weight)</span>
              <div className="bar-bg"><div className="bar-fill" style={{width: `${(breakdown.preferences.earned / (breakdown.preferences.max || 1)) * 100}%`}}></div></div>
              <span>{Math.round(breakdown.preferences.earned)} / {breakdown.preferences.max}</span>
            </div>
            
            <div className="score-row">
              <span>Academic Context ({Math.round(engineWeights.academic_context * 100)}% weight)</span>
              <div className="bar-bg"><div className="bar-fill" style={{width: `${(breakdown.academic.score / 100) * 100}%`}}></div></div>
              <span>{Math.round(breakdown.academic.score)} / 100</span>
            </div>

            {why_not_higher.length > 0 && (
              <div className="why-not-higher-box mt-md">
                <h4>Why isn't this ranked higher?</h4>
                <ul>
                  {why_not_higher.map((reason, idx) => (
                    <li key={idx}>  {reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="skills-breakdown-section">
            <h2>Skill Gap & Resources</h2>
            
            <div className="skill-group">
              <h4 className="text-success">Skills You Already Have ✓</h4>
              <ul className="skill-list">
                {matched_skills.map(s => <li key={s.name}>✓ {s.name} <span className="text-muted text-sm">(+{s.weight})</span></li>)}
                {matched_skills.length === 0 && <li className="text-muted">No relevant skills yet</li>}
              </ul>
            </div>
            
            <div className="skill-group mt-md">
              <h4 className="text-muted" style={{ marginBottom: '16px' }}>Target Skill Tree (Learning Path)</h4>
              <div className="skill-tree-container" style={{ position: 'relative', paddingLeft: '24px' }}>
                {/* Vertical connecting line */}
                <div style={{ position: 'absolute', left: '7px', top: '24px', bottom: '24px', width: '2px', background: 'var(--border)' }}></div>
                
                {missing_skills.map((s) => {
                  const links = getLearningResources(s.skill.label);
                  return (
                    <div key={s.skill.id} className="skill-tree-node" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', padding: '16px', marginBottom: '16px', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                      {/* Node dot */}
                      <div style={{ position: 'absolute', left: '-22px', top: '24px', width: '12px', height: '12px', borderRadius: '50%', background: s.is_core ? 'var(--primary)' : 'var(--text-muted)', border: '2px solid var(--bg)' }}></div>
                      
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '16px', color: 'var(--text-main)' }}>{s.skill.label}</strong> 
                          {s.is_core && <span className="core-badge" style={{ marginLeft: '8px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>Core Prerequisite</span>}
                        </div>
                        <span className="text-muted text-sm" style={{ fontWeight: '600' }}>+{s.impact} Match Impact</span>
                      </div>
                      
                      <p className="text-sm text-muted" style={{ margin: '4px 0 12px 0' }}>Learn this to heavily boost your alignment with this career.</p>

                      <div className="learning-resources-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '12px', fontWeight: '500' }}>
                        <a href={links.coursera} target="_blank" rel="noreferrer" style={{ background: '#e0f2fe', color: '#0369a1', borderRadius: '16px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s', lineHeight: 1, padding: '8px 14px' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>school</span> Coursera
                        </a>
                        <a href={links.udemy} target="_blank" rel="noreferrer" style={{ background: '#f3e8ff', color: '#7e22ce', borderRadius: '16px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s', lineHeight: 1, padding: '8px 14px' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>play_circle</span> Udemy
                        </a>
                        <a href={links.youtube} target="_blank" rel="noreferrer" style={{ background: '#fee2e2', color: '#b91c1c', borderRadius: '16px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s', lineHeight: 1, padding: '8px 14px' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>video_library</span> YouTube Free
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {next_best_skill && (
              <div className="next-best-box mt-lg">
                <h4>NEXT BEST STEP</h4>
                <p>Learn <strong>{next_best_skill.skill.label}</strong></p>
                <p className="text-sm text-muted mt-sm">This is one of the strongest missing connections to this path. Potential impact: +{next_best_skill.impact} points.</p>
              </div>
            )}
            
            {roadmapPath.length > 0 && (
              <div className="roadmap-box mt-lg" style={{ padding: '24px', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <h4 style={{ marginBottom: '16px' }}>CAREER ROADMAP</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
                  {roadmapPath.map((step, idx) => (
                    <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '24px', height: '24px', borderRadius: '50%', 
                        background: idx === 0 ? 'var(--success)' : idx === roadmapPath.length - 1 ? 'var(--primary)' : 'var(--border)',
                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', zIndex: 2
                      }}>
                        {idx + 1}
                      </div>
                      <div style={{ flex: 1, padding: '12px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)' }}>
                        <strong>{step.label}</strong>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{step.type}</div>
                      </div>
                    </div>
                  ))}
                  {/* Timeline connecting line */}
                  <div style={{ position: 'absolute', top: '12px', bottom: '12px', left: '11px', width: '2px', background: 'var(--border)', zIndex: 1 }} />
                </div>
              </div>
            )}
          </div>
        </div>

        <Button fullWidth variant="primary" className="mt-xl" onClick={() => navigate('/graph')}>Explore in Knowledge Graph</Button>
      </div>
    </div>
  );
};




