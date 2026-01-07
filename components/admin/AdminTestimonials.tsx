
import React from 'react';
import { LandingPageContent, Testimonial } from '../../types.ts';
import { InputField, TextAreaField } from './Shared.tsx';
import { Trash2, Plus, Star } from 'lucide-react';

interface AdminTestimonialsProps {
    content: LandingPageContent['testimonials'];
    updateTestimonials: (data: Partial<LandingPageContent['testimonials']>) => void;
    handleFileUpload: (e: any, target: string) => void;
    isCompressing: boolean;
}

export const AdminTestimonials: React.FC<AdminTestimonialsProps> = ({ content, updateTestimonials, handleFileUpload, isCompressing }) => {
    const { sectionTitle, sectionSubtitle, items, visible } = content;

    const handleUpdateItem = (id: string, updates: Partial<Testimonial>) => {
        const newItems = items.map(item => item.id === id ? { ...item, ...updates } : item);
        updateTestimonials({ items: newItems });
    };

    const handleRemoveItem = (id: string) => {
        const newItems = items.filter(item => item.id !== id);
        updateTestimonials({ items: newItems });
    };

    const handleAddItem = () => {
        const newItem: Testimonial = {
            id: Date.now().toString(),
            name: 'Nama Pelanggan',
            role: 'Pekerjaan/Status',
            content: 'Tulis testimoni pelanggan di sini...',
            avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}`,
            rating: 5
        };
        updateTestimonials({ items: [...items, newItem] });
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-300">
            <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div>
                    <h3 className="text-xl font-black text-slate-900">Testimonials Visibility</h3>
                    <p className="text-sm text-slate-500 font-medium">Aktifkan atau nonaktifkan section testimoni</p>
                </div>
                <button
                    onClick={() => updateTestimonials({ visible: !visible })}
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
                        onChange={(val) => updateTestimonials({ sectionTitle: val })}
                    />
                    <InputField
                        label="Section Subtitle"
                        value={sectionSubtitle}
                        onChange={(val) => updateTestimonials({ sectionSubtitle: val })}
                    />
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-black text-slate-900">Feedback Items</h3>
                        <p className="text-sm text-slate-500 font-medium">Kelola testimoni dari pelanggan</p>
                    </div>
                    <button
                        onClick={handleAddItem}
                        className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all"
                    >
                        <Plus className="w-4 h-4" /> Add Testimonial
                    </button>
                </div>

                <div className="space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 group relative">
                            <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="absolute top-8 right-8 p-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Profile Pic & Basic Info */}
                                <div className="space-y-4">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-24 h-24 rounded-[2rem] overflow-hidden bg-slate-50 shadow-inner ring-8 ring-slate-50">
                                            <img src={item.avatarUrl} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="relative w-full">
                                            <input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, `testimonial-avatar-${item.id}`)}
                                                disabled={isCompressing}
                                            />
                                            <button className="w-full bg-slate-100 text-slate-600 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
                                                {isCompressing ? 'Compressing...' : 'Change Avatar'}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <InputField
                                            label="Customer Name"
                                            value={item.name}
                                            onChange={(val) => handleUpdateItem(item.id, { name: val })}
                                        />
                                        <InputField
                                            label="Role / Title"
                                            value={item.role}
                                            onChange={(val) => handleUpdateItem(item.id, { role: val })}
                                        />
                                    </div>
                                </div>

                                {/* Content & Rating */}
                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => handleUpdateItem(item.id, { rating: star })}
                                                    className={`p-2 rounded-xl transition-all ${item.rating >= star ? 'bg-amber-50 text-amber-500' : 'bg-slate-50 text-slate-200'}`}
                                                >
                                                    <Star className={`w-5 h-5 ${item.rating >= star ? 'fill-current' : ''}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <TextAreaField
                                        label="Testimonial Content"
                                        value={item.content}
                                        onChange={(val) => handleUpdateItem(item.id, { content: val })}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
