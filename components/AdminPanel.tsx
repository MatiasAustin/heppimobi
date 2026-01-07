
import React, { useState, useRef } from 'react';
import { LandingPageContent } from '../types.ts';
import { Check, Settings, Layout, BarChart3, Image as ImageIcon, Palette, List, MessageSquare, Info, Zap, Save, LogOut, Download, Copy, X } from 'lucide-react';

// Sub-components
import { AdminHero } from './admin/AdminHero.tsx';
import { AdminPricing } from './admin/AdminPricing.tsx';
import { AdminBranding } from './admin/AdminBranding.tsx';
import { AdminGallery } from './admin/AdminGallery.tsx';
import { AdminTestimonials } from './admin/AdminTestimonials.tsx';
import { AnalyticsChart } from './admin/AnalyticsChart.tsx';
import { StatCard, ImageUploadBox, InputField, TextAreaField, SectionToggle } from './admin/Shared.tsx';

interface AdminPanelProps {
  content: LandingPageContent;
  onUpdate: (content: LandingPageContent) => void;
  onExit: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ content, onUpdate, onExit }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'branding' | 'hero' | 'gallery' | 'testimonials' | 'pricing' | 'features' | 'process' | 'cta' | 'footer' | 'settings'>('dashboard');
  const [isCompressing, setIsCompressing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [showExportModal, setShowExportModal] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateSection = (section: keyof LandingPageContent, data: any) => {
    onUpdate({ ...content, [section]: { ...content[section], ...data } });
    setSaveStatus('idle');
  };

  const handleManualSave = () => {
    setSaveStatus('saving');
    // Simulate sync/save feedback
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 800);
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const generateExportCode = () => {
    // Generate valid Typescript code for constants.ts
    return `import { LandingPageContent } from './types';

export const INITIAL_CONTENT: LandingPageContent = ${JSON.stringify(content, null, 2)};`;
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generateExportCode());
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const compressImage = (file: File, maxWidth = 1920, quality = 0.8, outputFormat = 'image/jpeg'): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Dynamic quality based on file size
      let finalQuality = quality;
      if (file.size > 5 * 1024 * 1024) { // > 5MB
        finalQuality = 0.6; // More aggressive compression
        console.log("📦 Large file detected (>5MB), applying aggressive compression...");
      } else if (file.size > 2 * 1024 * 1024) { // > 2MB
        finalQuality = 0.7;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Downscale if too large
          const maxDim = maxWidth;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = (maxDim / width) * height;
              width = maxDim;
            } else {
              width = (maxDim / height) * width;
              height = maxDim;
            }
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
          const result = canvas.toDataURL(outputFormat, finalQuality);
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

      // Auto-scale based on target
      let targetWidth = 1200;
      if (target.includes('hero')) targetWidth = 1920;
      if (target.includes('avatar')) targetWidth = 400;

      const compressed = await compressImage(file, targetWidth, 0.8, outputFormat);

      // Special handling for nested arrays (Gallery, Testimonials)
      if (target.startsWith('gallery-image-')) {
        const id = target.replace('gallery-image-', '');
        const newImages = content.gallery.images.map(img => img.id === id ? { ...img, url: compressed } : img);
        updateSection('gallery', { images: newImages });
        return;
      }

      if (target.startsWith('testimonial-avatar-')) {
        const id = target.replace('testimonial-avatar-', '');
        const newItems = content.testimonials.items.map(item => item.id === id ? { ...item, avatarUrl: compressed } : item);
        updateSection('testimonials', { items: newItems });
        return;
      }

      const parts = target.split('.');
      if (parts.length === 2) {
        const [section, field] = parts;
        updateSection(section as keyof LandingPageContent, { [field]: compressed });
      }
    } catch (err) {
      console.error(err);
      alert("Gagal memproses gambar.");
    } finally {
      setIsCompressing(false);
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Stats', icon: BarChart3 },
    { id: 'branding', label: 'Brand', icon: Palette },
    { id: 'hero', label: 'Hero', icon: ImageIcon },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'testimonials', label: 'Reviews', icon: MessageSquare },
    { id: 'features', label: 'About', icon: Info },
    { id: 'pricing', label: 'Layanan', icon: Layout },
    { id: 'process', label: 'Proses', icon: List },
    { id: 'cta', label: 'CTA', icon: MessageSquare },
    { id: 'footer', label: 'Footer', icon: List },
    { id: 'settings', label: 'Config', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* EXPORT MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-[99999] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">Export for Vercel</h3>
                <p className="text-xs text-slate-400 font-bold mt-1">Make your changes permanent</p>
              </div>
              <button onClick={() => setShowExportModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-slate-50 space-y-6">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3">
                <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800 leading-relaxed">
                  <p className="font-bold mb-1">How to save permanently:</p>
                  <ol className="list-decimal ml-4 space-y-1 text-xs">
                    <li>Click <strong>Copy Code</strong> below.</li>
                    <li>Open <code>constants.ts</code> in your project folder.</li>
                    <li>Replace <strong>ALL</strong> content in that file with the copied code.</li>
                    <li>Commit & Push to GitHub to trigger Vercel deploy.</li>
                  </ol>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute right-4 top-4">
                  <button
                    onClick={handleCopyToClipboard}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${copyStatus ? 'bg-green-500 text-white' : 'bg-slate-900 text-white hover:bg-red-600'
                      }`}
                  >
                    {copyStatus ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copyStatus ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-300 p-6 rounded-2xl text-[10px] md:text-xs overflow-x-auto font-mono leading-relaxed h-64 md:h-80 border border-slate-800">
                  {generateExportCode()}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

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

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={handleExport}
            className="hidden md:flex bg-red-50 text-red-600 border border-red-100 px-4 md:px-6 py-2 md:py-2.5 rounded-full font-black uppercase text-[8px] md:text-[10px] tracking-[0.2em] shadow-sm hover:bg-red-600 hover:text-white transition-all items-center gap-2 active:scale-95"
          >
            <Download className="w-3 md:w-3.5 h-3 md:h-3.5" />
            Export Config
          </button>

          <button
            onClick={handleManualSave}
            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full font-black uppercase text-[8px] md:text-[10px] tracking-[0.2em] transition-all flex items-center gap-2 active:scale-95 ${saveStatus === 'saved' ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
          >
            {saveStatus === 'saving' ? (
              <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
            ) : saveStatus === 'saved' ? (
              <Check className="w-3 md:w-3.5 h-3 md:h-3.5" />
            ) : (
              <Save className="w-3 md:w-3.5 h-3 md:h-3.5" />
            )}
            <span className="hidden sm:inline">{saveStatus === 'saved' ? 'Data Saved' : 'Save Changes'}</span>
          </button>

          <button onClick={onExit} className="bg-slate-900 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-black uppercase text-[8px] md:text-[10px] tracking-[0.2em] shadow-lg hover:bg-red-600 transition-all flex items-center gap-2 active:scale-95">
            <LogOut className="w-3 md:w-3.5 h-3 md:h-3.5" /> <span className="hidden sm:inline">Close Panel</span>
          </button>
        </div>
      </header>

      <div className="bg-slate-50 border-b border-slate-100 sticky top-[60px] md:top-[72px] z-[90]">
        <div ref={scrollRef} className="flex overflow-x-auto no-scrollbar scroll-smooth px-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-4 md:px-6 py-4 md:py-5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] transition-all flex flex-col md:flex-row items-center gap-1.5 md:gap-2.5 whitespace-nowrap border-b-2 relative ${activeTab === tab.id ? 'text-red-600 border-red-600 bg-white' : 'text-slate-400 border-transparent hover:text-slate-600'}`}>
              <tab.icon className={`w-4 h-4 md:w-4.5 md:h-4.5 ${activeTab === tab.id ? 'text-red-600' : 'text-slate-300'}`} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 p-5 md:p-12 max-w-7xl mx-auto w-full overflow-y-auto pb-32">
        <div className="max-w-4xl mx-auto space-y-12">

          {activeTab === 'dashboard' && (
            <div className="space-y-12 animate-in fade-in duration-300">
              {/* Mobile Export Button */}
              <div className="md:hidden">
                <button
                  onClick={handleExport}
                  className="w-full bg-red-50 text-red-600 border border-red-100 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Config for Vercel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
                <StatCard label="Total Visits" value={content.analytics.totalVisits} sub="Accumulated" />
                <StatCard label="Unique Visitors" value={content.analytics.uniqueVisits} sub="Distinct" />
                <StatCard label="Daily Today" value={content.analytics.dailyStats[new Date().toISOString().split('T')[0]] || 0} sub="Real-time" />
              </div>

              <AnalyticsChart
                dailyStats={content.analytics.dailyStats}
                accentColor={content.branding.accentColor}
              />
            </div>
          )}

          {activeTab === 'branding' && (
            <AdminBranding
              content={content.branding}
              updateBranding={(data) => updateSection('branding', data)}
              handleFileUpload={handleFileUpload}
              isCompressing={isCompressing}
            />
          )}

          {activeTab === 'hero' && (
            <AdminHero
              content={content.hero}
              updateHero={(data) => updateSection('hero', data)}
              handleFileUpload={handleFileUpload}
              isCompressing={isCompressing}
            />
          )}

          {activeTab === 'gallery' && (
            <AdminGallery
              content={content.gallery}
              updateGallery={(data) => updateSection('gallery', data)}
              handleFileUpload={handleFileUpload}
              isCompressing={isCompressing}
            />
          )}

          {activeTab === 'testimonials' && (
            <AdminTestimonials
              content={content.testimonials}
              updateTestimonials={(data) => updateSection('testimonials', data)}
              handleFileUpload={handleFileUpload}
              isCompressing={isCompressing}
            />
          )}

          {activeTab === 'pricing' && (
            <AdminPricing
              packages={content.pricing.packages}
              updatePackages={(pkgs) => updateSection('pricing', { packages: pkgs })}
            />
          )}

          {activeTab === 'features' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <InputField label="Section Title" value={content.features.sectionTitle} onChange={(v) => updateSection('features', { sectionTitle: v })} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.features.items.map(item => (
                  <div key={item.id} className="p-6 border-2 border-slate-100 rounded-3xl space-y-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center"><Zap className="w-5 h-5 text-slate-400" /></div>
                    <InputField label="Title" value={item.title} onChange={(v) => {
                      const updated = content.features.items.map(f => f.id === item.id ? { ...f, title: v } : f);
                      updateSection('features', { items: updated });
                    }} />
                    <TextAreaField label="Description" value={item.description} onChange={(v) => {
                      const updated = content.features.items.map(f => f.id === item.id ? { ...f, description: v } : f);
                      updateSection('features', { items: updated });
                    }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <InputField label="Section Title" value={content.process.sectionTitle} onChange={(v) => updateSection('process', { sectionTitle: v })} />
              <div className="space-y-4">
                {content.process.steps.map((step, idx) => (
                  <div key={step.id} className="p-6 border-2 border-slate-100 rounded-3xl flex flex-col md:flex-row gap-6">
                    <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black flex-shrink-0">{idx + 1}</div>
                    <div className="flex-grow space-y-4">
                      <InputField label="Step Title" value={step.title} onChange={(v) => {
                        const updated = content.process.steps.map(s => s.id === step.id ? { ...s, title: v } : s);
                        updateSection('process', { steps: updated });
                      }} />
                      <TextAreaField label="Description" value={step.description} onChange={(v) => {
                        const updated = content.process.steps.map(s => s.id === step.id ? { ...s, description: v } : s);
                        updateSection('process', { steps: updated });
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'cta' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <InputField label="Headline" value={content.cta.headline} onChange={(v) => updateSection('cta', { headline: v })} />
              <TextAreaField label="Subheadline" value={content.cta.subheadline} onChange={(v) => updateSection('cta', { subheadline: v })} />
              <InputField label="Button Text" value={content.cta.buttonText} onChange={(v) => updateSection('cta', { buttonText: v })} />
              <InputField label="WhatsApp (e.g. 628...)" value={content.cta.whatsappNumber} onChange={(v) => updateSection('cta', { whatsappNumber: v })} />
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <InputField label="Tagline" value={content.footer.tagline} onChange={(v) => updateSection('footer', { tagline: v })} />
              <InputField label="Contact" value={content.footer.contact} onChange={(v) => updateSection('footer', { contact: v })} />
              <InputField label="Address" value={content.footer.address} onChange={(v) => updateSection('footer', { address: v })} />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <section className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <Download className="w-6 h-6 text-blue-500" />
                  Cloud Synchronization
                </h3>
                <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">
                  Data Anda tersimpan secara lokal dan otomatis disinkronkan ke Supabase. Jika cloud masih kosong, Anda bisa memicu sinkronisasi manual ke database.
                </p>
                <button
                  onClick={() => {
                    import('../lib/supabase.ts').then(m => {
                      m.saveRemoteContent(content).then(() => {
                        alert("🎉 Data berhasil disinkronkan ke Cloud!");
                      });
                    });
                  }}
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
                >
                  Push to Cloud Database
                </button>
              </section>

              <InputField label="Master Password" value={content.adminConfig.password} onChange={(v) => updateSection('adminConfig', { password: v })} />
              <SectionToggle
                label="Show Admin Access Button"
                checked={content.adminConfig.showAdminButton}
                onChange={(v) => updateSection('adminConfig', { showAdminButton: v })}
                description="Matikan opsi ini jika sudah tidak dalam masa maintenance untuk menjaga kerapihan tampilan publik. Anda tetap bisa masuk lewat URL /?admin=true."
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
