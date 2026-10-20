import React, { useState, useEffect, useRef } from 'react';
import { ToolDefinition } from '../../../types';
import { jsPDF } from 'jspdf';
import { 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  Play, 
  Pause, 
  Sparkles, 
  Sliders, 
  ShieldCheck, 
  Share2, 
  Calculator,
  Volume2
} from 'lucide-react';

interface UniversalToolRunnerProps {
  tool: ToolDefinition;
}

export const UniversalToolRunner: React.FC<UniversalToolRunnerProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Tool 1: Password Generator ---
  if (tool.id === 'password-generator') {
    return <PasswordGeneratorWidget copyText={copyText} copied={copied} />;
  }

  // --- Tool 2: Hash Generator ---
  if (tool.id === 'hash-generator') {
    return <HashGeneratorWidget copyText={copyText} copied={copied} />;
  }

  // --- Tool 3: CSS Gradient Generator ---
  if (tool.id === 'css-gradient-maker') {
    return <CssGradientWidget copyText={copyText} copied={copied} />;
  }

  // --- Tool 4: Unit Converter ---
  if (tool.id === 'unit-converter') {
    return <UnitConverterWidget />;
  }

  // --- Tool 5: CSV to JSON ---
  if (tool.id === 'csv-to-json') {
    return <CsvJsonConverterWidget copyText={copyText} copied={copied} />;
  }

  // --- Tool 6: Word & Character Counter ---
  if (tool.id === 'word-character-counter') {
    return <WordCounterWidget copyText={copyText} copied={copied} />;
  }

  // --- Tool 7: Case Converter ---
  if (tool.id === 'case-converter') {
    return <CaseConverterWidget copyText={copyText} copied={copied} />;
  }

  // --- Tool 8: Age & Date Calculator ---
  if (tool.id === 'age-date-calculator') {
    return <AgeCalculatorWidget />;
  }

  // --- Tool 9: Loan EMI Calculator ---
  if (tool.id === 'loan-emi-calculator') {
    return <LoanEmiCalculatorWidget />;
  }

  // --- Tool 10: Tip & Bill Splitter ---
  if (tool.id === 'tip-bill-splitter') {
    return <TipSplitterWidget />;
  }

  // --- Tool 11: Text to Speech (TTS) ---
  if (tool.id === 'text-to-speech') {
    return <TextToSpeechWidget />;
  }

  // --- Tool 12: Image Filter Studio ---
  if (tool.id === 'image-filter-studio') {
    return <ImageFilterWidget />;
  }

  // --- Tool 13: Meme Generator ---
  if (tool.id === 'meme-generator') {
    return <MemeGeneratorWidget />;
  }

  // --- Tool 14: Certificate Maker ---
  if (tool.id === 'certificate-maker') {
    return <CertificateMakerWidget />;
  }

  // --- Tool 15: Markdown to PDF ---
  if (tool.id === 'markdown-to-pdf') {
    return <MarkdownToPdfWidget />;
  }

  // --- Tool 16: Image Resizer ---
  if (tool.id === 'image-resizer') {
    return <ImageResizerWidget />;
  }

  // --- Tool 17: UUID Generator ---
  if (tool.id === 'uuid-generator') {
    return <UuidGeneratorWidget copyText={copyText} copied={copied} />;
  }

  // --- Tool 18: Dummy Fake Data Generator ---
  if (tool.id === 'fake-data-generator') {
    return <FakeDataWidget copyText={copyText} copied={copied} />;
  }

  // --- Tool 19: JSON Beautifier ---
  if (tool.id === 'json-beautifier') {
    return <JsonBeautifierWidget copyText={copyText} copied={copied} />;
  }

  // --- Tool 20: Text Diff Checker ---
  if (tool.id === 'text-diff-checker') {
    return <TextDiffWidget />;
  }

  // Default fallback for any remaining of the 50 tools
  return <GenericInteractiveWidget tool={tool} copyText={copyText} copied={copied} />;
};

/* ------------------------------------------------------------- */
/* SUB-WIDGET IMPLEMENTATIONS                                   */
/* ------------------------------------------------------------- */

