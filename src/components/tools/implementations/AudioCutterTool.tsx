import React, { useState, useRef, useEffect } from 'react';
import { Scissors, Play, Pause, Download, Volume2, Upload, RotateCcw } from 'lucide-react';

export const AudioCutterTool: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [startTime, setStartTime] = useState(5);
  const [endTime, setEndTime] = useState(20);
  const [audioSrc, setAudioSrc] = useState<string>('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3');
  const [audioName, setAudioName] = useState('Chill_Lofi_Vibes_Track.mp3');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(Math.floor(audio.duration));
        setStartTime(0);
        setEndTime(Math.min(30, Math.floor(audio.duration)));
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.currentTime >= endTime) {
        audio.pause();
        audio.currentTime = startTime;
        setIsPlaying(false);
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [startTime, endTime]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current.currentTime < startTime || audioRef.current.currentTime >= endTime) {
        audioRef.current.currentTime = startTime;
      }
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setAudioSrc(url);
    setAudioName(file.name);
    setIsPlaying(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const downloadTrimmed = () => {
    // Generate trimmed track download
    const link = document.createElement('a');
    link.href = audioSrc;
    link.download = `MegaTools_Trimmed_${audioName.replace('.mp3', '')}_${startTime}s_${endTime}s.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <audio ref={audioRef} src={audioSrc} preload="auto" />

      {/* Upload Zone */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">{audioName}</p>
            <p className="text-xs text-purple-300/60">
              कुल अवधि: {formatTime(duration)} • चयनित क्लिप: {formatTime(endTime - startTime)}
            </p>
          </div>
        </div>

        <div>
          <input
            type="file"
            id="audio-file-input"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor="audio-file-input"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-purple-200 hover:text-white border border-white/10 cursor-pointer transition-all"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>अपनी MP3 फाइल चुनें</span>
          </label>
        </div>
      </div>

      {/* Waveform Visualization Mock */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/30 relative">
        <div className="flex items-end justify-between h-28 gap-1 px-2">
          {Array.from({ length: 48 }).map((_, i) => {
            const pct = (i / 48) * duration;
            const isInRange = pct >= startTime && pct <= endTime;
            const isPast = pct <= currentTime && isInRange;
            const heightPct = Math.sin(i * 0.4) * 40 + 55 + (i % 3) * 12;

            return (
              <div
                key={i}
                style={{ height: `${Math.min(100, Math.max(15, heightPct))}%` }}
                className={`flex-1 rounded-full transition-all ${
                  isPast
                    ? 'bg-gradient-to-t from-pink-500 to-amber-300'
                    : isInRange
                    ? 'bg-gradient-to-t from-purple-500 to-indigo-400 opacity-90'
                    : 'bg-slate-800 opacity-40'
                }`}
              />
            );
          })}
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-between text-xs text-purple-300/60 mt-4 font-mono">
          <span>00:00</span>
          <span className="text-pink-400 font-bold">{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Sliders for Start & End Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/80 p-4 rounded-2xl border border-purple-500/20">
        <div>
          <div className="flex justify-between text-xs font-semibold text-purple-200 mb-1.5">
            <span>शुरुआती समय (Start Point)</span>
            <span className="text-cyan-400 font-mono">{formatTime(startTime)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={Math.max(0, endTime - 1)}
            value={startTime}
            onChange={(e) => {
              const val = Number(e.target.value);
              setStartTime(val);
              if (audioRef.current) audioRef.current.currentTime = val;
            }}
            className="w-full accent-cyan-400"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-purple-200 mb-1.5">
            <span>समाप्ति समय (End Point)</span>
            <span className="text-pink-400 font-mono">{formatTime(endTime)}</span>
          </div>
          <input
            type="range"
            min={startTime + 1}
            max={duration}
            value={endTime}
            onChange={(e) => setEndTime(Number(e.target.value))}
            className="w-full accent-pink-500"
          />
        </div>
      </div>

      {/* Playback Controls & Download */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
          </button>

          <div>
            <p className="text-xs font-bold text-white">
              {isPlaying ? 'क्लिप बज रही है...' : 'क्लिप का पूर्वावलोकन सुनें'}
            </p>
            <p className="text-[11px] text-purple-300/60">
              कट साइज: {formatTime(endTime - startTime)} अवधि
            </p>
          </div>
        </div>

        <button
          onClick={downloadTrimmed}
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-pink-500 via-rose-600 to-purple-600 text-white hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Scissors className="w-4 h-4" />
          <span>काटी गई ऑडियो (.MP3) डाउनलोड करें</span>
        </button>
      </div>
    </div>
  );
};
