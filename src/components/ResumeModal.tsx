import React, { useState } from 'react';
import { X, FileText, Image as ImageIcon, Download, Phone, Mail, MapPin, GraduationCap, Briefcase, Award, CheckCircle, Copy } from 'lucide-react';
import { PERSONAL_INFO, WORK_EXPERIENCE, EDUCATION_INFO, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'structured' | 'original'>('structured');

  if (!isOpen) return null;

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`已成功复制${label}：${text}`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="resume-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="resume-modal-content"
        className="relative w-full max-w-5xl my-8 glass-card neo-glow rounded-3xl shadow-2xl overflow-hidden text-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-indigo-400 font-mono-code text-xs font-bold">
              RES
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide font-display">
                张鑫凯 · 个人简历档案
              </h3>
              <p className="text-[10px] text-gray-400 font-mono-code uppercase tracking-widest">
                ZHANG XINKAI // RESUME & CREDENTIALS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab switch */}
            <div className="flex items-center glass-card p-1 rounded-full">
              <button
                id="btn-resume-tab-structured"
                type="button"
                onClick={() => setActiveTab('structured')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'structured'
                    ? 'bg-indigo-500/25 text-white border border-indigo-500/40 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>电子简历</span>
              </button>
              <button
                id="btn-resume-tab-original"
                type="button"
                onClick={() => setActiveTab('original')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'original'
                    ? 'bg-indigo-500/25 text-white border border-indigo-500/40 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>原始档案扫描件</span>
              </button>
            </div>

            <button
              id="btn-print-resume"
              type="button"
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider glass-card text-gray-200 hover:text-white hover:border-indigo-500/40 transition-colors"
              title="打印 / 保存为 PDF"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>保存/打印</span>
            </button>

            <button
              id="btn-close-resume-modal"
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-white glass-card transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8 space-y-8">
          {activeTab === 'original' ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 glass-card rounded-2xl max-w-3xl w-full flex justify-between items-center text-xs text-gray-300">
                <span>📄 原始简历档案：包含个人信息、华北理工大学轻工学院、唐山巴渡科技实习实战及项目经历</span>
                <span className="font-mono-code text-indigo-400 font-bold">STATUS: VERIFIED</span>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-2xl bg-white max-w-3xl w-full">
                {/* Visual Representation of Resume Document */}
                <div className="p-8 bg-[#fdfdfd] text-slate-800 text-sm font-sans space-y-6">
                  <div className="flex justify-between items-start border-b-2 border-[#1e3a5f] pb-4">
                    <div>
                      <h1 className="text-3xl font-extrabold tracking-tight text-[#1e3a5f]">个人简历 <span className="text-base font-normal text-slate-500 font-mono">Personal resume</span></h1>
                      <p className="text-xs text-slate-500 mt-1 italic">细心从每一个小细节开始。</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded font-medium">视觉设计</span>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded font-medium">AI 视频</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-medium">品牌 VI</span>
                    </div>
                  </div>

                  {/* Top Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="space-y-1.5 text-xs text-slate-700">
                      <p><span className="font-bold text-slate-900">姓　　名：</span>张鑫凯</p>
                      <p><span className="font-bold text-slate-900">民　　族：</span>汉</p>
                      <p><span className="font-bold text-slate-900">电　　话：</span>16682049558</p>
                      <p><span className="font-bold text-slate-900">邮　　箱：</span>1917124520@qq.com</p>
                      <p><span className="font-bold text-slate-900">住　　址：</span>河北省邯郸市</p>
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      <p><span className="font-bold text-slate-900">出生年月：</span>2004.02</p>
                      <p><span className="font-bold text-slate-900">身　　高：</span>177cm</p>
                      <p><span className="font-bold text-slate-900">政治面貌：</span>群众</p>
                      <p><span className="font-bold text-slate-900">毕业院校：</span>华北理工大学轻工学院</p>
                      <p><span className="font-bold text-slate-900">学　　历：</span>本科 (2023.09 - 2027.07)</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 bg-white rounded border border-slate-200">
                      <div className="w-20 h-24 bg-slate-900 rounded overflow-hidden flex items-center justify-center border border-slate-300">
                        {PERSONAL_INFO.photo ? (
                          <img
                            src={PERSONAL_INFO.photo}
                            alt="张鑫凯 证件照"
                            className="w-full h-full object-cover object-center filter contrast-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center text-indigo-300 font-bold text-xl">
                            张
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1">张鑫凯 · 证件照</span>
                    </div>
                  </div>

                  {/* Education & Experience */}
                  <div className="space-y-3">
                    <div className="bg-[#1e3a5f] text-white px-3 py-1 text-xs font-bold rounded-sm">教育背景</div>
                    <div className="text-xs text-slate-700 space-y-1 pl-2">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>2023.09 - 2027.07</span>
                        <span>华北理工大学轻工学院</span>
                        <span>数字媒体艺术（本科）</span>
                      </div>
                      <p className="text-slate-600"><span className="font-semibold">核心课程：</span>影视后期剪辑技术，数字摄影与摄像，剧本创作，动态图形设计，数字图像处理，分镜头脚本设计，(PR, AE, PS, 剪映, unity)</p>
                      <p className="text-slate-600"><span className="font-semibold">专业技能：</span>精通 (Pr, Ae, 剪映, 达芬奇) 剪辑软件，对于建模软件 (3DMAX)，渲染软件 (KeyShot)，游戏引擎 (Unity)，平面设计 (Ps)，熟练掌握。</p>
                    </div>
                  </div>

                  {/* Internship */}
                  <div className="space-y-3">
                    <div className="bg-[#1e3a5f] text-white px-3 py-1 text-xs font-bold rounded-sm">实习经历</div>
                    <div className="text-xs text-slate-700 space-y-2 pl-2">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>2025.8 - 2026.08</span>
                        <span>唐山巴渡科技有限公司</span>
                        <span>数媒设计（实习生）</span>
                      </div>
                      <ul className="list-disc list-inside text-slate-600 space-y-1 leading-relaxed">
                        <li>对接各类企业客户需求，独立承接平面视觉设计工作，使用 Photoshop 完成宣传画册、校园展板、校徽、酒店标识系统等多类型商用版式设计，输出标准化设计物料；</li>
                        <li>负责影视后期全流程制作，运用 PR、AE、剪映完成产品宣传片剪辑、动态特效包装，结合 AI 创作工具完成动画短片、商业 MV 的素材生成、画面合成与成片输出；</li>
                        <li>参与三维视觉项目，使用 3ds Max 完成模型搭建，借助 Keyshot 进行产品、场景渲染，结合 AI 工具优化画面视觉效果，输出效果图；</li>
                        <li>独立完成创意前期工作，包含剧本撰写、分镜设计、人物形象策划，配合项目需求持续迭代方案，按时完成项目交付；</li>
                        <li>持续对接客户沟通修改意见，协调项目进度，保障多项设计、视频项目顺利落地商用。</li>
                      </ul>
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="space-y-3">
                    <div className="bg-[#1e3a5f] text-white px-3 py-1 text-xs font-bold rounded-sm">项目经历</div>
                    <div className="text-xs text-slate-700 space-y-2.5 pl-2">
                      <div>
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>● 企业科普 AI 系列动画短片</span>
                          <span className="text-slate-500 font-normal">项目时间：2025.09 - 2025.10</span>
                        </div>
                        <p className="text-slate-600 mt-0.5">担任视觉主创，独立完成前期分镜设计、AI 人物形象设定；依托 AI 视频工具生成动画素材，结合 AE、剪映完成后期剪辑与画面包装，完成三集科普动画成片，交付客户商用。</p>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>● 商业店铺定制 MV 创作项目</span>
                          <span className="text-slate-500 font-normal">项目时间：2025.11 - 2025.12</span>
                        </div>
                        <p className="text-slate-600 mt-0.5">负责项目全流程创作，独立完成剧本、歌词撰写；利用 AI 图像、视频生成工具制作画面素材，通过 AE 进行特效处理、剪映完成剪辑调色，最终 MV 成片顺利交付使用。</p>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>● 酒店整套视觉标识系统设计</span>
                          <span className="text-slate-500 font-normal">项目时间：2026.01</span>
                        </div>
                        <p className="text-slate-600 mt-0.5">根据酒店品牌定位进行视觉规划，使用 Photoshop 完成全套导向标识、视觉版式设计，统一整套视觉规范；方案一次性通过客户审核，设计成果落地投入使用。</p>
                      </div>
                    </div>
                  </div>

                  {/* Self assessment */}
                  <div className="space-y-2">
                    <div className="bg-[#1e3a5f] text-white px-3 py-1 text-xs font-bold rounded-sm">自我评价</div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-2">
                      热爱数字创作，掌握平面设计、影视后期、三维渲染多项技能，能够独立完成海报画册、宣传短片、效果图等多媒体物料制作。具备剧本、分镜前期策划能力，熟悉商业项目交付流程；拥有实习落地经验，擅长对接需求持续优化方案，工作踏实高效，乐于主动接触各类新型软件与 AI 创作技术，拥有较强自主学习能力，持续跟进行业创作工具发展，拥有良好审美与团队协作意识。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Header Profile Info in Dark Mode */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-3xl glass-card neo-glow">
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 rounded-2xl glass-card border border-indigo-400/40 p-1 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {PERSONAL_INFO.photo ? (
                      <img
                        src={PERSONAL_INFO.photo}
                        alt="张鑫凯 头像"
                        className="w-full h-full object-cover rounded-xl filter contrast-105"
                      />
                    ) : (
                      <div className="w-full h-full rounded-xl bg-black/40 flex items-center justify-center text-2xl font-bold accent-gradient-text font-display">
                        ZXK
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-white">{PERSONAL_INFO.name}</h2>
                      <span className="text-xs px-3 py-0.5 rounded-full glass-card text-indigo-300 font-mono-code font-semibold">
                        本科在读 · 2027届
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1 font-medium">{PERSONAL_INFO.title}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-indigo-400" />{PERSONAL_INFO.location}</span>
                      <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5 text-indigo-400" />华北理工大学轻工学院</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    id="modal-copy-phone"
                    type="button"
                    onClick={() => copyText(PERSONAL_INFO.phone, '电话')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-card text-xs text-gray-200 hover:text-white hover:border-indigo-500/40 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-indigo-400" />
                    <span>16682049558</span>
                    <Copy className="w-3 h-3 text-gray-400 ml-1" />
                  </button>
                  <button
                    id="modal-copy-email"
                    type="button"
                    onClick={() => copyText(PERSONAL_INFO.email, '邮箱')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-card text-xs text-gray-200 hover:text-white hover:border-indigo-500/40 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    <span>1917124520@qq.com</span>
                    <Copy className="w-3 h-3 text-gray-400 ml-1" />
                  </button>
                </div>
              </div>

              {/* Education Box */}
              <div className="p-6 sm:p-8 rounded-3xl glass-card space-y-4">
                <div className="flex items-center gap-2.5 text-indigo-400 font-semibold text-sm">
                  <GraduationCap className="w-4 h-4" />
                  <span className="uppercase tracking-wider font-bold">教育背景 / Education</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm font-medium text-white border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">{EDUCATION_INFO.school}</span>
                    <span className="text-xs text-indigo-300 px-3 py-0.5 rounded-full glass-card font-semibold">
                      {EDUCATION_INFO.major}
                    </span>
                  </div>
                  <span className="text-xs font-mono-code text-gray-400 mt-1 sm:mt-0">{EDUCATION_INFO.period}</span>
                </div>
                <div className="space-y-2 text-xs text-gray-300">
                  <p><span className="text-gray-400 font-medium">核心主修：</span>{EDUCATION_INFO.courses.join(' · ')}</p>
                  <p><span className="text-gray-400 font-medium">技能认证：</span>{EDUCATION_INFO.skills.join('；')}</p>
                </div>
              </div>

              {/* Work Experience */}
              <div className="p-6 sm:p-8 rounded-3xl glass-card space-y-4">
                <div className="flex items-center gap-2.5 text-indigo-400 font-semibold text-sm">
                  <Briefcase className="w-4 h-4" />
                  <span className="uppercase tracking-wider font-bold">实习经历 / Practical Experience</span>
                </div>
                {WORK_EXPERIENCE.map((exp, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-white">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-white">{exp.company}</span>
                        <span className="text-xs text-purple-300 px-3 py-0.5 rounded-full glass-card font-semibold">
                          {exp.role}
                        </span>
                      </div>
                      <span className="text-xs font-mono-code text-gray-400 mt-1 sm:mt-0">{exp.period}</span>
                    </div>
                    <ul className="space-y-2 text-xs text-gray-300 pl-4 border-l border-indigo-500/20">
                      {exp.responsibilities.map((r, rIdx) => (
                        <li key={rIdx} className="leading-relaxed">{r}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="text-[11px] px-3 py-0.5 rounded-full glass-card text-gray-300 font-mono-code">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Skill Matrix Grid */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 text-indigo-400 font-semibold text-sm">
                  <Award className="w-4 h-4" />
                  <span className="uppercase tracking-wider font-bold">核心技能图谱 / Skill Matrix</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SKILL_CATEGORIES.map((cat, cIdx) => (
                    <div key={cIdx} className="p-5 rounded-2xl glass-card space-y-3">
                      <h4 className="text-xs font-bold text-white flex items-center justify-between">
                        <span>{cat.title}</span>
                        <span className="text-[10px] text-gray-400 font-mono-code">{cat.skills.length} 工具栈</span>
                      </h4>
                      <div className="space-y-2">
                        {cat.skills.map((skill, sIdx) => (
                          <div key={sIdx} className="space-y-1">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-gray-300 font-medium">{skill.name}</span>
                              <span className="text-indigo-300 font-mono-code font-bold">{skill.levelLabel} ({skill.level}%)</span>
                            </div>
                            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                              <div
                                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-white/5 bg-black/40 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-gray-400 font-mono-code">
            随时沟通商业设计合作 / 毕业实习 / 全职设计需求
          </div>
          <div className="flex items-center gap-3">
            <button
              id="btn-close-resume-bottom"
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider glass-card text-gray-200 hover:text-white transition-colors"
            >
              关闭窗口
            </button>
            <a
              id="btn-direct-contact-modal"
              href="#contact"
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider accent-gradient text-white shadow-md neo-glow"
            >
              立即预约合作
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
