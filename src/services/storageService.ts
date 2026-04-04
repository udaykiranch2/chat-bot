import type { Conversation } from '@/types';

const STORAGE_KEY = 'sir-sarcasm-conversations';
const MAX_CONVERSATIONS = 50;

export const storageService = {
  loadConversations: (): Conversation[] => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.slice(0, MAX_CONVERSATIONS);
    } catch {
      return [];
    }
  },

  saveConversations: (conversations: Conversation[]): void => {
    try {
      const trimmed = conversations
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .slice(0, MAX_CONVERSATIONS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch {
      // Storage full — silently fail
    }
  },

  generateTitle: (firstMessage: string): string => {
    const cleaned = firstMessage.trim().replace(/\n/g, ' ');
    return cleaned.length > 40 ? cleaned.slice(0, 40) + '...' : cleaned;
  },
};
