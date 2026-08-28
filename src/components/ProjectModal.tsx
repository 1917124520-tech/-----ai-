import React from 'react';
import { X, Calendar, User, CheckCircle2, Layers, Sparkles, ChevronRight, ExternalLink, ZoomIn } from 'lucide-react';
import { Project } from '../types';
import { LightboxImage } from './ImageLightboxModal';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenLightbox: (images: LightboxImage[], initialIndex: number) => void;
  onShowToast: (msg: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenLightbox,
  onShowToast,
}) => {
  if (!project) return null;

  const getAllProjectImages = (): LightboxImage[] => [
    {
      url: project.coverImage,
      title: project.title,
      subtitle: `${project.categoryLabel} · 主视觉`,
      description: project.description,
    },
    ...project.gallery.map((g) => ({
      url: g.image,
      title: `${project.title} - ${g.title}`,
      subtitle: project.categoryLabel,
      description: g.description,
    })),
  ];

  const handleOpenImage = (index: number) => {
    onOpenLightbox(getAllProjectImages(), index);
  };

  return (
    <div
      id="project-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/90 backdrop-blur-xl overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        id="project-modal-card"
        className="relative w-full max-w-5xl my-8 ref-card rounded-3xl shadow-2xl overflow-hidden text-gray-200 border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Floating */}
        <button
          id="btn-close-project-modal"
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-all backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner with Cover Image - Click to Zoom */}
        <div
          onClick={() => handleOpenImage(0)}
          className="relative h-72 sm:h-96 w-full overflow-hidden bg-black/50 cursor-zoom-in group/hero"
          title="点击放大预览封面图"
        >
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover object-center opacity-90 group-hover/hero:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-[#06080e]/40 to-transparent" />

          {/* Zoom hint badge */}
          <div className="absolute top-5 left-5 z-10 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs text-blue-300 flex items-center gap-1.5">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>点击放大查看</span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-end space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-600/30 border border-blue-500/40 text-blue-300 backdrop-blur-md">
                {project.categoryLabel}
              </span>
              <span className="px-3.5 py-1 rounded-full text-xs font-mono-code bg-black/50 border border-white/10 text-gray-300 backdrop-blur-md flex items-center gap-1">
                <Calendar className="w-3 h-3 text-blue-400" />
                {project.date}
              </span>
              <span className="px-3.5 py-1 rounded-full text-xs font-mono-code bg-black/50 border border-white/10 text-blue-300 backdrop-blur-md flex items-center gap-1">
                <User className="w-3 h-3 text-blue-400" />
                {project.role}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-depth-sub">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-mono-code">
              CLIENT // {project.clientOrContext}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
          {/* Key Metrics Bar */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              {project.metrics.map((m, mIdx) => (
                <div key={mIdx} className="space-y-0.5">
                  <div className="text-xs text-gray-400 font-mono-code">{m.label}</div>
                  <div className="text-lg sm:text-xl font-extrabold text-blue-400 font-display">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Project Overview */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>项目概述与设计背景</span>
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              {project.description}
            </p>
          </div>

          {/* Highlights & Technical Breakthroughs */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>设计亮点与技术突破</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-gray-300"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-400 font-mono-code text-[11px] mt-0.5 font-bold">
                    0{idx + 1}
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Storyboard & Gallery Showcase - Click Image to Enlarge */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>分镜解析与视觉画廊</span>
                </h3>
                <span className="text-xs font-mono-code text-gray-400">
                  点击任意图片放大预览
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.gallery.map((g, gIdx) => (
                  <div
                    key={gIdx}
                    onClick={() => handleOpenImage(gIdx + 1)}
                    className="group cursor-zoom-in rounded-2xl overflow-hidden bg-[#070b12] border border-white/[0.08] hover:border-blue-500/50 transition-all space-y-2.5 pb-3"
                    title="点击放大查看"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-black/40">
                      <img
                        src={g.image}
                        alt={g.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="p-2 rounded-full bg-blue-600/90 text-white">
                          <ZoomIn className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                    <div className="px-3.5 space-y-1">
                      <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                        {g.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed">{g.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables and Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-400 font-mono-code uppercase tracking-wider">
                // 交付成果 Deliverables
              </h4>
              <ul className="space-y-1 text-xs text-gray-300">
                {project.deliverables.map((d, dIdx) => (
                  <li key={dIdx} className="flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-400 font-mono-code uppercase tracking-wider">
                // 生产工具栈 Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono-code"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-white/5 bg-black/40 flex items-center justify-between">
          <button
            id="btn-modal-discuss-project"
            type="button"
            onClick={() => {
              onClose();
              const contactEl = document.getElementById('contact');
              if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
              onShowToast(`已为你跳转到联系区域，欢迎探讨【${project.title}】类似设计方案！`);
            }}
            className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-wider transition-colors"
          >
            <span>探讨同类型项目定制</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            id="btn-close-project-modal-footer"
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white/[0.06] hover:bg-white/10 text-white transition-colors"
          >
            返回作品列表
          </button>
        </div>
      </div>
    </div>
  );
};