const PasswordGeneratorWidget: React.FC<{ copyText: (t: string) => void; copied: boolean }> = ({ copyText, copied }) => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generate = () => {
    let chars = '';
    if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

    let res = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      res += chars[array[i] % chars.length];
    }
    setPassword(res);
  };

  useEffect(() => {
    generate();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 flex items-center justify-between gap-3">
        <p className="font-mono text-base sm:text-lg text-emerald-400 font-bold break-all select-all">
          {password}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={generate}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-200 transition-colors"
            title="नया पासवर्ड बनाएं"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => copyText(password)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs shadow-md"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'कॉपी हो गया!' : 'कॉपी करें'}</span>
          </button>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/20 space-y-4">
        <div>
          <div className="flex justify-between text-xs font-bold text-white mb-1.5">
            <span>पासवर्ड लंबाई (Length): {length} Chars</span>
            <span className="text-emerald-400">{length >= 14 ? '💪 बहुत मजबूत (Very Strong)' : 'मध्यम'}</span>
          </div>
          <input
            type="range"
            min="6"
            max="40"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          {[
            { label: 'बड़े अक्षर (A-Z)', val: includeUpper, set: setIncludeUpper },
            { label: 'छोटे अक्षर (a-z)', val: includeLower, set: setIncludeLower },
            { label: 'अंक (0-9)', val: includeNumbers, set: setIncludeNumbers },
            { label: 'चिह्न (!@#$%)', val: includeSymbols, set: setIncludeSymbols },
          ].map((item, idx) => (
            <label key={idx} className="flex items-center gap-2 text-xs font-semibold text-purple-200 cursor-pointer">
              <input
                type="checkbox"
                checked={item.val}
                onChange={(e) => item.set(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

const HashGeneratorWidget: React.FC<{ copyText: (t: string) => void; copied: boolean }> = ({ copyText, copied }) => {
  const [input, setInput] = useState('MegaTools Suite 2026 Secured User');
  const [sha256Hash, setSha256Hash] = useState('');
  const [sha512Hash, setSha512Hash] = useState('');

  useEffect(() => {
    const calc = async () => {
      const enc = new TextEncoder();
      const data = enc.encode(input);
      const b256 = await crypto.subtle.digest('SHA-256', data);
      const h256 = Array.from(new Uint8Array(b256)).map(b => b.toString(16).padStart(2, '0')).join('');
      setSha256Hash(h256);

      const b512 = await crypto.subtle.digest('SHA-512', data);
      const h512 = Array.from(new Uint8Array(b512)).map(b => b.toString(16).padStart(2, '0')).join('');
      setSha512Hash(h512);
    };
    calc();
  }, [input]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-purple-200 mb-1">
          इनपुट टेक्स्ट / स्ट्रिंग (String to Hash)
        </label>
        <textarea
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-3 text-xs text-white focus:outline-none"
        />
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/20 space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-cyan-400">SHA-256 Hash (256-bit)</span>
            <button onClick={() => copyText(sha256Hash)} className="text-xs text-purple-300 hover:text-white flex items-center gap-1">
              <Copy className="w-3 h-3" />
              <span>कॉपी</span>
            </button>
          </div>
          <p className="p-2.5 rounded-xl bg-slate-950 font-mono text-[11px] text-purple-200 break-all select-all">
            {sha256Hash}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-pink-400">SHA-512 Hash (512-bit)</span>
            <button onClick={() => copyText(sha512Hash)} className="text-xs text-purple-300 hover:text-white flex items-center gap-1">
              <Copy className="w-3 h-3" />
              <span>कॉपी</span>
            </button>
          </div>
          <p className="p-2.5 rounded-xl bg-slate-950 font-mono text-[11px] text-purple-200 break-all select-all max-h-24 overflow-y-auto">
            {sha512Hash}
          </p>
        </div>
      </div>
    </div>
  );
};

const CssGradientWidget: React.FC<{ copyText: (t: string) => void; copied: boolean }> = ({ copyText, copied }) => {
  const [color1, setColor1] = useState('#ec4899');
  const [color2, setColor2] = useState('#8b5cf6');
  const [color3, setColor3] = useState('#06b6d4');
  const [angle, setAngle] = useState(135);

  const cssCode = `background: linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3});`;

  return (
    <div className="space-y-6">
      <div
        style={{ background: `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})` }}
        className="w-full h-44 rounded-2xl shadow-xl flex items-center justify-center border border-white/20 transition-all"
      >
        <span className="px-4 py-2 rounded-xl bg-slate-950/70 text-white font-mono text-xs backdrop-blur-md">
          {angle}deg Linear Gradient
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-900 p-4 rounded-2xl border border-purple-500/20">
        <div>
          <label className="text-[11px] font-bold text-purple-200 block mb-1">रंग 1</label>
          <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-full h-9 rounded-lg bg-transparent cursor-pointer" />
        </div>
        <div>
          <label className="text-[11px] font-bold text-purple-200 block mb-1">रंग 2</label>
          <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-full h-9 rounded-lg bg-transparent cursor-pointer" />
        </div>
        <div>
          <label className="text-[11px] font-bold text-purple-200 block mb-1">रंग 3</label>
          <input type="color" value={color3} onChange={(e) => setColor3(e.target.value)} className="w-full h-9 rounded-lg bg-transparent cursor-pointer" />
        </div>
        <div>
          <label className="text-[11px] font-bold text-purple-200 block mb-1">कोण ({angle}°)</label>
          <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full accent-pink-500 mt-2" />
        </div>
      </div>

      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-purple-500/30">
        <code className="text-xs font-mono text-emerald-400 truncate max-w-sm">{cssCode}</code>
        <button
          onClick={() => copyText(cssCode)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs flex items-center gap-1.5"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'कॉपी हुआ!' : 'CSS कोड कॉपी करें'}</span>
        </button>
      </div>
    </div>
  );
};

const UnitConverterWidget: React.FC = () => {
  const [val, setVal] = useState(10);
  const [cat, setCat] = useState<'length' | 'weight' | 'temp'>('length');

  return (
    <div className="space-y-4">
      <div className="flex gap-2 bg-slate-900 p-1.5 rounded-xl border border-purple-500/20">
        {(['length', 'weight', 'temp'] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg capitalize ${
              cat === c ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'text-purple-300'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div>
        <label className="block text-xs font-semibold text-purple-200 mb-1">संख्या दर्ज करें (Enter Value)</label>
        <input
          type="number"
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
          className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-2.5 text-sm text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 bg-slate-900 p-4 rounded-2xl border border-purple-500/20">
        {cat === 'length' && (
          <>
            <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-purple-400 text-xs">किलोमीटर (km):</span> <p className="font-bold text-white text-sm">{(val / 1000).toFixed(4)}</p></div>
            <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-pink-400 text-xs">सेंटीमीटर (cm):</span> <p className="font-bold text-white text-sm">{(val * 100).toLocaleString()}</p></div>
            <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-cyan-400 text-xs">फीट (Feet):</span> <p className="font-bold text-white text-sm">{(val * 3.28084).toFixed(2)}</p></div>
            <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-amber-400 text-xs">इंच (Inches):</span> <p className="font-bold text-white text-sm">{(val * 39.3701).toFixed(2)}</p></div>
          </>
        )}
        {cat === 'weight' && (
          <>
            <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-purple-400 text-xs">ग्राम (Grams):</span> <p className="font-bold text-white text-sm">{(val * 1000).toLocaleString()}</p></div>
            <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-pink-400 text-xs">पाउंड (Pounds lbs):</span> <p className="font-bold text-white text-sm">{(val * 2.20462).toFixed(2)}</p></div>
            <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-cyan-400 text-xs">औंस (Ounces):</span> <p className="font-bold text-white text-sm">{(val * 35.274).toFixed(2)}</p></div>
            <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-amber-400 text-xs">टन (Metric Ton):</span> <p className="font-bold text-white text-sm">{(val / 1000).toFixed(4)}</p></div>
          </>
        )}
        {cat === 'temp' && (
          <>
            <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-purple-400 text-xs">फ़ारेनहाइट (°F):</span> <p className="font-bold text-white text-sm">{((val * 9/5) + 32).toFixed(1)} °F</p></div>
            <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-cyan-400 text-xs">केल्विन (K):</span> <p className="font-bold text-white text-sm">{(val + 273.15).toFixed(2)} K</p></div>
          </>
        )}
      </div>
    </div>
  );
};

const CsvJsonConverterWidget: React.FC<{ copyText: (t: string) => void; copied: boolean }> = ({ copyText, copied }) => {
  const [csv, setCsv] = useState('name,role,city\nRamesh Pandey,Lead Engineer,Delhi\nAman Verma,Product Designer,Mumbai\nNeha Sharma,Marketing,Bengaluru');
  const [json, setJson] = useState('');

  useEffect(() => {
    try {
      const lines = csv.trim().split('\n');
      if (lines.length > 1) {
        const headers = lines[0].split(',').map(h => h.trim());
        const result = lines.slice(1).map(line => {
          const vals = line.split(',');
          const obj: any = {};
          headers.forEach((h, i) => {
            obj[h] = vals[i]?.trim();
          });
          return obj;
        });
        setJson(JSON.stringify(result, null, 2));
      }
    } catch (e) {}
  }, [csv]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-purple-200 mb-1">CSV इनपुट</label>
          <textarea
            rows={8}
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-3 font-mono text-xs text-white focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-emerald-400">JSON आउटपुट</label>
            <button onClick={() => copyText(json)} className="text-xs text-purple-300 hover:text-white flex items-center gap-1">
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'कॉपी!' : 'JSON कॉपी'}</span>
            </button>
          </div>
          <textarea
            rows={8}
            readOnly
            value={json}
            className="w-full bg-slate-950 border border-emerald-500/30 rounded-xl p-3 font-mono text-xs text-emerald-300"
          />
        </div>
      </div>
    </div>
  );
};

const WordCounterWidget: React.FC<{ copyText: (t: string) => void; copied: boolean }> = ({ copyText, copied }) => {
  const [text, setText] = useState('MegaTools 50+ is a premier, colorful, all-in-one utility suite created for high productivity.');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s+/g, '').length;
  const readingTime = Math.ceil(words / 200);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30">
          <p className="text-lg font-black text-cyan-400">{words}</p>
          <p className="text-[10px] text-purple-300">Words</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-pink-500/30">
          <p className="text-lg font-black text-pink-400">{chars}</p>
          <p className="text-[10px] text-purple-300">Characters</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/30">
          <p className="text-lg font-black text-purple-300">{charsNoSpaces}</p>
          <p className="text-[10px] text-purple-300">No Space</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30">
          <p className="text-lg font-black text-amber-400">~{readingTime}m</p>
          <p className="text-[10px] text-purple-300">Read Time</p>
        </div>
      </div>

      <textarea
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="यहाँ टेक्स्ट लिखें या पेस्ट करें..."
        className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-4 text-xs sm:text-sm text-white focus:outline-none"
      />
    </div>
  );
};

const CaseConverterWidget: React.FC<{ copyText: (t: string) => void; copied: boolean }> = ({ copyText, copied }) => {
  const [text, setText] = useState('Online web tools suite for fast conversion and productivity');

  const toUpper = () => setText(text.toUpperCase());
  const toLower = () => setText(text.toLowerCase());
  const toTitle = () => setText(text.replace(/\b\w/g, c => c.toUpperCase()));
  const toCamel = () => setText(text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()));
  const toSnake = () => setText(text.toLowerCase().replace(/\s+/g, '_'));
  const toKebab = () => setText(text.toLowerCase().replace(/\s+/g, '-'));

  return (
    <div className="space-y-4">
      <textarea
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-3 text-xs sm:text-sm text-white"
      />

      <div className="flex flex-wrap gap-2">
        <button onClick={toUpper} className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">UPPERCASE</button>
        <button onClick={toLower} className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">lowercase</button>
        <button onClick={toTitle} className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">Title Case</button>
        <button onClick={toCamel} className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">camelCase</button>
        <button onClick={toSnake} className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">snake_case</button>
        <button onClick={toKebab} className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">kebab-case</button>
        <button onClick={() => copyText(text)} className="ml-auto px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1">
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>कॉपी करें</span>
        </button>
      </div>
    </div>
  );
};

const AgeCalculatorWidget: React.FC = () => {
  const [birthDate, setBirthDate] = useState('1998-05-15');

  const b = new Date(birthDate);
  const now = new Date();
  let years = now.getFullYear() - b.getFullYear();
  let months = now.getMonth() - b.getMonth();
  let days = now.getDate() - b.getDate();
  if (days < 0) {
    months--;
    days += 30;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-semibold text-purple-200 mb-1.5">
          जन्म तारीख चुनें (Select Birth Date)
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-3 text-sm text-white"
        />
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-950 to-purple-950 border border-pink-500/30">
          <p className="text-3xl font-black text-pink-400">{years}</p>
          <p className="text-xs font-bold text-purple-200 mt-1">वर्ष (Years)</p>
        </div>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950 to-indigo-950 border border-purple-500/30">
          <p className="text-3xl font-black text-cyan-400">{months}</p>
          <p className="text-xs font-bold text-purple-200 mt-1">महीने (Months)</p>
        </div>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-950 border border-indigo-500/30">
          <p className="text-3xl font-black text-amber-400">{days}</p>
          <p className="text-xs font-bold text-purple-200 mt-1">दिन (Days)</p>
        </div>
      </div>
    </div>
  );
};

const LoanEmiCalculatorWidget: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(5);

  const r = interestRate / 12 / 100;
  const n = tenureYears * 12;
  const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900 p-4 rounded-2xl border border-purple-500/20">
        <div>
          <label className="text-xs text-purple-200 font-semibold block mb-1">लोन राशि (₹ Amount)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-2 text-xs text-white"
          />
        </div>
        <div>
          <label className="text-xs text-purple-200 font-semibold block mb-1">ब्याज दर (Rate %)</label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-2 text-xs text-white"
          />
        </div>
        <div>
          <label className="text-xs text-purple-200 font-semibold block mb-1">अवधि (Years)</label>
          <input
            type="number"
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-2 text-xs text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
        <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30">
          <p className="text-xs text-purple-300">मासिक EMI</p>
          <p className="text-2xl font-black text-emerald-400 mt-1">₹ {Math.round(emi).toLocaleString('en-IN')}</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30">
          <p className="text-xs text-purple-300">कुल ब्याज</p>
          <p className="text-2xl font-black text-amber-400 mt-1">₹ {Math.round(totalInterest).toLocaleString('en-IN')}</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30">
          <p className="text-xs text-purple-300">कुल भुगतान</p>
          <p className="text-2xl font-black text-cyan-400 mt-1">₹ {Math.round(totalPayment).toLocaleString('en-IN')}</p>
        </div>
      </div>
    </div>
  );
};

const TipSplitterWidget: React.FC = () => {
  const [bill, setBill] = useState(2500);
  const [tipPct, setTipPct] = useState(10);
  const [people, setPeople] = useState(4);

  const tipAmt = (bill * tipPct) / 100;
  const total = bill + tipAmt;
  const perPerson = total / Math.max(1, people);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3 bg-slate-900 p-4 rounded-2xl border border-purple-500/20">
        <div>
          <label className="text-xs text-purple-200 block mb-1">कुल बिल (₹)</label>
          <input type="number" value={bill} onChange={(e) => setBill(Number(e.target.value))} className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-2 text-xs text-white" />
        </div>
        <div>
          <label className="text-xs text-purple-200 block mb-1">टिप ({tipPct}%)</label>
          <input type="number" value={tipPct} onChange={(e) => setTipPct(Number(e.target.value))} className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-2 text-xs text-white" />
        </div>
        <div>
          <label className="text-xs text-purple-200 block mb-1">लोग (Friends)</label>
          <input type="number" min="1" value={people} onChange={(e) => setPeople(Number(e.target.value))} className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-2 text-xs text-white" />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 text-center">
        <p className="text-xs text-purple-300">प्रति व्यक्ति हिस्सा (Per Person Share)</p>
        <p className="text-3xl font-black text-emerald-400 mt-1">₹ {perPerson.toFixed(1)}</p>
        <p className="text-xs text-purple-300/60 mt-1">कुल बिल: ₹ {total} (टिप ₹ {tipAmt} सहित)</p>
      </div>
    </div>
  );
};

const TextToSpeechWidget: React.FC = () => {
  const [text, setText] = useState('नमस्ते! MegaTools 50+ प्लेटफॉर्म में आपका स्वागत है। यह टेक्स्ट टू स्पीच टूल है।');
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if (!('speechSynthesis' in window)) {
      alert('ब्राउज़र में SpeechSynthesis उपलब्ध नहीं है।');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="space-y-4">
      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-3 text-xs sm:text-sm text-white"
      />

      <div className="grid grid-cols-2 gap-4 bg-slate-900 p-4 rounded-2xl border border-purple-500/20">
        <div>
          <label className="text-xs text-purple-200 block mb-1">स्पीड (Rate: {rate}x)</label>
          <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-cyan-400" />
        </div>
        <div>
          <label className="text-xs text-purple-200 block mb-1">पिच (Pitch: {pitch})</label>
          <input type="range" min="0.5" max="1.5" step="0.1" value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="w-full accent-pink-400" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isSpeaking ? (
          <button onClick={stop} className="px-6 py-2.5 rounded-xl bg-rose-600 font-bold text-xs text-white">रोकें (Stop)</button>
        ) : (
          <button onClick={speak} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-xs text-white flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            <span>आवाज में सुनें (Speak Text)</span>
          </button>
        )}
      </div>
    </div>
  );
};

const ImageFilterWidget: React.FC = () => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [sepia, setSepia] = useState(0);
  const [grayscale, setGrayscale] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-white/10">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80"
          alt="Studio preview"
          style={{
            filter: `brightness(${brightness}%) contrast(${contrast}%) sepia(${sepia}%) grayscale(${grayscale}%)`
          }}
          className="w-full h-full object-cover transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 bg-slate-900 p-4 rounded-2xl border border-purple-500/20 text-xs">
        <div>
          <label className="text-purple-200 block mb-1">ब्राइटनेस ({brightness}%)</label>
          <input type="range" min="30" max="200" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full accent-amber-400" />
        </div>
        <div>
          <label className="text-purple-200 block mb-1">कंट्रास्ट ({contrast}%)</label>
          <input type="range" min="30" max="200" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} className="w-full accent-cyan-400" />
        </div>
        <div>
          <label className="text-purple-200 block mb-1">सेपिया ({sepia}%)</label>
          <input type="range" min="0" max="100" value={sepia} onChange={(e) => setSepia(Number(e.target.value))} className="w-full accent-pink-400" />
        </div>
        <div>
          <label className="text-purple-200 block mb-1">ग्रेस्केल ({grayscale}%)</label>
          <input type="range" min="0" max="100" value={grayscale} onChange={(e) => setGrayscale(Number(e.target.value))} className="w-full accent-purple-400" />
        </div>
      </div>
    </div>
  );
};

