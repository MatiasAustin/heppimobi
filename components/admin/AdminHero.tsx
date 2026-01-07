
import React, { useState } from 'react';
import { LandingPageContent } from '../../types.ts';
import { InputField, TextAreaField, ImageUploadBox } from './Shared.tsx';
import { Wand2, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface AdminHeroProps {
  content: LandingPageContent['hero'];
  updateHero: (data: Partial<LandingPageContent['hero']>) => void;
  handleFileUpload: (e: any, target: string) => void;
  isCompressing: boolean;
}

export const AdminHero: React.FC<AdminHeroProps> = ({ content, updateHero, handleFileUpload, isCompressing }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  // Default prompt
  const [prompt, setPrompt] = useState("A professional automotive specialist applying nano ceramic liquid to the crystal clear headlights of a modern silver Porsche 911. Hyper-realistic, 8k resolution, cinematic lighting, dramatic close-up of the headlight reflection, luxurious garage setting, 16:9 aspect ratio.");

  const updateTrustBadge = (idx: number, val: string) => {
    const newBadges = [...content.trustBadges];
    newBadges[idx] = val;
    updateHero({ trustBadges: newBadges });
  };

  const generateAIImage = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: prompt,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9"
          }
        },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Data = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          updateHero({ imageUrl: base64Data });
          break;
        }
      }
    } catch (err) {
      console.error("AI Generation Error:", err);
      alert("Gagal generate gambar. Pastikan API Key valid atau coba lagi nanti.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* AI GENERATOR SECTION - MOVED TO TOP FOR VISIBILITY */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-8 rounded-[2rem] border border-slate-200 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-red-600">
                <Sparkles className="w-5 h-5" />
            </div>
            <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">AI Hero Generator</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Create stunning visuals instantly</p>
            </div>
        </div>

        <div className="space-y-4">
            <TextAreaField label="Image Prompt Description" value={prompt} onChange={setPrompt} />
            
            <button 
                onClick={generateAIImage}
                disabled={isGenerating}
                className={`w-full py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${
                isGenerating 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-slate-900 text-white hover:bg-red-600 shadow-xl hover:shadow-red-600/20 active:scale-[0.98]'
                }`}
            >
                {isGenerating ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Visuals...
                </>
                ) : (
                <>
                    <Wand2 className="w-4 h-4" />
                    Generate Image
                </>
                )}
            </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Content Configuration</h3>
        </div>
        
        <InputField label="Headline" value={content.headline} onChange={(v) => updateHero({ headline: v })} />
        <TextAreaField label="Subheadline" value={content.subheadline} onChange={(v) => updateHero({ subheadline: v })} />
        <InputField label="CTA Button Text" value={content.ctaText} onChange={(v) => updateHero({ ctaText: v })} />
        
        <div className="space-y-2 pt-4">
            <ImageUploadBox 
                label="Current Hero Image" 
                value={content.imageUrl} 
                onUpload={(e: any) => handleFileUpload(e, 'hero.imageUrl')} 
                isCompressing={isCompressing} 
                fullHeight 
            />
        </div>
      </div>

      <div className="space-y-6 pt-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b pb-2">Floating Elements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Warranty Badge" value={content.badgeWarranty} onChange={(v) => updateHero({ badgeWarranty: v })} />
          <InputField label="Rating Score" value={content.badgeRating} onChange={(v) => updateHero({ badgeRating: v })} />
          <TextAreaField label="Testimonial Quote" value={content.badgeTestimonial} onChange={(v) => updateHero({ badgeTestimonial: v })} />
        </div>
      </div>

      <div className="space-y-6 pt-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b pb-2">Trust Bar Badges</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {content.trustBadges.map((badge, idx) => (
            <InputField key={idx} label={`Badge ${idx + 1}`} value={badge} onChange={(v) => updateTrustBadge(idx, v)} />
          ))}
        </div>
      </div>
    </div>
  );
};
