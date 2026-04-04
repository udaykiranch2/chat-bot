import { BOT_PERSONALITY } from '@/config/botPersonality';
import type { ConversationTurn } from '@/types';

interface UnifiedApiResponse {
    choices?: {
        message: {
            content: string;
        };
    }[];
    candidates?: {
        content: {
            parts: { text: string }[];
        };
    }[];
    error?: {
        message: string;
    };
}

const cleanResponse = (text: string): string => {
    return text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/__(.*?)__/g, '$1')
        .replace(/_(.*?)_/g, '$1')
        .replace(/`{1,3}[^`\n]*`/g, '$&')
        .replace(/^#+\s/gm, '')
        .trim();
};

const extractText = (data: UnifiedApiResponse): string => {
    if (data.error) {
        throw new Error(data.error.message || 'API returned an error');
    }
    const text = data?.choices?.[0]?.message?.content || data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
        throw new Error('No text content in API response');
    }
    return text.trim();
};

// --- Provider Configuration ---
// If VITE_API_URL is set in .env, uses Gemini cloud API.
// Otherwise, falls back to local Ollama (LLaMA 3).

const isCloudProvider = !!import.meta.env.VITE_API_URL;

const getConfig = () => {
    if (isCloudProvider) {
        return {
            url: import.meta.env.VITE_API_URL as string,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
            model: 'gemini-3-flash-preview',
        };
    }
    return {
        url: 'http://localhost:11434/v1/chat/completions',
        headers: {
            'Content-Type': 'application/json',
        },
        model: 'llama3',
    };
};

export const initializeBotWithGreeting = async (): Promise<{ greeting: string; initialHistory: ConversationTurn[] }> => {
    const { url, headers, model } = getConfig();

    const systemInstruction = BOT_PERSONALITY;
    const modelAck = 'Understood. I am Sir Sarcasm. I will generate a short, sharp, witty greeting now without markdown.';

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            model,
            messages: [
                { role: 'system', content: systemInstruction },
                { role: 'assistant', content: modelAck },
            ],
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to initialize bot');
    }

    const data: UnifiedApiResponse = await response.json();
    const greeting = cleanResponse(extractText(data));

    const initialHistory: ConversationTurn[] = [
        { role: 'user', parts: [{ text: systemInstruction }] },
        { role: 'model', parts: [{ text: modelAck }] },
        { role: 'user', parts: [{ text: 'Generate a greeting.' }] },
        { role: 'model', parts: [{ text: greeting }] },
    ];

    return { greeting, initialHistory };
};

export const sendMessage = async (userMessage: string, conversationHistory: ConversationTurn[]): Promise<string> => {
    const { url, headers, model } = getConfig();

    const messages = conversationHistory.map(h => ({
        role: h.role === 'model' ? 'assistant' : h.role,
        content: h.parts[0].text
    }));

    messages.push({ role: 'user', content: userMessage });

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            model,
            messages,
        }),
    });

    if (!response.ok) {
        throw new Error('API request failed');
    }

    const data: UnifiedApiResponse = await response.json();
    return cleanResponse(extractText(data));
};
