import React from 'react';
import { Zap, Heart, Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-purple-900/40 bg-slate-950/80 backdrop-blur-xl text-purple-200/70 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-400 p-[2px]">
            <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
            </div>
          </div>
          <div>
            <p className="font-extrabold text-white text-base">MegaTools 50+ Suite</p>
            <p className="text-xs text-purple-300/60">
              संपूर्ण 50 ऑनलाइन टूल्स (Image to PDF, PDF to Word, Excel, Video Downloader, Screen Recorder)
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-purple-500/20 text-purple-300">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>सुरक्षित एवं प्राइवेट</span>
          </span>

          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-purple-500/20 text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>50 टूल्स सक्रिय</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-center md:text-right text-purple-400/60">
          © 2026 MegaTools Suite. Built with React & Tailwind CSS.
        </p>

      </div>
    </footer>
  );
};
