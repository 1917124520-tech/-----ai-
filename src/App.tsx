import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Capabilities } from './components/Capabilities';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { ImageLightboxModal, LightboxImage } from './components/ImageLightboxModal';
import { Toast } from './components/Toast';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Image Lightbox Viewer state
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleOpenLightbox = (images: LightboxImage[], initialIndex: number) => {
    setLightboxImages(images);
    setLightboxIndex(initialIndex);
    setIsLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#06080e] text-[#e2e8f0] relative overflow-x-hidden selection:bg-blue-600/30 selection:text-blue-200 font-sans">
      {/* Subtle Reference Theme Ambient Glows */}
      <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="fixed -bottom-40 -right-40 w-[650px] h-[650px] bg-blue-900/10 blur-[170px] rounded-full pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-950/5 blur-[220px] rounded-full pointer-events-none z-0" />

      {/* 1. Fullscreen Hero (Clean, without top overlay menu) */}
      <Hero
        onOpenResume={() => setIsResumeModalOpen(true)}
        onShowToast={showToast}
      />

      {/* 2. Experience & Profile Section */}
      <Experience
        onOpenResume={() => setIsResumeModalOpen(true)}
        onShowToast={showToast}
      />

      {/* 3. Featured Commercial Works Section with Auto-Scroll & Lightbox Preview */}
      <Projects
        onSelectProject={(project) => setSelectedProject(project)}
        onOpenLightbox={handleOpenLightbox}
        onShowToast={showToast}
      />

      {/* 4. Capabilities & Advantages Section */}
      <Capabilities
        onOpenResume={() => setIsResumeModalOpen(true)}
        onShowToast={showToast}
      />

      {/* 5. Terminal Full-Screen Contact Section */}
      <ContactSection
        onOpenResume={() => setIsResumeModalOpen(true)}
        onShowToast={showToast}
      />

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenLightbox={handleOpenLightbox}
        onShowToast={showToast}
      />

      {/* Full Resume Preview & Download Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Fullscreen High-Res Image Lightbox Modal */}
      <ImageLightboxModal
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
