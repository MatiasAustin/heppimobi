
import React from 'react';
import { MessageCircle } from 'lucide-react';

interface CTAProps {
  headline: string;
  subheadline: string;
  buttonText: string;
  accentColor: string;
  whatsappNumber: string;
}

const CTA: React.FC<CTAProps> = ({ headline, subheadline, buttonText, accentColor, whatsappNumber }) => {
  const handleBooking = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=Halo, saya ingin tanya jasa polish lampu mobil.`, '_blank');
  };

  return (
    <section className="py-24 md:py-40 text-center px-6 bg-slate-50">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tighter text-slate-900 leading-tight">
          {headline}
        </h2>
        <p className="text-base md:text-lg text-slate-500 font-bold mb-12 max-w-2xl mx-auto">{subheadline}</p>
        <button onClick={handleBooking} className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-4 text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl md:rounded-[2rem] text-lg md:text-xl font-black hover:scale-105 transition-all shadow-2xl active:scale-95 cursor-pointer" style={{ backgroundColor: accentColor }}>
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7 fill-current" /> {buttonText}
        </button>
      </div>
    </section>
  );
};

export default CTA;
