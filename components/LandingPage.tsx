
import React, { useState } from 'react';
import { LandingPageContent } from '../types.ts';
import PricingCard from './PricingCard.tsx';
import { Shield, Zap, Smile, ArrowRight, MessageCircle, Star, CheckCircle2, Menu, X, Search, Settings, ShieldCheck, ClipboardCheck, Award, Users } from 'lucide-react';

interface LandingPageProps {
  content: LandingPageContent;
}

const LandingPage: React.FC<LandingPageProps> = ({ content }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const iconMap: Record<string, any> = { Shield, Zap, Smile };
  const processIcons = [Search, Settings, ShieldCheck, ClipboardCheck];
  const accentColor = content.branding.accentColor || '#E32636';

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const offset = 100;
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
    <div className="min-h-screen bg-white selection:bg-red-100">
      {/* Navbar */}
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
            <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-400">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="hover:text-slate-900 transition-colors uppercase tracking-widest text-[10px] cursor-pointer">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={handleGeneralBooking} className="hidden sm:block px-6 py-2.5 rounded-full text-xs font-black text-white shadow-lg transition-all hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer" style={{ backgroundColor: accentColor }}>
              Booking Sekarang
            </button>
            <button onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer z-[10000]">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {content.hero.visible && (
        <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 overflow-hidden bg-white">
          <div className="blob w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-slate-50 top-[-10%] left-[-10%] opacity-60"></div>
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
                  <button onClick={handleGeneralBooking} className="group w-full sm:w-auto px-10 py-5 rounded-2xl text-white text-lg font-black flex items-center justify-center gap-3 transition-all hover:shadow-2xl shadow-xl active:scale-95 cursor-pointer" style={{ backgroundColor: accentColor }}>
                    {content.hero.ctaText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center gap-4 px-6 py-4">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i + 10}`} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-white shadow-sm" alt="User" />)}
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] md:text-xs font-black text-slate-900">2,500+ Happy Clients</div>
                      <div className="flex text-amber-400 gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <Star className="w-2.5 h-2.5 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Trusted Badges */}
                <div className="mt-12 pt-8 border-t border-slate-50 flex flex-wrap justify-center lg:justify-start gap-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Original Parts Safe</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Certified Specialist</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Community Choice</span>
                    </div>
                </div>
              </div>

              <div className="flex-1 relative w-full lg:max-w-xl">
                <div className="relative z-10">
                    <img src={content.hero.imageUrl} alt="Headlight" className="w-full h-auto rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl transition-transform hover:scale-[1.02] duration-700" />
                    
                    {/* Floating Testimonial/Badge Card 1 */}
                    <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 glass-card p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border-white/50 max-w-[150px] md:max-w-[200px] animate-bounce-slow">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-3 md:mb-4 shadow-lg" style={{ backgroundColor: accentColor }}>
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <p className="text-xs md:text-sm font-black text-slate-900 leading-tight">Bergaransi Hingga 1 Tahun</p>
                    </div>

                    {/* Floating Rating Card 2 */}
                    <div className="absolute top-10 -right-6 md:top-16 md:-right-10 glass-card p-4 md:p-5 rounded-[2rem] shadow-2xl border-white/50 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="flex text-amber-400">
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                            </div>
                            <span className="text-[10px] font-black text-slate-900">4.9/5.0</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 italic">"Hasilnya luar biasa, lampu <br/> kembali seperti baru!"</p>
                    </div>

                    {/* Floating Trusted Badge 3 */}
                    <div className="absolute -top-6 left-10 md:-top-10 md:left-20 glass-card px-4 py-3 rounded-full shadow-xl border-white/50 flex items-center gap-2 animate-bounce-slow" style={{ animationDelay: '1s' }}>
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                            <Shield className="w-3 h-3 text-green-600 fill-current" />
                        </div>
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Trusted Specialist</span>
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
                <div key={item.id} className="bg-white p-10 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 hover:shadow-2xl transition-all duration-500">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner" style={{ backgroundColor: `${accentColor}10`, color: accentColor }}>
                    <IconComp className="w-7 h-7 md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-3 text-slate-900">{item.title}</h3>
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
            <p className="mt-4 text-slate-500 font-medium text-base md:text-lg max-w-2xl mx-auto">{content.pricing.sectionSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {content.pricing.packages.filter(p => p.visible).map((pkg) => (
              <PricingCard key={pkg.id} pkg={pkg} whatsappNumber={content.cta.whatsappNumber} />
            ))}
          </div>
        </div>
      </section>

      {/* Vertical Timeline */}
      <section id="process" className="py-24 md:py-40 bg-white overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Our Story & Workflow</span>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95]">
                  {content.process.sectionTitle}
                </h2>
              </div>
              <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-md">
                Kami menerapkan standar pengerjaan tinggi yang terukur untuk memastikan setiap unit mendapatkan hasil restorasi terbaik layaknya mobil baru.
              </p>
            </div>
            <div className="lg:col-span-7 relative">
              <div className="absolute left-[23px] md:left-[27px] top-4 bottom-4 w-[1px] bg-slate-100"></div>
              <div className="space-y-12 md:space-y-16">
                {content.process.steps.map((step, idx) => {
                  const StepIcon = processIcons[idx] || Search;
                  return (
                    <div key={step.id} className="relative pl-16 md:pl-20 group">
                      <div className="absolute left-0 top-0 z-10">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-red-100">
                           <StepIcon className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-500 group-hover:text-red-600 text-slate-400" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Step 0{idx + 1}</span>
                           <div className="h-[1px] w-8 bg-slate-50"></div>
                        </div>
                        <h4 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight group-hover:text-red-600 transition-colors">
                          {step.title}
                        </h4>
                        <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium max-w-lg">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40 text-center px-6 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black mb-8 tracking-tighter text-slate-900 leading-tight">
            {content.cta.headline}
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-bold mb-12 max-w-2xl mx-auto">{content.cta.subheadline}</p>
          <button onClick={handleGeneralBooking} className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-4 text-white px-8 md:px-12 py-5 md:py-6 rounded-2xl md:rounded-[2rem] text-xl md:text-2xl font-black hover:scale-105 transition-all shadow-2xl active:scale-95 cursor-pointer" style={{ backgroundColor: accentColor }}>
            <MessageCircle className="w-6 h-6 md:w-7 md:h-7 fill-current" /> {content.cta.buttonText}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 md:py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col items-center md:items-start gap-4">
              <span className="text-lg md:text-xl font-black tracking-tight text-slate-900">{content.branding.brandName}</span>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">&copy; 2025 {content.branding.brandName}. All rights reserved.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 text-center md:text-right">
              <div>
                <h5 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 mb-2">Kontak Kami</h5>
                <p className="text-slate-900 font-black text-base">{content.footer.contact}</p>
              </div>
              <div>
                <h5 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 mb-2">Lokasi Layanan</h5>
                <p className="text-slate-900 font-black text-base">{content.footer.address}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
