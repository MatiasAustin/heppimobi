
import React from 'react';
import { Search, Settings, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { Step } from '../types.ts';

interface ProcessProps {
  sectionTitle: string;
  sectionSubtitle: string;
  steps: Step[];
  accentColor: string;
}

const Process: React.FC<ProcessProps> = ({ sectionTitle, sectionSubtitle, steps, accentColor }) => {
  const processIcons = [Search, Settings, ShieldCheck, ClipboardCheck];

  return (
    <section id="process" className="py-24 md:py-40 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Our Story & Workflow</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.95]">
                {sectionTitle}
              </h2>
            </div>
            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-md">
              {sectionSubtitle}
            </p>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="absolute left-[23px] md:left-[27px] top-4 bottom-4 w-[1px] bg-slate-100"></div>
            <div className="space-y-12 md:space-y-16">
              {steps.map((step, idx) => {
                const StepIcon = processIcons[idx] || Search;
                return (
                  <div key={step.id} className="relative pl-16 md:pl-20 group">
                    <div className="absolute left-0 top-0 z-10">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-red-100">
                        <StepIcon className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-500 group-hover:text-red-600 text-slate-400" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Step 0{idx + 1}</span>
                        <div className="h-[1px] w-8 bg-slate-50"></div>
                      </div>
                      <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight group-hover:text-red-600 transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium max-w-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
