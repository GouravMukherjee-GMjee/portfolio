import { lazy, Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";

const lazySection = (load: () => Promise<Record<string, React.ComponentType>>, name: string) =>
  lazy(() => load().then((m) => ({ default: m[name] })));

const About = lazySection(() => import("@/components/sections/About"), "About");
const DesignProcess = lazySection(() => import("@/components/sections/DesignProcess"), "DesignProcess");
const CaseStudies = lazySection(() => import("@/components/sections/CaseStudies"), "CaseStudies");
const PersonalProjects = lazySection(() => import("@/components/sections/PersonalProjects"), "PersonalProjects");
const DesignSystem = lazySection(() => import("@/components/sections/DesignSystem"), "DesignSystem");
const Experience = lazySection(() => import("@/components/sections/Experience"), "Experience");
const Skills = lazySection(() => import("@/components/sections/Skills"), "Skills");

export default function Home() {
  return (
    <div className="relative selection:bg-primary/20 selection:text-primary">
      <ScrollProgress />
      <div className="grain-overlay" />
      <Navbar />
      
      <main>
        <Hero />
        <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
        <About />
        <CaseStudies />
        <PersonalProjects />
        <DesignSystem />
        <DesignProcess />
        <Skills />
        <Experience />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
