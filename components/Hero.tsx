
import React from 'react';
import { ArrowRight, Star, CheckCircle2, ShieldCheck, Award, Users } from 'lucide-react';

interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  imageUrl: string;
  accentColor: string;
  badgeWarranty: string;
  badgeRating: string;
  badgeTestimonial: string;
  badgeTrust: string;
  trustBadges: string[];
  whatsappNumber: string;
}

const Hero: React.FC<HeroProps> = (props) => {
  const handleBooking = () => {
    window.open(`https://wa.me/${props.whatsappNumber}?text=Halo, saya ingin tanya jasa polish lampu mobil.`, '_blank');
  };

  // Map icons to badges based on index with outline style as per screenshot
  const getBadgeIcon = (index: number, className: string) => {
    switch (index) {
      case 0: return <ShieldCheck className={className} />;
      case 1: return <Award className={className} />;
      case 2: return <Users className={className} />;
      default: return <ShieldCheck className={className} />;
    }
  };

  return (
    <section className="relative pt-24 md:pt-48 pb-20 md:pb-32 overflow-hidden bg-white">
      {/* Background Decorative Element */}
      <div className="blob w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-slate-50 top-[-10%] left-[-10%] opacity-60"></div>
      
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          
          {/* Text Content - Always First on Mobile */}
          <div className="flex-1 z-10 text-center lg:text-left order-1 w-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full mb-6 md:mb-10 border border-slate-100 mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: props.accentColor }}></span>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Restorasi Lampu No.1 di Indonesia</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.95] md:leading-[0.9] mb-8 md:mb-12 tracking-tighter">
              {props.headline}
            </h1>
            <p className="text-sm md:text-xl text-slate-400 leading-relaxed font-medium max-w-xl mb-10 md:mb-16 mx-auto lg:mx-0">
              {props.subheadline}
            </p>

            {/* Desktop Action & Trust Bar */}
            <div className="hidden lg:block space-y-16">
              <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
                <button onClick={handleBooking} className="group px-10 py-6 rounded-3xl text-white text-xl font-black flex items-center justify-center gap-3 transition-all hover:shadow-2xl shadow-xl active:scale-95 cursor-pointer" style={{ backgroundColor: props.accentColor }}>
                  {props.ctaText}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                      {[1, 2, 3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i + 10}`} className="w-12 h-12 rounded-full border-4 border-white shadow-sm" alt="User" />)}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-black text-slate-900 leading-none mb-1.5">2,500+ Happy Clients</div>
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Trust Bar Row for Desktop */}
              <div className="flex flex-row items-center gap-12 opacity-80">
                  {props.trustBadges.map((badge, idx) => (
                    <div key={idx} className="flex items-center gap-3 group">
                        {getBadgeIcon(idx, "w-5 h-5 text-slate-300 stroke-[1.5px] group-hover:text-red-500 transition-colors")}
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-900 transition-colors whitespace-nowrap">{badge}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Hero Image - Second on Mobile */}
          <div className="flex-1 relative w-full lg:max-w-xl order-2 px-4 md:px-0">
            <div className="relative z-10">
                <img src={props.imageUrl} alt="Headlight" className="w-full h-auto rounded-[2.5rem] md:rounded-[4rem] shadow-2xl transition-transform hover:scale-[1.01] duration-700" />
                
                {/* Floating Badges - Adjusted positions to be less intrusive */}
                <div className="absolute -bottom-8 -left-6 md:-bottom-12 md:-left-16 glass-card p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border-white/50 max-w-[130px] md:max-w-[180px] animate-bounce-slow">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-3 md:mb-4 shadow-lg" style={{ backgroundColor: props.accentColor }}>
                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <p className="text-[9px] md:text-xs font-black text-slate-900 leading-tight uppercase tracking-wider">{props.badgeWarranty}</p>
                </div>

                <div className="absolute top-6 -right-4 md:top-12 md:-right-20 glass-card p-4 md:p-5 rounded-[2rem] shadow-2xl border-white/50 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                        </div>
                        <span className="text-[10px] font-black text-slate-900">{props.badgeRating}</span>
                    </div>
                    <p className="text-[9px] md:text-[10px] font-bold text-slate-400 italic leading-tight">{props.badgeTestimonial}</p>
                </div>
            </div>
          </div>

          {/* Action Section for Mobile Only - Below Image (Centered) */}
          <div className="w-full lg:hidden space-y-12 order-3 pt-10 flex flex-col items-center">
            <div className="w-full flex flex-col items-center gap-8">
              <button onClick={handleBooking} className="group w-full max-w-sm px-10 py-5 rounded-2xl text-white text-lg font-black flex items-center justify-center gap-3 transition-all hover:shadow-2xl shadow-xl active:scale-95 cursor-pointer" style={{ backgroundColor: props.accentColor }}>
                {props.ctaText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i + 10}`} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="User" />)}
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-black text-slate-900">2,500+ Happy Clients</div>
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-2 h-2 fill-current" />)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trust Badges Mobile - Benar-benar Rata Tengah */}
            <div className="flex flex-col gap-6 w-full items-center">
                {props.trustBadges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-4 justify-center w-full max-w-[280px]">
                      <div className="flex-shrink-0">
                        {getBadgeIcon(idx, "w-5 h-5 text-slate-300 stroke-[1.5px]")}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-center">{badge}</span>
                  </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
