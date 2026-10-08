import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoginPage } from './pages/LoginPage';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateCourtroomPage } from './pages/CreateCourtroomPage';
import { JoinCourtroomPage } from './pages/JoinCourtroomPage';
import { CourtroomPage } from './pages/CourtroomPage';
import { CaseLibraryPage } from './pages/CaseLibraryPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';

const AppLayout: React.FC = () => {
  const { isAuthenticated } = useUser();
  const location = useLocation();
  const isCourtroomView = location.pathname.startsWith('/courtroom');

  // Gated behind JWT Authentication:
  // If not authenticated, render only the clean glassmorphic Login Page.
  // No navigation bar, no footer, no features accessible until authenticated.
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#EDF2F4] text-[#2B2D42] font-['Poppins']">
      {!isCourtroomView && <Navbar />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create" element={<CreateCourtroomPage />} />
          <Route path="/join" element={<JoinCourtroomPage />} />
          <Route path="/courtroom/:roomCode" element={<CourtroomPage />} />
          <Route path="/courtroom" element={<CourtroomPage />} />
          <Route path="/cases" element={<CaseLibraryPage />} />
          <Route path="/profile" element={<ProfileSettingsPage />} />
        </Routes>
      </div>
      {!isCourtroomView && <Footer />}
    </div>
  );
};

export function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

