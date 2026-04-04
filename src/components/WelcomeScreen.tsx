import { motion } from 'framer-motion';
import MascotAvatar from './MascotAvatar';
import { useConversation } from '../contexts/ConversationContext';

const SUGGESTIONS = [
    { id: 'I', text: 'Tell me a joke' },
    { id: 'II', text: "What's the meaning of life?" },
    { id: 'III', text: 'Roast me' },
    { id: 'IV', text: 'Impress me with your wit' },
];

const WelcomeScreen: React.FC = () => {
    const { sendUserMessage, initializeConversation, isInitialized, isLoading } =
        useConversation();

    const handleSuggestionClick = async (text: string) => {
        if (isLoading) return;
        if (!isInitialized) {
            await initializeConversation();
        }
        await sendUserMessage(text);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="chat-content flex flex-col items-center justify-center h-full py-12"
        >
            {/* Mascot entrance */}
            <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <MascotAvatar size="lg" />
            </motion.div>

            {/* Greeting */}
            <motion.div
                className="text-center mt-10 mb-14"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
            >
                <h2
                    className="text-4xl md:text-5xl font-bold text-[var(--color-text)]"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    Oh, you decided to show up.
                </h2>
                <p className="mt-4 text-base text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed">
                    Go ahead, ask me something. I promise to be thoroughly unimpressed.
                </p>
            </motion.div>

            {/* Suggestions — table of contents style */}
            <motion.div
                className="flex flex-col w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                {SUGGESTIONS.map((suggestion, i) => (
                    <motion.button
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion.text)}
                        disabled={isLoading}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.35 + i * 0.07 }}
                        className="group relative flex items-baseline gap-5 w-full py-4 px-4 text-left rounded-lg hover:bg-[var(--color-surface)] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <span
                            className="text-[var(--color-accent)] font-bold text-base w-8 shrink-0"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            {suggestion.id}
                        </span>
                        <span
                            className="text-[var(--color-text)] text-lg italic"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            {suggestion.text}
                        </span>
                        {/* Bottom accent line on hover */}
                        <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-[var(--color-accent)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </motion.button>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default WelcomeScreen;
