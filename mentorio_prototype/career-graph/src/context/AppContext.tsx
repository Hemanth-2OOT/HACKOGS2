import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ExtractedProfileData } from '../api/llmExtractor';

export type AcademicTier = 'High' | 'Medium' | 'Developing' | null;
export type ExplorationMode = 'BFS' | 'DFS';
export type Theme = 'light' | 'dark';

export interface AcademicProfile {
  grade10: string;
  grade12: string;
  stream: string;
  degreeStatus: string;
  degree: string;
  specialization?: string;
  year: string;
  semester: string;
}

export interface EngineWeights {
  semantic_similarity: number;
  skills: number;
  interests: number;
  preferences: number;
  academic_context: number;
  exploration_context: number;
}

export const DEFAULT_WEIGHTS: EngineWeights = {
  skills: 0.30,
  interests: 0.15,
  preferences: 0.10,
  academic_context: 0.10,
  semantic_similarity: 0.30,
  exploration_context: 0.05
};

interface ExtractedJD {
  role: string;
  requiredSkills: string[];
  missingSkills?: string[];
  matchedSkills?: string[];
}

interface AppState {
  naturalLanguageInput: string;
  selectedSkills: string[];
  selectedInterests: string[];
  selectedPreferences: string[];
  academicTier: AcademicTier;
  academicProfile: AcademicProfile | null;
  explorationMode: ExplorationMode;
  theme: Theme;
  engineWeights: EngineWeights;
  
  // NEW: LLM & PDF parsing state
  apiKey: string;
  extractedProfile: ExtractedProfileData | null;
  extractedJD: ExtractedJD | null;
}

interface AppContextType extends AppState {
  setNaturalLanguageInput: (text: string) => void;
  toggleSkill: (skillId: string) => void;
  toggleInterest: (interestId: string) => void;
  togglePreference: (preferenceId: string) => void;
  setAcademicTier: (tier: AcademicTier) => void;
  setAcademicProfile: (profile: AcademicProfile | null) => void;
  setExplorationMode: (mode: ExplorationMode) => void;
  setEngineWeights: (weights: EngineWeights) => void;
  toggleTheme: () => void;
  resetProfile: () => void;
  
  setApiKey: (key: string) => void;
  setExtractedProfile: (profile: ExtractedProfileData | null) => void;
  setExtractedJD: (jd: ExtractedJD | null) => void;
}

const defaultState: AppState = {
  naturalLanguageInput: '',
  selectedSkills: [],
  selectedInterests: [],
  selectedPreferences: [],
  academicTier: null,
  academicProfile: null,
  explorationMode: 'BFS',
  theme: 'light',
  engineWeights: DEFAULT_WEIGHTS,
  apiKey: '',
  extractedProfile: null,
  extractedJD: null,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(defaultState);

  // Apply theme to document
  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [state.theme]);

  const toggleSkill = (skillId: string) => {
    setState((prev) => {
      const exists = prev.selectedSkills.includes(skillId);
      return {
        ...prev,
        selectedSkills: exists
          ? prev.selectedSkills.filter((id) => id !== skillId)
          : [...prev.selectedSkills, skillId],
      };
    });
  };

  const toggleInterest = (interestId: string) => {
    setState((prev) => {
      const exists = prev.selectedInterests.includes(interestId);
      return {
        ...prev,
        selectedInterests: exists
          ? prev.selectedInterests.filter((id) => id !== interestId)
          : [...prev.selectedInterests, interestId],
      };
    });
  };

  const setAcademicTier = (tier: AcademicTier) => {
    setState((prev) => ({ ...prev, academicTier: tier }));
  };

  const togglePreference = (id: string) => {
    setState(prev => {
      const exists = prev.selectedPreferences.includes(id);
      return {
        ...prev,
        selectedPreferences: exists
          ? prev.selectedPreferences.filter(pId => pId !== id)
          : [...prev.selectedPreferences, id]
      };
    });
  };

  const setAcademicProfile = (profile: AcademicProfile | null) => {
    setState((prev) => ({ ...prev, academicProfile: profile }));
  };

  const setExplorationMode = (mode: ExplorationMode) => {
    setState((prev) => ({ ...prev, explorationMode: mode }));
  };

  const setEngineWeights = (weights: EngineWeights) => {
    setState((prev) => ({ ...prev, engineWeights: weights }));
  };

  const setNaturalLanguageInput = (text: string) => {
    setState((prev) => ({ ...prev, naturalLanguageInput: text }));
  };

  const toggleTheme = () => {
    setState((prev) => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
  };

  const resetProfile = () => {
    setState(defaultState);
  };

  const setApiKey = (key: string) => {
    setState((prev) => ({ ...prev, apiKey: key }));
  };

  const setExtractedProfile = (profile: ExtractedProfileData | null) => {
    setState((prev) => ({ ...prev, extractedProfile: profile }));
  };

  const setExtractedJD = (jd: ExtractedJD | null) => {
    setState((prev) => ({ ...prev, extractedJD: jd }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleSkill,
        toggleInterest,
        togglePreference,
        setAcademicTier,
        setAcademicProfile,
        setExplorationMode,
        setEngineWeights,
        toggleTheme,
        setNaturalLanguageInput,
        resetProfile,
        setApiKey,
        setExtractedProfile,
        setExtractedJD,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

