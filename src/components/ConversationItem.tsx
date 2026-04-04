import { Trash2 } from 'lucide-react';
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from '@/components/ui/sidebar';
import type { Conversation } from '@/types';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export default function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onDelete,
}: ConversationItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        onClick={onSelect}
        tooltip={conversation.title}
      >
        <span className="truncate">{conversation.title}</span>
      </SidebarMenuButton>
      <SidebarMenuAction showOnHover onClick={onDelete}>
        <Trash2 className="size-3.5" />
      </SidebarMenuAction>
    </SidebarMenuItem>
  );
}
