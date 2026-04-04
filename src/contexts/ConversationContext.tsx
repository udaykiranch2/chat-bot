import { createContext, useContext, useState, useRef, useCallback, type ReactNode } from 'react';
import type { Message, ConversationTurn, Conversation } from '@/types';
import { initializeBotWithGreeting, sendMessage as apiSendMessage } from '@/services/apiService';
import { storageService } from '@/services/storageService';

interface ConversationContextState {
    conversations: Conversation[];
    activeConversationId: string | null;
    messages: Message[];
    isLoading: boolean;
    isInitialized: boolean;
    sendUserMessage: (text: string) => Promise<void>;
    initializeConversation: () => Promise<void>;
    createNewConversation: () => void;
    switchConversation: (id: string) => void;
    deleteConversation: (id: string) => void;
    renameConversation: (id: string, title: string) => void;
    clearCurrentConversation: () => void;
}

const ConversationContext = createContext<ConversationContextState | null>(null);

export const useConversation = (): ConversationContextState => {
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
    const [conversations, setConversations] = useState<Conversation[]>(() =>
        storageService.loadConversations()
    );
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const historyRef = useRef<ConversationTurn[]>([]);
    const loadingRef = useRef(false);
    const initializedRef = useRef(false);
    const activeIdRef = useRef<string | null>(null);
    const messagesRef = useRef<Message[]>([]);

    // Keep refs in sync with state
    activeIdRef.current = activeConversationId;
    messagesRef.current = messages;

    const saveCurrentToStorage = useCallback((currentMessages: Message[], currentHistory: ConversationTurn[], currentId: string | null) => {
        if (!currentId || currentMessages.length === 0) return;
        setConversations(prev => {
            const updated = prev.map(c =>
                c.id === currentId
                    ? { ...c, messages: currentMessages, history: currentHistory, updatedAt: Date.now() }
                    : c
            );
            storageService.saveConversations(updated);
            return updated;
        });
    }, []);

    const initializeConversation = useCallback(async () => {
        if (initializedRef.current) return;
        initializedRef.current = true;
        loadingRef.current = true;
        setIsLoading(true);
        try {
            const { greeting, initialHistory } = await initializeBotWithGreeting();
            historyRef.current = initialHistory;
            const greetingMsg = createMessage(greeting, false);
            setMessages([greetingMsg]);
            setIsInitialized(true);

            const id = activeIdRef.current || crypto.randomUUID();
            if (!activeIdRef.current) {
                setActiveConversationId(id);
            }
            const newConvo: Conversation = {
                id,
                title: 'New Conversation',
                messages: [greetingMsg],
                history: initialHistory,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            };
            setConversations(prev => {
                const updated = [newConvo, ...prev];
                storageService.saveConversations(updated);
                return updated;
            });
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

            const id = activeIdRef.current;
            if (id) {
                setConversations(prev => {
                    const updated = prev.map(c => {
                        if (c.id !== id) return c;
                        const isFirstUserMessage = !c.messages.some(m => m.isUser);
                        return {
                            ...c,
                            title: isFirstUserMessage ? storageService.generateTitle(text) : c.title,
                            messages: [...c.messages, userMsg, botMsg],
                            history: historyRef.current,
                            updatedAt: Date.now(),
                        };
                    });
                    storageService.saveConversations(updated);
                    return updated;
                });
            }
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

    const createNewConversation = useCallback(() => {
        const currentId = activeIdRef.current;
        const currentMessages = messagesRef.current;
        if (currentId && currentMessages.length > 0) {
            saveCurrentToStorage(currentMessages, historyRef.current, currentId);
        }
        setMessages([]);
        setIsLoading(false);
        setIsInitialized(false);
        initializedRef.current = false;
        loadingRef.current = false;
        historyRef.current = [];
        setActiveConversationId(null);
    }, [saveCurrentToStorage]);

    const switchConversation = useCallback((id: string) => {
        const currentId = activeIdRef.current;
        const currentMessages = messagesRef.current;
        if (currentId && currentMessages.length > 0) {
            saveCurrentToStorage(currentMessages, historyRef.current, currentId);
        }
        const target = conversations.find(c => c.id === id);
        if (!target) return;
        setMessages(target.messages);
        historyRef.current = target.history;
        setActiveConversationId(id);
        setIsInitialized(target.messages.length > 0);
        initializedRef.current = target.messages.length > 0;
        setIsLoading(false);
        loadingRef.current = false;
    }, [conversations, saveCurrentToStorage]);

    const deleteConversation = useCallback((id: string) => {
        setConversations(prev => {
            const updated = prev.filter(c => c.id !== id);
            storageService.saveConversations(updated);
            return updated;
        });
        if (activeIdRef.current === id) {
            createNewConversation();
        }
    }, [createNewConversation]);

    const renameConversation = useCallback((id: string, title: string) => {
        setConversations(prev => {
            const updated = prev.map(c => c.id === id ? { ...c, title, updatedAt: Date.now() } : c);
            storageService.saveConversations(updated);
            return updated;
        });
    }, []);

    const clearCurrentConversation = useCallback(() => {
        createNewConversation();
    }, [createNewConversation]);

    return (
        <ConversationContext.Provider value={{
            conversations,
            activeConversationId,
            messages,
            isLoading,
            isInitialized,
            sendUserMessage,
            initializeConversation,
            createNewConversation,
            switchConversation,
            deleteConversation,
            renameConversation,
            clearCurrentConversation,
        }}>
            {children}
        </ConversationContext.Provider>
    );
};
