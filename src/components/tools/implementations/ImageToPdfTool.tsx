import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Upload, Trash2, Download, RefreshCw, FileText, MoveUp, MoveDown, Check } from 'lucide-react';

interface ImageFile {
  id: string;
  name: string;
  dataUrl: string;
  width: number;
  height: number;
  size: string;
}

export const ImageToPdfTool: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [orientation, setOrientation] = useState<'p' | 'l'>('p');
  const [pageSize, setPageSize] = useState<'a4' | 'letter'>('a4');
  const [margin, setMargin] = useState<number>(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const newImage: ImageFile = {
            id: 'img_' + Math.random().toString(36).substring(2, 9),
            name: file.name,
            dataUrl: event.target?.result as string,
            width: img.width,
            height: img.height,
            size: (file.size / 1024).toFixed(1) + ' KB'
          };
          setImages((prev) => [...prev, newImage]);
          setDownloadReady(false);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === images.length - 1)
    ) {
      return;
    }
    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    setImages(newImages);
  };

  const loadSampleImages = () => {
    // Generate two sample colorful geometric canvas drawings to test immediately
    const createSample = (text: string, bgColor: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1000;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 800, 1000);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(text, 400, 480);
        ctx.font = '20px Arial';
        ctx.fillText('MegaTools High Quality PDF Document', 400, 540);
      }
      return canvas.toDataURL('image/jpeg', 0.9);
    };

    const s1 = createSample('SAMPLE DOCUMENT PAGE 1', '#4f46e5');
    const s2 = createSample('SAMPLE DOCUMENT PAGE 2', '#ec4899');

    setImages([
      { id: 'sample_1', name: 'Document_Cover.jpg', dataUrl: s1, width: 800, height: 1000, size: '42.5 KB' },
      { id: 'sample_2', name: 'Report_Page_2.jpg', dataUrl: s2, width: 800, height: 1000, size: '48.1 KB' }
    ]);
  };

  const generatePdf = () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      const doc = new jsPDF({
        orientation: orientation,
        unit: 'mm',
        format: pageSize
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      images.forEach((img, index) => {
        if (index > 0) {
          doc.addPage(pageSize, orientation);
        }

        const printableWidth = pageWidth - margin * 2;
        const printableHeight = pageHeight - margin * 2;

        const imgRatio = img.width / img.height;
        const pageRatio = printableWidth / printableHeight;

        let renderWidth = printableWidth;
        let renderHeight = printableHeight;

        if (imgRatio > pageRatio) {
          renderHeight = printableWidth / imgRatio;
        } else {
          renderWidth = printableHeight * imgRatio;
        }

        const x = margin + (printableWidth - renderWidth) / 2;
        const y = margin + (printableHeight - renderHeight) / 2;

        doc.addImage(img.dataUrl, 'JPEG', x, y, renderWidth, renderHeight);
      });

      doc.save(`megatools-converted-${Date.now()}.pdf`);
      setDownloadReady(true);
    } catch (err) {
      console.error('PDF error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div className="border-2 border-dashed border-purple-500/40 hover:border-pink-500 rounded-2xl p-6 sm:p-8 bg-slate-900/60 transition-colors text-center">
        <input
          type="file"
          id="image-to-pdf-input"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <label
          htmlFor="image-to-pdf-input"
          className="cursor-pointer flex flex-col items-center justify-center gap-3"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
            <Upload className="w-7 h-7" />
          </div>
          <div>
            <p className="font-bold text-white text-base">
              यहाँ अपनी तस्वीरें (JPG, PNG, WEBP) अपलोड करें
            </p>
            <p className="text-xs text-purple-200/60 mt-1">
              Click to browse or drag & drop files here. Multi-selection supported.
            </p>
          </div>
        </label>

        {images.length === 0 && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={loadSampleImages}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
            >
              या टेस्ट करने के लिए सैंपल इमेजिस लोड करें (Load Demo Images)
            </button>
          </div>
        )}
      </div>

      {/* Settings Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900/80 p-4 rounded-2xl border border-purple-500/20">
        <div>
          <label className="block text-xs font-semibold text-purple-200 mb-1.5">
            ओरिएंटेशन (Orientation)
          </label>
          <select
            value={orientation}
            onChange={(e) => setOrientation(e.target.value as any)}
            className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="p">पोर्ट्रेट (Portrait - Vertical)</option>
            <option value="l">लैंडस्केप (Landscape - Horizontal)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-purple-200 mb-1.5">
            पेज साइज (Page Size)
          </label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value as any)}
            className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="a4">A4 (Standard Document)</option>
            <option value="letter">Letter (US)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-purple-200 mb-1.5">
            मार्जिन (Margin: {margin}mm)
          </label>
          <input
            type="range"
            min="0"
            max="25"
            value={margin}
            onChange={(e) => setMargin(Number(e.target.value))}
            className="w-full accent-pink-500"
          />
        </div>
      </div>

      {/* Image Previews / Order */}
      {images.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-pink-400" />
              <span>चयनित इमेजिस ({images.length} Pages)</span>
            </h4>
            <button
              onClick={() => setImages([])}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
            >
              सभी हटाएं (Clear All)
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="relative group bg-slate-950 border border-purple-500/20 rounded-xl overflow-hidden p-2 flex flex-col justify-between"
              >
                <div className="relative aspect-3/4 rounded-lg overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img
                    src={img.dataUrl}
                    alt={img.name}
                    className="w-full h-full object-contain"
                  />
                  <span className="absolute top-1 left-1 bg-slate-950/80 text-white font-bold text-[10px] px-2 py-0.5 rounded-md">
                    #{idx + 1}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-[11px] text-purple-200/80 truncate max-w-[90px]">
                    {img.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveImage(idx, 'up')}
                      className="p-1 bg-slate-800 text-slate-300 hover:text-white rounded disabled:opacity-30 cursor-pointer"
                      title="ऊपर करें"
                    >
                      <MoveUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === images.length - 1}
                      onClick={() => moveImage(idx, 'down')}
                      className="p-1 bg-slate-800 text-slate-300 hover:text-white rounded disabled:opacity-30 cursor-pointer"
                      title="नीचे करें"
                    >
                      <MoveDown className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="p-1 bg-rose-950 text-rose-400 hover:bg-rose-900 rounded cursor-pointer"
                      title="हटाएं"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <p className="text-xs text-purple-300/70">
          {images.length > 0
            ? `${images.length} पेज की PDF फाइल तैयार होगी।`
            : 'कृपया कम से कम एक इमेज अपलोड करें।'}
        </p>

        <button
          onClick={generatePdf}
          disabled={images.length === 0 || isGenerating}
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 text-white hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isGenerating ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>पीडीएफ बनाएं और डाउनलोड करें (Export PDF)</span>
        </button>
      </div>
    </div>
  );
};
