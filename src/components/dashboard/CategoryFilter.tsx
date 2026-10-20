import React from 'react';
import { TOOLS_CATEGORIES } from '../../data/toolsData';
import { 
  Sparkles, 
  FileText, 
  Image, 
  Video, 
  Table, 
  ShieldCheck, 
  Type 
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categoryCounts: Record<string, number>;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  FileText,
  Image,
  Video,
  Table,
  ShieldCheck,
  Type
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar mb-6">
      {TOOLS_CATEGORIES.map((cat) => {
        const IconComponent = ICON_MAP[cat.icon] || Sparkles;
        const isSelected = selectedCategory === cat.id;
        const count = categoryCounts[cat.id] ?? cat.count;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
              isSelected
                ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 scale-105 ring-2 ring-white/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-purple-200 border border-purple-500/20 hover:border-purple-500/40'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-purple-400'}`} />
            <span>{cat.label}</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                isSelected
                  ? 'bg-slate-950/60 text-amber-300'
                  : 'bg-purple-950/60 text-purple-300 border border-purple-500/20'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
