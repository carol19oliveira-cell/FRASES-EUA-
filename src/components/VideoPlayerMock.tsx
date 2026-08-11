/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Volume2, RotateCcw, Sparkles, Music, Zap } from "lucide-react";

export default function VideoPlayerMock() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [activeTab, setActiveTab] = useState<"tab" | "video">("video");
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.8;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div id="video-section" className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/[0.08] bg-brand-card shadow-2xl shadow-brand-orange/5">
      {/* Top bar with tabs */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-xs font-mono tracking-wider text-slate-400 uppercase">
            DEMO LESSON BREAKDOWN #1
          </span>
        </div>
        <div className="flex gap-2 bg-black/40 p-1 rounded-lg border border-white/[0.05]">
          <button
            onClick={() => setActiveTab("video")}
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${
              activeTab === "video"
                ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Video Lesson
          </button>
          <button
            onClick={() => setActiveTab("tab")}
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${
              activeTab === "tab"
                ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            View Tab & Notation
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
        {/* Ambient background glow inside player */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/5 via-transparent to-brand-amber/5 pointer-events-none" />

        <AnimatePresence mode="wait">
          {activeTab === "video" ? (
            <motion.div
              key="video-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col justify-between"
            >
              {/* Cover background or Video Simulation */}
              {!isPlaying ? (
                <div className="absolute inset-0 bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: "linear-gradient(rgba(6,9,19,0.85), rgba(6,9,19,0.95))" }}>
                  {/* Decorative bass vector lines */}
                  <div className="absolute inset-0 opacity-10 flex flex-col justify-around pointer-events-none">
                    <div className="h-[2px] bg-white w-full" />
                    <div className="h-[2px] bg-white w-full" />
                    <div className="h-[2px] bg-white w-full" />
                    <div className="h-[2px] bg-white w-full" />
                  </div>

                  {/* Play Button Glow Container */}
                  <motion.button
                    onClick={togglePlay}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-r from-brand-orange to-brand-amber flex items-center justify-center text-white shadow-xl shadow-brand-orange/30 cursor-pointer"
                  >
                    <div className="absolute inset-0 rounded-full bg-brand-orange/40 animate-ping" />
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </motion.button>
                  <p className="mt-4 text-sm font-medium text-slate-300 font-sans tracking-wide">
                    Click to hear Funk & Gospel Lick #1
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                    <Zap className="w-3.5 h-3.5 text-brand-orange animate-bounce" />
                    <span className="text-2xs font-mono text-brand-amber uppercase">
                      Pro Tone & Authentic Feel
                    </span>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070914] overflow-hidden">
                  {/* Interactive Bass Fretboard animation */}
                  <div className="w-full max-w-2xl px-6 flex flex-col items-center justify-center gap-6 relative z-10">
                    <div className="text-center">
                      <span className="text-xs font-mono text-brand-orange uppercase tracking-wider block mb-1">PROGRESSION: Am7 | D7(9) | Gmaj7 | Cmaj7</span>
                      <h4 className="text-xl font-bold text-white tracking-tight">Funk & Gospel Groove - Lick #1</h4>
                    </div>

                    {/* Fretboard string simulator */}
                    <div className="w-full bg-slate-900/80 border border-white/10 rounded-lg p-4 relative overflow-hidden backdrop-blur-sm">
                      <div className="absolute top-0 bottom-0 left-1/4 w-[2px] bg-brand-orange/40" />
                      <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-brand-orange/40" />
                      <div className="absolute top-0 bottom-0 left-3/4 w-[2px] bg-brand-orange/40" />

                      {/* 4 Bass Strings */}
                      <div className="flex flex-col gap-4 relative">
                        {/* G String */}
                        <div className="h-[2px] bg-slate-400 w-full relative flex items-center">
                          <span className="absolute -left-2 text-[10px] font-mono text-slate-400">G</span>
                          {isPlaying && progress > 10 && progress < 30 && (
                            <motion.span
                              layoutId="note"
                              className="absolute left-[40%] w-6 h-6 -translate-y-1/2 rounded-full bg-brand-orange flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-brand-orange/50"
                            >
                              5
                            </motion.span>
                          )}
                        </div>
                        {/* D String */}
                        <div className="h-[3px] bg-slate-300 w-full relative flex items-center">
                          <span className="absolute -left-2 text-[10px] font-mono text-slate-300">D</span>
                          {isPlaying && progress > 30 && progress < 60 && (
                            <motion.span
                              layoutId="note"
                              className="absolute left-[65%] w-6 h-6 -translate-y-1/2 rounded-full bg-brand-amber flex items-center justify-center text-[10px] font-bold text-black shadow-lg shadow-brand-amber/50"
                            >
                              7
                            </motion.span>
                          )}
                        </div>
                        {/* A String */}
                        <div className="h-[4px] bg-slate-200 w-full relative flex items-center">
                          <span className="absolute -left-2 text-[10px] font-mono text-slate-200">A</span>
                          {isPlaying && ((progress >= 0 && progress <= 10) || (progress >= 60 && progress < 80)) && (
                            <motion.span
                              layoutId="note"
                              className="absolute left-[20%] w-6 h-6 -translate-y-1/2 rounded-full bg-brand-orange flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-brand-orange/50"
                            >
                              3
                            </motion.span>
                          )}
                        </div>
                        {/* E String */}
                        <div className="h-[5px] bg-amber-800/60 w-full relative flex items-center">
                          <span className="absolute -left-2 text-[10px] font-mono text-amber-700">E</span>
                          {isPlaying && progress >= 80 && (
                            <motion.span
                              layoutId="note"
                              className="absolute left-[80%] w-6 h-6 -translate-y-1/2 rounded-full bg-brand-amber flex items-center justify-center text-[10px] font-bold text-black shadow-lg shadow-brand-amber/50"
                            >
                              5
                            </motion.span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Audio Equalizer Simulation */}
                    <div className="flex items-end justify-center gap-1.5 h-12 w-full max-w-xs">
                      {Array.from({ length: 18 }).map((_, i) => {
                        const randomHeight = isPlaying ? Math.random() * 100 : 15;
                        return (
                          <motion.div
                            key={i}
                            animate={{ height: `${Math.max(15, randomHeight)}%` }}
                            transition={{ repeat: Infinity, duration: 0.3, repeatType: "reverse", delay: i * 0.02 }}
                            className="w-2 bg-gradient-to-t from-brand-orange to-brand-amber rounded-full"
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="tab-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#070914] p-6 flex flex-col justify-center overflow-auto"
            >
              <div className="w-full max-w-2xl mx-auto space-y-4">
                <div className="border border-white/10 rounded-lg p-5 bg-white/[0.02] backdrop-blur-sm font-mono text-xs text-slate-300 space-y-3">
                  <div className="flex justify-between text-2xs text-brand-orange border-b border-white/5 pb-2">
                    <span>LICK #1 (Difficulty: Intermediate)</span>
                    <span>KEY: Am</span>
                  </div>
                  {/* Standard Tab Notation Simulation */}
                  <div className="space-y-2 select-none tracking-widest text-slate-400">
                    <div>G|------------------5-7--5--------------------|</div>
                    <div>D|------------5h7-----------7--5--------------|</div>
                    <div>A|----0--3-5/7--------------------7\5--3-------|</div>
                    <div>E|--5------------------------------------5--3--|</div>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-brand-orange/10 border border-brand-orange/20 rounded-lg p-3 text-xs text-brand-amber">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-orange animate-spin" />
                    <strong>Pro Tip:</strong> Use a smooth slide from fret 5 to 7 on the A-string to lock into that classic syncopated pocket bounce.
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex flex-col gap-3">
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer">
            <div className="h-full bg-gradient-to-r from-brand-orange to-brand-amber transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="text-slate-300 hover:text-brand-orange transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>
              <button
                onClick={handleReset}
                className="text-slate-300 hover:text-brand-orange transition-colors cursor-pointer"
                title="Restart"
              >
                <RotateCcw className="w-4.5 h-4.5" />
              </button>
              <div className="flex items-center gap-1">
                <Volume2 className="w-4.5 h-4.5 text-slate-300" />
                <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-3/4" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xs font-mono text-slate-400">
                {isPlaying ? `00:${Math.floor(progress / 10).toString().padStart(2, "0")}` : "00:00"} / 00:10
              </span>
              <Music className="w-4 h-4 text-brand-orange" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
