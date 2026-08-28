import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Play, Film } from 'lucide-react';

export interface LightboxImage {
  url: string;
  type?: 'image' | 'video';
  poster?: string;
  title: string;
  subtitle?: string;
  description?: string;
  tag?: string;
}

interface ImageLightboxModalProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (newIndex: number) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [scale, setScale] = useState(1);
  const [activeIdx, setActiveIdx] = useState(currentIndex);

  useEffect(() => {
    setActiveIdx(currentIndex);
    setScale(1);
  }, [currentIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && images.length > 1) {
        handlePrev();
      }
      if (e.key === 'ArrowRight' && images.length > 1) {
        handleNext();
      }
      if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      }
      if (e.key === '-') {
        handleZoomOut();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIdx, images.length]);

  if (!isOpen || images.length === 0) return null;

  const currentMedia = images[activeIdx] || images[0];
  const isEmbed = Boolean(
    currentMedia.url &&
    (currentMedia.url.includes('open.douyin.com') ||
     currentMedia.url.includes('bilibili.com') ||
     currentMedia.url.includes('youtube.com') ||
     currentMedia.url.includes('player') ||
     currentMedia.url.includes('embed'))
  );
  const isVideo = currentMedia.type === 'video' || isEmbed || currentMedia.url.endsWith('.mp4') || currentMedia.url.includes('video');

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newIdx = activeIdx > 0 ? activeIdx - 1 : images.length - 1;
    setActiveIdx(newIdx);
    setScale(1);
    onNavigate?.(newIdx);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newIdx = activeIdx < images.length - 1 ? activeIdx + 1 : 0;
    setActiveIdx(newIdx);
    setScale(1);
    onNavigate?.(newIdx);
  };

  const handleZoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale((prev) => Math.min(prev + 0.35, 3));
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale((prev) => Math.max(prev - 0.35, 0.6));
  };

  const handleResetZoom = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(1);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/94 backdrop-blur-2xl animate-fade-in select-none"
      onClick={onClose}
    >
      {/* Top Floating Header & Controls */}
      <div
        className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between z-30 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title & Counter */}
        <div className="space-y-0.5 max-w-xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-code text-blue-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              {isVideo ? <Film className="w-3.5 h-3.5" /> : null}
              <span>{isVideo ? 'VIDEO PREVIEW' : 'IMAGE PREVIEW'} // 0{activeIdx + 1} / 0{images.length}</span>
            </span>
            {!isVideo && scale !== 1 && (
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono-code">
                {Math.round(scale * 100)}%
              </span>
            )}
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white tracking-wide truncate">
            {currentMedia.title}
          </h3>
          {currentMedia.subtitle && (
            <p className="text-xs text-gray-400 hidden sm:block truncate">
              {currentMedia.subtitle}
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {!isVideo && (
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/10">
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                title="放大 (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                title="缩小 (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              {scale !== 1 && (
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="p-2 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-white/10 transition-colors"
                  title="重置缩放"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-300 border border-white/10 hover:border-red-500/40 transition-colors"
            title="关闭 (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Media Stage */}
      <div
        className="relative w-full h-full flex items-center justify-center p-4 sm:p-12 overflow-hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {isVideo ? (
          isEmbed ? (
            <div
              className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] max-h-[82vh] rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-white/15 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={currentMedia.url}
                className="absolute inset-0 w-full h-full border-0"
                referrerPolicy="unsafe-url"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </div>
          ) : (
            <div
              className="relative max-w-5xl w-full max-h-[82vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-white/15 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={currentMedia.url}
                poster={currentMedia.poster}
                controls
                autoPlay
                playsInline
                className="w-full h-full max-h-[78vh] object-contain"
              />
            </div>
          )
        ) : (
          <div
            className="relative max-w-full max-h-full flex items-center justify-center transition-transform duration-200 ease-out"
            style={{ transform: `scale(${scale})` }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentMedia.url}
              alt={currentMedia.title}
              className="max-h-[80vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-white/10"
              style={{ cursor: scale > 1 ? 'grab' : 'zoom-in' }}
              onClick={() => {
                if (scale === 1) setScale(1.6);
                else setScale(1);
              }}
            />
          </div>
        )}

        {/* Previous / Next Arrow Controls */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-blue-600/80 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-105 active:scale-95 z-20"
              title="上一个 (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-blue-600/80 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-105 active:scale-95 z-20"
              title="下一个 (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Bottom Description Bar */}
      {currentMedia.description && (
        <div
          className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-center justify-center pointer-events-auto z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-2xl px-5 py-2.5 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md text-center">
            <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">
              {currentMedia.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
