import React from 'react';
import { Sparkles, FileText, Video, Table, Image, Shield, Zap, Check } from 'lucide-react';

interface HeroBannerProps {
  onSelectTool: (toolId: string) => void;
  activeCount: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectTool, activeCount }) => {
  const quickHighlights = [
    { id: 'image-to-pdf', name: 'Image to PDF', color: 'from-rose-500 to-red-600', icon: '📄' },
    { id: 'pdf-to-word', name: 'PDF to Word', color: 'from-blue-600 to-indigo-600', icon: '📝' },
    { id: 'excel-spreadsheet', name: 'Excel Sheet Editor', color: 'from-emerald-600 to-teal-600', icon: '📊' },
    { id: 'video-downloader', name: 'Video Downloader', color: 'from-red-600 to-pink-600', icon: '🎬' },
    { id: 'audio-cutter', name: 'Audio & MP3 Cutter', color: 'from-pink-500 to-rose-600', icon: '🎵' },
    { id: 'qr-code-generator', name: 'Color QR Studio', color: 'from-purple-600 to-pink-500', icon: '⚡' },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/20 p-6 sm:p-8 mb-8 shadow-2xl">
      {/* Glow balls */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-pink-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>ऑल-इन-वन 50+ टूल्स का सक्रिय डैशबोर्ड | Full Access Unlocked</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
            आपके दैनिक कार्यों के लिए{' '}
            <span className="bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-300 bg-clip-text text-transparent">
              50 संपूर्ण ऑनलाइन टूल्स
            </span>
          </h1>

          <p className="text-sm text-purple-200/80 leading-relaxed">
            इमेज से पीडीएफ, पीडीएफ से वर्ड, एक्सेल स्प्रेडशीट, वीडियो डाउनलोडर, ऑडियो कटर, स्क्रीन रिकॉर्डर एवं अन्य सभी टूल्स बिना किसी सॉफ्टवेयर डाउनलोड के तुरंत इस्तेमाल करें।
          </p>

          {/* Quick Click Badges */}
          <div className="pt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-purple-300/60 mb-2">
              🔥 लोकप्रिय टूल्स तुरंत खोलें:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickHighlights.map((q) => (
                <button
                  key={q.id}
                  onClick={() => onSelectTool(q.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${q.color} hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-1.5 cursor-pointer`}
                >
                  <span>{q.icon}</span>
                  <span>{q.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats card */}
        <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/30 text-center">
            <p className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              50
            </p>
            <p className="text-xs font-bold text-purple-200 mt-1">सक्रिय टूल्स</p>
            <p className="text-[10px] text-purple-300/60">100% Free</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/30 text-center">
            <p className="text-3xl font-black bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              HQ
            </p>
            <p className="text-xs font-bold text-purple-200 mt-1">क्लाइंट साइड</p>
            <p className="text-[10px] text-purple-300/60">Fast & Secure</p>
          </div>

          <div className="col-span-2 p-3 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300 font-semibold px-4">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>अनलिमिटेड उपयोग (No Limits)</span>
            </span>
            <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full text-emerald-300">
              PRO ACCESS
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
