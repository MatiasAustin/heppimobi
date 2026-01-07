
import React, { useState, useRef, useEffect } from 'react';
import { LandingPageContent, Package, Feature, Step } from '../types.ts';
import { Plus, Trash2, Check, Settings, Layout, BarChart3, Image as ImageIcon, Upload, Palette, List, MessageSquare, Info, Zap, ChevronRight } from 'lucide-react';

interface AdminPanelProps {
  content: LandingPageContent;
  onUpdate: (content: LandingPageContent) => void;
  onExit: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ content, onUpdate, onExit }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'branding' | 'hero' | 'pricing' | 'features' | 'process' | 'cta' | 'footer' | 'settings'>('dashboard');
  const [isCompressing, setIsCompressing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const updateSection = (section: keyof LandingPageContent, data: any) => {
    onUpdate({ ...content, [section]: { ...content[section], ...data } });
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowScrollIndicator(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const compressImage = (file: File, maxWidth = 1920, quality = 0.8, outputFormat = 'image/jpeg'): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = (maxWidth / width) * height;
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (outputFormat === 'image/png') {
            ctx?.clearRect(0, 0, width, height);
          } else if (ctx) {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, width, height);
          }
          ctx?.drawImage(img, 0, 0, width, height);
          const result = canvas.toDataURL(outputFormat, quality);
          resolve(result);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsCompressing(true);
    try {
      const isBranding = target.startsWith('branding');
      const outputFormat = (file.type === 'image/png' || isBranding) ? 'image/png' : 'image/jpeg';
      const compressed = await compressImage(file, target.includes('hero') ? 1600 : 800, 0.8, outputFormat);
      const [section, field] = target.split('.');
      updateSection(section as keyof LandingPageContent, { [field]: compressed });
    } catch (err) {
      console.error(err);
      alert("Gagal memproses gambar.");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleUpdatePackage = (id: string, updates: Partial<Package>) => {
    const updated = content.pricing.packages.map(p => {
      if (p.id === id) {
        if (updates.isBestSeller) {
          content.pricing.packages.forEach(pkg => pkg.isBestSeller = false);
        }
        return { ...p, ...updates };
      }
      return p;
    });
    updateSection('pricing', { packages: updated });
  };

  const tabs = [
    { id: 'dashboard', label: 'Stats', icon: BarChart3 },
    { id: 'branding', label: 'Brand', icon: Palette },
    { id: 'hero', label: 'Hero', icon: ImageIcon },
    { id: 'features', label: 'About', icon: Info },
    { id: 'pricing', label: 'Layanan', icon: Layout },
    { id: 'process', label: 'Proses', icon: List },
    { id: 'cta', label: 'CTA', icon: MessageSquare },
    { id: 'footer', label: 'Footer', icon: List },
    { id: 'settings', label: 'Config', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="sticky top-0 z-[100] bg-white border-b border-slate-100 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
            <Zap className="w-4 h-4 md:w-5 md:h-5 fill-current" />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-black tracking-tight leading-none">Heppimobi <span className="text-red-600">Admin</span></h1>
            <p className="text-[8px] md:text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Management System</p>
          </div>
        </div>
        <button onClick={onExit} className="bg-slate-900 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-black uppercase text-[8px] md:text-[10px] tracking-[0.2em] shadow-lg hover:bg-red-600 transition-all flex items-center gap-2 active:scale-95">
          <Check className="w-3 md:w-3.5 h-3 md:h-3.5" /> <span className="hidden sm:inline">Publish &</span> Exit
        </button>
      </header>
      <div className="relative bg-slate-50 border-b border-slate-100">
        <div ref={scrollRef} onScroll={checkScroll} className="flex overflow-x-auto no-scrollbar scroll-smooth px-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-4 md:px-6 py-4 md:py-5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] transition-all flex flex-col md:flex-row items-center gap-1.5 md:gap-2.5 whitespace-nowrap border-b-2 relative ${activeTab === tab.id ? 'text-red-600 border-red-600 bg-white' : 'text-slate-400 border-transparent hover:text-slate-600'}`}>
              <tab.icon className={`w-4 h-4 md:w-4.5 md:h-4.5 ${activeTab === tab.id ? 'text-red-600' : 'text-slate-300'}`} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <main className="flex-1 p-5 md:p-12 max-w-7xl mx-auto w-full overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-10">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
                <StatCard label="Total Visits" value={content.analytics.totalVisits} sub="Accumulated" />
                <StatCard label="Unique Visitors" value={content.analytics.uniqueVisits} sub="Distinct" />
                <StatCard label="Daily Today" value={content.analytics.dailyStats[new Date().toISOString().split('T')[0]] || 0} sub="Real-time" />
              </div>
            </div>
          )}
          {activeTab === 'branding' && (
            <div className="space-y-10">
              <InputField label="Brand Name" value={content.branding.brandName} onChange={(v) => updateSection('branding', { brandName: v })} />
              <InputField label="Accent Color" type="color" value={content.branding.accentColor} onChange={(v) => updateSection('branding', { accentColor: v })} />
            </div>
          )}
          {activeTab === 'hero' && (
            <div className="space-y-8">
              <InputField label="Headline" value={content.hero.headline} onChange={(v) => updateSection('hero', { headline: v })} />
              <TextAreaField label="Subheadline" value={content.hero.subheadline} onChange={(v) => updateSection('hero', { subheadline: v })} />
              <ImageUploadBox label="Hero Image" value={content.hero.imageUrl} onUpload={(e: any) => handleFileUpload(e, 'hero.imageUrl')} isCompressing={isCompressing} fullHeight />
            </div>
          )}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              {content.pricing.packages.map(pkg => (
                <div key={pkg.id} className="p-6 border rounded-3xl bg-slate-50">
                   <InputField label="Package Name" value={pkg.name} onChange={(v) => handleUpdatePackage(pkg.id, { name: v })} />
                </div>
              ))}
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <InputField label="Master Password" value={content.adminConfig.password} onChange={(v) => updateSection('adminConfig', { password: v })} />
            </div>
          )}
        </div>
      </main>
      <div className="bg-slate-900 p-4 flex justify-center sticky bottom-0 z-50">
          <button onClick={onExit} className="w-full max-w-sm bg-white text-slate-900 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl active:scale-95 flex items-center justify-center gap-2">
            <Check className="w-4 h-4" /> Save & Exit Panel
          </button>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, sub }: any) => (
  <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[3rem] border border-slate-100 shadow-xl flex flex-col items-center text-center">
    <p className="text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">{label}</p>
    <div className="text-3xl md:text-5xl font-black text-slate-900 mb-1 tracking-tighter">{typeof value === 'number' ? value.toLocaleString() : value}</div>
    <p className="text-[9px] text-slate-400 font-bold tracking-wider">{sub}</p>
  </div>
);

