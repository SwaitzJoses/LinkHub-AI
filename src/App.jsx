import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import EmmaOnboarding from "./features/emma/EmmaOnboarding";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile";
import AIPoster from "./pages/AIPoster";
import PosterGenerator from "./pages/PosterGenerator";
import MyPosters from "./pages/MyPosters";
import EmmaAI from "./pages/EmmaAI";

import EmmaGmailConnect
from "./emma-core/connectors/EmmaGmailConnect";
import EmmaCard from "./components/emma/EmmaCard";



function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return session ? children : <Navigate to="/login" />;
}

function App() {
    
  return (
<>
    <EmmaGmailConnect />
    <BrowserRouter>
     <EmmaCard />
<Routes>

  <Route path="/" element={<Navigate to="/dashboard" />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

    <Route
    path="/emma-onboarding"
    element={<EmmaOnboarding />}
/>

  <Route
    path="/:username"
    element={<PublicProfile />}
  />
<Route
  path="/ai-poster"
  element={<AIPoster />}
/>


<Route path="/poster-generator" element={<PosterGenerator />} />

<Route
  path="/my-posters"
  element={<MyPosters />}
/>

<Route path="/emma-ai" element={<EmmaAI />} />


</Routes>


    </BrowserRouter>

    </>
  );
}

export default App;