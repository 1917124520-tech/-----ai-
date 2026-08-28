import React from 'react';
import { Mail, Phone, MapPin, Briefcase, Download, Copy, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO, WORK_EXPERIENCE, EDUCATION_INFO } from '../data/portfolioData';

interface ExperienceProps {
  onOpenResume: () => void;
  onShowToast: (msg: string) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onOpenResume, onShowToast }) => {
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`已复制${label}：${text}`);
  };

  return (
    <section
      id="about"
      className="relative py-24 bg-[#06080e] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Main "ABOUT ME" Box: Left Info + Right Portrait */}
        <div className="p-8 sm:p-12 lg:p-14 rounded-3xl ref-card grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Column 1: Left Info & Contacts (7 cols) */}
          <div className="lg:col-span-7 space-y-7 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <span className="text-xs font-mono-code text-blue-400 uppercase tracking-widest font-semibold">
                ABOUT ME // 个人背景
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display text-depth-sub">
                关于我
              </h2>

              <p className="text-base text-gray-300 leading-relaxed font-normal">
                {PERSONAL_INFO.bio}
              </p>
            </div>

            {/* Direct Contact Table */}
            <div className="space-y-3.5 pt-2 border-t border-white/[0.08]">
              {/* Email */}
              <div className="flex items-center justify-between text-xs sm:text-sm py-2 border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5 text-gray-400">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Email 邮箱</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="font-mono-code text-white hover:text-blue-400 transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(PERSONAL_INFO.email, '邮箱')}
                    className="text-gray-500 hover:text-gray-200 transition-colors"
                    title="复制邮箱"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between text-xs sm:text-sm py-2 border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5 text-gray-400">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>Phone 电话</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <a
                    href={`tel:${PERSONAL_INFO.rawPhone}`}
                    className="font-mono-code text-white hover:text-blue-400 transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(PERSONAL_INFO.rawPhone, '电话')}
                    className="text-gray-500 hover:text-gray-200 transition-colors"
                    title="复制电话"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center justify-between text-xs sm:text-sm py-2">
                <div className="flex items-center gap-2.5 text-gray-400">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Location 所在地</span>
                </div>
                <span className="text-gray-200">{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* DOWNLOAD RESUME Button */}
            <div className="pt-2">
              <button
                id="btn-about-download-resume"
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg border border-white/20 hover:border-blue-400 bg-white/[0.03] hover:bg-blue-500/10 text-white hover:text-blue-300 text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span>DOWNLOAD RESUME (简历预览)</span>
                <Download className="w-4 h-4 text-blue-400" />
              </button>
            </div>
          </div>

          {/* Column 2: Portrait with Cursive Signature (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[380px] h-[480px] rounded-2xl overflow-hidden border border-blue-500/20 bg-[#080d1a] shadow-[0_16px_50px_rgba(0,0,0,0.7)] group">
              {/* Subtle tech border gradient */}
              <div className="absolute inset-0 rounded-2xl border border-white/[0.08] pointer-events-none z-20" />

              {/* Top ambient tag */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono-code text-blue-300 font-semibold tracking-wider uppercase">
                  PORTRAIT // 视觉主创
                </span>
              </div>

              {/* Portrait Image with Fine-tuned Visual Styling */}
              <img
                src={PERSONAL_INFO.photo || "https://i.postimg.cc/Ssg9wPMq/tu-ceng-3.png"}
                alt="Zhang Xinkai Profile Portrait"
                className="w-full h-full object-cover object-center filter contrast-[1.06] brightness-[0.98] saturate-[1.02] group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Subtle top & bottom cinematic dark gradients for harmonizing with dark theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-[#06080e]/40 to-transparent opacity-90 pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-60 pointer-events-none z-10" />
              <div className="absolute inset-0 bg-blue-950/10 mix-blend-color pointer-events-none z-10" />

              {/* Signature Overlay */}
              <div className="absolute bottom-6 left-6 z-20 pointer-events-none select-none">
                <span className="font-signature text-5xl sm:text-6xl text-white/95 font-bold tracking-wider drop-shadow-[0_2px_15px_rgba(59,130,246,0.6)]">
                  {PERSONAL_INFO.signature}
                </span>
              </div>

              {/* Corner tech accent */}
              <div className="absolute bottom-6 right-6 z-20 pointer-events-none text-right">
                <div className="text-[10px] font-mono-code text-gray-400/80 uppercase tracking-widest">
                  {PERSONAL_INFO.pinyin}
                </div>
                <div className="text-[9px] font-mono-code text-blue-400/70">
                  DIGITAL MEDIA ART
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Secondary Details: Internship & Education Row */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Internship Card */}
          <div className="p-7 rounded-2xl ref-card space-y-3.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-blue-400 font-mono-code font-bold">
                <Briefcase className="w-4 h-4" />
                <span>实习经历</span>
              </div>
              <span className="text-gray-400 font-mono-code">{WORK_EXPERIENCE[0].period}</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              {WORK_EXPERIENCE[0].company} · <span className="text-blue-300 font-normal text-sm">{WORK_EXPERIENCE[0].role}</span>
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              负责商业科普动画短片、定制 MV 剧本分镜及酒店视觉标识系统设计与工程交付。
            </p>
          </div>

          {/* Education Card */}
          <div className="p-7 rounded-2xl ref-card space-y-3.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-blue-400 font-mono-code font-bold">
                <GraduationCap className="w-4 h-4" />
                <span>教育背景</span>
              </div>
              <span className="text-gray-400 font-mono-code">{EDUCATION_INFO.period}</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              {EDUCATION_INFO.school} · <span className="text-blue-300 font-normal text-sm">{EDUCATION_INFO.major}</span>
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              主修影视后期剪辑、三维建模渲染 (3ds Max / KeyShot)、动态图形设计 (MG) 与数字图像处理。
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
