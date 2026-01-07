
import React, { useState } from 'react';
import { LandingPageContent } from '../types';
import PricingCard from './PricingCard';
import { Shield, Zap, Smile, ArrowRight, MessageCircle, Star, CheckCircle2, Menu, X } from 'lucide-react';

interface LandingPageProps {
  content: LandingPageContent;
}

const LandingPage: React.FC<LandingPageProps> = ({ content }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const iconMap: Record<string, any> = { Shield, Zap, Smile };
  const accentColor = content.branding.accentColor || '#E32636';

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const offset = 100; // Account for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleGeneralBooking = () => {
    window.open(`https://wa.me/${content.cta.whatsappNumber}?text=Halo, saya ingin tanya jasa polish lampu mobil.`, '_blank');
  };

  const navLinks = [
    { name: 'Keunggulan', href: '#about' },
    { name: 'Layanan', href: '#pricing' },
    { name: 'Proses', href: '#process' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] selection:bg-red-100">
      {/* Navbar - Increased Z-index to ensure it is always on top */}
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[9999] w-[92%] max-w-6xl pointer-events-none">
        <div className="glass-card rounded-3xl md:rounded-full px-5 md:px-8 py-3 flex items-center justify-between shadow-sm border-slate-200/50 pointer-events-auto">
          <div className="flex items-center gap-4 md:gap-10">
            <div 
              className="flex items-center gap-2 md:gap-3 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {content.branding.logoUrl ? (
                <img src={content.branding.logoUrl} alt="Logo" className="h-7 md:h-9 w-auto object-contain" />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: accentColor }}>
                    <Zap className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                  </div>
                </div>
              )}
              <span className="text-lg md:text-xl font-black tracking-tight text-slate-900">
                {content.branding.brandName}
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-400">
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="hover:text-slate-900 transition-colors uppercase tracking-widest text-[10px] cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={handleGeneralBooking}
              className="hidden sm:block px-6 py-2.5 rounded-full text-xs font-black text-white shadow-lg transition-all hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
              style={{ backgroundColor: accentColor }}
            >
              Booking Sekarang
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer z-[10000]"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-100 p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-300 pointer-events-auto">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-lg font-black text-slate-900 py-4 border-b border-slate-50 last:border-0 cursor-pointer flex items-center justify-between group"
              >
                {link.name}
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
              </a>
            ))}
            <button 
              onClick={() => {
                handleGeneralBooking();
                setIsMenuOpen(false);
              }}
              className="w-full py-5 rounded-2xl text-white font-black mt-4 shadow-xl active:scale-95 transition-transform cursor-pointer"
              style={{ backgroundColor: accentColor }}
            >
              Booking Sekarang
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      {content.hero.visible && (
        <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 overflow-hidden bg-white">
          <div className="blob w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-slate-100 top-[-10%] left-[-10%] opacity-60"></div>
          <div className="blob w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-red-50 bottom-[10%] right-[-5%] opacity-40"></div>

          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
              <div className="flex-1 z-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full mb-6 md:mb-8 border border-slate-100">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }}></span>
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Restorasi Lampu No.1 di Indonesia</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-slate-900 leading-[1.1] md:leading-[0.9] mb-6 md:mb-8 tracking-tighter">
                  {content.hero.headline}
                </h1>
                
                <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium max-w-xl mb-8 md:mb-12 mx-auto lg:mx-0">
                  {content.hero.subheadline}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={handleGeneralBooking}
                    className="group w-full sm:w-auto px-10 py-5 rounded-2xl text-white text-lg font-black flex items-center justify-center gap-3 transition-all hover:shadow-2xl shadow-xl active:scale-95 cursor-pointer"
                    style={{ backgroundColor: accentColor }}
                  >
                    {content.hero.ctaText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center gap-4 px-6 py-4">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-white shadow-sm" alt="User" />)}
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] md:text-xs font-black text-slate-900">2,500+ Happy Clients</div>
                      <div className="flex text-amber-400 gap-0.5"><Star className="w-2.5 h-2.5 fill-current" /><Star className="w-2.5 h-2.5 fill-current" /><Star className="w-2.5 h-2.5 fill-current" /><Star className="w-2.5 h-2.5 fill-current" /><Star className="w-2.5 h-2.5 fill-current" /></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 relative w-full lg:max-w-xl px-4 md:px-0">
                <div className="relative z-10 group">
                  <img 
                    src={content.hero.imageUrl} 
                    alt="Headlight Restoration" 
                    className="w-full h-auto rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-700"
                  />
                  <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 glass-card p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border-white/50 max-w-[150px] md:max-w-[200px] animate-bounce-slow">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-3 md:mb-4 shadow-lg" style={{ backgroundColor: accentColor }}>
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <p className="text-xs md:text-sm font-black text-slate-900 leading-tight">Bergaransi Hingga 1 Tahun</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section id="about" className="py-20 md:py-32 bg-[#F8F9FA]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">{content.features.sectionTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {content.features.items.map((item) => {
              const IconComp = iconMap[item.icon] || Shield;
              return (
                <div key={item.id} className="bg-white p-10 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center mb-6 md:mb-8 shadow-inner" style={{ backgroundColor: `${accentColor}10`, color: accentColor }}>
                    <IconComp className="w-7 h-7 md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block px-4 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-4" style={{ backgroundColor: `${accentColor}10`, color: accentColor }}>Daftar Harga</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">{content.pricing.sectionTitle}</h2>
            <p className="mt-4 md:mt-6 text-slate-500 font-medium text-base md:text-lg max-w-2xl mx-auto">{content.pricing.sectionSubtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {content.pricing.packages.filter(p => p.visible).map((pkg) => (
              <PricingCard key={pkg.id} pkg={pkg} whatsappNumber={content.cta.whatsappNumber} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 md:py-32 bg-slate-900 text-white md:rounded-[4rem] md:mx-4 lg:mx-10 my-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-[100px]" style={{ backgroundColor: accentColor }}></div>
        </div>
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-black mb-6 md:mb-8 leading-tight tracking-tighter">
              {content.process.sectionTitle}
            </h2>
            <p className="text-slate-400 text-base md:text-lg font-medium max-w-2xl mx-auto">Alur pengerjaan profesional yang menjamin hasil maksimal dengan waktu yang efisien.</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {content.process.steps.map((step, idx) => (
                <div key={step.id} className="relative group text-center lg:text-left">
                  {idx < content.process.steps.length - 1 && (
                    <div className="lg:hidden absolute top-20 left-1/2 -translate-x-1/2 w-[2px] h-12 bg-slate-700"></div>
                  )}

                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-800 border-4 border-slate-900 relative z-10 mb-6 md:mb-8 transition-all duration-500 group-hover:scale-110 group-hover:bg-red-600 shadow-xl mx-auto lg:mx-0">
                    <span className="text-xl md:text-2xl font-black text-white">{idx + 1}</span>
                  </div>
                  
                  <div className="space-y-3 md:space-y-4">
                    <h4 className="text-xl md:text-2xl font-black tracking-tight group-hover:text-red-500 transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40 text-center px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black mb-8 md:mb-10 tracking-tighter text-slate-900 leading-tight">
            {content.cta.headline}
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-bold mb-12 md:mb-16 max-w-2xl mx-auto">{content.cta.subheadline}</p>
          <button 
            onClick={handleGeneralBooking}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-4 text-white px-8 md:px-12 py-5 md:py-6 rounded-2xl md:rounded-[2rem] text-xl md:text-2xl font-black hover:scale-105 transition-all shadow-2xl active:scale-95 cursor-pointer"
            style={{ backgroundColor: accentColor }}
          >
            <MessageCircle className="w-6 h-6 md:w-7 md:h-7 fill-current" /> {content.cta.buttonText}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 md:py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              {content.branding.logoUrl ? (
                <img src={content.branding.logoUrl} alt="Logo" className="h-7 md:h-8 w-auto grayscale opacity-40 hover:grayscale-0 transition-all" />
              ) : (
                <div className="flex items-center gap-3 grayscale opacity-40">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                    <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
                  </div>
                  <span className="text-lg md:text-xl font-black tracking-tight">{content.branding.brandName}</span>
                </div>
              )}
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">&copy; 2025 {content.branding.brandName}. All rights reserved.</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 text-center md:text-right">
              <div>
                <h5 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-2 md:mb-4">Kontak Kami</h5>
                <p className="text-slate-900 font-black text-base md:text-lg">{content.footer.contact}</p>
              </div>
              <div>
                <h5 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-2 md:mb-4">Lokasi Layanan</h5>
                <p className="text-slate-900 font-black text-base md:text-lg">{content.footer.address}</p>
              </div>
            </div>
          </div>
          <div className="mt-16 md:mt-20 pt-8 md:pt-10 border-t border-slate-50 text-center">
            <p className="text-[9px] md:text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">{content.footer.tagline}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
