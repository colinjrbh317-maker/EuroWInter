
import React, { useState, useEffect, useMemo } from 'react';
import { ITINERARY, INITIAL_PACKING_LIST } from './constants';
import { ViewState, PackingItem } from './types';
import TripHub from './components/TripHub';
import PackingList from './components/PackingList';
import Journal from './components/Journal';
import { Calendar, Briefcase, Radio, ShieldCheck, PenTool } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ViewState>('hub');
  const [packingList, setPackingList] = useState<PackingItem[]>(INITIAL_PACKING_LIST);

  const { initialDayIndex, isTripLive, daysToTrip } = useMemo(() => {
    const today = new Date();
    const tripStart = new Date("2025-12-29");
    const diffTime = today.getTime() - tripStart.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { initialDayIndex: 0, isTripLive: false, daysToTrip: Math.abs(diffDays) };
    }
    const index = Math.min(diffDays, ITINERARY.length - 1);
    return { initialDayIndex: index, isTripLive: true, daysToTrip: 0 };
  }, []);

  const [selectedDayIndex, setSelectedDayIndex] = useState(initialDayIndex);

  const toggleItem = (id: string) => {
    setPackingList(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const updateNote = (id: string, note: string) => {
    setPackingList(prev => prev.map(item => 
      item.id === id ? { ...item, note } : item
    ));
  };

  const currentDay = ITINERARY[selectedDayIndex];

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto shadow-[0_0_60px_rgba(0,0,0,0.15)] overflow-hidden germany-border relative">
      {/* Live Status Banner */}
      {!isTripLive && activeTab !== 'journal' && (
        <div className="bg-neutral-900 text-white px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-2 border-b border-red-600">
          <Radio size={12} className="text-yellow-400 animate-pulse" />
          PRE-TRIP: {daysToTrip} DAYS REMAINING
        </div>
      )}
      {isTripLive && activeTab !== 'journal' && (
        <div className="bg-red-700 text-white px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-2">
          <ShieldCheck size={12} className="text-yellow-400" />
          SYSTEM LIVE: DAY {selectedDayIndex + 1}
        </div>
      )}

      {/* Header */}
      <header className="bg-white px-6 py-5 flex justify-between items-center border-b border-neutral-50 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 leading-none tracking-tighter uppercase">
            {activeTab === 'hub' ? 'TRIP HUB' : activeTab === 'packing' ? 'CHECKLIST' : 'JOURNAL'}
          </h1>
          <p className="text-[10px] text-neutral-400 font-black tracking-widest uppercase mt-1">
            {activeTab === 'hub' ? `${currentDay.location}` : 'Germany & Austria 26'}
          </p>
        </div>
        
        {/* German Flag SVG */}
        <div className="w-10 h-7 rounded shadow-sm overflow-hidden flex flex-col border border-neutral-100">
          <div className="bg-black flex-1 w-full"></div>
          <div className="bg-[#FF0000] flex-1 w-full"></div>
          <div className="bg-[#FFCC00] flex-1 w-full"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-neutral-50/30 no-scrollbar">
        {activeTab === 'hub' && (
          <TripHub 
            selectedDay={currentDay} 
            selectedDayIndex={selectedDayIndex}
            onDayChange={setSelectedDayIndex}
            isToday={isTripLive && selectedDayIndex === initialDayIndex}
          />
        )}
        {activeTab === 'packing' && (
          <PackingList 
            items={packingList} 
            onToggle={toggleItem} 
            onNoteUpdate={updateNote}
          />
        )}
        {activeTab === 'journal' && (
          <Journal />
        )}
      </main>

      {/* Navigation Bar - Fixed at bottom of the component container */}
      <nav className="bg-black border-t border-neutral-800 px-4 py-5 flex justify-around items-center z-[50] pb-8 md:pb-5">
        <button 
          onClick={() => setActiveTab('hub')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'hub' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
        >
          <Calendar size={22} strokeWidth={activeTab === 'hub' ? 3 : 2} />
          <span className="text-[9px] font-black tracking-widest uppercase">Itinerary</span>
          {activeTab === 'hub' && <div className="h-1 w-4 bg-yellow-400 rounded-full mt-0.5"></div>}
        </button>
        
        <button 
          onClick={() => setActiveTab('journal')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'journal' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
        >
          <PenTool size={22} strokeWidth={activeTab === 'journal' ? 3 : 2} />
          <span className="text-[9px] font-black tracking-widest uppercase">Journal</span>
          {activeTab === 'journal' && <div className="h-1 w-4 bg-red-600 rounded-full mt-0.5"></div>}
        </button>

        <button 
          onClick={() => setActiveTab('packing')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'packing' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
        >
          <Briefcase size={22} strokeWidth={activeTab === 'packing' ? 3 : 2} />
          <span className="text-[9px] font-black tracking-widest uppercase">Packing</span>
          {activeTab === 'packing' && <div className="h-1 w-4 bg-neutral-400 rounded-full mt-0.5"></div>}
        </button>
      </nav>
    </div>
  );
};

export default App;
