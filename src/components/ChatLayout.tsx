import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar } from './AppSidebar';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatLayout: React.FC = () => {
  return (
    <TooltipProvider>
      <SidebarProvider className="h-dvh">
        <AppSidebar />
        <SidebarInset className="h-dvh overflow-hidden">
          <ChatHeader />
          <MessageList />
          <MessageInput />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default ChatLayout;
