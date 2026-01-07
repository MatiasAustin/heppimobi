
import React, { useState, useEffect } from 'react';
import { LandingPageContent } from '../types';

interface GallerySectionProps {
    content: LandingPageContent['gallery'];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ content }) => {
    const { sectionTitle, sectionSubtitle, images, visible } = content;

    // Track which index is currently shown for each grid slot
    // We'll have a fixed grid of 8 slots, mapping to the 8 images in constants
    const [displayImages, setDisplayImages] = useState(images);
    const [fadingIndices, setFadingIndices] = useState<number[]>([]);

    useEffect(() => {
        if (!visible || images.length === 0) return;

        const interval = setInterval(() => {
            // Pick a random slot to change
            const randomIndex = Math.floor(Math.random() * displayImages.length);

            // Select a new image that isn't currently displayed in that slot
            // For this dynamic effect, we just want to "refresh" it or swap it with another from a pool
            // Since the user asked for "random card", let's simulate a pool of images
            // or just a "panning" effect if we only have 8. 
            // If we have more images than slots it's better. 
            // For now, let's just trigger a fade animation for that specific slot to keep it "alive".

            setFadingIndices(prev => [...prev, randomIndex]);

            setTimeout(() => {
                setFadingIndices(prev => prev.filter(i => i !== randomIndex));
            }, 1000); // Duration of fade out + fade in

        }, 3000); // Change slot every 3 seconds

        return () => clearInterval(interval);
    }, [visible, images, displayImages]);

    if (!visible) return null;

    return (
        <section className="py-24 bg-white overflow-hidden" id="gallery">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 mb-4">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">Our Portfolio</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        {sectionTitle}
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium text-sm md:text-base">
                        {sectionSubtitle}
                    </p>
                </div>

                {/* Gallery Grid - Masonry-ish style matching reference */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    {displayImages.map((img, idx) => (
                        <div
                            key={img.id}
                            className={`
                relative rounded-[2rem] overflow-hidden bg-slate-100 aspect-[3/4] group
                ${idx === 1 || idx === 6 ? 'md:translate-y-8' : ''}
                ${idx === 2 || idx === 5 ? 'md:-translate-y-8' : ''}
              `}
                        >
                            <div
                                className={`
                  w-full h-full transition-opacity duration-1000 ease-in-out
                  ${fadingIndices.includes(idx) ? 'opacity-0' : 'opacity-100'}
                `}
                            >
                                <img
                                    src={img.url}
                                    alt={img.alt}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
