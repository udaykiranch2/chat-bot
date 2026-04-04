import { useRef, useEffect } from 'react';
import { useConversation } from '../contexts/ConversationContext';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import WelcomeScreen from './WelcomeScreen';

const MessageList: React.FC = () => {
  const { messages, isLoading } = useConversation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return <WelcomeScreen />;
  }

  return (
    <div
      ref={containerRef}
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
      className="flex-1 min-h-0 overflow-y-auto py-6"
    >
      <div className="chat-content">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
