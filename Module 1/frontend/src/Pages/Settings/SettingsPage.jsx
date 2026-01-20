import { memo, useState, useEffect } from 'react';
import '../../Style/UnifiedPages.css';
import '../../Style/Pages/Settings.css';
import Moon from '../../Icons/Moon';
import User from '../../Icons/User';
import Mail from '../../Icons/Mail';

// Function to handle global theme changes
export function changeTheme(theme) {
    if (theme === 'Dark') {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    } else if (theme === 'Light') {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
    } else if (theme === 'System') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.body.classList.add('dark');
            document.body.classList.remove('light');
        } else {
            document.body.classList.add('light');
            document.body.classList.remove('dark');
        }
    }
    localStorage.setItem('theme', theme);
}

function SettingsPage() {
    const [currentTheme, setCurrentTheme] = useState('Light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'Light';
        setCurrentTheme(savedTheme);
        // Apply the saved theme on mount
        changeTheme(savedTheme);
    }, []);

    const handleThemeChange = (theme) => {
        setCurrentTheme(theme);
        changeTheme(theme);
    };

    return (
        <div className='page settings-page'>
            <div className='settings-container'>
                <div className='settings-section theme-section'>
                    <h2><Moon /> Dark mode</h2>
                    <div className='theme-list'>
                        <div 
                            className='theme-option' 
                            onClick={() => handleThemeChange('Dark')}
                        >
                            <span>On</span>
                            <div className={`radio-outer ${currentTheme === 'Dark' ? 'selected' : ''}`}>
                                <div className='radio-inner'></div>
                            </div>
                        </div>
                        <div 
                            className='theme-option' 
                            onClick={() => handleThemeChange('Light')}
                        >
                            <span>Off</span>
                            <div className={`radio-outer ${currentTheme === 'Light' ? 'selected' : ''}`}>
                                <div className='radio-inner'></div>
                            </div>
                        </div>
                        <div 
                            className='theme-option' 
                            onClick={() => handleThemeChange('System')}
                        >
                            <div className='option-text'>
                                <span>Use system settings</span>
                                <p>We'll adjust your appearance based on your device's system settings.</p>
                            </div>
                            <div className={`radio-outer ${currentTheme === 'System' ? 'selected' : ''}`}>
                                <div className='radio-inner'></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='settings-section contributors-section'>
                    <h2>Contributors</h2>
                    
                    <div className='contributor-card'>
                        <h3>Get in Touch</h3>
                        <div className='contributor-details'>
                            <div className='detail-item'>
                                <User className='icon-svg' />
                                <div>
                                    <strong>Name:</strong> Lalan Mahato
                                </div>
                            </div>
                            <div className='detail-item'>
                                <Mail className='icon-svg' />
                                <div>
                                    <strong>Email:</strong> <a href="mailto:imlalan7@gmail.com">imlalan7@gmail.com</a>
                                </div>
                            </div>
                        </div>
                        <div className='social-links'>
                            <h4>Let's Connect!</h4>
                            <div className='social-icons'>
                                <a href="https://github.com/lalankumar17" target="_blank" rel="noopener noreferrer" title="GitHub">
                                    <svg viewBox="0 0 24 24" width="24" height="24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/in/lalankumar17/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                                    <svg viewBox="0 0 24 24" width="24" height="24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className='contributor-card'>
                        <h3>Get in Touch</h3>
                        <div className='contributor-details'>
                            <div className='detail-item'>
                                <User className='icon-svg' />
                                <div>
                                    <strong>Name:</strong> K. Aswini
                                </div>
                            </div>
                            <div className='detail-item'>
                                <Mail className='icon-svg' />
                                <div>
                                    <strong>Email:</strong> <a href="mailto:kotaloaswini@gmail.com">kotaloaswini@gmail.com</a>
                                </div>
                            </div>
                        </div>
                        <div className='social-links'>
                            <h4>Let's Connect!</h4>
                            <div className='social-icons'>
                                <a href="https://github.com/KotaloAswini" target="_blank" rel="noopener noreferrer" title="GitHub">
                                    <svg viewBox="0 0 24 24" width="24" height="24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/in/kotaloaswini/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                                    <svg viewBox="0 0 24 24" width="24" height="24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(SettingsPage);
