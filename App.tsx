
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AdminPanel from './components/AdminPanel';
import { LandingPageContent } from './types';
import { INITIAL_CONTENT } from './constants';
import { Lock, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [content, setContent] = useState<LandingPageContent>(() => {
    const saved = localStorage.getItem('heppimobi_content');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  // Hidden URL access detection (?admin=true)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdminMode(true);
      // Clean up URL without refreshing to keep it "secret"
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  // Visit Tracking
  useEffect(() => {
    if (isAdminMode) return; // Don't track admin visits

    const today = new Date().toISOString().split('T')[0];
    const isNewVisit = !sessionStorage.getItem('heppimobi_visited');
    
    setContent(prev => {
      const newDailyStats = { ...prev.analytics.dailyStats };
      newDailyStats[today] = (newDailyStats[today] || 0) + 1;
      
      return {
        ...prev,
        analytics: {
          ...prev.analytics,
          totalVisits: prev.analytics.totalVisits + 1,
          uniqueVisits: isNewVisit ? prev.analytics.uniqueVisits + 1 : prev.analytics.uniqueVisits,
          dailyStats: newDailyStats
        }
      };
    });

    sessionStorage.setItem('heppimobi_visited', 'true');
  }, [isAdminMode]);

  // Persistent storage
  useEffect(() => {
    localStorage.setItem('heppimobi_content', JSON.stringify(content));
    
    // Update Favicon dynamically
    if (content.branding.faviconUrl) {
      const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (link) {
        link.href = content.branding.faviconUrl;
      } else {
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        newLink.href = content.branding.faviconUrl;
        document.head.appendChild(newLink);
      }
    }
  }, [content]);

  const handleUpdateContent = (newContent: LandingPageContent) => {
    setContent(newContent);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === content.adminConfig.password) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Password salah!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdminMode(false);
    setPasswordInput('');
  };

  const handleExitAdmin = () => {
    setIsAdminMode(false);
  };

  if (isAdminMode && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-[2rem] shadow-2xl w-full max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-600">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-center mb-2">Admin Login</h2>
          <p className="text-slate-500 text-center mb-8 text-sm">Masukkan password untuk mengelola Heppimobi</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password"
                placeholder="Password"
                className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-100 focus:border-red-600 outline-none transition-all text-center"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
              />
              {error && <p className="text-red-600 text-xs mt-2 text-center font-bold">{error}</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg"
            >
              Unlock Dashboard
            </button>
            <button 
              type="button"
              onClick={() => setIsAdminMode(false)}
              className="w-full text-slate-400 text-sm font-bold mt-2"
            >
              Kembali ke Landing Page
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {(content.adminConfig.showAdminButton || isAuthenticated) && (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2">
          {isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className="bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl hover:bg-red-600 transition-all flex items-center gap-2"
              >
                {isAdminMode ? 'View Landing Page' : 'Go to Admin CMS'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-bold shadow-2xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout Admin
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAdminMode(true)}
              className="w-12 h-12 bg-slate-900/10 hover:bg-slate-900 text-slate-400 hover:text-white rounded-full shadow-sm hover:shadow-xl transition-all flex items-center justify-center backdrop-blur"
              title="Admin Login"
            >
              <Lock className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {isAdminMode && isAuthenticated ? (
        <AdminPanel content={content} onUpdate={handleUpdateContent} onExit={handleExitAdmin} />
      ) : (
        <LandingPage content={content} />
      )}
    </div>
  );
};

export default App;
