import React, { useState } from 'react';

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "Is Sir Sarcasm actually sarcastic?",
            answer: "Oh, absolutely not. We just named it that because we thought it sounded cool. Of course it's sarcastic! That's literally the entire point. But don't worry, the sarcasm comes with actual helpful responses."
        },
        {
            question: "Can Sir Sarcasm help with serious tasks?",
            answer: "Despite the attitude, Sir Sarcasm is surprisingly capable. It can help with research, writing, problem-solving, and more. The sarcasm is just the delivery method - the intelligence behind it is very real."
        },
        {
            question: "Will Sir Sarcasm be mean to me?",
            answer: "Sir Sarcasm is sassy, not mean. Think of it as that witty friend who always has a clever comeback but would never actually hurt your feelings. The goal is entertainment, not emotional damage."
        },
        {
            question: "How does Sir Sarcasm compare to other chatbots?",
            answer: "Well, most chatbots are about as exciting as watching paint dry. Sir Sarcasm actually has personality and makes conversations enjoyable. Plus, you get helpful responses without the corporate pleasantries."
        },
        {
            question: "Is there a cost to use Sir Sarcasm?",
            answer: "The best things in life are free, and Sir Sarcasm's wit is no exception. Though if you want to tip for particularly clever responses, we won't complain."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 px-4" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-dark)' }}>
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl" style={{ color: 'var(--color-text)' }}>
                        The answers you're looking for (with a side of sass)
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} 
                             className="rounded-lg overflow-hidden"
                             style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                            <button
                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:opacity-75 transition-opacity"
                                onClick={() => toggleFAQ(index)}
                                style={{ color: 'var(--color-text-dark)' }}
                            >
                                <span className="font-semibold text-lg">{faq.question}</span>
                                <span className="text-2xl" style={{ color: 'var(--color-accent)' }}>
                                    {openIndex === index ? '−' : '+'}
                                </span>
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-4">
                                    <p style={{ color: 'var(--color-text)' }}>
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;