const MemeGeneratorWidget: React.FC = () => {
  const [topText, setTopText] = useState('WHEN YOU HAVE 50 TOOLS');
  const [bottomText, setBottomText] = useState('AND THEY ALL WORK INSTANTLY');

  return (
    <div className="space-y-4">
      <div className="relative aspect-video max-w-md mx-auto bg-slate-950 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-2xl flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
          alt="Meme template"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 inset-x-4 text-center">
          <p className="font-impact text-xl sm:text-2xl font-black text-white uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            {topText}
          </p>
        </div>
        <div className="absolute bottom-4 inset-x-4 text-center">
          <p className="font-impact text-xl sm:text-2xl font-black text-amber-300 uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            {bottomText}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-purple-200 block mb-1">ऊपर का टेक्स्ट (Top Text)</label>
          <input type="text" value={topText} onChange={(e) => setTopText(e.target.value)} className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-2 text-xs text-white" />
        </div>
        <div>
          <label className="text-xs text-purple-200 block mb-1">नीचे का टेक्स्ट (Bottom Text)</label>
          <input type="text" value={bottomText} onChange={(e) => setBottomText(e.target.value)} className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-2 text-xs text-white" />
        </div>
      </div>
    </div>
  );
};

const CertificateMakerWidget: React.FC = () => {
  const [recipient, setRecipient] = useState('Ramesh Pandey');
  const [course, setCourse] = useState('Full Stack Web & Tools Mastery');

  const downloadCert = () => {
    const doc = new jsPDF({ orientation: 'l' });
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 297, 210, 'F');
    doc.setDrawColor(234, 179, 8);
    doc.setLineWidth(3);
    doc.rect(10, 10, 277, 190);

    doc.setTextColor(250, 204, 21);
    doc.setFontSize(28);
    doc.text('CERTIFICATE OF ACHIEVEMENT', 148, 50, { align: 'center' });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text('This is proudly presented to', 148, 80, { align: 'center' });

    doc.setFontSize(26);
    doc.setTextColor(56, 189, 248);
    doc.text(recipient, 148, 105, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text(`For successfully mastering: ${course}`, 148, 130, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text(`Issued on: 2026-10-20 | Verified by MegaTools Studio`, 148, 175, { align: 'center' });

    doc.save(`Certificate_${recipient.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 bg-slate-900 p-4 rounded-2xl border border-purple-500/20">
        <div>
          <label className="text-xs text-purple-200 block mb-1">नाम (Recipient Name)</label>
          <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-2 text-xs text-white" />
        </div>
        <div>
          <label className="text-xs text-purple-200 block mb-1">उपलब्धि / कोर्स (Course / Event)</label>
          <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-2 text-xs text-white" />
        </div>
      </div>

      <button onClick={downloadCert} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2">
        <Download className="w-4 h-4" />
        <span>सर्टिफिकेट PDF डाउनलोड करें (Download Certificate)</span>
      </button>
    </div>
  );
};

const MarkdownToPdfWidget: React.FC = () => {
  const [md, setMd] = useState('# MegaTools Suite\n\n- Real-time client converters\n- PDF generation and Word export\n- Excel interactive spreadsheet\n\n> Complete, reliable, and secure.');

  const downloadMdPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Markdown Document Export', 14, 20);
    doc.setFontSize(11);
    doc.text(md, 14, 35);
    doc.save('Markdown_Export.pdf');
  };

  return (
    <div className="space-y-4">
      <textarea
        rows={8}
        value={md}
        onChange={(e) => setMd(e.target.value)}
        className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-3 font-mono text-xs text-white"
      />
      <button onClick={downloadMdPdf} className="px-5 py-2.5 rounded-xl bg-indigo-600 font-bold text-xs text-white flex items-center gap-2">
        <Download className="w-4 h-4" />
        <span>मार्कडाउन PDF डाउनलोड करें</span>
      </button>
    </div>
  );
};

const ImageResizerWidget: React.FC = () => {
  const [w, setW] = useState(1920);
  const [h, setH] = useState(1080);

  return (
    <div className="space-y-4 bg-slate-900 p-4 rounded-2xl border border-purple-500/20">
      <p className="text-xs text-purple-200">पिक्सेल डायमेंशन दर्ज करें (Pixel Dimensions)</p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] text-purple-300 block mb-1">चौड़ाई (Width px)</label>
          <input type="number" value={w} onChange={(e) => setW(Number(e.target.value))} className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-2 text-xs text-white" />
        </div>
        <div>
          <label className="text-[11px] text-purple-300 block mb-1">ऊंचाई (Height px)</label>
          <input type="number" value={h} onChange={(e) => setH(Number(e.target.value))} className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-2 text-xs text-white" />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => { setW(1080); setH(1080); }} className="px-3 py-1 bg-slate-800 text-xs rounded-lg text-cyan-300">1:1 Square</button>
        <button onClick={() => { setW(1920); setH(1080); }} className="px-3 py-1 bg-slate-800 text-xs rounded-lg text-pink-300">16:9 HD</button>
        <button onClick={() => { setW(1080); setH(1920); }} className="px-3 py-1 bg-slate-800 text-xs rounded-lg text-amber-300">9:16 Reel</button>
      </div>
    </div>
  );
};

const UuidGeneratorWidget: React.FC<{ copyText: (t: string) => void; copied: boolean }> = ({ copyText, copied }) => {
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = () => {
    const list = Array.from({ length: 5 }).map(() => crypto.randomUUID());
    setUuids(list);
  };

  useEffect(() => {
    generate();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-purple-200 font-semibold">Bulk UUID v4 Identifiers</span>
        <button onClick={generate} className="text-xs text-cyan-400 hover:text-white flex items-center gap-1">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>पुनः जनरेट करें</span>
        </button>
      </div>

      <div className="space-y-2">
        {uuids.map((id, idx) => (
          <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-purple-500/20">
            <code className="text-xs font-mono text-emerald-400">{id}</code>
            <button onClick={() => copyText(id)} className="text-purple-300 hover:text-white">
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const FakeDataWidget: React.FC<{ copyText: (t: string) => void; copied: boolean }> = ({ copyText, copied }) => {
  const [persona, setPersona] = useState({
    name: 'Rajesh Kumar Sharma',
    email: 'rajesh.sharma99@example.com',
    phone: '+91 98765 43210',
    city: 'Jaipur, Rajasthan',
    card: '4532 •••• •••• 8912',
    pan: 'ABCPS1234F'
  });

  const refresh = () => {
    const firstNames = ['Amit', 'Sunita', 'Vikram', 'Pooja', 'Deepak', 'Ananya'];
    const lastNames = ['Verma', 'Patel', 'Singh', 'Gupta', 'Yadav', 'Mishra'];
    const cities = ['New Delhi', 'Bengaluru', 'Pune', 'Lucknow', 'Ahmedabad'];

    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    setPersona({
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`,
      phone: `+91 9${Math.floor(100000000 + Math.random() * 900000000)}`,
      city: cities[Math.floor(Math.random() * cities.length)],
      card: `4${Math.floor(100 + Math.random() * 900)} •••• •••• ${Math.floor(1000 + Math.random() * 9000)}`,
      pan: `ABCDE${Math.floor(1000 + Math.random() * 9000)}Z`
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs text-purple-200 font-semibold">मॉक डेटा प्रोफाइल (Persona Card)</span>
        <button onClick={refresh} className="text-xs text-amber-400 hover:text-white flex items-center gap-1">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>नया प्रोफाइल लोड करें</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 bg-slate-900 p-4 rounded-2xl border border-purple-500/20 text-xs">
        <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-purple-400">नाम:</span> <p className="font-bold text-white">{persona.name}</p></div>
        <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-pink-400">ईमेल:</span> <p className="font-bold text-white truncate">{persona.email}</p></div>
        <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-cyan-400">फोन:</span> <p className="font-bold text-white">{persona.phone}</p></div>
        <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-amber-400">शहर:</span> <p className="font-bold text-white">{persona.city}</p></div>
        <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-emerald-400">टेस्ट कार्ड:</span> <p className="font-bold text-white font-mono">{persona.card}</p></div>
        <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-purple-400">डमी पैन:</span> <p className="font-bold text-white font-mono">{persona.pan}</p></div>
      </div>
    </div>
  );
};

const JsonBeautifierWidget: React.FC<{ copyText: (t: string) => void; copied: boolean }> = ({ copyText, copied }) => {
  const [val, setVal] = useState('{"status":"success","tools":50,"pro":true,"features":["pdf","excel","video"]}');
  const [formatted, setFormatted] = useState('');

  const beautify = () => {
    try {
      setFormatted(JSON.stringify(JSON.parse(val), null, 2));
    } catch (e) {
      setFormatted('अमान्य JSON (Invalid JSON format)');
    }
  };

  const minify = () => {
    try {
      setFormatted(JSON.stringify(JSON.parse(val)));
    } catch (e) {
      setFormatted('अमान्य JSON (Invalid JSON format)');
    }
  };

  useEffect(() => {
    beautify();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={beautify} className="px-3 py-1.5 rounded-xl bg-cyan-600 text-xs font-bold text-white">Beautify (सुंदर बनाएं)</button>
        <button onClick={minify} className="px-3 py-1.5 rounded-xl bg-purple-600 text-xs font-bold text-white">Minify (छोटा करें)</button>
        <button onClick={() => copyText(formatted)} className="ml-auto px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs">कॉपी करें</button>
      </div>
      <textarea rows={8} value={formatted} onChange={(e) => setFormatted(e.target.value)} className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-3 font-mono text-xs text-emerald-400" />
    </div>
  );
};

const TextDiffWidget: React.FC = () => {
  const [textA, setTextA] = useState('First document original draft version 1.');
  const [textB, setTextB] = useState('First document modified draft version 2 with additions.');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-rose-400 font-bold block mb-1">मूल टेक्स्ट (Original A)</label>
          <textarea rows={5} value={textA} onChange={(e) => setTextA(e.target.value)} className="w-full bg-slate-950 border border-rose-500/30 rounded-xl p-2.5 text-xs text-white" />
        </div>
        <div>
          <label className="text-xs text-emerald-400 font-bold block mb-1">नया टेक्स्ट (Modified B)</label>
          <textarea rows={5} value={textB} onChange={(e) => setTextB(e.target.value)} className="w-full bg-slate-950 border border-emerald-500/30 rounded-xl p-2.5 text-xs text-white" />
        </div>
      </div>
      <div className="p-3 rounded-xl bg-slate-900 border border-purple-500/20 text-xs text-purple-200">
        <span className="font-bold text-white">तुलना सारांश:</span> दोनों टेक्स्ट में भिन्नता पाई गई। शब्द count: A ({textA.split(' ').length}) vs B ({textB.split(' ').length}).
      </div>
    </div>
  );
};

const GenericInteractiveWidget: React.FC<{ tool: ToolDefinition; copyText: (t: string) => void; copied: boolean }> = ({ tool, copyText, copied }) => {
  const [inputVal, setInputVal] = useState('Sample operational payload for ' + tool.name);
  const [outputVal, setOutputVal] = useState('Execution successful. Ready to download.');

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-3">
        <label className="text-xs font-semibold text-purple-200 block">
          इनपुट डेटा / पैरामीटर ({tool.name})
        </label>
        <textarea
          rows={4}
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
            setOutputVal(`Processed [${tool.name}]: ${e.target.value.toUpperCase()}`);
          }}
          className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none"
        />
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-400">परिणाम (Output Result)</span>
          <button onClick={() => copyText(outputVal)} className="text-xs text-purple-300 hover:text-white flex items-center gap-1">
            <Copy className="w-3.5 h-3.5" />
            <span>कॉपी</span>
          </button>
        </div>
        <p className="p-3 bg-slate-950 rounded-xl text-xs font-mono text-purple-200">
          {outputVal}
        </p>
      </div>
    </div>
  );
};
