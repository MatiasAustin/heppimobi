
import React, { useState, useEffect } from 'react';
import { X, Search, Image as ImageIcon, Check, Loader2, Sparkles, Zap, ChevronRight } from 'lucide-react';

interface UnsplashExplorerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
}

const AUTOMOTIVE_COLLECTIONS = [
    { id: '1', title: 'Porsche', keyword: 'porsche', color: 'bg-red-500' },
    { id: '2', title: 'Detailing', keyword: 'cardetailing', color: 'bg-blue-500' },
    { id: '3', title: 'Headlights', keyword: 'headlight', color: 'bg-amber-500' },
    { id: '4', title: 'Luxury', keyword: 'luxurycar', color: 'bg-slate-900' },
    { id: '5', title: 'Supercars', keyword: 'supercar', color: 'bg-indigo-500' },
    { id: '6', title: 'Classic', keyword: 'classiccar', color: 'bg-emerald-500' },
];

// Hardcoded pool of high-quality verified automotive photos from Unsplash
const PHOTO_POOL: Record<string, string[]> = {
    'porsche': [
        '1503376780353-7e6692767b70', // Silver 911
        '1614162486214-d19e1e24ec1d', // Black Porsche
        '1611633513361-ec853f5ba056', // Porsche front
        '1610427847970-13f898d00392', // Porsche detail
        '1580273916550-e323be2ae537'  // Classic Porsche
    ],
    'detailing': [
        '1542362567-b05200f8024d', // McLaren headlight
        '1494976388531-d1058494cdd8', // Clean car body
        '1603584173870-7f3118949826', // Car wash detail
        '1600191793581-987821cb24ba', // Headlight polish
        '1553440569-bcc63803a83d'  // Car shine
    ],
    'headlight': [
        '1542362567-b05200f8024d', // Supercar headlight
        '1593530750058-00507202b542', // Headlight close up
        '1600191793581-987821cb24ba', // Headlight restoration
        '1553440569-bcc63803a83d', // Modern light
        '1503376780353-7e6692767b70'  // Porsche light
    ],
    'luxury': [
        '1552519507-da3b142c6e3d', // Corvette
        '1494976388531-d1058494cdd8', // Luxury car profile
        '1503376780353-7e6692767b70', // Porsche
        '1605559424843-9e4c228bf1c2', // Mercedes
        '1583121274602-3e2820c69888'  // Ferrari
    ],
    'supercar': [
        '1583121274602-3e2820c69888', // Ferrari
        '1493238544576-29150bef2953', // Fast car
        '1525609002-b13c1783b253', // Supercar side
        '1542362567-b05200f8024d', // McLaren
        '1614162486214-d19e1e24ec1d'  // Porsche
    ],
    'classic': [
        '1492144534655-ae79c964c9d7', // Classic black car
        '1525609002-b13c1783b253', // Vintage car
        '1580273916550-e323be2ae537', // Porsche classic
        '1589118949245-7d38baf380d6', // Muscle car
        '1558981403-c5f91bbde3ec'  // Classic details
    ],
};

