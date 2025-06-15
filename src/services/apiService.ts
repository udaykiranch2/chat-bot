import { BOT_PERSONALITY } from '../config/botPersonality';
import { getInitialPrompt } from '../config/botPersonality';

export interface Message {
    text: string;
    isUser: boolean;
}

const cleanResponse = (text: string): string => {
    // Only remove markdown formatting when it's used for formatting
    return text
        // Remove asterisks only when they're used for emphasis (paired)
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1')     // Remove italic
        // Remove underscores only when they're used for emphasis (paired)
        .replace(/__(.*?)__/g, '$1')     // Remove bold with underscores
        .replace(/_(.*?)_/g, '$1')       // Remove italic with underscores
        // Remove backticks only when they're used for code blocks
        .replace(/```(.*?)```/g, '$1')   // Remove code blocks
        .replace(/`(.*?)`/g, '$1')       // Remove inline code
        // Remove hash symbols only when they're used for headings
        .replace(/^#+\s+(.*?)$/gm, '$1') // Remove heading markers
        .trim();
};

export const initializeBotWithGreeting = async (): Promise<string> => {
    try {
        const response = await fetch(import.meta.env.VITE_GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{
                            text: BOT_PERSONALITY
                        }]
                    },
                    {
                        role: "model",
                        parts: [{
                            text: "Understood. I will maintain this personality throughout our conversation."
                        }]
                    },
                    {
                        role: "user",
                        parts: [{
                            text: "Now, as Sir Sarcastic, generate a single, very short, dryly sarcastic and unimpressed greeting to initiate a conversation with a user. Do not introduce yourself, just the greeting. Keep it under 15 words. Do not use any markdown formatting like asterisks or underscores."
                        }]
                    }
                ]
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to initialize bot');
        }

        const data = await response.json();

        let responseText = '';
        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            responseText = data.candidates[0].content.parts[0].text;
        } else if (data?.text) {
            responseText = data.text;
        } else if (typeof data === 'string') {
            responseText = data;
        } else {
            throw new Error('Unexpected API response format');
        }

        return cleanResponse(responseText);
    } catch (error) {
        console.error('Error initializing bot:', error);
        return "Sir Sarcastic appears to be too unimpressed to start. Try again.";
    }
};

export const sendMessage = async (userMessage: string): Promise<string> => {
    const response = await fetch(import.meta.env.VITE_GEMINI_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            contents: [
                {
                    role: "user",
                    parts: [{
                        text: BOT_PERSONALITY
                    }]
                },
                {
                    role: "model",
                    parts: [{
                        text: "Understood. I will maintain this personality throughout our conversation."
                    }]
                },
                {
                    role: "user",
                    parts: [{
                        text: userMessage
                    }]
                }
            ]
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    let responseText = '';
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        responseText = data.candidates[0].content.parts[0].text;
    } else if (data?.text) {
        responseText = data.text;
    } else if (typeof data === 'string') {
        responseText = data;
    } else {
        throw new Error('Unexpected API response format');
    }

    return cleanResponse(responseText);
}; 