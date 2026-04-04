import { createContext, useContext, useState, useRef, useCallback, type ReactNode } from 'react';
import type { Message, ConversationTurn } from '../types';
import { initializeBotWithGreeting, sendMessage as apiSendMessage } from '../services/apiService';

interface ConversationState {
  messages: Message[];
  isLoading: boolean;
  isInitialized: boolean;
  sendUserMessage: (text: string) => Promise<void>;
  initializeConversation: () => Promise<void>;
  clearConversation: () => void;
}

const ConversationContext = createContext<ConversationState | null>(null);

export const useConversation = (): ConversationState => {
  const ctx = useContext(ConversationContext);
  if (!ctx) throw new Error('useConversation must be used within ConversationProvider');
  return ctx;
};

const createMessage = (text: string, isUser: boolean): Message => ({
  id: crypto.randomUUID(),
  text,
  isUser,
  timestamp: Date.now(),
});

const MAX_HISTORY_TURNS = 20;

export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const historyRef = useRef<ConversationTurn[]>([]);
  const loadingRef = useRef(false);
  const initializedRef = useRef(false);

  const initializeConversation = useCallback(async () => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    loadingRef.current = true;
    setIsLoading(true);
    try {
      const { greeting, initialHistory } = await initializeBotWithGreeting();
      historyRef.current = initialHistory;
      setMessages([createMessage(greeting, false)]);
      setIsInitialized(true);
    } catch {
      initializedRef.current = false;
      setMessages([createMessage(
        "Sir Sarcastic appears to be too unimpressed to start. Try again.",
        false
      )]);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  const sendUserMessage = useCallback(async (text: string) => {
    if (!text.trim() || loadingRef.current) return;

    const userMsg = createMessage(text, true);
    loadingRef.current = true;
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const trimmedHistory = historyRef.current.slice(-MAX_HISTORY_TURNS);
      const responseText = await apiSendMessage(text, trimmedHistory);
      const botMsg = createMessage(responseText, false);
      setMessages(prev => [...prev, botMsg]);

      historyRef.current = [
        ...historyRef.current,
        { role: 'user', parts: [{ text }] },
        { role: 'model', parts: [{ text: responseText }] },
      ];
    } catch (error) {
      const errorText = error instanceof Error ? error.message : 'An unexpected error occurred.';
      setMessages(prev => [...prev, createMessage(
        `Something went wrong: ${errorText}`,
        false
      )]);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  const clearConversation = useCallback(() => {
    setMessages([]);
    setIsLoading(false);
    setIsInitialized(false);
    initializedRef.current = false;
    loadingRef.current = false;
    historyRef.current = [];
  }, []);

  return (
    <ConversationContext.Provider value={{
      messages,
      isLoading,
      isInitialized,
      sendUserMessage,
      initializeConversation,
      clearConversation,
    }}>
      {children}
    </ConversationContext.Provider>
  );
};
