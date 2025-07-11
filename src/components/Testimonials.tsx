import React from 'react';

const Testimonials: React.FC = () => {
    const testimonials = [
        {
            name: 'Alex Thompson',
            avatar: '👨‍💻',
            rating: 5,
            text: 'Finally, an AI that gets my sense of humor! Sir Sarcasm keeps me entertained while actually being helpful.',
            role: 'Software Developer'
        },
        {
            name: 'Sarah Chen',
            avatar: '👩‍🎨',
            rating: 5,
            text: 'I never thought I\'d enjoy talking to a chatbot this much. The responses are clever and surprisingly insightful.',
            role: 'Creative Director'
        },
        {
            name: 'Mike Rodriguez',
            avatar: '👨‍🏫',
            rating: 4,
            text: 'Best chatbot experience I\'ve had. It\'s like having a witty friend who actually knows things.',
            role: 'Teacher'
        }
    ];

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ color: i < rating ? 'var(--color-accent)' : '#E5E5E5' }}>
                ★
            </span>
        ));
    };

    return (
        <section id="testimonials" className="py-20 px-4" style={{ backgroundColor: 'var(--color-primary-light)' }}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-dark)' }}>
                        What People Are Saying
                    </h2>
                    <p className="text-xl" style={{ color: 'var(--color-text)' }}>
                        Don't just take our word for it. Here's what our users think:
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} 
                             className="p-8 rounded-2xl shadow-lg transform transition-all hover:scale-105"
                             style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                            <div className="flex items-center mb-6">
                                <div className="text-3xl mr-4">{testimonial.avatar}</div>
                                <div>
                                    <h4 className="font-semibold text-lg" style={{ color: 'var(--color-text-dark)' }}>
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex mb-4">
                                {renderStars(testimonial.rating)}
                            </div>
                            
                            <p className="italic" style={{ color: 'var(--color-text)' }}>
                                "{testimonial.text}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;