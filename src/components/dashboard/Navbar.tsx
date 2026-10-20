import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Zap, 
  Search, 
  Heart, 
  LogOut, 
  User as UserIcon, 
  Sparkles,
  Settings,
  X
} from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: (val: boolean) => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  showOnlyFavorites,
  setShowOnlyFavorites,
  onOpenProfile,
}) => {
  const { user, logout } = useAuth();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-purple-900/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-400 p-[2px] shadow-md shadow-pink-500/20">
            <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                MegaTools 50+
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950">
                PRO ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-purple-200/60 leading-none mt-0.5">
              50+ ऑल-इन-वन सुपर टूल्स
            </p>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="50 टूल्स में सर्च करें... (उदा: PDF, Image, Excel, Video, QR)"
            className="w-full pl-10 pr-9 py-2 bg-slate-950/70 border border-purple-500/30 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Mobile search toggle */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-800 text-purple-300 hover:text-white"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Favorites Filter Button */}
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              showOnlyFavorites
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md shadow-pink-500/30'
                : 'bg-slate-800/80 hover:bg-slate-800 text-purple-200 border border-white/5'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-white' : 'text-pink-400'}`} />
            <span className="hidden sm:inline">Favorites</span>
            {user?.favorites && user.favorites.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/60 font-bold">
                {user.favorites.length}
              </span>
            )}
          </button>

          {/* User Profile Pill */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-purple-500/20 text-xs font-semibold text-white transition-all cursor-pointer group"
          >
            <span className="text-base group-hover:scale-110 transition-transform">
              {user?.avatar || '👨‍💻'}
            </span>
            <div className="text-left hidden lg:block">
              <p className="leading-tight truncate max-w-[100px] text-purple-100 font-bold">
                {user?.name || 'User'}
              </p>
              <p className="text-[10px] leading-tight text-amber-400 font-semibold">
                ★ {user?.plan || 'PRO'}
              </p>
            </div>
          </button>

          {/* Logout Button */}
          <button
            onClick={logout}
            title="लॉगआउट (Logout)"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/60 hover:text-rose-400 border border-white/5 text-slate-300 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile Search Dropdown */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-4 py-3 bg-slate-950 border-t border-purple-900/30">
          <div className="relative">
            <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="सर्च करें (PDF, Excel, Video, Image, QR)..."
              className="w-full pl-9 pr-8 py-2 bg-slate-900 border border-purple-500/30 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
