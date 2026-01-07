
import React from 'react';

interface AnalyticsChartProps {
  dailyStats: Record<string, number>;
  accentColor: string;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ dailyStats, accentColor }) => {
  // Get last 7 days including today
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  const data = last7Days.map(date => ({
    date,
    label: new Date(date).toLocaleDateString('id-ID', { weekday: 'short' }),
    value: dailyStats[date] || 0
  }));

  const maxValue = Math.max(...data.map(d => d.value), 5); // Default min scale 5
  const chartHeight = 160;

  return (
    <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-xl w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Statistik Pengunjung</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">7 Hari Terakhir</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Visits</span>
        </div>
      </div>

      <div className="relative h-[200px] w-full flex items-end justify-between gap-2 md:gap-4 px-2">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full h-[1px] bg-slate-200"></div>
          ))}
        </div>

        {/* Bars */}
        {data.map((item, i) => {
          const barHeight = (item.value / maxValue) * chartHeight;
          const isToday = i === 6;
          
          return (
            <div key={item.date} className="flex-1 flex flex-col items-center gap-4 group relative z-10">
              {/* Tooltip on hover */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-900 text-white text-[10px] font-black py-1 px-3 rounded-lg pointer-events-none whitespace-nowrap">
                {item.value} Kunjungan
              </div>

              <div className="w-full max-w-[40px] relative flex items-end h-[160px]">
                <div 
                  className="w-full rounded-t-xl md:rounded-t-2xl transition-all duration-1000 ease-out hover:brightness-110"
                  style={{ 
                    height: `${barHeight}px`, 
                    backgroundColor: isToday ? accentColor : '#F1F5F9',
                    boxShadow: isToday ? `0 10px 20px ${accentColor}30` : 'none'
                  }}
                ></div>
              </div>
              <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest ${isToday ? 'text-slate-900' : 'text-slate-300'}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
