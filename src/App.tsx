import './App.css'
import './styles/theme.css'
import { ThemeProvider } from './contexts/ThemeContext'
import { ConversationProvider } from './contexts/ConversationContext'
import ChatLayout from './components/ChatLayout'

function App() {
  return (
    <ThemeProvider>
      <ConversationProvider>
        <ChatLayout />
      </ConversationProvider>
    </ThemeProvider>
  );
}

export default App
