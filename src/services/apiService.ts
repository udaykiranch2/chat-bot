import { BOT_PERSONALITY } from '@/config/botPersonality';
import type { ConversationTurn } from '@/types';

// Supports both Gemini and GLM response structures
interface UnifiedApiResponse {
    // Gemini path
    candidates?: { content: { parts: { text: string }[] } }[];
    // GLM path
    choices?: { message: { content: string } }[];
    error?: any;
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
        const msg = data.error.message || data.error.error?.message || 'API Error';
        throw new Error(msg);
    }
    // Try GLM path first, then Gemini path
    const text = data?.choices?.[0]?.message?.content || data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('No text content in API response');
    return text.trim();
};

const getProviderConfig = () => {
    const url = import.meta.env.VITE_API_URL; // Generic URL in .env
    const key = import.meta.env.VITE_API_KEY;
    if (!url) throw new Error('VITE_API_URL is not configured');

    const isGlm = url.includes('zhipuai') || url.includes('glm');
    return { url, key, isGlm };
};

// Formats history based on the provider requirements
const formatPayload = (isGlm: boolean, history: ConversationTurn[]) => {
    if (isGlm) {
        return {
            model: "glm-4",
            messages: history.map(h => ({
                role: h.role === 'model' ? 'assistant' : h.role,
                content: h.parts[0].text
            }))
        };
    } else {
        return {
            contents: history.map(h => ({
                role: h.role,
                parts: [{ text: h.parts[0].text }]
            }))
        };
    }
};

export const initializeBotWithGreeting = async (): Promise<{ greeting: string; initialHistory: ConversationTurn[] }> => {
    const { url, key, isGlm } = getProviderConfig();

    const systemInstruction = BOT_PERSONALITY;
    const modelAck = 'Understood. I will maintain this personality throughout our conversation. Do not introduce yourself, just the greeting. Now, as Sir Sarcasm, generate a single short, sharp, witty greeting. Do not use any markdown formatting.';

    // Setup initial history objects
    const setupHistory: ConversationTurn[] = [
        { role: 'user', parts: [{ text: systemInstruction }] },
        { role: 'model', parts: [{ text: modelAck }] },
    ];

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(isGlm && { 'Authorization': `Bearer ${key}` }),
        },
        body: JSON.stringify(formatPayload(isGlm, setupHistory)),
    });

    if (!response.ok) throw new Error(`Init failed: ${response.statusText}`);

    const data: UnifiedApiResponse = await response.json();
    const greeting = cleanResponse(extractText(data));

    const initialHistory: ConversationTurn[] = [
        ...setupHistory,
        { role: 'user', parts: [{ text: 'Generate a greeting.' }] },
        { role: 'model', parts: [{ text: greeting }] },
    ];

    return { greeting, initialHistory };
};

export const sendMessage = async (userMessage: string, conversationHistory: ConversationTurn[]): Promise<string> => {
    const { url, key, isGlm } = getProviderConfig();

    const fullHistory = [
        ...conversationHistory,
        { role: 'user', parts: [{ text: userMessage }] } as ConversationTurn
    ];

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(isGlm && { 'Authorization': `Bearer ${key}` }),
        },
        body: JSON.stringify(formatPayload(isGlm, fullHistory)),
    });

    if (!response.ok) throw new Error('API request failed');

    const data: UnifiedApiResponse = await response.json();
    return cleanResponse(extractText(data));
};
