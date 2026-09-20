import { useState, useMemo, useDeferredValue } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { skills, interests, preferences } from '../data/mockData';
import { SkillChip } from '../components/ui/SkillChip';
import { InterestCard } from '../components/ui/InterestCard';
import { Button } from '../components/ui/Button';
import { AcademicProfileForm } from '../components/career/AcademicProfileForm';
import './ProfileBuilder.css';

const steps = ['Skills', 'Interests', 'Preferences', 'Dream Job', 'Context', 'Explore'];

export const ProfileBuilder = () => {
  const navigate = useNavigate();
  const { 
    selectedSkills, toggleSkill, 
    selectedInterests, toggleInterest,
    selectedPreferences, togglePreference,
    explorationMode, setExplorationMode, naturalLanguageInput, setNaturalLanguageInput 
  } = useApp();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [validationError, setValidationError] = useState<string | null>(null);

  const filteredSkills = useMemo(() => {
    return skills.filter(s => s.label.toLowerCase().includes(deferredSearchQuery.toLowerCase()));
  }, [deferredSearchQuery]);

  const handleNext = () => {
    setValidationError(null);
    if (currentStep === 0 && selectedSkills.length === 0) {
      setValidationError("Please select at least one skill to continue.");
      return;
    }
    if (currentStep === 1 && selectedInterests.length === 0 && selectedSkills.length === 0) {
      setValidationError("Please select at least one interest to continue.");
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/recommendations');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="profile-builder-page container">
      {/* Progress Indicator */}
      <div className="progress-container">
        <div className="progress-track">
          {steps.map((step, idx) => (
            <div key={step} className={`progress-step ${idx <= currentStep ? 'active' : ''} ${idx === currentStep ? 'current' : ''}`}>
              <div className="step-circle">{idx < currentStep ? '✓' : idx + 1}</div>
              <div className="step-label">{step}</div>
              {idx < steps.length - 1 && <div className={`step-line ${idx < currentStep ? 'active' : ''}`}></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="builder-content-area">
        {currentStep === 0 && (
          <div className="step-content fade-in">
            <h2 className="step-heading">What skills do you already have?</h2>
            <p className="step-subheading">Select technical or soft skills you've developed through coursework, projects, or experience.</p>
            
            <div className="search-bar">
              <span className="material-symbols-outlined" style={{color: 'var(--text-muted)'}}>search</span>
              <input 
                type="text" 
                placeholder="Search skills..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="selection-count">
              Selected: {selectedSkills.length} skills
            </div>

            <div className="chip-grid mt-md">
              {filteredSkills.map(skill => (
                <SkillChip
                  key={skill.id}
                  label={skill.label}
                  selected={selectedSkills.includes(skill.id)}
                  onClick={() => toggleSkill(skill.id)}
                />
              ))}
              {filteredSkills.length === 0 && <p className="text-muted">No skills found matching "{searchQuery}"</p>}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="step-content fade-in">
            <h2 className="step-heading">What kind of work interests you?</h2>
            <p className="step-subheading">Select topics or activities you enjoy. These help us find careers you'll love.</p>
            
            <div className="selection-count">
              Selected: {selectedInterests.length} interests
            </div>

            <div className="card-grid mt-md">
              {interests.map(interest => (
                <InterestCard
                  key={interest.id}
                  id={interest.id}
                  title={interest.label}
                  description={interest.description || ''}
                  selected={selectedInterests.includes(interest.id)}
                  onClick={() => toggleInterest(interest.id)}
                />
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="step-content fade-in">
            <h2 className="step-heading">What matters most to you in a future career?</h2>
            <p className="step-subheading">Preferences help personalize your recommendations. They act as a secondary ranking factor and do not determine your eligibility.</p>
            
            <div className="selection-count">
              Selected: {selectedPreferences.length} preferences
            </div>

            <div className="card-grid mt-md">
              {preferences.map(pref => (
                <InterestCard
                  key={pref.id}
                  id={pref.id}
                  title={pref.label}
                  description={pref.description || ''}
                  selected={selectedPreferences.includes(pref.id)}
                  onClick={() => togglePreference(pref.id)}
                />
              ))}
            </div>
          </div>
        )}

                {currentStep === 3 && (
          <div className="step-content fade-in">
            <h2 className="step-heading">Describe your dream job in your own words (Optional)</h2>
            <p className="step-subheading">Tell us what you love doing, building, or learning. Our semantic engine will read this to find your perfect match.</p>
            
            <div className="form-group animate-in" style={{ marginTop: '24px' }}>
              <textarea 
                placeholder="E.g., I love building AI apps, working with massive amounts of data, and discovering patterns that help businesses grow."
                value={naturalLanguageInput}
                onChange={(e) => setNaturalLanguageInput(e.target.value)}
                rows={5}
                style={{ 
                  width: '100%', 
                  padding: '16px', 
                  borderRadius: '12px', 
                  border: '1px solid var(--border)', 
                  background: 'var(--bg)', 
                  color: 'var(--text-main)', 
                  fontFamily: 'inherit',
                  fontSize: '16px',
                  resize: 'vertical'
                }}
              />
              <p className="text-muted text-sm mt-sm">This is scored by our hybrid embedding engine alongside your skills.</p>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="step-content fade-in">
            <h2 className="step-heading">Academic Context (Optional)</h2>
            <p className="step-subheading">Academic context helps suggest readiness steps. It will never block you from a career path you are skilled for.</p>
            <AcademicProfileForm 
              onNext={handleNext} 
              onSkip={handleNext} 
            />
          </div>
        )}

        {currentStep === 5 && (
          <div className="step-content fade-in">
            <h2 className="step-heading">How would you like to explore?</h2>
            <p className="step-subheading">Choose how our recommendation engine traverses the knowledge graph.</p>
            
            <div className="mode-selection">
              <button 
                type="button"
                className={`mode-card ${explorationMode === 'BFS' ? 'selected' : ''}`}
                onClick={() => setExplorationMode('BFS')}
                style={{ textAlign: 'left', font: 'inherit', display: 'block', width: '100%' }}
              >
                <h3>🌐 Explore Broadly</h3>
                <p>Show me a variety of career paths that match my profile.</p>
                <span className="mode-badge">Uses BFS Algorithm</span>
              </button>
              
              <button 
                type="button"
                className={`mode-card ${explorationMode === 'DFS' ? 'selected' : ''}`}
                onClick={() => setExplorationMode('DFS')}
                style={{ textAlign: 'left', font: 'inherit', display: 'block', width: '100%' }}
              >
                <h3>🎯 Explore Deeply</h3>
                <p>I want a more focused exploration of closely connected career paths.</p>
                <span className="mode-badge">Uses DFS Algorithm</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="builder-actions-container">
        {validationError && (
          <div role="alert" className="validation-error">
            <span className="material-symbols-outlined">error</span>
            {validationError}
          </div>
        )}
        <div className="builder-actions">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            disabled={currentStep === 0}
          >
            <span className="material-symbols-outlined" style={{fontSize: '18px'}}>arrow_back</span>
            Back
          </Button>
          {currentStep !== 4 && (
            <Button 
              variant="primary" 
              onClick={handleNext}
            >
              {currentStep === steps.length - 1 ? 'Discover My Career Paths' : 'Continue'}
              <span className="material-symbols-outlined" style={{fontSize: '18px'}}>arrow_forward</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

