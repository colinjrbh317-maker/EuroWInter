
import React, { useState, useEffect } from 'react';
import { ItineraryDay, DailyInsights } from '../types';
import { ITINERARY } from '../constants';
import { getDailyInsights } from '../services/gemini';
import { Cloud, Footprints, Info, Loader2, Search, ArrowUpRight, Navigation } from 'lucide-react';

interface Props {
  selectedDay: ItineraryDay;
  selectedDayIndex: number;
  onDayChange: (index: number) => void;
  isToday: boolean;
}

const TripHub: React.FC<Props> = ({ selectedDay, selectedDayIndex, onDayChange, isToday }) => {
  const [insights, setInsights] = useState<DailyInsights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getDailyInsights(selectedDay.date, selectedDay.location, selectedDay.activities);
      setInsights(data);
      setLoading(false);
    };
    fetchData();
  }, [selectedDay]);

  const steps = insights?.distance 
    ? (parseFloat(insights.distance) * 2100).toLocaleString() 
    : "0";

  const googleWeatherUrl = `https://www.google.com/search?q=weather+in+${encodeURIComponent(selectedDay.location)}`;

  return (
    <div className="space-y-5 px-6 pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-8">
      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {ITINERARY.map((day, idx) => (
          <button
            key={idx}
            onClick={() => onDayChange(idx)}
            className={`flex-shrink-0 w-12 h-14 rounded-lg flex flex-col items-center justify-center transition-all border ${
              selectedDayIndex === idx 
                ? 'bg-black text-white border-black ring-2 ring-red-600 ring-offset-2' 
                : 'bg-white text-neutral-400 border-neutral-200 hover:border-neutral-400'
            }`}
          >
            <span className="text-[7px] font-black uppercase">DAY</span>
            <span className="text-base font-black leading-none">{day.day}</span>
          </button>
        ))}
      </div>

      {/* Headline Card */}
      <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-[2px_2px_0px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-red-700 font-black text-[9px] tracking-widest uppercase">{selectedDay.date}</h2>
          {isToday && (
            <span className="bg-yellow-400 text-black text-[7px] font-black px-1.5 py-0.5 rounded border border-black uppercase">Live</span>
          )}
        </div>
        <h3 className="text-3xl font-black text-neutral-900 tracking-tighter mb-4 leading-none">{selectedDay.location}</h3>
        
        {loading ? (
          <div className="space-y-2">
            <div className="h-4 bg-neutral-100 animate-pulse rounded w-full"></div>
            <div className="h-4 bg-neutral-100 animate-pulse rounded w-1/2"></div>
          </div>
        ) : (
          <div className="py-3 px-4 bg-neutral-900 rounded-xl border-l-4 border-yellow-400">
            <p className="text-sm font-bold text-white tracking-tight leading-snug">
              {insights?.headline}
            </p>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-neutral-900">
          <Loader2 className="animate-spin text-red-600" size={32} />
          <p className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40">Syncing</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3">
            {/* Weather Widget */}
            <a 
              href={googleWeatherUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-700 rounded-2xl p-5 text-white shadow-sm hover:translate-y-[-1px] transition-transform block relative group border-b-4 border-black"
            >
              <div className="flex justify-between items-start mb-3">
                <Cloud size={18} className="text-yellow-400" />
                <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-3xl font-black leading-none mb-1 tracking-tighter">{insights?.temp}</p>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-80">{insights?.condition}</p>
            </a>

            {/* Distance Widget */}
            <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Footprints size={18} className="text-neutral-900" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Logistics</span>
                </div>
                <p className="text-2xl font-black text-neutral-900 leading-none mb-1 tracking-tighter">{insights?.distance}</p>
              </div>
              <p className="text-[9px] font-bold text-red-600 uppercase tracking-wide">{steps} STEPS</p>
            </div>
          </div>

          {/* Activity Schedule */}
          <div className="space-y-2.5">
            <h4 className="font-black text-neutral-900 text-[10px] tracking-[0.3em] uppercase px-1 flex items-center gap-2 mb-4">
              <Navigation size={12} className="text-red-600" />
              SCHEDULE
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {selectedDay.activities.map((act, i) => {
                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(act + " " + selectedDay.location)}`;
                return (
                  <a 
                    key={i} 
                    href={searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-200 hover:border-black transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-neutral-300 group-hover:text-red-600 transition-colors">{(i+1).toString().padStart(2, '0')}</span>
                      <span className="text-xs font-bold text-neutral-800 group-hover:text-neutral-900 transition-colors uppercase tracking-tight">{act}</span>
                    </div>
                    <Search size={14} className="text-neutral-200 group-hover:text-black transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {selectedDay.hotel && (
            <div className="flex items-center gap-3 p-4 bg-yellow-50/50 rounded-xl border border-yellow-200/50">
              <Info size={16} className="text-yellow-600" />
              <div className="flex-1">
                <p className="text-[8px] font-black text-yellow-700 uppercase tracking-widest">Base Camp</p>
                <p className="text-xs font-bold text-neutral-800">{selectedDay.hotel}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TripHub;
