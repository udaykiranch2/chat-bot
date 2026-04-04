import React from 'react';
import { motion } from 'framer-motion';
import type { Message } from '@/types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const timeString = new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(message.timestamp);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className="max-w-[85%] md:max-w-[70%]">
        <div
          className={`px-5 py-3 text-[15px] leading-relaxed ${
            message.isUser
              ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-md'
              : 'bg-card text-card-foreground rounded-2xl rounded-bl-md shadow-sm border-l-2 border-l-primary'
          }`}
        >
          {message.text}
        </div>
        <time
          dateTime={new Date(message.timestamp).toISOString()}
          className={`block text-[11px] mt-2 text-muted-foreground ${
            message.isUser ? 'text-right pr-2' : 'text-left pl-2'
          }`}
        >
          {timeString}
        </time>
      </div>
    </motion.div>
  );
};

export default React.memo(ChatMessage);
