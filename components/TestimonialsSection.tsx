
import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { LandingPageContent } from '../types.ts';

interface TestimonialsSectionProps {
    content: LandingPageContent['testimonials'];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ content }) => {
    const { sectionTitle, sectionSubtitle, items, visible } = content;
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    if (!visible) return null;

    const scrollToIndex = (index: number) => {
        if (!scrollRef.current) return;
        const width = scrollRef.current.offsetWidth;
        const itemsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
        const itemWidth = width / itemsPerView;

        scrollRef.current.scrollTo({
            left: index * itemWidth,
            behavior: 'smooth'
        });
        setActiveIndex(index);
    };

    // Auto-slide logic
    useEffect(() => {
        if (isDragging) return;
        const interval = setInterval(() => {
            const itemsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
            const maxIndex = Math.max(0, items.length - itemsPerView);
            const nextIndex = (activeIndex + 1) % (maxIndex + 1);
            scrollToIndex(nextIndex);
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex, items.length, isDragging]);

    const handleScroll = () => {
        if (isDragging || !scrollRef.current) return;
        const scrollLeftVal = scrollRef.current.scrollLeft;
        const width = scrollRef.current.offsetWidth;
        const itemsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
        const itemWidth = width / itemsPerView;
        const newIndex = Math.round(scrollLeftVal / itemWidth);
        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    };

    // Mouse Drag Handlers
    const onMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const onMouseLeave = () => {
        setIsDragging(false);
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden" id="testimonials">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 text-blue-500">
                <div className="absolute top-10 left-10 w-64 h-64 bg-current blur-[100px] rounded-full" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-400 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-slate-100 mb-4 tracking-wider uppercase text-[10px] font-black text-slate-400">
                        <span className="text-red-600 font-black">Trusted</span> by thousands
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
                        {sectionTitle}
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto font-medium">
                        {sectionSubtitle}
                    </p>
                </div>

                <div className="relative max-w-7xl mx-auto group">
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
                        className="absolute -left-2 md:-left-4 lg:-left-10 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 hidden md:flex items-center justify-center text-slate-400 hover:text-red-600 transition-all z-20 hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={() => {
                            const itemsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
                            const maxIndex = Math.max(0, items.length - itemsPerView);
                            scrollToIndex((activeIndex + 1) % (maxIndex + 1));
                        }}
                        className="absolute -right-2 md:-right-4 lg:-right-10 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 hidden md:flex items-center justify-center text-slate-400 hover:text-red-600 transition-all z-20 hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Scroll Container */}
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        onMouseDown={onMouseDown}
                        onMouseLeave={onMouseLeave}
                        onMouseUp={onMouseUp}
                        onMouseMove={onMouseMove}
                        className={`
                            flex overflow-x-auto no-scrollbar gap-5 pb-8 px-2 select-none
                            ${isDragging ? 'snap-none cursor-grabbing' : 'snap-x snap-mandatory cursor-grab'}
                        `}
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="w-full md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.85rem)] shrink-0 snap-start pointer-events-none md:pointer-events-auto"
                            >
                                <div className={`
                                    bg-white p-6 md:p-8 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col h-full transition-all duration-300
                                    hover:shadow-md hover:border-slate-200
                                `}>
                                    <div className="flex gap-0.5 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 fill-amber-400 text-amber-400 ${i >= item.rating ? 'opacity-20' : ''}`}
                                            />
                                        ))}
                                    </div>

                                    <div className="relative mb-5 flex-grow">
                                        <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                                            "{item.content}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 mt-auto pt-5 border-t border-slate-50">
                                        <div className="w-9 h-9 rounded-lg overflow-hidden shadow-inner bg-slate-100 shrink-0">
                                            <img
                                                src={item.avatarUrl}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-slate-900 text-[11px] tracking-tight leading-none mb-0.5 truncate">{item.name}</h4>
                                            <p className="text-slate-400 font-bold uppercase text-[7px] tracking-widest truncate">{item.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-1.5 mt-2">
                        {items.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => scrollToIndex(idx)}
                                className={`h-1 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-4 bg-slate-400' : 'w-1 bg-slate-200 hover:bg-slate-300'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
