import React, { useState, useRef } from 'react';
import { Mic, Square, Download, Play, Pause, Trash2, Volume2, Sparkles } from 'lucide-react';

export const VoiceRecorderTool: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);
  const audioPlaybackRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1000);
    } catch (err) {
      alert('माइक्रोफोन की अनुमति आवश्यक है (Microphone access needed).');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    clearInterval(timerIntervalRef.current);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const togglePlayback = () => {
    if (!audioPlaybackRef.current) return;
    if (isPlaying) {
      audioPlaybackRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlaybackRef.current.play();
      setIsPlaying(true);
    }
  };

  const downloadAudio = () => {
    if (!audioUrl) return;
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `MegaTools_VoiceNote_${Date.now()}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {audioUrl && (
        <audio
          ref={audioPlaybackRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      )}

      {/* Main Studio Visualizer */}
      <div className="rounded-2xl bg-slate-950 border border-purple-500/30 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[220px]">
        {isRecording ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-1.5 h-16">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-pink-500 to-amber-300 rounded-full animate-bounce"
                  style={{
                    animationDuration: `${0.4 + (i % 5) * 0.15}s`,
                    height: `${30 + (i % 6) * 12}px`
                  }}
                />
              ))}
            </div>

            <p className="text-4xl font-black font-mono text-pink-400">
              {formatTime(recordingTime)}
            </p>
            <p className="text-xs text-purple-300/70">
              आवाज रिकॉर्ड हो रही है... माइक के पास बोलें
            </p>
          </div>
        ) : audioUrl ? (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
              <Volume2 className="w-8 h-8" />
            </div>
            <p className="text-lg font-bold text-white">वॉयस नोट तैयार है! (Duration: {formatTime(recordingTime)})</p>
            
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={togglePlayback}
                className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
              </button>

              <button
                onClick={downloadAudio}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>ऑडियो डाउनलोड करें</span>
              </button>

              <button
                onClick={() => setAudioUrl(null)}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                title="हटाएं और नया रिकॉर्ड करें"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-pink-500/30">
              <Mic className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">स्टूडियो माइक्रोफोन रिकॉर्डर</h3>
            <p className="text-xs text-purple-200/70 max-w-sm mx-auto">
              उच्च ध्वनि स्पष्टता के साथ अपने व्याख्यान, पॉडकास्ट या वॉयस मैसेज रिकॉर्ड करें।
            </p>
          </div>
        )}
      </div>

      {/* Record Buttons */}
      <div className="flex items-center justify-center gap-4">
        {isRecording ? (
          <button
            onClick={stopRecording}
            className="px-8 py-3 rounded-2xl font-bold text-sm bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-rose-600/40"
          >
            <Square className="w-5 h-5 fill-white" />
            <span>रिकॉर्डिंग समाप्त करें (Stop Recording)</span>
          </button>
        ) : (
          <button
            onClick={startRecording}
            className="px-8 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-pink-500 via-rose-600 to-purple-600 text-white hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-pink-500/40 flex items-center gap-2 cursor-pointer"
          >
            <Mic className="w-5 h-5" />
            <span>रिकॉर्डिंग शुरू करें (Start Recording)</span>
          </button>
        )}
      </div>
    </div>
  );
};
