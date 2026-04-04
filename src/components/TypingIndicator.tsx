import { motion } from 'framer-motion';

const TypingIndicator: React.FC = () => (
  <div className="flex items-start mb-5" role="status" aria-label="Sir Sarcasm is typing">
    <div className="bg-card text-card-foreground rounded-2xl rounded-bl-md px-5 py-3.5 shadow-sm border-l-2 border-l-primary flex gap-2 items-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-primary"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1, 0.85] }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            ease: 'easeInOut',
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  </div>
);

export default TypingIndicator;
