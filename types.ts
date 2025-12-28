
export interface ItineraryDay {
  day: number;
  date: string;
  location: string;
  hotel?: string;
  activities: string[];
}

export interface PackingItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  note: string;
}

export interface DailyInsights {
  temp: string; // Fahrenheit
  condition: string;
  headline: string;
  distance: string; // Miles
  duration: string;
  summary: string;
  groundingUrls: { title: string; uri: string }[];
}

export interface JournalEntry {
  date: string; // YYYY-MM-DD
  content: string;
  lastUpdated: number;
}

export type ViewState = 'hub' | 'packing' | 'journal';
