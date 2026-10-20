import React, { useState } from 'react';
import { Minimize2, Upload, Download, ArrowRight, RefreshCw, Check } from 'lucide-react';

export const ImageCompressorTool: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(75);
  const [imageName, setImageName] = useState<string>('photo.jpg');
  const [isCompressing, setIsCompressing] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageName(file.name);
    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setOriginalImage(dataUrl);
      compress(dataUrl, quality);
    };
    reader.readAsDataURL(file);
  };

  const loadSample = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 1200, 800);
      gradient.addColorStop(0, '#f43f5e');
      gradient.addColorStop(0.5, '#a855f7');
      gradient.addColorStop(1, '#06b6d4');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1200, 800);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 50px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('MegaTools 50+ High-Res Asset', 600, 400);
    }
    const sampleUrl = canvas.toDataURL('image/jpeg', 0.98);
    setOriginalImage(sampleUrl);
    setOriginalSize(480000);
    setImageName('Sample_Design_HQ.jpg');
    compress(sampleUrl, quality);
  };

  const compress = (src: string, q: number) => {
    setIsCompressing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const compressedUrl = canvas.toDataURL('image/jpeg', q / 100);
        setCompressedImage(compressedUrl);

        // Approximate byte size
        const head = 'data:image/jpeg;base64,';
        const bytes = Math.round((compressedUrl.length - head.length) * 3 / 4);
        setCompressedSize(bytes);
      }
      setIsCompressing(false);
    };
    img.src = src;
  };

  const handleQualityChange = (newQ: number) => {
    setQuality(newQ);
    if (originalImage) {
      compress(originalImage, newQ);
    }
  };

  const downloadCompressed = () => {
    if (!compressedImage) return;
    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `MegaTools_Compressed_${quality}pct_${imageName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const savedPercent = originalSize > 0 && compressedSize > 0
    ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
    : 0;

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      {!originalImage ? (
        <div className="border-2 border-dashed border-fuchsia-500/40 hover:border-pink-500 rounded-2xl p-8 bg-slate-900/60 text-center transition-colors">
          <input
            type="file"
            id="compressor-file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor="compressor-file"
            className="cursor-pointer flex flex-col items-center justify-center gap-3"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-fuchsia-600/30">
              <Upload className="w-7 h-7" />
            </div>
            <div>
              <p className="font-bold text-white text-base">
                कंप्रेस करने के लिए फोटो अपलोड करें
              </p>
              <p className="text-xs text-purple-200/60 mt-1">
                Select JPG, PNG or WebP image to compress and reduce file size
              </p>
            </div>
          </label>

          <div className="mt-4 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={loadSample}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
            >
              या टेस्ट करने के लिए सैंपल इमेज लोड करें (Load Demo)
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Quality Slider Control */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-white">
                  कंप्रेशन क्वालिटी लेवल: {quality}%
                </label>
                <p className="text-[11px] text-purple-300/60">
                  लोअर क्वालिटी = अत्यधिक छोटा फाइल साइज (Lower quality = smaller file size)
                </p>
              </div>
              <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {savedPercent}% स्पेस की बचत!
              </span>
            </div>

            <input
              type="range"
              min="10"
              max="95"
              value={quality}
              onChange={(e) => handleQualityChange(Number(e.target.value))}
              className="w-full accent-fuchsia-500 cursor-pointer"
            />
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Original Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs text-purple-200 font-semibold">
                <span>मूल फोटो (Original)</span>
                <span className="text-purple-400 font-mono">{(originalSize / 1024).toFixed(1)} KB</span>
              </div>
              <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
                <img src={originalImage} alt="Original" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Compressed Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold">
                <span>कंप्रेस्ड फोटो (Optimized)</span>
                <span className="text-emerald-400 font-mono font-bold">{(compressedSize / 1024).toFixed(1)} KB</span>
              </div>
              <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
                {compressedImage && (
                  <img src={compressedImage} alt="Compressed" className="w-full h-full object-contain" />
                )}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              onClick={() => {
                setOriginalImage(null);
                setCompressedImage(null);
              }}
              className="text-xs text-purple-300 hover:text-white underline cursor-pointer"
            >
              दूसरी फोटो चुनें (Upload New Image)
            </button>

            <button
              onClick={downloadCompressed}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 text-white hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>कंप्रेस्ड इमेज डाउनलोड करें (Save {(compressedSize / 1024).toFixed(1)} KB)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
