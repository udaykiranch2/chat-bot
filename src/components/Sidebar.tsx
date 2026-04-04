import MascotAvatar from './MascotAvatar';
import ThemeToggle from './ThemeToggle';
import NewChatButton from './NewChatButton';

const Sidebar: React.FC = () => {
    return (
        <aside
            className="hidden md:flex absolute left-0 top-0 bottom-0 z-10 flex-col items-center w-[260px] border-r border-[var(--color-border)]"
            style={{
                transition: 'var(--transition-theme)',
                background: 'linear-gradient(180deg, var(--color-primary) 0%, var(--color-bg) 100%)',
            }}
        >
            {/* Mascot + identity */}
            <div className="flex flex-col items-center pt-12 pb-8">
                <MascotAvatar size="lg" />
                <h1 
                    className="mt-5 text-3xl font-bold text-[var(--color-text)] tracking-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    Sir Sarcasm
                </h1>
                <p className="mt-1.5 text-[11px] tracking-[0.18em] uppercase text-[var(--color-text-muted)]">
                    Unimpressed &middot; Since Always
                </p>
            </div>

            {/* Decorative line */}
            <div className="w-12 h-px bg-[var(--color-border)]" />

            {/* Bottom controls */}
            <div className="mt-auto w-full px-5 pb-5 flex flex-col gap-2">
                <NewChatButton />
                <div className="flex justify-center pt-1">
                    <ThemeToggle />
                </div>
            </div>
        </aside>
    );
};


export default Sidebar;
