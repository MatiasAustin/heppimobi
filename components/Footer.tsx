
import React from 'react';

interface FooterProps {
  brandName: string;
  contact: string;
  address: string;
}

const Footer: React.FC<FooterProps> = ({ brandName, contact, address }) => {
  return (
    <footer className="py-16 md:py-20 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-lg md:text-xl font-black tracking-tight text-slate-900">{brandName}</span>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">&copy; 2025 {brandName}. All rights reserved.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 text-center md:text-right">
            <div>
              <h5 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 mb-2">Kontak Kami</h5>
              <p className="text-slate-900 font-black text-base">{contact}</p>
            </div>
            <div>
              <h5 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 mb-2">Lokasi Layanan</h5>
              <p className="text-slate-900 font-black text-base">{address}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
