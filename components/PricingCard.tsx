
import React from 'react';
import { Package } from '../types.ts';
import { Check, X, Star } from 'lucide-react';

interface PricingCardProps {
  pkg: Package;
  whatsappNumber: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ pkg, whatsappNumber }) => {
  const formatIDR = (price: number) => {
    return (price / 1000).toString() + " K";
  };

  const handleBooking = () => {
    const message = encodeURIComponent(`Halo, saya ingin booking paket *${pkg.name}* untuk lampu mobil saya.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className={`relative flex flex-col p-8 md:p-10 rounded-[3rem] transition-all duration-500 overflow-hidden ${
      pkg.isBestSeller 
        ? 'bg-[#E32636] text-white shadow-2xl scale-105 z-10' 
        : 'bg-[#F9FAFB] border border-slate-100 hover:border-red-200'
    }`}>
      {pkg.isBestSeller && (
        <div className="absolute top-6 right-6">
          <div className="bg-white/20 backdrop-blur text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            <Star className="w-3 h-3 fill-white" /> BEST SELLER
          </div>
        </div>
      )}

      <div className="mb-10">
        <h3 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${pkg.isBestSeller ? 'text-white/70' : 'text-[#E32636]'}`}>Package</h3>
        <h2 className="text-2xl font-extrabold mb-6 tracking-tight">{pkg.name}</h2>
        
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black">{formatIDR(pkg.harga)}</span>
          <span className={`text-xs font-bold ${pkg.isBestSeller ? 'text-white/60' : 'text-slate-400'}`}>/ pair</span>
        </div>
      </div>

      <div className="flex-grow space-y-4 mb-10">
        <FeatureItem pkgIsBest={pkg.isBestSeller} label="Step Poles" value={`${pkg.stepPoles}x`} />
        <FeatureItem pkgIsBest={pkg.isBestSeller} label="Waktu" value={pkg.waktuPengerjaan} />
        <FeatureItem pkgIsBest={pkg.isBestSeller} label="Ketahanan" value={pkg.ketahanan} />
        <FeatureItem pkgIsBest={pkg.isBestSeller} label="Proteksi" value={pkg.proteksi} />
        <FeatureItem pkgIsBest={pkg.isBestSeller} label="Garansi" value={pkg.garansi} />
        <FeatureItem pkgIsBest={pkg.isBestSeller} label="Retak Rambut" isBoolean={true} boolValue={pkg.retakRambut} />
      </div>

      <button
        onClick={handleBooking}
        className={`w-full py-4 md:py-5 rounded-2xl md:rounded-3xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${
          pkg.isBestSeller
            ? 'bg-white text-[#E32636] hover:bg-slate-100 shadow-xl'
            : 'bg-slate-900 text-white hover:bg-[#E32636]'
        }`}
      >
        Select Plan
      </button>
    </div>
  );
};

const FeatureItem: React.FC<{ pkgIsBest: boolean; label: string; value?: string; isBoolean?: boolean; boolValue?: boolean }> = ({ pkgIsBest, label, value, isBoolean, boolValue }) => (
  <div className={`flex items-center justify-between py-2 border-b last:border-0 ${pkgIsBest ? 'border-white/10' : 'border-slate-200/50'}`}>
    <span className={`text-[10px] font-bold uppercase tracking-wider ${pkgIsBest ? 'text-white/60' : 'text-slate-400'}`}>{label}</span>
    {isBoolean ? (
        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${boolValue ? 'bg-white/20' : 'opacity-30'}`}>
            {boolValue ? <Check className={`w-3 h-3 ${pkgIsBest ? 'text-white' : 'text-[#E32636]'}`} /> : <X className="w-3 h-3" />}
        </div>
    ) : (
        <span className="text-xs md:text-sm font-black">{value}</span>
    )}
  </div>
);

export default PricingCard;
