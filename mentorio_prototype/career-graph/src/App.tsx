
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { ProfileBuilder } from './pages/ProfileBuilder';
import { Recommendations } from './pages/Recommendations';
import { CareerGraphView } from './pages/CareerGraphView';
import { CareerDetailsView } from './pages/CareerDetailsView';
import { GraphAudit } from './pages/GraphAudit';
import { UploadAnalyzer } from './pages/UploadAnalyzer';
import { ProfileReview } from './pages/ProfileReview';
import { GapAnalysisDashboard } from './pages/GapAnalysisDashboard';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/profile" element={<ProfileBuilder />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/graph" element={<CareerGraphView />} />
            <Route path="/career/:id" element={<CareerDetailsView />} />
            <Route path="/audit" element={<GraphAudit />} />
            <Route path="/upload" element={<UploadAnalyzer />} />
            <Route path="/review-profile" element={<ProfileReview />} />
            <Route path="/gap-analysis" element={<GapAnalysisDashboard />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
