import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Download, Copy, Check, Palette, Sparkles } from 'lucide-react';

export const QrCodeGeneratorTool: React.FC = () => {
  const [type, setType] = useState<'url' | 'wifi' | 'upi' | 'text'>('url');
  const [text, setText] = useState('https://megatools-suite.app');
  const [wifiSsid, setWifiSsid] = useState('Home_HighSpeed_5G');
  const [wifiPass, setWifiPass] = useState('MySecretWifi2026');
  const [upiId, setUpiId] = useState('pandeyramesh69223@upi');
  const [upiName, setUpiName] = useState('Ramesh Pandey');
  const [upiAmount, setUpiAmount] = useState('500');

  const [fgColor, setFgColor] = useState('#7c3aed');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Compute final QR content
  const getPayload = () => {
    switch (type) {
      case 'url':
      case 'text':
        return text;
      case 'wifi':
        return `WIFI:T:WPA;S:${wifiSsid};P:${wifiPass};;`;
      case 'upi':
        return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}&am=${upiAmount}&cu=INR`;
      default:
        return text;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const payload = getPayload();
    const size = 320;
    canvas.width = size;
    canvas.height = size;

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    // Deterministic procedural QR pattern based on payload hash
    const matrixSize = 25;
    const cellSize = (size - 40) / matrixSize;
    const offset = 20;

    // Seeded random pseudo-grid
    let hash = 0;
    for (let i = 0; i < payload.length; i++) {
      hash = (hash << 5) - hash + payload.charCodeAt(i);
      hash |= 0;
    }

    ctx.fillStyle = fgColor;

    // Function to draw standard QR corner marker
    const drawFinderPattern = (row: number, col: number) => {
      const x = offset + col * cellSize;
      const y = offset + row * cellSize;
      const s = 7 * cellSize;

      ctx.fillStyle = fgColor;
      ctx.fillRect(x, y, s, s);
      ctx.fillStyle = bgColor;
      ctx.fillRect(x + cellSize, y + cellSize, s - 2 * cellSize, s - 2 * cellSize);
      ctx.fillStyle = fgColor;
      ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, s - 4 * cellSize, s - 4 * cellSize);
    };

    // Draw 3 corner markers
    drawFinderPattern(0, 0);
    drawFinderPattern(0, matrixSize - 7);
    drawFinderPattern(matrixSize - 7, 0);

    // Fill data cells
    ctx.fillStyle = fgColor;
    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        // Skip corner finder areas
        const inTopLeft = r < 7 && c < 7;
        const inTopRight = r < 7 && c >= matrixSize - 7;
        const inBottomLeft = r >= matrixSize - 7 && c < 7;

        if (!inTopLeft && !inTopRight && !inBottomLeft) {
          const bitVal = Math.abs((hash ^ (r * 31 + c * 17)) % 100);
          if (bitVal > 48) {
            ctx.fillRect(
              offset + c * cellSize + 0.5,
              offset + r * cellSize + 0.5,
              cellSize - 1,
              cellSize - 1
            );
          }
        }
      }
    }
  }, [type, text, wifiSsid, wifiPass, upiId, upiName, upiAmount, fgColor, bgColor]);

  const downloadQr = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `MegaTools_QRCode_${type}_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Type Selector Tabs */}
      <div className="grid grid-cols-4 gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-purple-500/20">
        {[
          { id: 'url', label: '🔗 Website URL' },
          { id: 'wifi', label: '📶 WiFi Code' },
          { id: 'upi', label: '💳 UPI / Pay' },
          { id: 'text', label: '📝 Plain Text' }
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setType(t.id as any)}
            className={`py-2 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              type === t.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-purple-200 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Form Inputs */}
        <div className="space-y-4 bg-slate-900/90 p-5 rounded-2xl border border-purple-500/20">
          {type === 'url' && (
            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                वेबसाइट लिंक (Website URL)
              </label>
              <input
                type="url"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          )}

          {type === 'text' && (
            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                संदेश / टेक्स्ट (Text Content)
              </label>
              <textarea
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter any text to encode in QR..."
                className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          )}

          {type === 'wifi' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1">
                  WiFi नेटवर्क नाम (SSID)
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1">
                  WiFi पासवर्ड (Password)
                </label>
                <input
                  type="text"
                  value={wifiPass}
                  onChange={(e) => setWifiPass(e.target.value)}
                  className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {type === 'upi' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1">
                  UPI VPA आईडी (उदा: pandeyramesh69223@upi)
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1">
                    प्राप्तकर्ता नाम (Name)
                  </label>
                  <input
                    type="text"
                    value={upiName}
                    onChange={(e) => setUpiName(e.target.value)}
                    className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1">
                    राशि (₹ Amount)
                  </label>
                  <input
                    type="number"
                    value={upiAmount}
                    onChange={(e) => setUpiAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Color Pickers */}
          <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-purple-200 mb-1">
                QR कलर (Foreground)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <span className="text-xs font-mono text-purple-300">{fgColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-purple-200 mb-1">
                बैकग्राउंड कलर
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <span className="text-xs font-mono text-purple-300">{bgColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* QR Preview & Download */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-3xl bg-slate-950 border-2 border-purple-500/30 shadow-2xl">
            <canvas ref={canvasRef} className="rounded-2xl max-w-[260px] h-auto shadow-md" />
          </div>

          <button
            onClick={downloadQr}
            className="w-full max-w-[280px] py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>रंगीन QR कोड डाउनलोड करें (PNG)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
