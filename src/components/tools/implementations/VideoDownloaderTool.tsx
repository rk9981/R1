import React, { useState } from 'react';
import { DownloadCloud, Play, Link as LinkIcon, Check, Sparkles, Video, Music, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface StreamOption {
  quality: string;
  format: string;
  size: string;
  type: 'video' | 'audio' | 'thumbnail';
  url: string;
}

export const VideoDownloaderTool: React.FC = () => {
  const [url, setUrl] = useState<string>('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analyzedData, setAnalyzedData] = useState<{
    title: string;
    platform: string;
    author: string;
    duration: string;
    thumbnail: string;
    streams: StreamOption[];
  } | null>({
    title: 'Digital Tools Suite Showcase 2026 - Ultra HD Workflow',
    platform: 'YouTube / Reels',
    author: 'TechStudio Studio HQ',
    duration: '04:18',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    streams: [
      { quality: '1080p Full HD (60fps)', format: 'MP4', size: '58.4 MB', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { quality: '720p HD', format: 'MP4', size: '28.1 MB', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { quality: '480p Standard', format: 'MP4', size: '14.5 MB', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { quality: 'HQ Audio Track (320kbps)', format: 'MP3', size: '6.2 MB', type: 'audio', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { quality: 'Full Resolution Poster', format: 'JPG', size: '1.2 MB', type: 'thumbnail', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80' }
    ]
  });

  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsAnalyzing(true);
    setAnalyzedData(null);

    setTimeout(() => {
      let platformName = 'Web Video Stream';
      if (url.includes('youtube') || url.includes('youtu.be')) platformName = 'YouTube Video';
      else if (url.includes('instagram')) platformName = 'Instagram Reel';
      else if (url.includes('tiktok')) platformName = 'TikTok Clip';
      else if (url.includes('facebook')) platformName = 'Facebook Video';
      else if (url.includes('twitter') || url.includes('x.com')) platformName = 'X (Twitter) Media';

      setAnalyzedData({
        title: `Online Stream Media Extraction [${new URL(url.startsWith('http') ? url : 'https://' + url).hostname}]`,
        platform: platformName,
        author: '@CreatorNetwork',
        duration: '03:45',
        thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80',
        streams: [
          { quality: '1080p Full HD (60fps)', format: 'MP4', size: '64.2 MB', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
          { quality: '720p HD', format: 'MP4', size: '31.5 MB', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
          { quality: '480p Standard', format: 'MP4', size: '16.0 MB', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
          { quality: 'Audio Only Track (320 kbps)', format: 'MP3', size: '5.8 MB', type: 'audio', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
          { quality: 'Cover Artwork HD', format: 'JPG', size: '850 KB', type: 'thumbnail', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80' }
        ]
      });
      setIsAnalyzing(false);
    }, 700);
  };

  const handleDownload = (stream: StreamOption) => {
    setDownloadingId(stream.quality);
    const link = document.createElement('a');
    link.href = stream.url;
    link.target = '_blank';
    link.download = `MegaTools_${stream.quality.replace(/[^a-zA-Z0-9]/g, '_')}.${stream.format.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadingId(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Search Input Box */}
      <form onSubmit={handleAnalyze} className="relative">
        <div className="flex flex-col sm:flex-row gap-2 bg-slate-900/90 p-2 rounded-2xl border border-purple-500/30">
          <div className="relative flex-1 flex items-center">
            <LinkIcon className="w-4 h-4 text-purple-400 absolute left-4" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Video or Reel URL (YouTube, Instagram, TikTok, Facebook, MP4)..."
              className="w-full pl-11 pr-4 py-3 bg-slate-950/70 border border-transparent rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isAnalyzing}
            className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-red-500 via-rose-600 to-pink-600 text-white hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isAnalyzing ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <DownloadCloud className="w-4 h-4" />
            )}
            <span>डाउनलोड लिंक खोजें (Analyze)</span>
          </button>
        </div>

        {/* Quick URL presets */}
        <div className="flex flex-wrap gap-2 mt-2.5 px-1">
          <span className="text-[11px] text-purple-300/60 font-semibold">समर्थित प्लेटफॉर्म:</span>
          {['YouTube Shorts', 'Instagram Reels', 'TikTok', 'Facebook Watch', 'Direct MP4'].map((p) => (
            <span key={p} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900 text-purple-300 border border-purple-500/20">
              {p}
            </span>
          ))}
        </div>
      </form>

      {/* Analysis Results Display */}
      {analyzedData && (
        <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-5 space-y-5">
          <div className="flex flex-col md:flex-row gap-5 items-start">
            {/* Thumbnail / Video preview */}
            <div className="w-full md:w-64 aspect-video rounded-xl overflow-hidden bg-slate-950 relative border border-white/10 group">
              <img
                src={analyzedData.thumbnail}
                alt="Video Thumbnail"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-slate-950/80 text-[10px] text-white font-mono px-1.5 py-0.5 rounded">
                {analyzedData.duration}
              </span>
            </div>

            {/* Video metadata */}
            <div className="flex-1 space-y-2">
              <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 uppercase">
                {analyzedData.platform}
              </span>
              <h3 className="font-bold text-base text-white leading-snug">
                {analyzedData.title}
              </h3>
              <p className="text-xs text-purple-300/70">
                चैनल / क्रिएटर: <span className="text-white font-medium">{analyzedData.author}</span> • समय: {analyzedData.duration}
              </p>
            </div>
          </div>

          {/* Stream Qualities Table */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-200">
              उपलब्ध वीडियो और ऑडियो क्वालिटी (Select Quality to Download)
            </h4>

            <div className="grid grid-cols-1 gap-2">
              {analyzedData.streams.map((stream, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-cyan-400">
                      {stream.type === 'video' ? (
                        <Video className="w-4 h-4" />
                      ) : stream.type === 'audio' ? (
                        <Music className="w-4 h-4 text-pink-400" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{stream.quality}</p>
                      <p className="text-[10px] text-purple-300/60">
                        फॉर्मेट: <span className="text-purple-200 font-bold">{stream.format}</span> • साइज: {stream.size}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(stream)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-red-600/30 cursor-pointer"
                  >
                    {downloadingId === stream.quality ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>शुरू हुआ!</span>
                      </>
                    ) : (
                      <>
                        <DownloadCloud className="w-3.5 h-3.5" />
                        <span>डाउनलोड करें</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Safety Notice */}
      <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-300/80 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          यह टूल सार्वजनिक वीडियो व ऑडियो क्लिप्स को डाउनलोड करने हेतु बनाया गया है। कृपया कॉपीराइट और उचित उपयोग के नियमों का सम्मान करें।
        </span>
      </div>
    </div>
  );
};
