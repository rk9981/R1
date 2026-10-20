import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  User as UserIcon, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Table, 
  ShieldCheck, 
  Flame,
  Zap,
  Globe,
  Sliders,
  Play
} from 'lucide-react';

const AVATARS = ['👨‍💻', '🚀', '⚡', '💎', '🎨', '👑', '🌟', '🦊', '🔥', '🪄'];

export const AuthPage: React.FC = () => {
  const { login, register, demoLogin } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('pandeyramesh69223@gmail.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('👨‍💻');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    setTimeout(() => {
      if (mode === 'login') {
        const res = login(email, password);
        if (res.success) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } else {
          setErrorMessage(res.message);
        }
      } else {
        const res = register(name, email, password, selectedAvatar);
        if (res.success) {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
          });
        } else {
          setErrorMessage(res.message);
        }
      }
      setIsLoading(false);
    }, 400);
  };

  const handleDemoLogin = (emailPreset?: string, namePreset?: string) => {
    setIsLoading(true);
    setTimeout(() => {
      demoLogin(emailPreset, namePreset);
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white relative overflow-hidden flex flex-col justify-between selection:bg-pink-500 selection:text-white">
      {/* Colorful Animated Ambient Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-pink-600/30 to-purple-600/30 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] bg-gradient-to-bl from-cyan-600/25 to-blue-600/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Colorful Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 p-[2px] shadow-lg shadow-purple-500/30">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-cyan-400 fill-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                MegaTools 50+
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950">
                PRO SUITE
              </span>
            </div>
            <p className="text-xs text-purple-200/70">50 All-in-One Utility Plugins</p>
          </div>
        </div>

        {/* Quick Demo Access Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleDemoLogin('pandeyramesh69223@gmail.com', 'Ramesh Pandey')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Instant Demo (Ramesh)</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 py-4 flex-1 flex flex-col lg:flex-row items-center justify-center gap-10">
        
        {/* Left Side: Product Showcase & 50 Tools Highlights */}
        <div className="lg:w-1/2 text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>प्रीमियम 50+ टूल्स का ऑल-इन-वन हब | Unlock After Login</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            50+ शक्तिशाली टूल्स, <br />
            <span className="bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
              सिर्फ 1 क्लिक की दूरी पर!
            </span>
          </h1>

          <p className="text-purple-200/80 text-base sm:text-lg max-w-xl leading-relaxed">
            Image to PDF, PDF to Word, Excel Sheet Editor, Video Downloader, Audio Cutter, Screen Recorder, QR Code Studio और बहुत कुछ। एक ही रंगीन और सुपर-फास्ट प्लेटफॉर्म पर।
          </p>

          {/* Quick Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {[
              { icon: FileText, label: 'Image ⇄ PDF & Word', color: 'text-rose-400 border-rose-500/30 bg-rose-950/40' },
              { icon: Video, label: 'Video & Media Grab', color: 'text-purple-400 border-purple-500/30 bg-purple-950/40' },
              { icon: Table, label: 'Excel & Data Sheets', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40' },
              { icon: ImageIcon, label: 'Photo Compress & Edit', color: 'text-amber-400 border-amber-500/30 bg-amber-950/40' },
              { icon: ShieldCheck, label: 'QR, Security & Web', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40' },
              { icon: Zap, label: '100% Free & Fast', color: 'text-pink-400 border-pink-500/30 bg-pink-950/40' },
            ].map((f, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-2.5 p-3 rounded-xl border backdrop-blur-md ${f.color} transition-transform hover:-translate-y-0.5`}
              >
                <f.icon className="w-4 h-4 shrink-0" />
                <span className="text-xs font-semibold text-slate-100">{f.label}</span>
              </div>
            ))}
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-purple-300/80 pt-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>बिना किसी शुल्क (100% Free)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>हाई-क्वालिटी एक्सपोर्ट्स (HQ)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-pink-400" />
              <span>ब्राउज़र में सुरक्षित (Client-Side Safe)</span>
            </div>
          </div>
        </div>

        {/* Right Side: The Login / Register Box */}
        <div className="lg:w-[480px] w-full">
          <div className="relative p-1 rounded-3xl bg-gradient-to-b from-pink-500/40 via-purple-500/30 to-cyan-500/40 shadow-2xl shadow-purple-900/50 backdrop-blur-2xl">
            <div className="bg-slate-900/95 border border-white/10 rounded-[22px] p-6 sm:p-8 backdrop-blur-3xl">
              
              {/* Tabs Switcher */}
              <div className="flex items-center bg-slate-950/80 p-1 rounded-xl mb-6 border border-white/5">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    mode === 'login'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  लॉगिन (Login)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    mode === 'register'
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  नया खाता (Register)
                </button>
              </div>

              {/* Title inside card */}
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  {mode === 'login' ? 'अपने खाते में लॉगिन करें' : 'नया खाता रजिस्टर करें'}
                </h2>
                <p className="text-xs text-purple-200/70 mt-1">
                  {mode === 'login'
                    ? 'सभी 50 टूल्स का तुरंत उपयोग शुरू करने के लिए लॉगिन करें'
                    : 'सिर्फ 10 सेकंड में अपना फ्री अकाउंट बनाएं और 50 टूल्स पाएं'}
                </p>
              </div>

              {/* Error & Success Alerts */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2 animate-shake">
                  <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
              {successMessage && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* The Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                      पूरा नाम (Full Name)
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="उदा: रमेश पाण्डेय"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-purple-500/30 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                    ईमेल पता (Email Address)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-purple-500/30 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                    पासवर्ड (Password)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-purple-500/30 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                </div>

                {/* Avatar Picker in Register Mode */}
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                      अपना अवतार चुनें (Choose Avatar)
                    </label>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {AVATARS.map((av) => (
                        <button
                          key={av}
                          type="button"
                          onClick={() => setSelectedAvatar(av)}
                          className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all cursor-pointer ${
                            selectedAvatar === av
                              ? 'bg-gradient-to-r from-pink-500 to-purple-600 scale-110 shadow-lg shadow-pink-500/40 ring-2 ring-white'
                              : 'bg-slate-950/60 hover:bg-slate-800 border border-white/10'
                          }`}
                        >
                          {av}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:via-purple-500 hover:to-indigo-500 active:scale-[0.98] transition-all text-white shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{mode === 'login' ? 'लॉगिन करें और 50 टूल्स खोलें' : 'खाता बनाएं और प्रवेश करें'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Fast 1-Click Access Options */}
              <div className="mt-5 pt-5 border-t border-white/10 text-center">
                <p className="text-[11px] uppercase tracking-wider text-purple-300/60 font-semibold mb-3">
                  या 1-क्लिक फास्ट लॉगिन करें (Quick Access)
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('pandeyramesh69223@gmail.com', 'Ramesh Pandey')}
                    className="p-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 text-xs font-semibold text-purple-200 flex items-center justify-center gap-2 transition-all hover:border-pink-500/50 cursor-pointer"
                  >
                    <span>👨‍💻</span>
                    <span className="truncate">रमेश पाण्डेय (Admin)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('demo@megatools.com', 'Guest Pro')}
                    className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/60 border border-white/10 text-xs font-semibold text-cyan-200 flex items-center justify-center gap-2 transition-all hover:border-cyan-500/50 cursor-pointer"
                  >
                    <span>🚀</span>
                    <span className="truncate">Demo Guest User</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </main>

      {/* Bottom Footer on Auth Page */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-4 text-center text-xs text-purple-300/60">
        <p>© 2026 MegaTools 50+ Suite. ऑल-इन-वन टूल्स (Image to PDF, PDF to Word, Excel, Video Downloader, QR & more).</p>
      </footer>
    </div>
  );
};
