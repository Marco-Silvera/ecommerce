import './App.css';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import { supabase } from './supabase/client';
import { PerfumeContextProvider } from './context/PerfumeContext';
import { ExclusiveContextProvider } from './context/ExclusiveContext';
import { DecantContextProvider } from './context/DecantContext';
import { MiniatureContextProvider } from './context/MiniatureContext';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Exclusives from './pages/Exclusives';
import Decants from './pages/Decants';
import Miniatures from './pages/Miniatures';
import PerfumeDetailPage from './pages/PerfumeDetailPage';
import ExclusiveDetailPage from './pages/ExclusiveDetailPage';
import MiniatureDetailPage from './pages/MiniatureDetailPage';
import DecantDetailPage from './pages/DecantDetailPage';
import Envios from './pages/Envios';
import Testers from './pages/Testers';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && window.location.pathname === '/dashboard') {
        navigate('/login');
      }
    };

    checkSession();

  }, [navigate]);

  return (
    <div className='App font-Poppins'>
      <PerfumeContextProvider>
        <ExclusiveContextProvider>
          <DecantContextProvider>
            <MiniatureContextProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:path" element={<PerfumeDetailPage />} />
                <Route path="/testers" element={<Testers />} />
                <Route path="/tester/:path" element={<PerfumeDetailPage />} />
                <Route path="/exclusivos/:path" element={<ExclusiveDetailPage />} />
                <Route path="/exclusivos" element={<Exclusives />} />
                <Route path="/miniaturas/:path" element={<MiniatureDetailPage />} />
                <Route path="/decants" element={<Decants />} />
                <Route path="/decants/:path" element={<DecantDetailPage />} />
                <Route path="/miniaturas" element={<Miniatures />} />
                <Route path='/envios' element={<Envios />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MiniatureContextProvider>
          </DecantContextProvider>
        </ExclusiveContextProvider>
      </PerfumeContextProvider>
    </div>
  );
}

export default App;
