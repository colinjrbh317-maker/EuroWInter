
import React, { useState, useEffect, useRef } from 'react';
import { JournalEntry } from '../types';
import { storage } from '../services/storage';
import { Copy, Mic, MicOff, Save, History, Check, Calendar, Trash2, X } from 'lucide-react';

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<Record<string, JournalEntry>>({});
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const init = async () => {
      const all = await storage.getAllEntries();
      setEntries(all);
      if (all[currentDate]) {
        setContent(all[currentDate].content);
      }
    };
    init();

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const transcript = event.results[i][0].transcript;
            setContent(prev => {
              const newContent = (prev.trim() + ' ' + transcript).trim();
              saveToStorage(newContent);
              return newContent;
            });
          }
        }
      };
      recognitionRef.current.onend = () => setIsRecording(false);
    }
  }, [currentDate]);

  const saveToStorage = async (val: string) => {
    const entry: JournalEntry = {
      date: currentDate,
      content: val,
      lastUpdated: Date.now()
    };
    await storage.saveJournalEntry(entry);
    const updated = await storage.getAllEntries();
    setEntries(updated);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setContent(val);
    saveToStorage(val);
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectHistoryEntry = (date: string) => {
    setCurrentDate(date);
    setContent(entries[date]?.content || '');
    setShowHistory(false);
  };

  const deleteEntry = async (date: string) => {
    if (window.confirm(`Permanently delete entry for ${date}?`)) {
      await storage.deleteEntry(date);
      const updated = await storage.getAllEntries();
      setEntries(updated);
      if (currentDate === date) setContent('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Utility Bar */}
      <div className="bg-neutral-50 px-6 py-3 flex justify-between items-center border-b border-neutral-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Calendar size={12} className="text-red-600" />
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{currentDate}</span>
        </div>
        
        <div className="flex gap-1.5">
          <button 
            onClick={() => setShowHistory(true)}
            className="p-2 rounded-lg bg-white border border-neutral-200 text-neutral-500 hover:border-neutral-400 transition-all"
          >
            <History size={16} />
          </button>
          <button 
            onClick={copyToClipboard}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-black text-[9px] uppercase tracking-widest transition-all ${
              copied ? 'bg-emerald-500 text-white' : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'DONE' : 'COPY'}
          </button>
        </div>
      </div>

      {/* Full Area Textbox */}
      <div className="flex-1 relative">
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Begin writing your daily travel log..."
          className="w-full h-full p-8 text-base font-medium leading-relaxed focus:outline-none resize-none bg-transparent placeholder:text-neutral-200 no-scrollbar"
        />
        
        {/* Floating Smaller Mic in Bottom Right */}
        <button 
          onClick={toggleRecording}
          className={`absolute bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-90 ${
            isRecording 
              ? 'bg-red-600 text-white animate-pulse' 
              : 'bg-yellow-400 text-black border-2 border-black'
          }`}
        >
          {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        {/* Persistence Indicator */}
        <div className="absolute bottom-6 left-6 pointer-events-none">
          <div className="flex items-center gap-1.5 text-[8px] font-black text-neutral-200 uppercase tracking-[0.2em]">
            <Save size={10} />
            SYNCED
          </div>
        </div>
      </div>

      {/* History Side-over Overlay */}
      {showHistory && (
        <div className="absolute inset-0 z-[100] bg-black/40 backdrop-blur-sm p-4 flex items-end justify-center">
          <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-black tracking-tighter uppercase">Entry Archives</h3>
                <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Select a day to view</p>
              </div>
              <button onClick={() => setShowHistory(false)} className="p-2 bg-neutral-100 rounded-full text-neutral-500">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-2 max-h-[50vh] overflow-y-auto no-scrollbar pb-4">
              {Object.keys(entries).length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-xs font-bold text-neutral-300 uppercase tracking-widest">No entries yet</p>
                </div>
              ) : (
                Object.keys(entries).sort().reverse().map(date => (
                  <div key={date} className="flex gap-2">
                    <button 
                      onClick={() => selectHistoryEntry(date)}
                      className={`flex-1 text-left p-4 rounded-2xl border transition-all ${
                        currentDate === date 
                          ? 'border-red-600 bg-red-50' 
                          : 'border-neutral-100 bg-neutral-50 hover:bg-white hover:border-neutral-300'
                      }`}
                    >
                      <p className="text-[10px] font-black text-neutral-400 uppercase mb-1">{date}</p>
                      <p className="text-xs font-bold text-neutral-800 line-clamp-1">
                        {entries[date].content || 'Empty entry'}
                      </p>
                    </button>
                    <button 
                      onClick={() => deleteEntry(date)}
                      className="p-4 text-neutral-300 hover:text-red-600 bg-neutral-50 rounded-2xl transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;
