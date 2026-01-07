
import React, { useState } from 'react';
import { LandingPageContent } from '../../types.ts';
import { InputField, TextAreaField, ImageUploadBox } from './Shared.tsx';
import { Wand2, Sparkles, Loader2, AlertCircle, X, ExternalLink } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface AdminHeroProps {
  content: LandingPageContent['hero'];
  updateHero: (data: Partial<LandingPageContent['hero']>) => void;
  handleFileUpload: (e: any, target: string) => void;
  isCompressing: boolean;
}

export const AdminHero: React.FC<AdminHeroProps> = ({ content, updateHero, handleFileUpload, isCompressing }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorDetails, setErrorDetails] = useState({ title: '', message: '', code: '' });
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
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        setErrorDetails({
          title: 'API Key Tidak Ditemukan',
          message: 'Environment variable VITE_GEMINI_API_KEY belum di-set.',
          code: 'missing_api_key'
        });
        setShowErrorModal(true);
        setIsGenerating(false);
        return;
      }

      console.log("🚀 Generating image with Gemini API...");
      console.log("📝 Prompt:", prompt);

      const genai = new GoogleGenAI({ apiKey });

      // Use generateContent with the model
      const result = await genai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: [{
          role: 'user',
          parts: [{
            text: `Generate a photorealistic image based on this description: ${prompt}`
          }]
        }]
      });

      console.log("✅ Response received:", result);

      // Check if response has image data in inline format
      if (result.candidates && result.candidates.length > 0) {
        const parts = result.candidates[0].content.parts;

        for (const part of parts) {
          if (part.inlineData) {
            const base64Data = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            updateHero({ imageUrl: base64Data });
            console.log("🎨 Image generated successfully!");
            return;
          }
        }
      }

      // If no image found in response
      console.warn("⚠️ No image data in response");
      setErrorDetails({
        title: 'Model Tidak Menghasilkan Gambar',
        message: 'Gemini API tidak mengembalikan data gambar. Model yang digunakan mungkin tidak support image generation.',
        code: 'no_image_output'
      });
      setShowErrorModal(true);

    } catch (err: any) {
      console.error("❌ AI Generation Error:", err);

      // Parse error untuk memberikan pesan yang lebih spesifik
      let title = 'Gagal Generate Gambar';
      let message = err?.message || err?.toString() || 'Terjadi kesalahan yang tidak diketahui.';
      let code = 'unknown_error';

      // Check for specific error types
      if (message.includes('429') || message.includes('quota')) {
        title = 'Quota API Terlampaui';
        message = 'Anda telah mencapai batas penggunaan gratis Gemini API untuk hari/bulan ini. Quota akan reset secara otomatis.';
        code = 'quota_exceeded';
      } else if (message.includes('401') || message.includes('API key')) {
        title = 'API Key Tidak Valid';
        message = 'API key yang digunakan tidak valid atau sudah tidak aktif. Silakan periksa kembali API key Anda.';
        code = 'invalid_api_key';
      } else if (message.includes('network') || message.includes('fetch')) {
        title = 'Koneksi Bermasalah';
        message = 'Tidak dapat terhubung ke server Gemini API. Periksa koneksi internet Anda.';
        code = 'network_error';
      }

      setErrorDetails({ title, message, code });
      setShowErrorModal(true);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">

      {/* ERROR MODAL */}
      {showErrorModal && (
        <div className="fixed inset-0 z-[99999] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{errorDetails.title}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Error Code: {errorDetails.code}</p>
                </div>
              </div>
              <button
                onClick={() => setShowErrorModal(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              <p className="text-sm text-slate-600 leading-relaxed">
                {errorDetails.message}
              </p>

              {/* Helpful actions based on error type */}
              {errorDetails.code === 'quota_exceeded' && (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl space-y-3">
                  <p className="text-xs font-bold text-blue-900 uppercase tracking-widest">💡 Solusi</p>
                  <ul className="text-sm text-blue-800 space-y-2 ml-4 list-disc">
                    <li>Tunggu hingga quota reset (biasanya setiap hari/bulan)</li>
                    <li>Upgrade ke paid plan untuk unlimited access</li>
                    <li>Gunakan fitur upload manual sementara waktu</li>
                  </ul>
                  <a
                    href="https://ai.google.dev/gemini-api/docs/rate-limits"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Cek Rate Limits & Quota
                  </a>
                </div>
              )}

              {errorDetails.code === 'missing_api_key' && (
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl space-y-3">
                  <p className="text-xs font-bold text-amber-900 uppercase tracking-widest">⚙️ Setup Required</p>
                  <ol className="text-sm text-amber-800 space-y-2 ml-4 list-decimal">
                    <li>Buat file <code className="bg-amber-100 px-2 py-0.5 rounded">.env.local</code> di root project</li>
                    <li>Tambahkan: <code className="bg-amber-100 px-2 py-0.5 rounded">VITE_GEMINI_API_KEY=your_key</code></li>
                    <li>Restart dev server (Ctrl+C lalu npm run dev)</li>
                  </ol>
                </div>
              )}

              {errorDetails.code === 'invalid_api_key' && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl space-y-3">
                  <p className="text-xs font-bold text-red-900 uppercase tracking-widest">🔑 API Key Issue</p>
                  <ul className="text-sm text-red-800 space-y-2 ml-4 list-disc">
                    <li>Periksa API key di file .env.local</li>
                    <li>Generate API key baru di Google AI Studio</li>
                    <li>Pastikan API key aktif dan tidak expired</li>
                  </ul>
                  <a
                    href="https://aistudio.google.com/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-black text-red-600 hover:text-red-700 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Generate API Key Baru
                  </a>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setShowErrorModal(false)}
                className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-red-600 transition-all"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

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
            className={`w-full py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${isGenerating
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
