import React from 'react';

const About: React.FC = () => {
    return (
        <section id="about" className="py-20 px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-dark)' }}>
                        About Sir Sarcasm
                    </h2>
                    <p className="text-xl" style={{ color: 'var(--color-text)' }}>
                        The AI that dares to be different
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text-dark)' }}>
                            A New Kind of Conversation
                        </h3>
                        <div className="space-y-4" style={{ color: 'var(--color-text)' }}>
                            <p>
                                Sir Sarcasm isn't your typical chatbot. Born from the desire to make AI interactions 
                                more engaging and entertaining, this digital companion brings wit, sass, and genuine 
                                intelligence to every conversation.
                            </p>
                            <p>
                                Whether you need help with tasks, want to brainstorm ideas, or just feel like 
                                having a chat with someone who won't sugarcoat their responses, Sir Sarcasm 
                                delivers the perfect balance of helpful and hilariously honest.
                            </p>
                            <p>
                                No boring small talk. No overly polite responses. Just real conversation 
                                with an AI that actually has personality.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-6">
                        <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-primary-light)', border: '1px solid var(--color-border)' }}>
                            <h4 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-text-dark)' }}>
                                🎯 Mission
                            </h4>
                            <p style={{ color: 'var(--color-text)' }}>
                                To prove that AI can be both intelligent and entertaining, 
                                making every interaction memorable and genuinely useful.
                            </p>
                        </div>

                        <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-primary-light)', border: '1px solid var(--color-border)' }}>
                            <h4 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-text-dark)' }}>
                                ⚡ Philosophy
                            </h4>
                            <p style={{ color: 'var(--color-text)' }}>
                                Why be bland when you can be brilliant? Every response should 
                                be worth reading, even if it comes with a side of sass.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;