import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import IncidentManagement from "./pages/Incident";
import LiveCrimeDetection from "./pages/LiveCrimeDetection";
import ReportingAndAnalytics from "./pages/Report";
import Settings from "./pages/Settings";
import LandingPage from "./pages/LandingPage";
import AppProvider from "./AppContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Player from "./pages/Player";

function App() {
  return (
    <AppProvider>
      <div className="relative">
        <Navbar />
        <div className="translate-y-20">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="player" element={<Player />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="incident" element={<IncidentManagement />} />
              <Route path="live" element={<LiveCrimeDetection />} />
              <Route path="report" element={<ReportingAndAnalytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
