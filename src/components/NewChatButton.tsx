import { Plus } from 'lucide-react';
import { useConversation } from '../contexts/ConversationContext';

interface NewChatButtonProps {
  compact?: boolean;
}

const NewChatButton: React.FC<NewChatButtonProps> = ({ compact = false }) => {
  const { clearConversation } = useConversation();

  if (compact) {
    return (
      <button
        onClick={clearConversation}
        aria-label="Start new conversation"
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:outline-none transition-colors cursor-pointer"
      >
        <Plus size={16} className="text-[var(--color-text)]" />
      </button>
    );
  }

  return (
    <button
      onClick={clearConversation}
      aria-label="Start new conversation"
      className="flex items-center justify-center gap-2 px-4 py-2.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:outline-none transition-colors text-sm font-medium cursor-pointer"
    >
      <Plus size={15} />
      New Chat
    </button>
  );
};

export default NewChatButton;
