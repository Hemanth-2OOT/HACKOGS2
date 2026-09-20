import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mapSkillsToIds } from '../utils/skillMapper';
import type { MappedSkill } from '../utils/skillMapper';
import { careers } from '../data/mockData';
import './ProfileReview.css';

export const ProfileReview = () => {
  const { extractedProfile, selectedSkills, toggleSkill } = useApp();
  const navigate = useNavigate();
  const [mapped, setMapped] = useState<MappedSkill[]>([]);
  const [selectedTargetCareer, setSelectedTargetCareer] = useState<string>('');

  useEffect(() => {
    if (extractedProfile) {
      const results = mapSkillsToIds(extractedProfile.skills);
      setMapped(results);
      
      // Auto-select ONLY verified skills that matched a graph ID
      results.forEach(m => {
        if (m.status === 'verified' && m.matchedId && !selectedSkills.includes(m.matchedId)) {
          toggleSkill(m.matchedId);
        }
      });
    }
  }, [extractedProfile]);

  if (!extractedProfile) {
    return <div className="container" style={{ marginTop: '4rem' }}><h2>No Profile Found</h2></div>;
  }

  const handleRunGapAnalysisForCareer = () => {
    if (!selectedTargetCareer) return;
    navigate(`/gap-analysis?targetCareer=${selectedTargetCareer}`);
  };

  const categories = Array.from(new Set(mapped.map(m => m.category))).sort();

  return (
    <div className="container" style={{ marginTop: '2rem', maxWidth: '800px' }}>
      <h1>Review Your Extracted Profile</h1>
      <p className="text-muted mb-xl">
        Review the evidence-based extraction below. Skills are categorized based on your resume context. 
        Only verified, graph-supported skills are auto-selected.
      </p>

      <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: '2rem' }}>
        
        {categories.map(category => {
          const catSkills = mapped.filter(m => m.category === category);
          
          return (
            <div key={category} style={{ marginBottom: '2rem' }}>
              <h3 style={{ textTransform: 'capitalize', color: 'var(--primary)', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                {category.replace('_', ' ')}
              </h3>
              
              <div className="skills-grid">
                {catSkills.map((m, i) => {
                  const isMapped = !!m.matchedId;
                  const isVerified = m.status === 'verified';
                  const isActive = isMapped && selectedSkills.includes(m.matchedId!);
                  
                  // Color coding based on state
                  let borderColor = 'var(--border)';
                  let textColor = 'var(--text-main)';
                  let icon = 'help';
                  let statusText = 'Unmapped';
                  
                  if (isMapped && isVerified) {
                    borderColor = isActive ? 'var(--primary)' : 'var(--success)';
                    textColor = isActive ? 'white' : 'var(--text-main)';
                    icon = isActive ? 'check_circle' : 'verified';
                    statusText = 'Graph Verified';
                  } else if (isMapped && !isVerified) {
                    borderColor = isActive ? 'var(--primary)' : 'var(--warning)';
                    textColor = isActive ? 'white' : 'var(--text-main)';
                    icon = 'psychology';
                    statusText = 'Inferred - Please Verify';
                  }

                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                      <div 
                        style={{ 
                          padding: '16px', 
                          borderRadius: '12px', 
                          border: `1px ${!isVerified ? 'dashed' : 'solid'} ${borderColor}`,
                          background: isActive ? 'linear-gradient(135deg, var(--primary) 0%, #4f46e5 100%)' : 'var(--surface-hover)',
                          color: textColor,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          boxShadow: isActive ? '0 4px 12px rgba(99, 102, 241, 0.2)' : 'none',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: isActive ? 'white' : 'var(--primary)' }}>{icon}</span>
                            <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{m.matchedLabel || m.name}</span>
                          </div>
                          
                          {isMapped && (
                            <button 
                              onClick={() => m.matchedId && toggleSkill(m.matchedId)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: textColor,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '4px',
                                borderRadius: '50%',
                              }}
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                                {isActive ? 'toggle_on' : 'toggle_off'}
                              </span>
                            </button>
                          )}
                        </div>
                        
                        <div style={{ fontSize: '11px', opacity: isActive ? 0.9 : 0.7, fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>format_quote</span>
                          {m.evidence}
                        </div>
                        
                        <div style={{ 
                          fontSize: '10px', 
                          textTransform: 'uppercase', 
                          fontWeight: 'bold',
                          letterSpacing: '0.5px',
                          marginTop: '4px',
                          opacity: isActive ? 0.8 : 0.5 
                        }}>
                          {statusText}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <h2>Next Step: Choose Your Target</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div style={{ padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--surface)' }}>
          <h3>Option A: Pick a Career</h3>
          <p className="text-muted mb-md text-sm">Compare your skills against a known career in our graph.</p>
          <select 
            value={selectedTargetCareer}
            onChange={(e) => setSelectedTargetCareer(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', background: 'var(--surface-hover)', border: '1px solid var(--border)' }}
          >
            <option value="">-- Select a Career --</option>
            {careers.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
          <button 
            disabled={!selectedTargetCareer}
            onClick={handleRunGapAnalysisForCareer}
            style={{ width: '100%', padding: '0.75rem', background: selectedTargetCareer ? 'var(--primary)' : 'var(--border)', color: 'white', border: 'none', borderRadius: '4px', cursor: selectedTargetCareer ? 'pointer' : 'not-allowed' }}
          >
            Run Gap Analysis
          </button>
        </div>

        <div style={{ padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--surface)' }}>
          <h3>Option B: Upload JD</h3>
          <p className="text-muted mb-md text-sm">Have a specific job description? Upload it to extract its unique requirements.</p>
          <button 
            onClick={() => navigate('/upload?type=jd')}
            style={{ width: '100%', padding: '0.75rem', background: 'transparent', color: 'var(--primary)', border: '1px solid var(--primary)', borderRadius: '4px', cursor: 'pointer' }}
          >
            Upload Job Description (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};
