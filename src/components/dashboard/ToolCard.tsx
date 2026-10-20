import React from 'react';
import { ToolDefinition } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { 
  Heart, 
  ArrowUpRight,
  FileText,
  FileImage,
  FileSignature,
  Files,
  Stamp,
  Receipt,
  Award,
  Search,
  Code,
  Briefcase,
  Minimize2,
  Scaling,
  Sliders,
  RefreshCw,
  Palette,
  Smile,
  Binary,
  Crop,
  Square,
  FileCode,
  DownloadCloud,
  MonitorPlay,
  Mic,
  Scissors,
  Volume2,
  Music,
  Subtitles,
  Table,
  ArrowLeftRight,
  Braces,
  FileCode2,
  Database,
  Scale,
  Key,
  Link,
  QrCode,
  ScanLine,
  Shield,
  ShieldAlert,
  Fingerprint,
  Cpu,
  Sparkles,
  Globe,
  Type,
  AlignLeft,
  GitCompare,
  UserCheck,
  Calendar,
  DollarSign,
  PieChart
} from 'lucide-react';

interface ToolCardProps {
  tool: ToolDefinition;
  onOpen: (tool: ToolDefinition) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  FileText,
  FileImage,
  FileSignature,
  Files,
  Stamp,
  Receipt,
  Award,
  Search,
  Code,
  Briefcase,
  Minimize2,
  Scaling,
  Sliders,
  RefreshCw,
  Palette,
  Smile,
  Binary,
  Crop,
  Square,
  FileCode,
  DownloadCloud,
  MonitorPlay,
  Mic,
  Scissors,
  Volume2,
  Music,
  Subtitles,
  Table,
  ArrowLeftRight,
  Braces,
  FileCode2,
  Database,
  Scale,
  Key,
  Link,
  QrCode,
  ScanLine,
  Shield,
  ShieldAlert,
  Fingerprint,
  Cpu,
  Sparkles,
  Globe,
  Type,
  AlignLeft,
  GitCompare,
  UserCheck,
  Calendar,
  DollarSign,
  PieChart
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onOpen }) => {
  const { user, toggleFavorite } = useAuth();
  const isFavorite = user?.favorites.includes(tool.id) || false;
  const IconComponent = ICON_MAP[tool.iconName] || Sparkles;

  const badgeColorMap: Record<string, string> = {
    HOT: 'bg-rose-500 text-white shadow-rose-500/40',
    POPULAR: 'bg-amber-400 text-slate-950 shadow-amber-400/40',
    NEW: 'bg-emerald-500 text-white shadow-emerald-500/40',
    FAST: 'bg-cyan-400 text-slate-950 shadow-cyan-400/40',
    PRO: 'bg-purple-500 text-white shadow-purple-500/40'
  };

  return (
    <div className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-purple-500/30 via-slate-800/60 to-purple-900/30 hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-900/40 flex flex-col justify-between">
      <div className="h-full bg-slate-900/95 hover:bg-slate-900/90 rounded-[15px] p-5 flex flex-col justify-between transition-colors">
        
        {/* Top: Icon + Badge + Favorite */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-3.5">
            {/* Colorful Icon Container */}
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${tool.color} p-[1.5px] shadow-md group-hover:scale-105 transition-transform duration-300`}>
              <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {tool.badge && (
                <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm ${badgeColorMap[tool.badge] || 'bg-purple-500 text-white'}`}>
                  {tool.badge}
                </span>
              )}
              {/* Favorite Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(tool.id);
                }}
                className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                  isFavorite 
                    ? 'bg-rose-500/20 text-rose-400' 
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={isFavorite ? 'पसंदीदा से हटाएं' : 'पसंदीदा में जोड़ें'}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Titles */}
          <h3 className="font-bold text-base text-white group-hover:text-pink-300 transition-colors leading-snug">
            {tool.name}
          </h3>

          {tool.hindiName && (
            <p className="text-xs font-medium text-amber-300/80 mt-0.5">
              {tool.hindiName}
            </p>
          )}

          {/* Description */}
          <p className="text-xs text-purple-200/70 mt-2 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300/60">
            {tool.category.toUpperCase()} TOOL
          </span>

          <button
            onClick={() => onOpen(tool)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${tool.color} group-hover:brightness-110 active:scale-95 transition-all shadow-md shadow-purple-900/30 cursor-pointer`}
          >
            <span>ओपन करें</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
