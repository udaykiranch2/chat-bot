import React from 'react';

const Features: React.FC = () => {
    const features = [
        {
            icon: '🎭',
            title: 'Witty Conversations',
            description: 'Engage in clever banter with an AI that actually has a sense of humor (and attitude).'
        },
        {
            icon: '🧠',
            title: 'Smart Responses',
            description: 'Get intelligent answers wrapped in sarcasm that somehow makes everything more entertaining.'
        },
        {
            icon: '⚡',
            title: 'Lightning Fast',
            description: 'Because waiting for sarcastic responses would be... well, less sarcastic.'
        },
        {
            icon: '🎯',
            title: 'Personalized Sass',
            description: 'Sir Sarcasm adapts to your conversation style and delivers perfectly timed comebacks.'
        }
    ];

    return (
        <section id="features" className="py-20 px-4" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-dark)' }}>
                        Why Choose Sir Sarcasm?
                    </h2>
                    <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--color-text)' }}>
                        Finally, an AI that matches your energy and isn't afraid to keep things interesting.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} 
                             className="p-6 rounded-2xl shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
                             style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-dark)' }}>
                                {feature.title}
                            </h3>
                            <p style={{ color: 'var(--color-text)' }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;