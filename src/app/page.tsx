import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProjects from "@/components/FeaturedProjects";
import TechLogos from "@/components/TechLogos";
import Testimonials from "@/components/Testimonials";
import FAQs from "@/components/FAQs";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0e1117] text-zinc-100 font-sans antialiased selection:bg-brand-primary selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Banner with search capability */}
        <Hero />

        {/* Categories Carousel/Grid */}
        <Categories />

        {/* Featured digital assets */}
        <FeaturedProjects />

        {/* Supporting tech icons */}
        <TechLogos />

        {/* Customer reviews */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQs />

        {/* Call to action panel */}
        <CTA />
      </main>

      {/* Footer navigation */}
      <Footer />
    </div>
  );
}