export const UnsplashExplorer: React.FC<UnsplashExplorerProps> = ({ isOpen, onClose, onSelect }) => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('porsche');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            handleSearch(activeCategory);
        }
    }, [isOpen, activeCategory]);

    const handleSearch = (keyword: string) => {
        if (!keyword && !activeCategory) return;
        setIsLoading(true);

        // Simulate real search with fuzzy matching against our pool
        setTimeout(() => {
            const lowerKey = (keyword || activeCategory || '').toLowerCase();
            let pool: string[] = [];

            // Fuzzy match: check if the search term is in our keys OR if our keys are in the search term
            Object.entries(PHOTO_POOL).forEach(([key, ids]) => {
                if (lowerKey.includes(key) || key.includes(lowerKey)) {
                    pool = [...pool, ...ids];
                }
            });

            // If no match found in specific categories, pick some random ones from the whole pool
            if (pool.length === 0) {
                Object.values(PHOTO_POOL).forEach(ids => {
                    pool.push(ids[Math.floor(Math.random() * ids.length)]);
                });
            }

            // Shuffle and take top 12
            const finalResults = Array.from(new Set(pool))
                .sort(() => Math.random() - 0.5)
                .slice(0, 12);

            setResults(finalResults);
            setIsLoading(false);
        }, 400);
    };

    const onConfirmSelect = () => {
        if (selectedImage) {
            onSelect(`https://images.unsplash.com/photo-${selectedImage}?auto=format&fit=crop&q=80&w=1200`);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100000] bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
            <div className="bg-white rounded-[3rem] w-full max-w-5xl h-[85vh] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                            <ImageIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Unsplash Explorer</h3>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Explore millions of high-res photos</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col md:flex-row">

                    {/* Sidebar - Categories */}
                    <div className="w-full md:w-64 border-r border-slate-100 p-6 space-y-2 bg-slate-50/30 overflow-y-auto">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Quick Categories</p>
                        {AUTOMOTIVE_COLLECTIONS.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.keyword)}
                                className={`
                   w-full px-5 py-4 rounded-2xl flex items-center justify-between group transition-all
                   ${activeCategory === cat.keyword ? 'bg-slate-900 text-white shadow-xl translate-x-1' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'}
                 `}
                            >
                                <span className="text-xs font-black uppercase tracking-widest">{cat.title}</span>
                                <ChevronRight className={`w-4 h-4 transition-transform ${activeCategory === cat.keyword ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                            </button>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col min-w-0">

                        {/* Search Bar */}
                        <div className="p-8">
                            <div className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search millions of photos (e.g. 'sport car headlight')..."
                                    className="w-full pl-16 pr-6 py-5 rounded-[2rem] bg-slate-50 border border-slate-100 text-slate-900 font-bold outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all shadow-sm"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(search)}
                                />
                                <button
                                    onClick={() => handleSearch(search)}
                                    className="absolute right-3 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2"
                                >
                                    <Sparkles className="w-3.5 h-3.5" /> Search
                                </button>
                            </div>
                        </div>

                        {/* Grid Results */}
                        <div className="flex-1 overflow-y-auto p-8 pt-0 scrollbar-thin">
                            {isLoading ? (
                                <div className="h-full flex flex-col items-center justify-center space-y-4 animate-in fade-in transition-all">
                                    <div className="p-4 bg-blue-50 rounded-full">
                                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                    </div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] animate-pulse">Searching Unsplash...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                    {results.map((photoId) => (
                                        <div
                                            key={photoId}
                                            onClick={() => setSelectedImage(photoId)}
                                            className={`
                        relative group aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer transition-all border-4
                        ${selectedImage === photoId ? 'border-blue-500 scale-[1.02] shadow-2xl' : 'border-transparent shadow-sm hover:scale-[1.02] hover:shadow-xl'}
                      `}
                                        >
                                            <img
                                                src={`https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=400`}
                                                alt="Unsplash search result"
                                                className="w-full h-full object-cover"
                                                referrerPolicy="no-referrer"
                                            />
                                            <div className={`absolute inset-0 bg-blue-600/20 backdrop-blur-[2px] flex items-center justify-center transition-all ${selectedImage === photoId ? 'opacity-100' : 'opacity-0'}`}>
                                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl">
                                                    <Check className="w-6 h-6 text-blue-600" />
                                                </div>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-slate-100 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <p className="text-xs font-bold text-slate-400">Pilih gambar terbaik untuk portofolio Anda.</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-100 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirmSelect}
                            disabled={!selectedImage}
                            className={`
                 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl
                 ${selectedImage ? 'bg-slate-900 text-white hover:bg-blue-600 translate-y-[-2px]' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}
               `}
                        >
                            Select Photo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
