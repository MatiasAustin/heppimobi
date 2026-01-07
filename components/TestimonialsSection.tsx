
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { LandingPageContent } from '../types';

interface TestimonialsSectionProps {
    content: LandingPageContent['testimonials'];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ content }) => {
    const { sectionTitle, sectionSubtitle, items, visible } = content;

    if (!visible) return null;

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden" id="testimonials">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-10 left-10 w-64 h-64 bg-red-200 blur-3xl rounded-full" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100 blur-3xl rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-slate-100 mb-4 tracking-wider uppercase text-[10px] font-black text-slate-400">
                        <span className="text-red-600 font-black">Trusted</span> by thousands
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                        {sectionTitle}
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto font-medium">
                        {sectionSubtitle}
                    </p>
                </div>

                {/* Testimonials Slider/Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {items.map((item, idx) => (
                        <div
                            key={item.id}
                            className={`
                bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full hover:scale-[1.02] transition-transform duration-500
                animate-in fade-in slide-in-from-bottom-8 duration-700
              `}
                            style={{ animationDelay: `${idx * 150}ms` }}
                        >
                            {/* Rating */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 fill-amber-400 text-amber-400 ${i >= item.rating ? 'opacity-20' : ''}`}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <div className="relative mb-8 flex-grow">
                                <Quote className="absolute -top-4 -left-4 w-10 h-10 text-slate-50 opacity-10" />
                                <p className="text-slate-600 font-medium leading-relaxed italic relative z-10">
                                    "{item.content}"
                                </p>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-50">
                                <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-inner ring-4 ring-slate-50">
                                    <img
                                        src={item.avatarUrl}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm tracking-tight">{item.name}</h4>
                                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
