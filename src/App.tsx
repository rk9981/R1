import React, { useState, useMemo } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthPage } from './components/auth/AuthPage';
import { Navbar } from './components/dashboard/Navbar';
import { HeroBanner } from './components/dashboard/HeroBanner';
import { CategoryFilter } from './components/dashboard/CategoryFilter';
import { ToolCard } from './components/dashboard/ToolCard';
import { ToolModal } from './components/tools/ToolModal';
import { ProfileModal } from './components/auth/ProfileModal';
import { Footer } from './components/dashboard/Footer';
import { TOOLS_DATA } from './data/toolsData';
import { ToolDefinition } from './types';
import { Search, Sparkles, Heart, Clock, Zap } from 'lucide-react';

const DashboardContent: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [activeTool, setActiveTool] = useState<ToolDefinition | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: TOOLS_DATA.length };
    TOOLS_DATA.forEach((tool) => {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter tools
  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      // Favorites filter
      if (showOnlyFavorites) {
        if (!user?.favorites.includes(tool.id)) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesHindi = tool.hindiName?.toLowerCase().includes(q) || false;
        const matchesDesc = tool.description.toLowerCase().includes(q);
        const matchesTags = tool.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesHindi && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, showOnlyFavorites, user?.favorites]);

  const handleOpenToolById = (id: string) => {
    const found = TOOLS_DATA.find((t) => t.id === id);
    if (found) {
      setActiveTool(found);
    }
  };

  // Recently used tools definitions
  const recentToolItems = useMemo(() => {
    if (!user?.recentTools || user.recentTools.length === 0) return [];
    return user.recentTools
      .map((id) => TOOLS_DATA.find((t) => t.id === id))
      .filter(Boolean) as ToolDefinition[];
  }, [user?.recentTools]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-pink-500 selection:text-white">
      {/* Dynamic Ambient Background Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-10 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Navigation Bar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showOnlyFavorites={showOnlyFavorites}
        setShowOnlyFavorites={setShowOnlyFavorites}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Hero Banner */}
        <HeroBanner
          onSelectTool={handleOpenToolById}
          activeCount={TOOLS_DATA.length}
        />

        {/* Recently Used Bar */}
        {recentToolItems.length > 0 && !showOnlyFavorites && !searchQuery && (
          <div className="mb-6 bg-slate-900/60 border border-purple-500/20 p-3.5 rounded-2xl flex items-center gap-3 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 shrink-0">
              <Clock className="w-3.5 h-3.5" />
              <span>हाल ही में उपयोग किए गए:</span>
            </div>
            <div className="flex items-center gap-2">
              {recentToolItems.slice(0, 6).map((r) => (
                <button
                  key={r.id}
                  onClick={() => setActiveTool(r)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-purple-950/60 border border-purple-500/30 text-xs font-semibold text-purple-200 hover:text-white shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>{r.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setShowOnlyFavorites(false);
            }}
            categoryCounts={categoryCounts}
          />

          {showOnlyFavorites && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold mb-4 sm:mb-0">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>पसंदीदा टूल्स ({filteredTools.length})</span>
            </div>
          )}
        </div>

        {/* Tools Grid Section */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-3xl bg-slate-900/60 border border-purple-500/20">
            <div className="w-16 h-16 rounded-3xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">कोई टूल नहीं मिला (No Tools Found)</h3>
            <p className="text-xs text-purple-300/70 mt-1 max-w-sm mx-auto">
              "{searchQuery}" के लिए कोई टूल नहीं मिला। कृपया दूसरा शब्द खोजें या फ़िल्टर साफ़ करें।
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setShowOnlyFavorites(false);
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer shadow-md"
            >
              सभी 50 टूल्स देखें (Show All 50 Tools)
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-xs text-purple-300/70 mb-4 px-1">
              <span>
                दिखाए जा रहे हैं: <strong className="text-white">{filteredTools.length}</strong> टूल्स
              </span>
              <span className="text-[11px] text-purple-400/60">
                1-क्लिक लॉन्च • क्लाइंट साइड
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onOpen={(t) => setActiveTool(t)}
                />
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Master Tool Modal */}
      <ToolModal
        tool={activeTool}
        onClose={() => setActiveTool(null)}
      />

      {/* User Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

const MainApp: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <DashboardContent /> : <AuthPage />;
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
