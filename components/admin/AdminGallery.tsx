
import React from 'react';
import { LandingPageContent, GalleryImage } from '../../types.ts';
import { InputField, ImageUploadBox } from './Shared.tsx';
import { Trash2, Plus, GripVertical, Image as ImageIcon } from 'lucide-react';
import { UnsplashExplorer } from './UnsplashExplorer.tsx';

interface AdminGalleryProps {
    content: LandingPageContent['gallery'];
    updateGallery: (data: Partial<LandingPageContent['gallery']>) => void;
    handleFileUpload: (e: any, target: string) => void;
    isCompressing: boolean;
}

export const AdminGallery: React.FC<AdminGalleryProps> = ({ content, updateGallery, handleFileUpload, isCompressing }) => {
    const { sectionTitle, sectionSubtitle, images, visible } = content;
    const [showUnsplash, setShowUnsplash] = React.useState(false);

    const handleUpdateImage = (id: string, updates: Partial<GalleryImage>) => {
        const newImages = images.map(img => img.id === id ? { ...img, ...updates } : img);
        updateGallery({ images: newImages });
    };

    const handleRemoveImage = (id: string) => {
        const newImages = images.filter(img => img.id !== id);
        updateGallery({ images: newImages });
    };

    const handleAddImage = (url?: string) => {
        const newImage: GalleryImage = {
            id: Date.now().toString(),
            url: url || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800',
            alt: 'Gallery Image'
        };
        updateGallery({ images: [...images, newImage] });
    };

    const handleUnsplashSelect = (url: string) => {
        handleAddImage(url);
    };

    const handleToggleVisible = () => {
        updateGallery({ visible: !visible });
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-300">
            {/* Unsplash Modal */}
            <UnsplashExplorer
                isOpen={showUnsplash}
                onClose={() => setShowUnsplash(false)}
                onSelect={handleUnsplashSelect}
            />

            <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div>
                    <h3 className="text-xl font-black text-slate-900">Gallery Visibility</h3>
                    <p className="text-sm text-slate-500 font-medium">Aktifkan atau nonaktifkan section gallery</p>
                </div>
                <button
                    onClick={handleToggleVisible}
                    className={`
            px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-all
            ${visible ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-400'}
          `}
                >
                    {visible ? 'Show section' : 'Hide section'}
                </button>
            </div>

            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                <h3 className="text-xl font-black text-slate-900">Section Header</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        label="Section Title"
                        value={sectionTitle}
                        onChange={(val) => updateGallery({ sectionTitle: val })}
                    />
                    <InputField
                        label="Section Subtitle"
                        value={sectionSubtitle}
                        onChange={(val) => updateGallery({ sectionSubtitle: val })}
                    />
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-black text-slate-900">Gallery Items</h3>
                        <p className="text-sm text-slate-500 font-medium">Kelola gambar yang tampil di gallery</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowUnsplash(true)}
                            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
                        >
                            <ImageIcon className="w-4 h-4 text-blue-500" /> Quick Unsplash
                        </button>
                        <button
                            onClick={() => handleAddImage()}
                            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-md"
                        >
                            <Plus className="w-4 h-4" /> Add Image
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {images.map((img, index) => (
                        <div key={img.id} className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col gap-4 group">
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-50">
                                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button
                                        onClick={() => handleRemoveImage(img.id)}
                                        className="p-2 bg-white/90 backdrop-blur shadow-sm rounded-xl text-red-600 hover:bg-red-600 hover:text-white transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <InputField
                                    label="Alt Text"
                                    value={img.alt}
                                    onChange={(val) => handleUpdateImage(img.id, { alt: val })}
                                />
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Link / Upload Gambar</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-100 outline-none"
                                            value={img.url}
                                            onChange={(e) => handleUpdateImage(img.id, { url: e.target.value })}
                                        />
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id={`gallery-upload-${img.id}`}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, `gallery-image-${img.id}`)}
                                                disabled={isCompressing}
                                            />
                                            <button className="h-full bg-slate-900 text-white px-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center">
                                                {isCompressing ? '...' : 'Upload'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
