
import React from 'react';
import { Shield, Zap, Smile } from 'lucide-react';
import { Feature } from '../types.ts';

interface FeaturesProps {
  sectionTitle: string;
  sectionSubtitle: string;
  items: Feature[];
  accentColor: string;
}

const Features: React.FC<FeaturesProps> = ({ sectionTitle, sectionSubtitle, items, accentColor }) => {
  const iconMap: Record<string, any> = { Shield, Zap, Smile };

  return (
    <section id="about" className="py-20 md:py-32 bg-[#F8F9FA]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">{sectionTitle}</h2>
          <p className="mt-4 text-slate-500 font-medium text-sm md:text-base max-w-2xl mx-auto">{sectionSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item) => {
            const IconComp = iconMap[item.icon] || Shield;
            return (
              <div key={item.id} className="bg-white p-10 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 hover:shadow-2xl transition-all duration-500">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner" style={{ backgroundColor: `${accentColor}10`, color: accentColor }}>
                  <IconComp className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-black mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
