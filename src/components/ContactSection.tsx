import React from 'react';
import { Mail, Phone, MapPin, Copy, FileText, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { DigitalGlobe } from './DigitalGlobe';

interface ContactSectionProps {
  onOpenResume: () => void;
  onShowToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenResume,
  onShowToast,
}) => {
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`已复制${label}：${text}`);
  };

  return (
    <section
      id="contact"
      className="relative py-28 bg-[#06080e] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Holographic Digital Globe */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <DigitalGlobe />
      </div>

      <div className="relative z-10 max-w-[1200px] w-full mx-auto px-6 sm:px-12 lg:px-16 my-auto">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <span className="text-xs font-mono-code text-blue-400 uppercase tracking-widest font-semibold">
            GET IN TOUCH // 建立联络
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-display text-depth-sub">
            联系我
          </h2>
          <p className="text-base text-gray-300 leading-relaxed">
            随时欢迎就全职机会、实习意向或商业项目展开交流探讨。
          </p>
        </div>

        {/* Clean Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* Card 1: Email Card */}
          <div className="p-8 rounded-2xl ref-card bg-[#070b12]/90 border border-white/[0.08] hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-6 group">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => handleCopy(PERSONAL_INFO.email, '邮箱')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono-code text-gray-400 hover:text-white border border-white/[0.08] transition-all"
                title="复制邮箱"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>复制</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-mono-code text-gray-400 uppercase tracking-wider">Direct Email 电子邮箱</div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-lg sm:text-xl font-bold text-white hover:text-blue-400 transition-colors font-mono-code flex items-center gap-2"
              >
                <span>{PERSONAL_INFO.email}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Card 2: Phone Card */}
          <div className="p-8 rounded-2xl ref-card bg-[#070b12]/90 border border-white/[0.08] hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-6 group">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => handleCopy(PERSONAL_INFO.rawPhone, '电话')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono-code text-gray-400 hover:text-white border border-white/[0.08] transition-all"
                title="复制电话"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>复制</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-mono-code text-gray-400 uppercase tracking-wider">Phone / WeChat 联系电话 / 微信</div>
              <a
                href={`tel:${PERSONAL_INFO.rawPhone}`}
                className="text-lg sm:text-xl font-bold text-white hover:text-blue-400 transition-colors font-mono-code flex items-center gap-2"
              >
                <span>{PERSONAL_INFO.phone}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Location & Resume Bar */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl ref-card bg-[#070b12]/80 border border-white/[0.08] max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] text-blue-400 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono-code text-gray-400 uppercase">工作所在地</div>
              <div className="text-sm font-semibold text-white">{PERSONAL_INFO.location} · 支持远程协同与随时到岗</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/35 border border-blue-500/40 text-blue-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all shrink-0"
          >
            <FileText className="w-4 h-4" />
            <span>查看完整中文简历</span>
          </button>
        </div>

        {/* Minimal Footer */}
        <div className="mt-20 pt-8 border-t border-white/[0.06] text-center text-xs font-mono-code text-gray-500">
          © {new Date().getFullYear()} {PERSONAL_INFO.name} ({PERSONAL_INFO.enName}) · DIGITAL PORTFOLIO
        </div>

      </div>
    </section>
  );
};
