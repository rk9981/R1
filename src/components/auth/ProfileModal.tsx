import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, X, Check, Award, Heart, Clock, LogOut } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVATARS = ['👨‍💻', '🚀', '⚡', '💎', '🎨', '👑', '🌟', '🦊', '🔥', '🪄'];

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile, logout, registeredUsersCount } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '👨‍💻');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen || !user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, avatar });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-purple-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-purple-900/50">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg shadow-pink-500/30">
            {avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">{user.name}</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950">
                {user.plan}
              </span>
            </div>
            <p className="text-xs text-purple-200/70">{user.email}</p>
            <p className="text-[11px] text-purple-300/50 mt-0.5">
              सदस्यता प्रारंभ: {user.joinedAt}
            </p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-purple-500/20 text-center">
            <div className="flex items-center justify-center gap-1.5 text-rose-400 text-xs font-bold mb-1">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>Saved Favorites</span>
            </div>
            <p className="text-xl font-black text-white">{user.favorites.length}</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-purple-500/20 text-center">
            <div className="flex items-center justify-center gap-1.5 text-cyan-400 text-xs font-bold mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Recent Tools</span>
            </div>
            <p className="text-xl font-black text-white">{user.recentTools.length}</p>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1.5">
              नाम बदलें (Display Name)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-purple-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1.5">
              अवतार चुनें (Change Avatar)
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {AVATARS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => setAvatar(av)}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all cursor-pointer ${
                    avatar === av
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 scale-110 shadow-md ring-2 ring-white'
                      : 'bg-slate-950 hover:bg-slate-800 border border-white/10'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>प्रोफाइल अपडेट हो गई! (Saved)</span>
              </>
            ) : (
              <span>अपडेट सेव करें (Save Changes)</span>
            )}
          </button>
        </form>

        {/* Logout action */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] text-purple-300/60">
            Registered Users: {registeredUsersCount}
          </span>
          <button
            onClick={() => {
              onClose();
              logout();
            }}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>लॉगआउट करें (Logout)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
