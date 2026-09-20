import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { allNodes, edges } from '../data/mockData';
import { mapSkillsToIds, normalizeSkillName } from '../utils/skillMapper';
import { useEffect, useState } from 'react';
import './GapAnalysisDashboard.css';

export interface AnalyzedSkill {
  label: string;
  id: string;
  evidence?: string;
  jdEvidence?: string;
}

export const GapAnalysisDashboard = () => {
  const [searchParams] = useSearchParams();
  const targetCareerId = searchParams.get('targetCareer');
  
  const { extractedProfile, extractedJD, selectedSkills } = useApp();
  const navigate = useNavigate();

  const [targetRoleLabel, setTargetRoleLabel] = useState('');
  const [matched, setMatched] = useState<AnalyzedSkill[]>([]);
  const [missing, setMissing] = useState<AnalyzedSkill[]>([]);

  useEffect(() => {
    if (targetCareerId) {
      // MODE A: Target Career from Graph
      const career = allNodes.find(n => n.id === targetCareerId);
      if (career) setTargetRoleLabel(career.label);

      // Find all skills required by this career
      const requiredEdges = edges.filter(e => e.target === targetCareerId && String(e.source).startsWith('s_'));
      
      const matchedSkills: AnalyzedSkill[] = [];
      const missingSkills: AnalyzedSkill[] = [];

      requiredEdges.forEach(e => {
        const skillId = e.source as string;
        const skillNode = allNodes.find(n => n.id === skillId);
        if (!skillNode) return;

        // Try to find if user extracted this skill
        const userEvidenceSkill = extractedProfile?.skills.find(s => normalizeSkillName(s.name) === normalizeSkillName(skillNode.label));

        if (selectedSkills.includes(skillId)) {
          matchedSkills.push({ 
            label: skillNode.label, 
            id: skillNode.id,
            evidence: userEvidenceSkill?.evidence || `Verified in your Graph Profile`,
            jdEvidence: `Core requirement for ${career?.label}`
          });
        } else {
          missingSkills.push({ 
            label: skillNode.label, 
            id: skillNode.id,
            evidence: `No explicit ${skillNode.label} evidence found in your profile.`,
            jdEvidence: `Core requirement for ${career?.label}`
          });
        }
      });

      setMatched(matchedSkills);
      setMissing(missingSkills);
    } else if (extractedJD) {
      // MODE B: Uploaded JD
      setTargetRoleLabel(extractedJD.role);
      
      const payloadSkills = extractedJD.requiredSkills.map(req => ({
        name: req,
        category: 'requirement',
        status: 'verified' as const,
        evidence: 'Required by JD'
      }));
      
      const mappedRequirements = mapSkillsToIds(payloadSkills);
      
      const matchedSkills: AnalyzedSkill[] = [];
      const missingSkills: AnalyzedSkill[] = [];

      mappedRequirements.forEach(req => {
        const isMappedMatch = req.matchedId && selectedSkills.includes(req.matchedId);
        
        // Also check if they explicitly possess this exact unmapped skill string in their extracted profile
        const unmappedUserSkill = !req.matchedId ? extractedProfile?.skills.find(
          userSkill => normalizeSkillName(userSkill.name) === normalizeSkillName(req.name)
        ) : null;

        const isUnmappedMatch = !!unmappedUserSkill;

        if (isMappedMatch || isUnmappedMatch) {
          // Find user's evidence
          const evidenceSkill = unmappedUserSkill || extractedProfile?.skills.find(s => {
            const mapped = mapSkillsToIds([s])[0];
            return mapped.matchedId === req.matchedId;
          });

          matchedSkills.push({ 
            label: req.matchedLabel || req.name, 
            id: req.matchedId || `custom_${Math.random()}`,
            evidence: evidenceSkill?.evidence || 'Found in profile',
            jdEvidence: req.evidence || 'Required by JD'
          });
        } else {
          missingSkills.push({ 
            label: req.matchedLabel || req.name, 
            id: req.matchedId || `custom_${Math.random()}`,
            evidence: `No explicit ${req.name} evidence found in uploaded resume.`,
            jdEvidence: req.evidence || 'Required by JD'
          });
        }
      });

      setMatched(matchedSkills);
      setMissing(missingSkills);
    }
  }, [targetCareerId, extractedJD, selectedSkills]);

  if (!extractedProfile && !selectedSkills.length) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2>No Profile Data Found</h2>
        <button className="btn btn-primary mt-md" onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    );
  }

  const isTargetLoaded = !!targetCareerId || !!extractedJD;

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>AI Gap Analysis</h1>
          <p className="text-muted">Comparing your Mentorio profile against target roles.</p>
        </div>
        <button 
          onClick={() => navigate('/graph')}
          style={{ background: 'var(--primary)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Explore Full Career Graph
        </button>
      </header>

      <div className="gap-analysis-grid">
        
        {/* PROFILE COLUMN */}
        <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <span className="material-symbols-outlined">person</span> Your Profile
            </h2>
            <button onClick={() => navigate('/review-profile')} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '14px' }}>Edit Skills</button>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 className="text-muted mb-sm">Active Skills in Graph (Verified)</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {selectedSkills.map((skillId, i) => {
                const node = allNodes.find(n => n.id === skillId);
                return (
                  <span key={i} style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '16px', fontSize: '14px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                    {node?.label || skillId}
                  </span>
                )
              })}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 className="text-muted mb-sm">Potential Skills — verify</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {extractedProfile?.skills.filter(s => s.status === 'inferred').map((skill, i) => (
                <span key={i} style={{ background: 'transparent', color: 'var(--warning)', padding: '0.25rem 0.75rem', borderRadius: '16px', fontSize: '12px', border: '1px dashed var(--warning)' }}>
                  {skill.name}
                </span>
              ))}
              {!extractedProfile?.skills.some(s => s.status === 'inferred') && <span className="text-muted text-sm">None</span>}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 className="text-muted mb-sm">Skills detected but not yet supported by Mentorio</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {extractedProfile && mapSkillsToIds(extractedProfile.skills).filter(m => !m.matchedId).map((skill, i) => (
                <span key={i} style={{ background: 'var(--surface-hover)', color: 'var(--text-muted)', padding: '0.25rem 0.75rem', borderRadius: '16px', fontSize: '12px', border: '1px solid var(--border)' }} title={skill.evidence}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* JD / GAP COLUMN */}
        <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          {!isTargetLoaded ? (
            <div style={{ textAlign: 'center', margin: '4rem 0' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--text-muted)', marginBottom: '1rem' }}>work</span>
              <h3>Ready to compare against a job?</h3>
              <p className="text-muted mb-lg">Select a target career or upload a Job Description to see exactly what you're missing.</p>
              <button 
                onClick={() => navigate('/review-profile')}
                style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.75rem 1.5rem', borderRadius: '4px', cursor: 'pointer' }}
              >
                Choose Target
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <h2 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="material-symbols-outlined">analytics</span> Target: {targetRoleLabel}
                  </h2>
                  <p className="text-muted">Here is your exact skill gap analysis mapped to the knowledge graph.</p>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-hover)', padding: '1rem', borderRadius: '12px', minWidth: '120px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', fontWeight: 'bold' }}>Match Score</div>
                  <div style={{ fontSize: '32px', fontWeight: '900', color: matched.length > missing.length ? 'var(--success)' : 'var(--warning)' }}>
                    {Math.round((matched.length / (matched.length + missing.length || 1)) * 100)}%
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--success)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined">check_circle</span> Matched Skills
                </h4>
                {matched.length === 0 && <p className="text-muted text-sm">No matched skills found.</p>}
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {matched.map((skill, i) => (
                    <div key={i} style={{ 
                      padding: '1rem', 
                      borderRadius: '8px', 
                      background: 'rgba(34, 197, 94, 0.05)', 
                      border: '1px solid rgba(34, 197, 94, 0.2)' 
                    }}>
                      <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'var(--success)' }}>
                        ✓ {skill.label}
                      </div>
                      <div style={{ marginTop: '0.5rem', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {skill.evidence && <div><strong style={{ color: 'var(--text-main)' }}>Resume evidence:</strong> <em>"{skill.evidence}"</em></div>}
                        {skill.jdEvidence && <div><strong style={{ color: 'var(--text-main)' }}>Target requirement:</strong> <em>"{skill.jdEvidence}"</em></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ color: 'var(--error)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined">error</span> Missing Skills to Develop
                </h4>
                {missing.length === 0 && <p className="text-muted text-sm">You have all the required skills!</p>}
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {missing.map((skill, i) => (
                    <div key={i} style={{ 
                      padding: '1rem', 
                      borderRadius: '8px', 
                      background: 'rgba(239, 68, 68, 0.05)', 
                      border: '1px solid rgba(239, 68, 68, 0.2)' 
                    }}>
                      <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'var(--error)' }}>
                        ✕ {skill.label}
                      </div>
                      <div style={{ marginTop: '0.5rem', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {skill.evidence && <div><strong style={{ color: 'var(--text-main)' }}>Explanation:</strong> {skill.evidence}</div>}
                        {skill.jdEvidence && <div><strong style={{ color: 'var(--text-main)' }}>Target requirement:</strong> <em>"{skill.jdEvidence}"</em></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {isTargetLoaded && missing.length > 0 && (
          <div style={{ marginTop: '2rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 100%)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--primary)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span className="material-symbols-outlined">route</span> Generate Actionable Learning Path
            </h3>
            <p className="text-muted mb-lg">You are missing {missing.length} key requirement{missing.length === 1 ? '' : 's'}. Let our AI build a step-by-step roadmap to bridge this gap.</p>
            <button 
              onClick={() => navigate(targetCareerId ? `/graph?focus=${targetCareerId}` : '/graph')}
              style={{ background: 'var(--primary)', color: 'white', padding: '1rem 2rem', borderRadius: '30px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)' }}
            >
              Build My Learning Roadmap
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
