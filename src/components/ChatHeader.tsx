import { SidebarTrigger } from '@/components/ui/sidebar';
import MascotAvatar from './MascotAvatar';
import ThemeToggle from './ThemeToggle';
import NewChatButton from './NewChatButton';

const ChatHeader: React.FC = () => {
  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between px-4 h-14 border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <MascotAvatar size="sm" />
          <div className="min-w-0">
            <h1
              className="text-base font-semibold text-foreground leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Sir Sarcasm
            </h1>
            <p className="text-[11px] tracking-wider uppercase text-muted-foreground">
              Perpetually Unimpressed
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <NewChatButton compact />
          <ThemeToggle />
        </div>
      </div>

      {/* Desktop header — sits flush with sidebar header */}
      <div className="hidden md:flex items-center h-14 border-b border-border bg-background px-3">
        <SidebarTrigger />
      </div>
    </>
  );
};

export default ChatHeader;
