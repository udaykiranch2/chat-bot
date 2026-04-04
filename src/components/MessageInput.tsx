import { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useConversation } from '@/contexts/ConversationContext';

const MessageInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { sendUserMessage, isLoading } = useConversation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [inputValue]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    const text = inputValue;
    setInputValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    await sendUserMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="pb-10 px-4 bg-background transition-colors duration-300">
      <form onSubmit={handleSubmit} className="chat-content w-full">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card focus-within:border-primary focus-within:shadow-[0_0_0_1px_var(--ring)] transition-all pl-4 pr-3 py-2">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What is it now?"
            aria-label="Type your message"
            rows={1}
            className="flex-1 border-0 bg-transparent resize-none text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground placeholder:italic focus-visible:ring-0 focus-visible:border-0 focus-visible:shadow-none shadow-none min-h-[40px]"
          />
          <Button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            size="icon"
            className="flex-shrink-0 self-end mb-1 active:scale-90 transition-transform rounded-xl"
            aria-label="Send message"
          >
            <ArrowUp size={16} strokeWidth={2.5} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
