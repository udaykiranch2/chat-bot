import { useMemo, useState } from 'react';
import { useConversation } from '@/contexts/ConversationContext';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from '@/components/ui/sidebar';
import ConversationItem from './ConversationItem';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

function getDateGroup(timestamp: number): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return 'Previous 7 Days';
  return 'Older';
}

export default function ConversationList() {
  const { conversations, activeConversationId, switchConversation, deleteConversation } =
    useConversation();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return conversations;
    const q = search.toLowerCase();
    return conversations.filter(c =>
      c.title.toLowerCase().includes(q)
    );
  }, [conversations, search]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    for (const convo of filtered) {
      const group = getDateGroup(convo.updatedAt);
      if (!groups[group]) groups[group] = [];
      groups[group].push(convo);
    }
    return groups;
  }, [filtered]);

  const groupOrder = ['Today', 'Yesterday', 'Previous 7 Days', 'Older'];

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        <Input
          placeholder="Search conversations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 pl-8 text-xs bg-sidebar border-sidebar-border"
        />
      </div>

      {conversations.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-6 px-2">
          No conversations yet. Start one!
        </p>
      ) : (
        groupOrder.map(groupName => {
          const items = grouped[groupName];
          if (!items || items.length === 0) return null;
          return (
            <SidebarGroup key={groupName}>
              <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map(convo => (
                    <ConversationItem
                      key={convo.id}
                      conversation={convo}
                      isActive={convo.id === activeConversationId}
                      onSelect={() => switchConversation(convo.id)}
                      onDelete={() => deleteConversation(convo.id)}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })
      )}
    </div>
  );
}
