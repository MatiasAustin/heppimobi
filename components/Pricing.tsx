
import React from 'react';
import PricingCard from './PricingCard.tsx';
import { Package } from '../types.ts';

interface PricingProps {
  sectionTitle: string;
  sectionSubtitle: string;
  packages: Package[];
  accentColor: string;
  whatsappNumber: string;
}

const Pricing: React.FC<PricingProps> = ({ sectionTitle, sectionSubtitle, packages, accentColor, whatsappNumber }) => {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block px-4 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-4" style={{ backgroundColor: `${accentColor}10`, color: accentColor }}>Daftar Harga</span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">{sectionTitle}</h2>
          <p className="mt-4 text-slate-500 font-medium text-sm md:text-base max-w-2xl mx-auto">{sectionSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {packages.filter(p => p.visible).map((pkg) => (
            <PricingCard key={pkg.id} pkg={pkg} whatsappNumber={whatsappNumber} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
