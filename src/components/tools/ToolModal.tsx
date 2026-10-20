import React, { useEffect } from 'react';
import { ToolDefinition } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { X, Heart, ExternalLink, Sparkles, Zap, ArrowLeft } from 'lucide-react';

import { ImageToPdfTool } from './implementations/ImageToPdfTool';
import { PdfToWordTool } from './implementations/PdfToWordTool';
import { ExcelSpreadsheetTool } from './implementations/ExcelSpreadsheetTool';
import { VideoDownloaderTool } from './implementations/VideoDownloaderTool';
import { AudioCutterTool } from './implementations/AudioCutterTool';
import { ScreenRecorderTool } from './implementations/ScreenRecorderTool';
import { VoiceRecorderTool } from './implementations/VoiceRecorderTool';
import { ImageCompressorTool } from './implementations/ImageCompressorTool';
import { QrCodeGeneratorTool } from './implementations/QrCodeGeneratorTool';
import { InvoicePdfGeneratorTool } from './implementations/InvoicePdfGeneratorTool';
import { UniversalToolRunner } from './implementations/UniversalToolRunner';

interface ToolModalProps {
  tool: ToolDefinition | null;
  onClose: () => void;
}

export const ToolModal: React.FC<ToolModalProps> = ({ tool, onClose }) => {
  const { user, toggleFavorite, addRecentTool } = useAuth();

  useEffect(() => {
    if (tool) {
      addRecentTool(tool.id);
    }
  }, [tool?.id]);

  if (!tool) return null;

  const isFavorite = user?.favorites.includes(tool.id) || false;

  const renderToolBody = () => {
    switch (tool.id) {
      case 'image-to-pdf':
        return <ImageToPdfTool />;
      case 'pdf-to-word':
        return <PdfToWordTool />;
      case 'excel-spreadsheet':
        return <ExcelSpreadsheetTool />;
      case 'video-downloader':
        return <VideoDownloaderTool />;
      case 'audio-cutter':
        return <AudioCutterTool />;
      case 'screen-recorder':
        return <ScreenRecorderTool />;
      case 'voice-recorder':
        return <VoiceRecorderTool />;
      case 'image-compressor':
        return <ImageCompressorTool />;
      case 'qr-code-generator':
        return <QrCodeGeneratorTool />;
      case 'invoice-pdf-maker':
        return <InvoicePdfGeneratorTool />;
      default:
        return <UniversalToolRunner tool={tool} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-purple-500/30 rounded-3xl shadow-2xl shadow-purple-950/80 overflow-hidden my-auto">
        
        {/* Colorful Header Top Banner */}
        <div className={`p-5 sm:p-6 bg-gradient-to-r ${tool.color} relative overflow-hidden text-white`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-black/20 hover:bg-black/35 backdrop-blur-md text-white transition-colors cursor-pointer sm:hidden"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-md">
                    {tool.category.toUpperCase()} TOOL
                  </span>
                  {tool.badge && (
                    <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-black mt-1 leading-snug">
                  {tool.name}
                </h2>

                {tool.hindiName && (
                  <p className="text-xs font-semibold text-white/90">
                    {tool.hindiName}
                  </p>
                )}
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(tool.id)}
                className={`p-2.5 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                  isFavorite ? 'bg-rose-500 text-white' : 'bg-black/20 hover:bg-black/35 text-white'
                }`}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-black/20 hover:bg-black/40 backdrop-blur-md text-white transition-colors cursor-pointer"
                title="बंद करें (Close)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Tool Work Area */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 custom-scrollbar space-y-6">
          {renderToolBody()}
        </div>

        {/* Modal Footer Info */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-white/5 flex items-center justify-between text-[11px] text-purple-300/70">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>100% क्लाइंट साइड निष्पादन • सुरक्षित और गोपनीय</span>
          </span>
          <span className="text-purple-400 font-semibold hidden sm:inline">
            MegaTools 50+ Pro Suite
          </span>
        </div>

      </div>
    </div>
  );
};
