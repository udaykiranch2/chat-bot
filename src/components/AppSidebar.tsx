import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import MascotAvatar from './MascotAvatar';
import ThemeToggle from './ThemeToggle';
import ConversationList from './ConversationList';
import { useConversation } from '@/contexts/ConversationContext';

export function AppSidebar() {
  const { createNewConversation } = useConversation();

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="flex-row items-center gap-3 px-4 h-14">
        <MascotAvatar size="sm" />
        <span
          className="font-semibold text-sidebar-foreground text-sm"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Sir Sarcasm
        </span>
        <Button
          variant="ghost"
          size="icon-sm"
          className="ml-auto"
          onClick={createNewConversation}
          aria-label="Start new conversation"
        >
          <Plus className="size-4" />
        </Button>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <ConversationList />
      </SidebarContent>

      <SidebarFooter className="flex-row items-center justify-center h-10">
        <ThemeToggle />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
