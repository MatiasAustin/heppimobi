
import React from 'react';
import { LandingPageContent } from '../types.ts';
import Navbar from './Navbar.tsx';
import Hero from './Hero.tsx';
import Features from './Features.tsx';
import Pricing from './Pricing.tsx';
import Process from './Process.tsx';
import { GallerySection } from './GallerySection.tsx';
import { TestimonialsSection } from './TestimonialsSection.tsx';
import CTA from './CTA.tsx';
import Footer from './Footer.tsx';

interface LandingPageProps {
  content: LandingPageContent;
}

const LandingPage: React.FC<LandingPageProps> = ({ content }) => {
  const accentColor = content.branding.accentColor || '#E32636';

  return (
    <div className="min-h-screen bg-white selection:bg-red-100 overflow-x-hidden">
      <Navbar
        brandName={content.branding.brandName}
        tagline={content.footer.tagline}
        logoUrl={content.branding.logoUrl}
        accentColor={accentColor}
        whatsappNumber={content.cta.whatsappNumber}
      />

      {content.hero.visible && (
        <Hero
          {...content.hero}
          accentColor={accentColor}
          whatsappNumber={content.cta.whatsappNumber}
        />
      )}

      {content.features.visible && (
        <Features
          sectionTitle={content.features.sectionTitle}
          items={content.features.items}
          accentColor={accentColor}
        />
      )}

      {content.pricing.visible && (
        <Pricing
          sectionTitle={content.pricing.sectionTitle}
          sectionSubtitle={content.pricing.sectionSubtitle}
          packages={content.pricing.packages}
          accentColor={accentColor}
          whatsappNumber={content.cta.whatsappNumber}
        />
      )}

      {content.process.visible && (
        <Process
          sectionTitle={content.process.sectionTitle}
          steps={content.process.steps}
          accentColor={accentColor}
        />
      )}

      {content.gallery.visible && (
        <GallerySection content={content.gallery} />
      )}

      {content.testimonials.visible && (
        <TestimonialsSection content={content.testimonials} />
      )}

      {content.cta.visible && (
        <CTA
          headline={content.cta.headline}
          subheadline={content.cta.subheadline}
          buttonText={content.cta.buttonText}
          accentColor={accentColor}
          whatsappNumber={content.cta.whatsappNumber}
        />
      )}

      <Footer
        brandName={content.branding.brandName}
        tagline={content.footer.tagline}
        contact={content.footer.contact}
        address={content.footer.address}
      />
    </div>
  );
};

export default LandingPage;
