import React from 'react';
import Topbar from '../components/sections/Topbar/page';
import Header from '../components/sections/Header/page';
import Hero from '../components/sections/Hero/page';
import About from '../components/sections/About/page';
import Services from '../components/sections/Services/page';
import WhyChoose from '../components/sections/WhyChoose/page';
import Projects from '../components/sections/Projects/page';
import Testimonials from '../components/sections/Testimonials/page';
import Faq from '../components/sections/Faq/page';
import Contact from '../components/sections/Contact/page';
import Footer from '../components/sections/Footer/page';
import BackToTop from '../components/ui/BackToTop/page';
import { common, pages, sections, PageComponentItem } from '../components/types';

export const metadata = {
  title: pages.home?.metadata?.title || "Nexora Technologies – IT Solutions",
  description: pages.home?.metadata?.description || "Nexora Technologies – IT Solutions",
};

const componentMap: Record<string, React.ReactNode> = {
  Hero: <Hero key="hero" data={sections.hero} />,
  About: <About key="about" data={sections.about} />,
  Services: <Services key="services" data={sections.services} />,
  WhyChoose: <WhyChoose key="whychoose" data={sections.whychoose} />,
  Projects: <Projects key="projects" data={sections.projects} />,
  Testimonials: <Testimonials key="testimonials" data={sections.testimonials} />,
  Faq: <Faq key="faq" data={sections.faq} />,
  Contact: <Contact key="contact" data={sections.contact} />,
};

export default function Home() {
  const homeComponents = pages.home?.components || [
    { key: "HeroSection", component: "Hero" },
    { key: "AboutSection", component: "About" },
    { key: "ServicesSection", component: "Services" },
    { key: "WhyChooseSection", component: "WhyChoose" },
    { key: "ProjectsSection", component: "Projects" },
    { key: "TestimonialsSection", component: "Testimonials" },
    { key: "FaqSection", component: "Faq" },
    { key: "ContactSection", component: "Contact" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#0A1128] font-sans text-[#0A1128] selection:bg-[#D4AF37] selection:text-[#0A1128]">
      <Topbar data={common.Topbar} />
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {homeComponents.map((item: PageComponentItem) => (
          <React.Fragment key={item.key}>
            {componentMap[item.component] || null}
          </React.Fragment>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
