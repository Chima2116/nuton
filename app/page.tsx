import StickyNavbar from "@/components/StickyNavbar";
import HeroExperience from "@/components/HeroExperience";
import FeaturesCarousel from "@/components/FeaturesCarousel";
import EveryWaySection from "@/components/EveryWaySection";
import OrganizeSection from "@/components/OrganizeSection";
import TestimonialSection from "@/components/TestimonialSection";
import FaqSection from "@/components/FaqSection";
import PricingSection from "@/components/PricingSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-white">
      {/* Fixed nav overlays every frame; adapts to each section's theme */}
      <StickyNavbar />

      {/* One pinned dashboard: cards drop in → upload → morphs into the
          "From chaos to clarity" structured-learning lesson (same dashboard). */}
      <section data-nav-theme="light">
        <HeroExperience />
      </section>

      {/* Mobile-only: features carousel (desktop shows these as the hero morph) */}
      <FeaturesCarousel />

      {/* "One system / Every way you learn." — diagonal labels stagger in */}
      <EveryWaySection />

      {/* "Organize what you learn." — tilted Spaces dashboard + features */}
      <OrganizeSection />

      {/* "The way people actually want to learn." — Organize slides out to
          reveal this pinned testimonial grid underneath. */}
      <TestimonialSection />

      {/* "Questions? We've got answers." — FAQ accordion */}
      <FaqSection />

      {/* "Get started for free" — pricing plans + organizations */}
      <PricingSection />

      {/* CTA + oversized Nuton wordmark + bottom bar */}
      <FooterSection />
    </main>
  );
}
