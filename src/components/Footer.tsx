import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="py-16 px-4" style={{ backgroundColor: 'var(--color-text-dark)', color: 'var(--color-bg)' }}>
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4">Sir Sarcasm</h3>
                        <p className="mb-4 max-w-md" style={{ color: '#B0B0B0' }}>
                            Your AI companion who's witty, sarcastic, and unimpressed. 
                            Making conversations more interesting, one sassy response at a time.
                        </p>
                        <div className="flex space-x-4">
                            <button className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-75" 
                                    style={{ backgroundColor: 'var(--color-accent)' }}>
                                <span className="text-lg">📧</span>
                            </button>
                            <button className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-75" 
                                    style={{ backgroundColor: 'var(--color-accent)' }}>
                                <span className="text-lg">🐦</span>
                            </button>
                            <button className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-75" 
                                    style={{ backgroundColor: 'var(--color-accent)' }}>
                                <span className="text-lg">💼</span>
                            </button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2" style={{ color: '#B0B0B0' }}>
                            <li><a href="#features" className="hover:opacity-75 transition-opacity">Features</a></li>
                            <li><a href="#testimonials" className="hover:opacity-75 transition-opacity">Reviews</a></li>
                            <li><a href="#about" className="hover:opacity-75 transition-opacity">About</a></li>
                            <li><a href="#contact" className="hover:opacity-75 transition-opacity">Contact</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Support</h4>
                        <ul className="space-y-2" style={{ color: '#B0B0B0' }}>
                            <li><a href="#help" className="hover:opacity-75 transition-opacity">Help Center</a></li>
                            <li><a href="#faq" className="hover:opacity-75 transition-opacity">FAQ</a></li>
                            <li><a href="#privacy" className="hover:opacity-75 transition-opacity">Privacy Policy</a></li>
                            <li><a href="#terms" className="hover:opacity-75 transition-opacity">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center" 
                     style={{ borderColor: '#404040' }}>
                    <p style={{ color: '#B0B0B0' }}>
                        © 2024 Sir Sarcasm. All rights reserved. Built with attitude.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0" style={{ color: '#B0B0B0' }}>
                        <a href="#privacy" className="hover:opacity-75 transition-opacity">Privacy</a>
                        <a href="#terms" className="hover:opacity-75 transition-opacity">Terms</a>
                        <a href="#cookies" className="hover:opacity-75 transition-opacity">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;