const ImageUploadBox = ({ label, value, onUpload, isCompressing, fullHeight, isBranding }: any) => {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-2 w-full">
      <label className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest ml-2">{label}</label>
      <div onClick={() => fileRef.current?.click()} className={`relative rounded-2xl md:rounded-[2.5rem] border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-red-400 transition-all bg-slate-50/30 ${fullHeight ? 'h-48 md:h-72' : 'h-32 md:h-40'}`}>
        {value ? <img src={value} alt="Preview" className={`w-full h-full p-2 rounded-2xl ${isBranding ? 'object-contain' : 'object-cover'}`} /> : <div className="text-center text-slate-300"><Upload className="w-8 h-8 mx-auto mb-2" /><span className="text-[8px] font-black uppercase">Upload {label}</span></div>}
        {isCompressing && <div className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-2xl backdrop-blur-sm"><div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>}
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={onUpload} className="hidden" />
    </div>
  );
};

const SectionToggle: React.FC<{ label: string; checked: boolean; onChange: (v: boolean) => void }> = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between p-4 md:p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] text-slate-900">{label}</span>
    <button onClick={() => onChange(!checked)} className={`relative inline-flex h-7 w-12 md:h-8 md:w-14 items-center rounded-full transition-all ${checked ? 'bg-red-600' : 'bg-slate-200'}`}>
      <span className={`inline-block h-5 w-5 md:h-6 md:w-6 transform rounded-full bg-white transition-all ${checked ? 'translate-x-6 md:translate-x-7' : 'translate-x-1'}`} />
    </button>
  </div>
);

const InputField: React.FC<{ label: string; value: string; onChange: (v: string) => void; type?: string }> = ({ label, value, onChange, type = "text" }) => (
  <div className="space-y-1.5 md:space-y-2 w-full">
    <label className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest ml-2">{label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-5 md:px-6 py-3.5 md:py-4 rounded-xl md:rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-100 outline-none transition-all font-bold text-sm md:text-base text-slate-800 bg-white shadow-sm" />
  </div>
);

const TextAreaField: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <div className="space-y-1.5 md:space-y-2 w-full">
    <label className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest ml-2">{label}</label>
    <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-5 md:px-6 py-3.5 md:py-4 rounded-xl md:rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-100 outline-none transition-all resize-none font-bold text-sm md:text-base text-slate-800 bg-white shadow-sm" />
  </div>
);

export default AdminPanel;
