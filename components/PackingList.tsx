
import React, { useState } from 'react';
import { PackingItem } from '../types';
import { Check, Edit3, ChevronRight, ChevronDown, PlusCircle } from 'lucide-react';

interface Props {
  items: PackingItem[];
  onToggle: (id: string) => void;
  onNoteUpdate: (id: string, note: string) => void;
}

const PackingList: React.FC<Props> = ({ items, onToggle, onNoteUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Outerwear', 'Tech & Travel']);

  const categories: string[] = Array.from(new Set(items.map((i: PackingItem) => i.category)));

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const calculateProgress = (cat: string) => {
    const catItems = items.filter((i: PackingItem) => i.category === cat);
    const checked = catItems.filter(i => i.checked).length;
    return Math.round((checked / catItems.length) * 100);
  };

  return (
    <div className="px-6 pt-4 pb-12 space-y-3 animate-in slide-in-from-bottom-4 duration-500">
      {categories.map((cat: string) => (
        <div key={cat} className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
          <button 
            onClick={() => toggleCategory(cat)}
            className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="w-8 h-8 transform -rotate-90">
                  <circle className="text-neutral-100" strokeWidth="3" stroke="currentColor" fill="transparent" r="14" cx="16" cy="16" />
                  <circle
                    className="text-red-600 transition-all duration-700"
                    strokeWidth="3"
                    strokeDasharray={88}
                    strokeDashoffset={88 - (88 * calculateProgress(cat) / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="14"
                    cx="16"
                    cy="16"
                  />
                </svg>
                <span className="absolute text-[7px] font-black text-neutral-900">{calculateProgress(cat)}%</span>
              </div>
              <div className="text-left">
                <h4 className="font-black text-xs text-neutral-900 uppercase tracking-widest">{cat}</h4>
                <p className="text-[8px] text-neutral-400 font-bold uppercase">{items.filter((i: PackingItem) => i.category === cat).length} Total</p>
              </div>
            </div>
            {expandedCategories.includes(cat) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {expandedCategories.includes(cat) && (
            <div className="px-4 pb-4 space-y-2 border-t border-neutral-50 pt-3">
              {items.filter((i: PackingItem) => i.category === cat).map((item: PackingItem) => (
                <div key={item.id} className="group">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => onToggle(item.id)}
                      className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
                        item.checked 
                          ? 'bg-neutral-900 border-neutral-900 text-yellow-400' 
                          : 'border-neutral-200 bg-white hover:border-red-600'
                      }`}
                    >
                      {item.checked && <Check size={12} strokeWidth={4} />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold leading-tight ${item.checked ? 'text-neutral-300 line-through' : 'text-neutral-800'}`}>
                        {item.name}
                      </p>
                      {item.note && !editingId && (
                        <p className="text-[9px] text-red-600 font-bold mt-0.5 uppercase tracking-tighter">
                          Note: {item.note}
                        </p>
                      )}
                    </div>
                    <button 
                      onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                      className="p-1 text-neutral-300 hover:text-black"
                    >
                      <Edit3 size={12} />
                    </button>
                  </div>
                  
                  {editingId === item.id && (
                    <div className="mt-2 ml-8">
                      <input
                        type="text"
                        className="w-full text-[10px] font-bold border-b border-red-600 bg-neutral-50 p-2 focus:outline-none"
                        value={item.note}
                        onChange={(e) => onNoteUpdate(item.id, e.target.value)}
                        onBlur={() => setEditingId(null)}
                        autoFocus
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <button className="w-full py-4 mt-4 border-2 border-dashed border-neutral-200 rounded-xl text-neutral-400 font-black text-[10px] tracking-widest uppercase hover:border-neutral-400 hover:text-neutral-600 transition-all">
        <PlusCircle size={14} className="inline mr-2" />
        New Category
      </button>
    </div>
  );
};

export default PackingList;
