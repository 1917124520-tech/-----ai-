export interface ProjectMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  poster?: string;
  embedUrl?: string;
  isEmbed?: boolean;
  title: string;
  description?: string;
  tag?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'ai-video' | 'commercial-mv' | 'brand-vi' | '3d-render' | 'graphic';
  categoryLabel: string;
  date: string;
  clientOrContext: string;
  role: string;
  summary: string;
  description: string;
  highlights: string[];
  tools: string[];
  coverImage: string;
  videoUrl?: string;
  mediaItems?: ProjectMedia[];
  gallery: {
    title: string;
    description: string;
    image: string;
  }[];
  metrics?: {
    label: string;
    value: string;
  }[];
  deliverables: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  type: string;
  location: string;
  responsibilities: string[];
  achievements: string[];
  techStack: string[];
}

export interface EducationItem {
  school: string;
  major: string;
  degree: string;
  period: string;
  courses: string[];
  skills: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number;
    levelLabel: string;
    highlight?: boolean;
    tag: string;
  }[];
}

export interface Advantage {
  id: string;
  title: string;
  description: string;
  iconType: string;
}
