
import React, { useState, useEffect, useRef } from 'react';
import { Zap, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  brandName: string;
  logoUrl: string;
  accentColor: string;
  whatsappNumber: string;
}

const Navbar: React.FC<NavbarProps> = ({ brandName, logoUrl, accentColor, whatsappNumber }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Keunggulan', href: '#about' },
    { name: 'Layanan', href: '#pricing' },
    { name: 'Proses', href: '#process' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleBooking = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=Halo, saya ingin tanya jasa polish lampu mobil.`, '_blank');
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ${isScrolled ? 'py-2 md:py-3' : 'py-4 md:py-6'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-center relative">
        <div className="glass-card w-full max-w-6xl rounded-[1.8rem] md:rounded-full px-4 md:px-8 py-2.5 md:py-3 flex items-center justify-between shadow-xl border-white/40 ring-1 ring-black/5 relative z-[10002]">
          <div className="flex items-center gap-4 md:gap-10">
            <div 
              className="flex items-center gap-2 md:gap-3 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="h-7 md:h-9 w-auto object-contain transition-transform group-hover:scale-110" />
              ) : (
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12" style={{ backgroundColor: accentColor }}>
                  <Zap className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                </div>
              )}
              <span className="text-lg md:text-xl font-black tracking-tighter text-slate-900">{brandName}</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-400">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="hover:text-slate-900 transition-colors uppercase tracking-widest text-[10px] relative group">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={handleBooking} className="hidden sm:block px-6 py-2.5 rounded-full text-xs font-black text-white shadow-lg transition-all hover:shadow-red-200 hover:scale-105 active:scale-95 whitespace-nowrap" style={{ backgroundColor: accentColor }}>
              Booking Sekarang
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} 
              className={`lg:hidden w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden ${isMenuOpen ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 shadow-md border border-slate-100 hover:scale-105'}`}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Futuristic Minimalist Dropdown */}
        <div 
          ref={menuRef}
          className={`absolute top-full left-4 right-4 mt-3 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isMenuOpen 
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
              : 'opacity-0 -translate-y-4 scale-[0.98] pointer-events-none'
          }`}
        >
          <div className="glass-card rounded-[2rem] border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.12)] p-3 backdrop-blur-3xl bg-white/80 overflow-hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, idx) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => scrollToSection(e, link.href)} 
                  className={`group flex items-center justify-between w-full px-6 py-4 rounded-[1.4rem] transition-all duration-300 hover:bg-white transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <span className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-red-600 transition-colors uppercase">
                    {link.name}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
              ))}
              
              <div className={`mt-2 p-1 transform transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
                <button 
                  onClick={handleBooking} 
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-[1.4rem] text-white text-xs font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all active:scale-95" 
                  style={{ backgroundColor: accentColor }}
                >
                  Booking Sekarang
                  <Zap className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            </div>
            
            <div className={`mt-4 pt-3 pb-2 border-t border-slate-100 flex flex-col items-center gap-1 transition-all duration-700 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '300ms' }}>
              <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">
                Heppimobi Premium Services
              </p>
              <div className="flex gap-4">
                <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                <span className="w-1 h-1 rounded-full bg-slate-200"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
