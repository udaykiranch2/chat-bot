import React, { useState, useRef, useEffect } from 'react';
import chatBotIcon from '../assets/chat-bot.png';
import sendIcon from '../assets/sent.png';
import ChatMessage from './ChatMessage';
import { getInitialPrompt, BOT_PERSONALITY } from '../config/botPersonality';

interface Message {
    text: string;
    isUser: boolean;
}

const ChatWidget: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { text: "Hi! How can I help you today?", isUser: false }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const isInitialized = useRef(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const initializeBot = async () => {
            if (open && !isInitialized.current) {
                try {
                    const response = await fetch(import.meta.env.VITE_GEMINI_API_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify(getInitialPrompt()),
                    });

                    if (!response.ok) {
                        console.error('Failed to initialize bot personality');
                    }
                    isInitialized.current = true;
                } catch (error) {
                    console.error('Error initializing bot:', error);
                }
            }
        };

        initializeBot();
    }, [open]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim() || loading) return;

        const userMessage = inputMessage;
        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
        setInputMessage('');
        setLoading(true);

        try {
            console.log('Sending request to:', import.meta.env.VITE_GEMINI_API_URL);

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

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

            // Handle different possible response structures
            let botResponse: string;
            if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
                botResponse = data.candidates[0].content.parts[0].text;
            } else if (data?.text) {
                botResponse = data.text;
            } else if (typeof data === 'string') {
                botResponse = data;
            } else {
                console.error('Unexpected API response structure:', data);
                botResponse = "Sorry, I received an unexpected response format.";
            }

            setMessages(prev => [...prev, {
                text: botResponse,
                isUser: false
            }]);
        } catch (error) {
            console.error("Detailed error:", error);
            const errorMessage = error instanceof Error
                ? error.message
                : 'An unexpected error occurred while communicating with the API.';

            setMessages(prev => [...prev, {
                text: `Error: ${errorMessage}. Please try again or check your API configuration.`,
                isUser: false
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Chatbot Icon */}
            <img
                src={chatBotIcon}
                alt="Chat Bot"
                className="fixed bottom-6 right-6 z-50 w-12 h-12 cursor-pointer"
                onClick={() => setOpen(!open)}
            />

            {/* Chat Dialog */}
            {open && (
                <div className="fixed bottom-24 right-8 z-50 w-96 h-[600px] max-w-full rounded-2xl shadow-lg flex flex-col"
                    style={{
                        backgroundColor: 'var(--color-bg)',
                        border: '1px solid var(--color-border)'
                    }}>
                    <div className="flex items-center justify-between p-4"
                        style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full">
                                <img src={chatBotIcon} alt="Chat Bot" className="w-6 h-6 rounded-full" />
                            </span>
                            <span className="font-semibold" style={{ color: 'var(--color-text)' }}>Chat with Mr. Bot</span>
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-grow overflow-y-auto p-4" style={{
                        padding: '0.5rem',
                        scrollbarWidth: 'thin',
                    }}>
                        <style>
                            {`
                                .flex-grow::-webkit-scrollbar {
                                    width: 4px;
                                }
                              
                                .flex-grow::-webkit-scrollbar-thumb {
                                    background-color: rgba(128, 128, 128, 0.3);
                                    border-radius: 20px;
                                }
                            `}
                        </style>
                        {messages.map((message, index) => (
                            <ChatMessage
                                key={index}
                                message={message.text}
                                isUser={message.isUser}
                            />
                        ))}
                        {loading && <ChatMessage message="Mr. Bot is typing..." isUser={false} />}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Form */}
                    <div className='px-4 pb-12'>
                        <form onSubmit={handleSendMessage} className="w-full px-4 pb-4" style={{ borderColor: 'var(--color-border-light)' }}>
                            <div className="flex items-center border rounded-full overflow-hidden"
                                style={{
                                    borderColor: 'var(--color-border)',
                                    borderRadius: '9999px'
                                }}>
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-grow bg-transparent focus:outline-none text-sm"
                                    style={{
                                        color: 'var(--color-text)',
                                        padding: '0.75rem 0.5rem 0.75rem 1rem',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        fontFamily: 'inherit',
                                        lineHeight: '1.5'
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-8 h-8 flex items-center justify-center rounded-full transition-colors focus:outline-none"
                                >
                                    <img src={sendIcon} alt="Send" className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatWidget; 