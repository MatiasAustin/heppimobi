
import React from 'react';
import { LandingPageContent } from '../../types.ts';
import { InputField, ImageUploadBox } from './Shared.tsx';

interface AdminBrandingProps {
  content: LandingPageContent['branding'];
  updateBranding: (data: Partial<LandingPageContent['branding']>) => void;
  handleFileUpload: (e: any, target: string) => void;
  isCompressing: boolean;
}

export const AdminBranding: React.FC<AdminBrandingProps> = ({ content, updateBranding, handleFileUpload, isCompressing }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputField 
          label="Brand Name" 
          value={content.brandName} 
          onChange={(v) => updateBranding({ brandName: v })} 
        />
        
        <div className="space-y-1.5 md:space-y-2 w-full">
          <label className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest ml-2">Accent Color</label>
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
              <input 
                type="color" 
                value={content.accentColor} 
                onChange={(e) => updateBranding({ accentColor: e.target.value })} 
                className="absolute inset-[-10px] w-[150%] h-[150%] cursor-pointer"
              />
            </div>
            <input 
              type="text" 
              value={content.accentColor} 
              onChange={(e) => updateBranding({ accentColor: e.target.value })} 
              className="flex-grow px-5 py-3.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-red-100 outline-none transition-all font-bold text-sm text-slate-800 bg-white"
              placeholder="#HEXCODE"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageUploadBox 
          label="Logo (Transparent PNG)" 
          value={content.logoUrl} 
          onUpload={(e: any) => handleFileUpload(e, 'branding.logoUrl')} 
          isCompressing={isCompressing} 
          isBranding 
        />
        <ImageUploadBox 
          label="Favicon (Icon)" 
          value={content.faviconUrl} 
          onUpload={(e: any) => handleFileUpload(e, 'branding.faviconUrl')} 
          isCompressing={isCompressing} 
          isBranding 
        />
      </div>
    </div>
  );
};
