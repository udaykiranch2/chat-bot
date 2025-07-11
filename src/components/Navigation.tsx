import React from 'react';

const Navigation: React.FC = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b" 
             style={{ 
                 backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                 borderColor: 'var(--color-border)' 
             }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="text-2xl font-bold" style={{ color: 'var(--color-text-dark)' }}>
                            Sir Sarcasm
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a href="#features" className="hover:opacity-75 transition-opacity" 
                               style={{ color: 'var(--color-text)' }}>
                                Features
                            </a>
                            <a href="#about" className="hover:opacity-75 transition-opacity" 
                               style={{ color: 'var(--color-text)' }}>
                                About
                            </a>
                            <a href="#testimonials" className="hover:opacity-75 transition-opacity" 
                               style={{ color: 'var(--color-text)' }}>
                                Reviews
                            </a>
                            <a href="#faq" className="hover:opacity-75 transition-opacity" 
                               style={{ color: 'var(--color-text)' }}>
                                FAQ
                            </a>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button className="px-6 py-2 rounded-full font-medium transition-all hover:shadow-lg" 
                            style={{ 
                                backgroundColor: 'var(--color-accent)', 
                                color: 'var(--color-text-dark)' 
                            }}>
                        Try Now
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;