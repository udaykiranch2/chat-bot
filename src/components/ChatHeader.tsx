import MascotAvatar from './MascotAvatar';
import ThemeToggle from './ThemeToggle';
import NewChatButton from './NewChatButton';

const ChatHeader: React.FC = () => {
  return (
    <>
      {/* Mobile header */}
      <div
        className="md:hidden flex items-center justify-between px-5 h-16 border-b border-[var(--color-border)] bg-[var(--color-bg)]"
        style={{ transition: 'var(--transition-theme)' }}
      >
        <div className="flex items-center gap-3.5">
          <MascotAvatar size="sm" />
          <div className="min-w-0">
            <h1
              className="text-base font-semibold text-[var(--color-text)] leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Sir Sarcasm
            </h1>
            <p className="text-[11px] tracking-wider uppercase text-[var(--color-text-muted)]">
              Perpetually Unimpressed
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <NewChatButton compact />
          <ThemeToggle />
        </div>
      </div>


          <div
        className="hidden md:flex items-center justify-center h-16 border-b border-[var(--color-border)] bg-[var(--color-bg)] pl-[260px]"
        style={{ transition: 'var(--transition-theme)' }}
      >
        <span className="text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] font-light">
          Conversation
        </span>
      </div>
    </>
  );
};

export default ChatHeader;
