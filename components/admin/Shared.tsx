
import React, { useRef } from 'react';
import { Upload, Info } from 'lucide-react';

export const StatCard = ({ label, value, sub }: any) => (
  <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[3rem] border border-slate-100 shadow-xl flex flex-col items-center text-center">
    <p className="text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">{label}</p>
    <div className="text-3xl md:text-5xl font-black text-slate-900 mb-1 tracking-tighter">{typeof value === 'number' ? value.toLocaleString() : value}</div>
    <p className="text-[9px] text-slate-400 font-bold tracking-wider">{sub}</p>
  </div>
);

export const ImageUploadBox = ({ label, value, onUpload, isCompressing, fullHeight, isBranding }: any) => {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-2 w-full">
      <label className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest ml-2">{label}</label>
      <div onClick={() => fileRef.current?.click()} className={`relative rounded-2xl md:rounded-[2.5rem] border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-red-400 transition-all bg-slate-50/30 ${fullHeight ? 'h-48 md:h-72' : 'h-32 md:h-40'}`}>
        {value ? <img src={value} alt="Preview" className={`max-w-full max-h-full p-2 rounded-2xl ${isBranding ? 'object-contain' : 'object-cover'}`} /> : <div className="text-center text-slate-300"><Upload className="w-8 h-8 mx-auto mb-2" /><span className="text-[8px] font-black uppercase">Upload {label}</span></div>}
        {isCompressing && <div className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-2xl backdrop-blur-sm z-50"><div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>}
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={onUpload} className="hidden" />
    </div>
  );
};

export const InputField: React.FC<{ label: string; value: string; onChange: (v: string) => void; type?: string }> = ({ label, value, onChange, type = "text" }) => (
  <div className="space-y-1.5 md:space-y-2 w-full">
    <label className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest ml-2">{label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-5 md:px-6 py-3.5 md:py-4 rounded-xl md:rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-100 outline-none transition-all font-bold text-sm md:text-base text-slate-800 bg-white shadow-sm" />
  </div>
);

export const TextAreaField: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <div className="space-y-1.5 md:space-y-2 w-full">
    <label className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest ml-2">{label}</label>
    <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-5 md:px-6 py-3.5 md:py-4 rounded-xl md:rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-100 outline-none transition-all resize-none font-bold text-sm md:text-base text-slate-800 bg-white shadow-sm" />
  </div>
);

export const SectionToggle: React.FC<{ label: string; checked: boolean; onChange: (v: boolean) => void; description?: string }> = ({ label, checked, onChange, description }) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center justify-between p-4 md:p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] text-slate-900">{label}</span>
      <button onClick={() => onChange(!checked)} className={`relative inline-flex h-7 w-12 md:h-8 md:w-14 items-center rounded-full transition-all ${checked ? 'bg-red-600' : 'bg-slate-200'}`}>
        <span className={`inline-block h-5 w-5 md:h-6 md:w-6 transform rounded-full bg-white transition-all ${checked ? 'translate-x-6 md:translate-x-7' : 'translate-x-1'}`} />
      </button>
    </div>
    {description && (
      <div className="ml-1 md:ml-2 mt-1 px-4 py-3 bg-red-50/50 border border-red-100 rounded-xl md:rounded-2xl flex gap-3 items-start">
        <Info className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
        <p className="text-[10px] text-slate-600 font-bold leading-relaxed">
          <span className="text-red-600 font-black uppercase tracking-widest mr-1">Note:</span> {description}
        </p>
      </div>
    )}
  </div>
);
