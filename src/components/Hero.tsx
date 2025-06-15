import React from 'react';
import mascot from '../assets/mascot.png';

const Hero: React.FC = () => {
    return (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                {/* Mascot Image */}
                <img
                    src={mascot}
                    alt="Chatbot Mascot"
                    className="mb-8 w-40 h-40 md:w-56 md:h-56 drop-shadow-lg rounded-full p-4"
                    style={{ backgroundColor: 'var(--color-primary-light)' }}
                    draggable={false}
                />
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4" style={{ color: 'var(--color-text-dark)' }}>
                     Sir Sarcasm
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl" style={{ color: 'var(--color-text)' }}>
                    The next evolution in AI conversation.<br />
                    <span style={{ color: 'var(--color-accent)' }}>Futuristic. Intelligent. Human-like.</span>
                </p>
            </div>
        </div>
    );
};

export default Hero; 