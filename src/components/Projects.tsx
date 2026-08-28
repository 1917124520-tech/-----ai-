import React from 'react';
import { Play, ZoomIn, Film, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS_DATA } from '../data/portfolioData';
import { LightboxImage } from './ImageLightboxModal';

interface ProjectsProps {
  onSelectProject?: (project: Project) => void;
  onOpenLightbox: (images: LightboxImage[], initialIndex: number) => void;
  onShowToast: (msg: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  onOpenLightbox,
  onShowToast,
}) => {
  // Open media in full screen lightbox
  const handleOpenMedia = (project: Project, mediaIndex: number) => {
    const mediaList: LightboxImage[] = (project.mediaItems || []).map((m) => ({
      url: m.url,
      type: m.type,
      poster: m.poster,
      title: `${project.title} · ${m.title}`,
      subtitle: `${project.categoryLabel} (${m.tag || '高清展示'})`,
      description: m.description || project.summary,
      tag: m.tag,
    }));

    if (mediaList.length === 0) {
      mediaList.push({
        url: project.coverImage,
        type: project.videoUrl ? 'video' : 'image',
        title: project.title,
        subtitle: project.categoryLabel,
        description: project.description,
      });
    }

    onOpenLightbox(mediaList, mediaIndex);
    onShowToast(`已放大查看「${project.title} - ${mediaIndex + 1}」`);
  };

  return (
    <section
      id="projects"
      className="relative py-24 bg-[#06080e] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/30 text-xs font-mono-code text-blue-400 uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIO // 精选作品</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display text-depth-sub">
            精选作品集
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
            涵盖 AI 动画短片、空间导视系统、商业画册排版及 AE 动态图形 (MG)。下方直接呈现成片与设计图稿，点击即可放大查看。
          </p>
        </div>

        {/* Static, High-Impact Projects List */}
        <div className="space-y-16">
          {PROJECTS_DATA.map((project) => {
            const mediaList = project.mediaItems || [];

            return (
              <div
                key={project.id}
                id={`project-${project.id}`}
                className="p-8 sm:p-10 lg:p-12 rounded-3xl ref-card bg-[#070b12]/90 border border-white/[0.08] space-y-8"
              >
                {/* Project Header Info */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-mono-code font-semibold uppercase">
                        {project.categoryLabel}
                      </span>
                      <span className="text-xs font-mono-code text-gray-400">
                        {project.date} · {project.clientOrContext}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Tools Stack Tags */}
                  <div className="flex flex-wrap gap-2 lg:justify-end items-center max-w-sm">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono-code text-gray-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Media Gallery Grid - Simplified clean 1, 2, 3... numbering */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                  {mediaList.map((media, mIdx) => {
                    const isEmbed = Boolean(
                      media.url &&
                      (media.url.includes('open.douyin.com') ||
                       media.url.includes('bilibili.com') ||
                       media.url.includes('youtube.com') ||
                       media.url.includes('player') ||
                       media.url.includes('embed'))
                    );
                    const isVideo = media.type === 'video' || isEmbed;

                    return (
                      <div
                        key={media.id}
                        onClick={() => handleOpenMedia(project, mIdx)}
                        className="group relative rounded-2xl overflow-hidden border border-white/[0.08] hover:border-blue-500/50 bg-black/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                      >
                        {/* Media Thumbnail Container */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/80">
                          {isVideo ? (
                            <>
                              {/* Video thumbnail rendering actual video first frame or custom poster or embed */}
                              {isEmbed ? (
                                <div className="w-full h-full relative overflow-hidden bg-[#0c101b] flex items-center justify-center">
                                  <iframe
                                    src={media.url}
                                    className="w-[120%] h-[120%] -m-[10%] pointer-events-none scale-100 opacity-80"
                                    referrerPolicy="unsafe-url"
                                    tabIndex={-1}
                                  />
                                </div>
                              ) : media.poster && !media.poster.includes('unsplash') ? (
                                <img
                                  src={media.poster}
                                  alt={media.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              ) : (
                                <video
                                  src={`${media.url}#t=0.001`}
                                  preload="metadata"
                                  playsInline
                                  muted
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                                />
                              )}
                              {/* Video Play Overlay */}
                              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                                <div className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-transform">
                                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                                </div>
                              </div>
                              {/* Video badge */}
                              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono-code font-bold text-blue-300 flex items-center gap-1.5">
                                <Film className="w-3 h-3" />
                                <span>{mIdx + 1}</span>
                              </div>
                            </>
                          ) : (
                            <>
                              {/* Image thumbnail */}
                              <img
                                src={media.url}
                                alt={media.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              {/* Zoom in Hover Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                                  <ZoomIn className="w-4 h-4 text-blue-400" />
                                </div>
                              </div>
                              {/* Image badge */}
                              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono-code font-bold text-gray-200 flex items-center gap-1.5">
                                <ImageIcon className="w-3 h-3 text-blue-400" />
                                <span>{mIdx + 1}</span>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Media Caption underneath - Clean and simple number title */}
                        <div className="p-3 bg-[#090d16] border-t border-white/[0.06] flex items-center justify-between">
                          <span className="text-sm font-bold font-mono-code text-white group-hover:text-blue-300 transition-colors">
                            {mIdx + 1}
                          </span>
                          <span className="text-[11px] font-mono-code text-gray-500">
                            {isVideo ? 'VIDEO' : 'IMAGE'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
