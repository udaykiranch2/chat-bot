import React, { useState, useRef, useEffect } from 'react';
import chatBotIcon from '../assets/chat-bot.png';
import sendIcon from '../assets/sent.png';
import ChatMessage from './ChatMessage';
import type { Message } from '../services/apiService';
import { initializeBotWithGreeting, sendMessage } from '../services/apiService';

const ChatWidget: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const isInitialized = useRef(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const initBot = async () => {
            if (open && !isInitialized.current) {
                try {
                    setLoading(true);
                    const greeting = await initializeBotWithGreeting();
                    setMessages([{ text: greeting, isUser: false }]);
                    isInitialized.current = true;
                } catch (error) {
                    console.error('Error initializing bot:', error);
                    setMessages([{ text: "Sir Sarcastic appears to be too unimpressed to start. Try again.", isUser: false }]);
                } finally {
                    setLoading(false);
                }
            }
        };

        initBot();
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
            const botResponse = await sendMessage(userMessage);
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
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-8 h-8 sm:w-12 sm:h-12 cursor-pointer"
                onClick={() => setOpen(!open)}
            />

            {/* Chat Dialog */}
            {open && (
                <div className="fixed top-16 sm:top-auto sm:bottom-24 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-8 z-50 w-[95%] sm:w-[450px] h-[80vh] sm:h-[600px] max-w-full rounded-2xl shadow-lg flex flex-col"
                    style={{
                        backgroundColor: 'var(--color-bg)',
                        border: '1px solid var(--color-border)'
                    }}>
                    <div className="flex items-center justify-between p-2 sm:p-4"
                        style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                        <div className="flex items-center gap-1">
                            <span className="inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full">
                                <img src={chatBotIcon} alt="Chat Bot" className="w-4 h-4 sm:w-6 sm:h-6 rounded-full" />
                            </span>
                            <span className="font-semibold text-xs sm:text-base" style={{ color: 'var(--color-text)' }}>Chat with Sir Sarcasm</span>
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-grow overflow-y-auto p-2 sm:p-4" style={{
                        padding: '0.25rem',
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
                                .chat-message {
                                    margin-bottom: 0.5rem sm:mb-4;
                                }
                            `}
                        </style>
                        {messages.map((message, index) => (
                            <div key={index} className="chat-message">
                                <ChatMessage
                                    message={message.text}
                                    isUser={message.isUser}
                                />
                            </div>
                        ))}
                        {loading && (
                            <div className="chat-message">
                                <ChatMessage message="processing ..." isUser={false} />
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Form */}
                    <div className='px-3 sm:px-4 pb-4 sm:pb-8'>
                        <form onSubmit={handleSendMessage} className="w-full px-3 sm:px-4 pb-2 sm:pb-4" style={{ borderColor: 'var(--color-border-light)' }}>
                            <div className="flex items-center border rounded-full overflow-hidden"
                                style={{
                                    borderColor: 'var(--color-border)',
                                    borderRadius: '9999px',
                                    minHeight: '2.5rem'
                                }}>
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-grow bg-transparent focus:outline-none text-sm sm:text-base"
                                    style={{
                                        color: 'var(--color-text)',
                                        padding: '0.75rem 0.75rem 0.75rem 1rem',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        fontFamily: 'inherit',
                                        lineHeight: '1.5',
                                        minHeight: '2.5rem'
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-colors focus:outline-none mx-1"
                                >
                                    <img src={sendIcon} alt="Send" className="w-4 h-4 sm:w-5 sm:h-5" />
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