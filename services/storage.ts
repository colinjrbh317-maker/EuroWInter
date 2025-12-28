
import { JournalEntry } from "../types";

const STORAGE_KEY = 'trip_journal_entries';

/**
 * Storage service abstracted for future Supabase MCP server integration.
 * Currently uses high-performance localStorage for instant setup.
 */
export const storage = {
  async saveJournalEntry(entry: JournalEntry): Promise<void> {
    const entries = await this.getAllEntries();
    entries[entry.date] = entry;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  },

  async getEntryByDate(date: string): Promise<JournalEntry | null> {
    const entries = await this.getAllEntries();
    return entries[date] || null;
  },

  async getAllEntries(): Promise<Record<string, JournalEntry>> {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  },

  async deleteEntry(date: string): Promise<void> {
    const entries = await this.getAllEntries();
    delete entries[date];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }
};
