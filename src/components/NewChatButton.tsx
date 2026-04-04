import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConversation } from '@/contexts/ConversationContext';

interface NewChatButtonProps {
  compact?: boolean;
}

const NewChatButton: React.FC<NewChatButtonProps> = ({ compact = false }) => {
  const { createNewConversation } = useConversation();

  if (compact) {
    return (
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={createNewConversation}
        aria-label="Start new conversation"
      >
        <Plus size={16} />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className="w-full gap-2"
      onClick={createNewConversation}
      aria-label="Start new conversation"
    >
      <Plus size={15} />
      New Chat
    </Button>
  );
};

export default NewChatButton;
