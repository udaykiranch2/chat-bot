import React from 'react';

interface ChatMessageProps {
    message: string;
    isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
    const borderRadius = isUser
        ? '13px 13px 3px 13px'
        : '13px 13px 13px 3px';
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div
                style={{
                    borderRadius,
                    padding: '10px 16px',
                    backgroundColor: isUser ? '#2563eb' : '#e5e7eb',
                    color: isUser ? '#fff' : '#222',
                    maxWidth: '80%',
                    wordBreak: 'break-word',
                }}
            >
                {message}
            </div>
        </div>
    );
};

export default ChatMessage; 