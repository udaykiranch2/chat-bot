import { motion } from 'framer-motion';

interface MascotAvatarProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 34,
  md: 90,
  lg: 130,
} as const;

const MascotAvatar: React.FC<MascotAvatarProps> = ({ size = 'md' }) => {
  const s = sizes[size];

  return (
    <motion.div
      style={{ width: s, height: s }}
      animate={{ y: [0, -4, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 100 100" width={s} height={s}>
        {/* Face background */}
        <circle cx="50" cy="48" r="42" fill="var(--color-surface)" />

        {/* Monocle frame */}
        <circle
          cx="52"
          cy="38"
          r="21"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2.5"
        />

        {/* Monocle glass tint */}
        <circle cx="52" cy="38" r="19" fill="var(--color-accent)" opacity="0.05" />

        {/* Monocle chain */}
        <motion.path
          d="M 73 38 Q 79 52 75 68 Q 71 80 77 94"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{
            d: [
              'M 73 38 Q 79 52 75 68 Q 71 80 77 94',
              'M 73 38 Q 81 54 77 70 Q 73 82 79 96',
              'M 73 38 Q 79 52 75 68 Q 71 80 77 94',
            ],
          }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        />

        {/* Eye white */}
        <ellipse cx="52" cy="38" rx="13" ry="9" fill="white" />

        {/* Iris — drifts around condescendingly */}
        <motion.ellipse
          cx={52}
          cy={40}
          rx={5.5}
          ry={6.5}
          fill="var(--color-text)"
          animate={{
            cx: [52, 54, 50, 53, 51, 52],
            cy: [40, 39, 41, 40, 42, 40],
          }}
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: 'easeInOut',
          }}
        />

        {/* Pupil highlight */}
        <circle cx="55" cy="35" r="2.5" fill="white" opacity="0.85" />

        {/* Dramatic eyebrow */}
        <motion.path
          d="M 28 22 Q 40 12 52 16 Q 64 12 76 22"
          fill="none"
          stroke="var(--color-text)"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            d: [
              'M 28 22 Q 40 12 52 16 Q 64 12 76 22',
              'M 28 20 Q 40 9 52 14 Q 64 9 76 20',
              'M 28 22 Q 40 12 52 16 Q 64 12 76 22',
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Smirk */}
        <path
          d="M 38 64 Q 48 71 63 62"
          fill="none"
          stroke="var(--color-text)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* Monocle glass reflection */}
        <motion.circle
          cx="37"
          cy="26"
          r="2.5"
          fill="white"
          animate={{ opacity: [0.15, 0.65, 0.15] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
        />

        {/* Subtle lower shadow */}
        <ellipse cx="50" cy="90" rx="20" ry="3" fill="var(--color-text)" opacity="0.04" />
      </svg>
    </motion.div>
  );
};

export default MascotAvatar;
