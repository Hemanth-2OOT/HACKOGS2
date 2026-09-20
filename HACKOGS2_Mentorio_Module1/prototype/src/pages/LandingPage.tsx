import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { InteractiveString } from '../components/ui/InteractiveString';
import { ParticleWaveBackground } from '../components/ui/ParticleWaveBackground';
import { HeroForceGraph } from '../components/ui/HeroForceGraph';
import { useScrollReveal } from '../hooks/useScrollReveal';

import './LandingPage.css';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { ref: howItWorksRef, isVisible: howItWorksVisible } = useScrollReveal(0.2);

  return (
    <div className="landing-page">
      <ParticleWaveBackground />
      <section className="hero-section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="reveal-wrap">
            <h1 
              className={`hero-title reveal-text ${mounted ? 'revealed' : ''}`}
              style={{
                background: 'linear-gradient(to right, var(--text-main), var(--primary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(129, 140, 248, 0.2))',
                lineHeight: '1.25',
                letterSpacing: '-0.02em',
                maxWidth: '600px'
              }}
            >
              Analyze your career gap.<br />Generate your roadmap.
            </h1>
          </div>
          <div className="reveal-wrap mt-md">
            <p className={`hero-subtitle reveal-text stagger-1 ${mounted ? 'revealed' : ''}`} style={{ color: '#334155', fontWeight: 500, maxWidth: '500px' }}>
              AI Career Intelligence: Build your profile, parse your resume, or analyze target job descriptions to identify exact skill gaps.
            </p>
          </div>
          
          <div className={`fade-up stagger-2 ${mounted ? 'revealed' : ''}`} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '450px' }}>
            <p style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>How do you want to start?</p>
            
            <Button size="lg" onClick={() => navigate('/profile')} className="btn-awwwards-magnetic btn-primary-action" style={{ justifyContent: 'flex-start', alignItems: 'center', padding: '16px 24px' }}>
              <span className="material-symbols-outlined" style={{ marginRight: '12px', fontSize: '20px' }}>person</span>
              Build My Profile
            </Button>
            
            <Button size="lg" onClick={() => navigate('/upload?type=resume')} className="btn-awwwards-magnetic btn-secondary-action" style={{ justifyContent: 'flex-start', alignItems: 'center', padding: '16px 24px' }}>
              <span className="material-symbols-outlined" style={{ marginRight: '12px', fontSize: '20px' }}>upload_file</span>
              Upload My Resume (PDF)
            </Button>
            
            <Button size="lg" onClick={() => navigate('/upload?type=jd')} className="btn-awwwards-magnetic btn-secondary-action" style={{ justifyContent: 'flex-start', alignItems: 'center', padding: '16px 24px' }}>
              <span className="material-symbols-outlined" style={{ marginRight: '12px', fontSize: '20px' }}>search</span>
              Analyze a Job Description (PDF)
            </Button>
          </div>
        </div>
        
        <div className={`hero-visual fade-up stagger-3 ${mounted ? 'revealed' : ''}`}>
          {/* Interactive 2D Graph Visualization */}
          <div className="graph-context-wrapper" style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)', overflow: 'hidden', padding: '60px 24px 24px 24px' }}>
            <div className="contextual-label" style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', background: 'var(--surface-hover)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', padding: '12px', borderRadius: '12px', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--primary)', textTransform: 'uppercase', background: 'rgba(99, 102, 241, 0.1)', padding: '6px 12px', borderRadius: '100px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                <span className="pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }}></span>
                Career Knowledge Graph
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-main)', opacity: 0.9, fontWeight: 600, marginRight: '4px' }}>Skills &rarr; Careers</div>
            </div>
            
            <HeroForceGraph />
            
            <div className="graph-hint" style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none', zIndex: 10, background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', padding: '12px 24px', borderRadius: '30px', border: '1px solid #CBD5E1', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', width: 'max-content' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', marginBottom: '2px' }}>Explore the graph</div>
              <div style={{ fontSize: '12px', color: '#475569' }}>Hover or drag to explore career connections</div>
            </div>
          </div>
        </div>
      </section>

      {/* Physics String Divider */}
      <div className="container" style={{ padding: '0 24px', width: '100%', margin: '20px 0' }}>
        <InteractiveString color="var(--primary)" height={100} strokeWidth={4} />
      </div>

      <div className="section-wrapper" style={{ position: 'relative', zIndex: 2, backgroundColor: 'var(--bg-color)', paddingTop: '60px', paddingBottom: '120px' }}>
        <section className="how-it-works container" ref={howItWorksRef}>
          <div className="reveal-wrap" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <h2 className={`section-heading text-center mb-xl reveal-text ${howItWorksVisible ? 'revealed' : ''}`}>How it works</h2>
          </div>
        <div className="steps-grid">
          <div className={`fade-up ${howItWorksVisible ? 'revealed' : ''}`}>
            <Card className="step-card">
              <div className="step-number">01</div>
              <h3 className="step-title">Upload Your Resume</h3>
              <p className="step-desc">Drop your PDF. Our AI strictly extracts and categorizes your proven skills and tools.</p>
            </Card>
          </div>
          <div className={`fade-up stagger-1 ${howItWorksVisible ? 'revealed' : ''}`}>
            <Card className="step-card">
              <div className="step-number">02</div>
              <h3 className="step-title">Compare Job Gaps</h3>
              <p className="step-desc">Upload a target Job Description to instantly calculate your exact evidence-based matches and misses.</p>
            </Card>
          </div>
          <div className={`fade-up stagger-2 ${howItWorksVisible ? 'revealed' : ''}`}>
            <Card className="step-card">
              <div className="step-number">03</div>
              <h3 className="step-title">Generate a Roadmap</h3>
              <p className="step-desc">Use the interactive Career Graph to visualize the precise learning path to bridge your gap.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="transparency-section container">
        <div className="transparency-grid">
          <div className="transparency-content">
            <h2 className="section-heading">No mystery scores.<br />See the reasoning.</h2>
            <p className="transparency-desc">
              Every recommendation can be traced back to the skills and interests you selected. 
              We don't use black-box AI — just a transparent knowledge graph.
            </p>
            <Button className="mt-md" onClick={() => navigate('/profile')}>Build My Career Profile</Button>
          </div>
          <div className="transparency-visual">
            <div className="flow-diagram">
              <div className="flow-node">Python</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-node">Machine Learning</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-node highlight">Data Scientist</div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};


