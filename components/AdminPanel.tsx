
import React, { useState, useRef, useEffect } from 'react';
import { LandingPageContent, Package, Feature, Step } from '../types';
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
          
          // Clear canvas with transparency for PNG
          if (outputFormat === 'image/png') {
            ctx?.clearRect(0, 0, width, height);
          } else {
            // Fill with white for JPEG if needed, though default draw handles it
            if (ctx) {
              ctx.fillStyle = "#FFFFFF";
              ctx.fillRect(0, 0, width, height);
            }
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
      // Determine format: Preserve transparency for branding or if source is PNG
      const isBranding = target.startsWith('branding');
      const outputFormat = (file.type === 'image/png' || isBranding) ? 'image/png' : 'image/jpeg';
      
      const compressed = await compressImage(
        file, 
        target.includes('hero') ? 1600 : 800, 
        0.8, 
        outputFormat
      );
      
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
      {/* Header Admin */}
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
        <button 
          onClick={onExit}
          className="bg-slate-900 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-black uppercase text-[8px] md:text-[10px] tracking-[0.2em] shadow-lg hover:bg-red-600 transition-all flex items-center gap-2 active:scale-95"
        >
          <Check className="w-3 md:w-3.5 h-3 md:h-3.5" /> <span className="hidden sm:inline">Publish &</span> Exit
        </button>
      </header>

      {/* Nav Tabs */}
      <div className="relative bg-slate-50 border-b border-slate-100">
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto no-scrollbar scroll-smooth px-2"
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 md:px-6 py-4 md:py-5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] transition-all flex flex-col md:flex-row items-center gap-1.5 md:gap-2.5 whitespace-nowrap border-b-2 relative ${
                activeTab === tab.id 
                  ? 'text-red-600 border-red-600 bg-white' 
                  : 'text-slate-400 border-transparent hover:text-slate-600'
              }`}
            >
              <tab.icon className={`w-4 h-4 md:w-4.5 md:h-4.5 ${activeTab === tab.id ? 'text-red-600' : 'text-slate-300'}`} />
              {tab.label}
            </button>
          ))}
        </div>
        
        {showScrollIndicator && (
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none flex items-center justify-end px-2">
             <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-5 md:p-12 max-w-7xl mx-auto w-full overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-10">
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
                  <StatCard label="Total Visits" value={content.analytics.totalVisits} sub="Accumulated" />
                  <StatCard label="Unique Visitors" value={content.analytics.uniqueVisits} sub="Distinct" />
                  <StatCard label="Daily Today" value={content.analytics.dailyStats[new Date().toISOString().split('T')[0]] || 0} sub="Real-time" />
                </div>
                <div className="bg-slate-50 p-6 md:p-10 rounded-3xl md:rounded-[3rem] border border-slate-100">
                   <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 mb-8 text-center">Traffic (Last 7 Days)</h3>
                   <div className="h-32 md:h-48 flex items-end gap-2 md:gap-4">
                      {Array.from({length: 7}).map((_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() - (6 - i));
                        const dateStr = date.toISOString().split('T')[0];
                        const count = content.analytics.dailyStats[dateStr] || 0;
                        const max = Math.max(...(Object.values(content.analytics.dailyStats) as number[]), 10);
                        const height = (count / max) * 100;
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="w-full bg-slate-200 rounded-lg md:rounded-2xl relative h-full">
                                <div className="absolute bottom-0 left-0 w-full bg-red-500 rounded-lg md:rounded-2xl transition-all duration-700" style={{height: `${height}%`}}></div>
                            </div>
                            <span className="text-[8px] text-slate-400 font-black">{dateStr.split('-')[2]}</span>
                          </div>
                        )
                      })}
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'branding' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="space-y-6">
                      <h3 className="font-black text-xl tracking-tight border-l-4 border-red-600 pl-4">Branding</h3>
                      <InputField label="Brand Name" value={content.branding.brandName} onChange={(v) => updateSection('branding', { brandName: v })} />
                      <InputField label="Accent Color" type="color" value={content.branding.accentColor} onChange={(v) => updateSection('branding', { accentColor: v })} />
                  </div>
                  <div className="space-y-6">
                      <h3 className="font-black text-xl tracking-tight border-l-4 border-red-600 pl-4">Assets</h3>
                      <div className="grid grid-cols-2 gap-4">
                          <ImageUploadBox label="Logo (PNG Recommended)" value={content.branding.logoUrl} onUpload={(e: any) => handleFileUpload(e, 'branding.logoUrl')} isCompressing={isCompressing} isBranding />
                          <ImageUploadBox label="Favicon" value={content.branding.faviconUrl} onUpload={(e: any) => handleFileUpload(e, 'branding.faviconUrl')} isCompressing={isCompressing} isBranding />
                      </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <SectionToggle label="Hero Visible" checked={content.hero.visible} onChange={(v) => updateSection('hero', { visible: v })} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-4">
                        <InputField label="Headline Utama" value={content.hero.headline} onChange={(v) => updateSection('hero', { headline: v })} />
                        <TextAreaField label="Subheadline Penjelas" value={content.hero.subheadline} onChange={(v) => updateSection('hero', { subheadline: v })} />
                        <InputField label="CTA Button" value={content.hero.ctaText} onChange={(v) => updateSection('hero', { ctaText: v })} />
                    </div>
                    <ImageUploadBox label="Hero Image" value={content.hero.imageUrl} onUpload={(e: any) => handleFileUpload(e, 'hero.imageUrl')} isCompressing={isCompressing} fullHeight />
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <SectionToggle label="Section Visible" checked={content.features.visible} onChange={(v) => updateSection('features', { visible: v })} />
                <InputField label="Judul Section" value={content.features.sectionTitle} onChange={(v) => updateSection('features', { sectionTitle: v })} />
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="font-black text-lg">Keunggulan Items</h4>
                    <button onClick={() => updateSection('features', { items: [...content.features.items, { id: Date.now().toString(), title: "Fitur Baru", description: "Deskripsi...", icon: "Shield" }] })} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                        <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.features.items.map(item => (
                      <div key={item.id} className="p-6 border border-slate-100 rounded-3xl bg-slate-50/50">
                        <InputField label="Judul" value={item.title} onChange={v => updateSection('features', { items: content.features.items.map(i => i.id === item.id ? {...i, title: v} : i) })} />
                        <div className="mt-3">
                            <TextAreaField label="Deskripsi" value={item.description} onChange={v => updateSection('features', { items: content.features.items.map(i => i.id === item.id ? {...i, description: v} : i) })} />
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <select className="text-[9px] font-black uppercase tracking-widest bg-white border border-slate-200 px-3 py-2.5 rounded-lg outline-none" value={item.icon} onChange={e => updateSection('features', { items: content.features.items.map(i => i.id === item.id ? {...i, icon: e.target.value} : i) })}>
                            <option value="Shield">Shield</option>
                            <option value="Zap">Zap</option>
                            <option value="Smile">Smile</option>
                          </select>
                          <button onClick={() => updateSection('features', { items: content.features.items.filter(i => i.id !== item.id) })} className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <SectionToggle label="Layanan Section" checked={content.pricing.visible} onChange={(v) => updateSection('pricing', { visible: v })} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Judul Section" value={content.pricing.sectionTitle} onChange={(v) => updateSection('pricing', { sectionTitle: v })} />
                    <InputField label="Subtitle" value={content.pricing.sectionSubtitle} onChange={(v) => updateSection('pricing', { sectionSubtitle: v })} />
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h4 className="font-black text-lg">Daftar Paket</h4>
                        <button onClick={() => updateSection('pricing', { packages: [...content.pricing.packages, { id: Date.now().toString(), name: "New", stepPoles: 1, waktuPengerjaan: "1 JAM", ketahanan: "1 BULAN", proteksi: "-", garansi: "-", retakRambut: false, harga: 100000, isBestSeller: false, visible: true }] })} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Plus className="w-3.5 h-3.5" /> Add Package
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {content.pricing.packages.map(pkg => (
                            <div key={pkg.id} className="p-6 md:p-8 border border-slate-100 rounded-3xl bg-slate-50/50 relative group">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                    <InputField label="Nama" value={pkg.name} onChange={(v) => handleUpdatePackage(pkg.id, { name: v })} />
                                    <InputField label="Harga" type="number" value={pkg.harga.toString()} onChange={(v) => handleUpdatePackage(pkg.id, { harga: parseInt(v) || 0 })} />
                                    <InputField label="Poles" type="number" value={pkg.stepPoles.toString()} onChange={(v) => handleUpdatePackage(pkg.id, { stepPoles: parseInt(v) || 1 })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <InputField label="Waktu" value={pkg.waktuPengerjaan} onChange={(v) => handleUpdatePackage(pkg.id, { waktuPengerjaan: v })} />
                                    <InputField label="Garansi" value={pkg.garansi} onChange={(v) => handleUpdatePackage(pkg.id, { garansi: v })} />
                                </div>
                                <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200/50">
                                    <label className="flex items-center gap-2.5 text-[9px] font-black uppercase tracking-widest cursor-pointer">
                                        <input type="checkbox" checked={pkg.isBestSeller} onChange={e => handleUpdatePackage(pkg.id, { isBestSeller: e.target.checked })} className="w-4.5 h-4.5 rounded text-red-600" /> Best Seller
                                    </label>
                                    <label className="flex items-center gap-2.5 text-[9px] font-black uppercase tracking-widest cursor-pointer">
                                        <input type="checkbox" checked={pkg.visible} onChange={e => handleUpdatePackage(pkg.id, { visible: e.target.checked })} className="w-4.5 h-4.5 rounded text-red-600" /> Visible
                                    </label>
                                    <button onClick={() => updateSection('pricing', { packages: content.pricing.packages.filter(p => p.id !== pkg.id) })} className="ml-auto p-2 text-red-400 hover:text-red-600 transition-colors"><Trash2 className="w-5 h-5" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            )}

            {activeTab === 'process' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <SectionToggle label="Proses Section" checked={content.process.visible} onChange={(v) => updateSection('process', { visible: v })} />
                <InputField label="Judul Section" value={content.process.sectionTitle} onChange={(v) => updateSection('process', { sectionTitle: v })} />
                <div className="space-y-6">
                   <div className="flex justify-between items-center">
                     <h4 className="font-black text-lg">Tahapan Pengerjaan</h4>
                     <button onClick={() => updateSection('process', { steps: [...content.process.steps, { id: Date.now().toString(), number: content.process.steps.length + 1, title: "Step Baru", description: "Deskripsi..." }] })} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                        <Plus className="w-3.5 h-3.5" /> Add Step
                     </button>
                   </div>
                   <div className="grid grid-cols-1 gap-4">
                      {content.process.steps.map((step, index) => (
                        <div key={step.id} className="p-6 border border-slate-100 rounded-3xl bg-slate-50/50 flex gap-6 items-start">
                           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-slate-400 text-xl shadow-sm flex-shrink-0">{index + 1}</div>
                           <div className="flex-1 space-y-3">
                              <InputField label="Judul Tahap" value={step.title} onChange={v => updateSection('process', { steps: content.process.steps.map(s => s.id === step.id ? {...s, title: v} : s) })} />
                              <TextAreaField label="Deskripsi" value={step.description} onChange={v => updateSection('process', { steps: content.process.steps.map(s => s.id === step.id ? {...s, description: v} : s) })} />
                           </div>
                           <button onClick={() => updateSection('process', { steps: content.process.steps.filter(s => s.id !== step.id) })} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}

            {['cta', 'footer', 'settings'].includes(activeTab) && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                   {activeTab === 'settings' && (
                     <div className="space-y-6">
                        <SectionToggle label="Login Button on Web" checked={content.adminConfig.showAdminButton} onChange={(v) => updateSection('adminConfig', { showAdminButton: v })} />
                        <InputField label="Master Password" value={content.adminConfig.password} onChange={(v) => updateSection('adminConfig', { password: v })} />
                     </div>
                   )}
                   {activeTab === 'cta' && (
                     <div className="space-y-4">
                        <InputField label="CTA Headline" value={content.cta.headline} onChange={(v) => updateSection('cta', { headline: v })} />
                        <TextAreaField label="CTA Subheadline" value={content.cta.subheadline} onChange={(v) => updateSection('cta', { subheadline: v })} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Button Text" value={content.cta.buttonText} onChange={(v) => updateSection('cta', { buttonText: v })} />
                            <InputField label="WhatsApp Number (e.g. 62812...)" value={content.cta.whatsappNumber} onChange={(v) => updateSection('cta', { whatsappNumber: v })} />
                        </div>
                     </div>
                   )}
                   {activeTab === 'footer' && (
                     <div className="space-y-4">
                        <InputField label="Footer Tagline" value={content.footer.tagline} onChange={(v) => updateSection('footer', { tagline: v })} />
                        <InputField label="Contact Info" value={content.footer.contact} onChange={(v) => updateSection('footer', { contact: v })} />
                        <InputField label="Service Address/Area" value={content.footer.address} onChange={(v) => updateSection('footer', { address: v })} />
                     </div>
                   )}
                 </div>
              </div>
            )}
        </div>
      </main>

      {/* Mobile-Friendly Fixed Footer Action */}
      <div className="bg-slate-900 p-4 md:p-6 flex justify-center sticky bottom-0 z-50">
          <button 
            onClick={onExit}
            className="w-full max-w-sm bg-white text-slate-900 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl active:scale-95 flex items-center justify-center gap-2"
          >
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
      <div 
        onClick={() => fileRef.current?.click()}
        className={`relative rounded-2xl md:rounded-[2.5rem] border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-red-400 transition-all bg-slate-50/30 ${fullHeight ? 'h-48 md:h-72' : 'h-32 md:h-40'}`}
        style={isBranding ? { 
          backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
          backgroundSize: '10px 10px'
        } : {}}
      >
        {value ? (
          <img src={value} alt="Preview" className={`w-full h-full p-2 rounded-2xl ${isBranding ? 'object-contain' : 'object-cover'}`} />
        ) : (
          <div className="text-center text-slate-300">
            <Upload className="w-8 h-8 mx-auto mb-2" />
            <span className="text-[8px] font-black uppercase">Upload {label}</span>
          </div>
        )}
        {isCompressing && (
          <div className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-2xl backdrop-blur-sm">
             <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
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
