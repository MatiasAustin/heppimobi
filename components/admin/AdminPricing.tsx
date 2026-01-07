
import React from 'react';
import { Package } from '../../types.ts';
import { InputField, TextAreaField } from './Shared.tsx';
import { Plus, Trash2, Star } from 'lucide-react';

interface AdminPricingProps {
  sectionTitle: string;
  sectionSubtitle: string;
  packages: Package[];
  updatePricing: (data: Partial<{ sectionTitle: string; sectionSubtitle: string; packages: Package[] }>) => void;
}

export const AdminPricing: React.FC<AdminPricingProps> = ({ sectionTitle, sectionSubtitle, packages, updatePricing }) => {
  const updatePackages = (newPkgs: Package[]) => updatePricing({ packages: newPkgs });

  const handleUpdatePackage = (id: string, updates: Partial<Package>) => {
    const updated = packages.map(p => {
      if (p.id === id) return { ...p, ...updates };
      if (updates.isBestSeller && p.id !== id) return { ...p, isBestSeller: false };
      return p;
    });
    updatePackages(updated);
  };

  const addPackage = () => {
    const newPkg: Package = {
      id: Date.now().toString(),
      name: "New Package",
      stepPoles: 5,
      waktuPengerjaan: "2 JAM",
      ketahanan: "1 TAHUN",
      proteksi: "Sealant",
      garansi: "-",
      retakRambut: false,
      harga: 0,
      isBestSeller: false,
      visible: true
    };
    updatePackages([...packages, newPkg]);
  };

  const deletePackage = (id: string) => {
    updatePackages(packages.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Section Title" value={sectionTitle} onChange={(v) => updatePricing({ sectionTitle: v })} />
        <TextAreaField label="Section Subtitle" value={sectionSubtitle} onChange={(v) => updatePricing({ sectionSubtitle: v })} />
      </div>

      <div className="flex justify-between items-center mb-6 pt-4 border-t border-slate-100">
        <div>
          <h3 className="text-lg font-black">Packages Editor</h3>
          <p className="text-xs text-slate-400 font-bold">Manage your service tiers</p>
        </div>
        <button onClick={addPackage} className="bg-red-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-900 transition-all shadow-lg">
          <Plus className="w-4 h-4" /> Add Package
        </button>
      </div>

      <div className="space-y-6">
        {packages.map(pkg => (
          <div key={pkg.id} className="p-8 border-2 border-slate-100 rounded-[2.5rem] bg-white shadow-sm relative group overflow-hidden">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleUpdatePackage(pkg.id, { isBestSeller: !pkg.isBestSeller })}
                  className={`p-2 rounded-xl border transition-all ${pkg.isBestSeller ? 'bg-red-600 border-red-600 text-white' : 'bg-white border-slate-200 text-slate-300'}`}
                >
                  <Star className="w-5 h-5 fill-current" />
                </button>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">{pkg.isBestSeller ? 'Featured Package' : 'Standard Package'}</span>
              </div>
              <button onClick={() => deletePackage(pkg.id)} className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Package Name" value={pkg.name} onChange={(v) => handleUpdatePackage(pkg.id, { name: v })} />
              <InputField label="Price (IDR)" type="number" value={pkg.harga.toString()} onChange={(v) => handleUpdatePackage(pkg.id, { harga: parseInt(v) || 0 })} />
              <InputField label="Polish Steps" type="number" value={pkg.stepPoles.toString()} onChange={(v) => handleUpdatePackage(pkg.id, { stepPoles: parseInt(v) || 0 })} />
              <InputField label="Duration" value={pkg.waktuPengerjaan} onChange={(v) => handleUpdatePackage(pkg.id, { waktuPengerjaan: v })} />
              <InputField label="Durability" value={pkg.ketahanan} onChange={(v) => handleUpdatePackage(pkg.id, { ketahanan: v })} />
              <InputField label="Protection Type" value={pkg.proteksi} onChange={(v) => handleUpdatePackage(pkg.id, { proteksi: v })} />
              <InputField label="Warranty" value={pkg.garansi} onChange={(v) => handleUpdatePackage(pkg.id, { garansi: v })} />

              <div className="flex items-center gap-4 pt-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Handle Retak Rambut?</label>
                <button
                  onClick={() => handleUpdatePackage(pkg.id, { retakRambut: !pkg.retakRambut })}
                  className={`w-12 h-6 rounded-full transition-all relative ${pkg.retakRambut ? 'bg-red-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${pkg.retakRambut ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
