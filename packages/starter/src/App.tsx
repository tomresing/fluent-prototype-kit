import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { PageLayout } from './components/PageLayout';
import { HomePage } from './pages/HomePage';
import { SessionDemoPage } from './pages/SessionDemoPage';
import { FormPage } from './pages/FormPage';
import { FormStep2Page } from './pages/FormStep2Page';
import { FormStep3Page } from './pages/FormStep3Page';
import { ConfirmationPage } from './pages/ConfirmationPage';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/session-demo" element={<SessionDemoPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/form/step-2" element={<FormStep2Page />} />
          <Route path="/form/step-3" element={<FormStep3Page />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
