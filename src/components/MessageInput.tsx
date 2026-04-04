import { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useConversation } from '../contexts/ConversationContext';

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
        <div
            className="pb-2 px-4 bg-[var(--color-bg)]"
            style={{ transition: 'var(--transition-theme)' }}
        >
            <form onSubmit={handleSubmit} className="chat-content w-full">
                <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] focus-within:border-[var(--color-accent)] focus-within:shadow-[0_0_0_1px_var(--color-accent-light)] transition-all pl-5 pr-3 py-3">
                    <textarea
                        ref={textareaRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="What is it now?"
                        aria-label="Type your message"
                        rows={3}
                        className="flex-1 bg-transparent resize-none text-[15px] leading-relaxed text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] placeholder:italic focus:outline-none py-2 pl-1"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isLoading}
                        aria-label="Send message"
                        className="flex items-center justify-center w-8 h-8 rounded-xl bg-[var(--color-accent)] text-[var(--color-text-on-accent)] hover:bg-[var(--color-accent-dark)] disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer flex-shrink-0 active:scale-90 self-center"
                    >
                        <ArrowUp size={16} strokeWidth={2.5} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MessageInput;
