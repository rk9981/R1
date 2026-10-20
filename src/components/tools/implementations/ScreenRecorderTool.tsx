import React, { useState, useRef } from 'react';
import { MonitorPlay, Square, Download, Play, RefreshCw, AlertCircle, Mic, Check } from 'lucide-react';

export const ScreenRecorderTool: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [includeMic, setIncludeMic] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);

  const startRecording = async () => {
    setError(null);
    setRecordedVideoUrl(null);
    chunksRef.current = [];

    try {
      // Screen stream
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'monitor' },
        audio: true
      });

      let finalStream = displayStream;

      if (includeMic) {
        try {
          const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const audioCtx = new AudioContext();
          const dest = audioCtx.createMediaStreamDestination();

          if (displayStream.getAudioTracks().length > 0) {
            const displaySource = audioCtx.createMediaStreamSource(displayStream);
            displaySource.connect(dest);
          }

          const micSource = audioCtx.createMediaStreamSource(micStream);
          micSource.connect(dest);

          finalStream = new MediaStream([
            ...displayStream.getVideoTracks(),
            ...dest.stream.getAudioTracks()
          ]);
        } catch (micErr) {
          console.warn('Microphone not available, proceeding with screen audio only', micErr);
        }
      }

      streamRef.current = displayStream;

      const mediaRecorder = new MediaRecorder(finalStream, {
        mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
          ? 'video/webm;codecs=vp9'
          : 'video/webm'
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
        setIsRecording(false);
        clearInterval(timerIntervalRef.current);
      };

      // Handle user stopping share via browser native banner
      displayStream.getVideoTracks()[0].onended = () => {
        stopRecording();
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setRecordingTime(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'स्क्रीन रिकॉर्डिंग की अनुमति नहीं मिली (Permission denied).');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
    clearInterval(timerIntervalRef.current);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const downloadRecording = () => {
    if (!recordedVideoUrl) return;
    const link = document.createElement('a');
    link.href = recordedVideoUrl;
    link.download = `MegaTools_Screen_Recording_${Date.now()}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Alert Error */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Recording Display Box */}
      <div className="rounded-2xl bg-slate-950 border border-purple-500/30 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[220px]">
        {isRecording ? (
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>स्क्रीन रिकॉर्ड हो रही है... (RECORDING ACTIVE)</span>
            </div>
            <p className="text-5xl font-black font-mono text-white tracking-widest">
              {formatTime(recordingTime)}
            </p>
            <p className="text-xs text-purple-300/60">
              रिकॉर्डिंग समाप्त करने के लिए नीचे 'स्टॉप' बटन दबाएँ।
            </p>
          </div>
        ) : recordedVideoUrl ? (
          <div className="w-full max-w-xl space-y-4">
            <video
              src={recordedVideoUrl}
              controls
              className="w-full rounded-xl border border-white/10 aspect-video bg-black"
            />
            <div className="flex items-center justify-between text-xs text-purple-200">
              <span>रिकॉर्डिंग पूर्ण! कुल समय: {formatTime(recordingTime)}</span>
              <button
                onClick={downloadRecording}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>वीडियो डाउनलोड करें (Save Video)</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-purple-600/30">
              <MonitorPlay className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">एचडी स्क्रीन रिकॉर्डर (HD Screen Recorder)</h3>
            <p className="text-xs text-purple-200/70 max-w-md mx-auto">
              ब्राउज़र टैब, ऐप विंडो या संपूर्ण डेस्कटॉप स्क्रीन को सिस्टम ऑडियो के साथ उच्च गुणवत्ता में रिकॉर्ड करें।
            </p>
          </div>
        )}
      </div>

      {/* Control Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-purple-500/20">
        <label className="flex items-center gap-2 text-xs font-semibold text-purple-200 cursor-pointer">
          <input
            type="checkbox"
            checked={includeMic}
            disabled={isRecording}
            onChange={(e) => setIncludeMic(e.target.checked)}
            className="w-4 h-4 accent-pink-500 rounded cursor-pointer"
          />
          <Mic className="w-3.5 h-3.5 text-pink-400" />
          <span>माइक्रोफोन वॉयस भी शामिल करें (Include Microphone Audio)</span>
        </label>

        <div className="flex items-center gap-3">
          {isRecording ? (
            <button
              onClick={stopRecording}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-rose-600/30"
            >
              <Square className="w-4 h-4 fill-white" />
              <span>रिकॉर्डिंग स्टॉप करें (Stop)</span>
            </button>
          ) : (
            <button
              onClick={startRecording}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-pink-600/30 flex items-center gap-2 cursor-pointer"
            >
              <MonitorPlay className="w-4 h-4" />
              <span>रिकॉर्डिंग शुरू करें (Start Screen Record)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
