import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatLayout: React.FC = () => {
  return (
    <div
      className="relative h-full w-full bg-[var(--color-bg)]"
      style={{ transition: 'var(--transition-theme)' }}
    >
      <Sidebar />
      <main className="h-full w-full flex flex-col min-w-0 min-h-0 md:pl-[260px]">
        <ChatHeader />
        <MessageList />
        <MessageInput />
      </main>
    </div>
  );
};

export default ChatLayout;
