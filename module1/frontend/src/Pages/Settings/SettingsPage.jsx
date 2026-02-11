import { memo, useState, useEffect } from 'react';
import '../../Style/UnifiedPages.css';
import '../../Style/Pages/Settings.css';

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
        changeTheme(savedTheme);
    }, []);

    const handleThemeChange = (theme) => {
        setCurrentTheme(theme);
        changeTheme(theme);
    };

    return (
        <div className='page settings-page'>
            <div className='settings-container'>
                {/* Appearance Section */}
                <div className='settings-card appearance-card'>
                    <div className='card-header'>
                        <div className='card-header-icon'>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                        </div>
                        <div>
                            <h2>Appearance</h2>
                            <p className='card-desc'>Customize the look and feel</p>
                        </div>
                    </div>
                    <div className='theme-switcher'>
                        <button
                            className={`theme-btn ${currentTheme === 'Light' ? 'active' : ''}`}
                            onClick={() => handleThemeChange('Light')}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="4" />
                                <path d="M12 2v2" />
                                <path d="M12 20v2" />
                                <path d="m4.93 4.93 1.41 1.41" />
                                <path d="m17.66 17.66 1.41 1.41" />
                                <path d="M2 12h2" />
                                <path d="M20 12h2" />
                                <path d="m6.34 17.66-1.41 1.41" />
                                <path d="m19.07 4.93-1.41 1.41" />
                            </svg>
                            <span>Light</span>
                        </button>
                        <button
                            className={`theme-btn ${currentTheme === 'Dark' ? 'active' : ''}`}
                            onClick={() => handleThemeChange('Dark')}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                <circle cx="18" cy="5" r="1" fill="currentColor" stroke="none" />
                                <circle cx="20" cy="9" r="0.5" fill="currentColor" stroke="none" />
                            </svg>
                            <span>Dark</span>
                        </button>
                        <button
                            className={`theme-btn ${currentTheme === 'System' ? 'active' : ''}`}
                            onClick={() => handleThemeChange('System')}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2" />
                                <path d="M8 21h8" />
                                <path d="M12 17v4" />
                                <path d="m7 10 2 2 4-4" />
                            </svg>
                            <span>System</span>
                        </button>
                    </div>
                    <p className='theme-hint'>
                        {currentTheme === 'System'
                            ? '🖥️ Following your device\'s system preference'
                            : currentTheme === 'Dark'
                                ? '🌙 Dark mode is active'
                                : '☀️ Light mode is active'}
                    </p>
                </div>

                {/* Contributors Section */}
                <div className='settings-card contributors-card'>
                    <div className='card-header'>
                        <div className='card-header-icon contributors-icon'>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <div>
                            <h2>Contributors</h2>
                            <p className='card-desc'>Meet the team behind this project</p>
                        </div>
                    </div>

                    <div className='contributors-grid'>
                        {/* Contributor 1 */}
                        <div className='contributor-card'>
                            <div className='contributor-avatar'>
                                <span className='avatar-text'>LM</span>
                            </div>
                            <div className='contributor-info'>
                                <h3>Lalan Mahato</h3>
                                <span className='contributor-role'>Full Stack Developer</span>
                            </div>
                            <div className='contributor-contact'>
                                <a href="mailto:imlalan7@gmail.com" className='contact-chip'>
                                    <svg className='icon-svg' width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                    <span>imlalan7@gmail.com</span>
                                </a>
                            </div>
                            <div className='contributor-socials'>
                                <a href="https://github.com/lalankumar17" target="_blank" rel="noopener noreferrer" title="GitHub" className='social-btn github'>
                                    <svg viewBox="0 0 24 24" width="18" height="18">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    <span>GitHub</span>
                                </a>
                                <a href="https://www.linkedin.com/in/lalankumar17/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className='social-btn linkedin'>
                                    <svg viewBox="0 0 24 24" width="18" height="18">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    <span>LinkedIn</span>
                                </a>
                            </div>
                        </div>

                        {/* Contributor 2 */}
                        <div className='contributor-card'>
                            <div className='contributor-avatar avatar-alt'>
                                <span className='avatar-text'>KA</span>
                            </div>
                            <div className='contributor-info'>
                                <h3>K. Aswini</h3>
                                <span className='contributor-role'>Full Stack Developer</span>
                            </div>
                            <div className='contributor-contact'>
                                <a href="mailto:kotaloaswini@gmail.com" className='contact-chip'>
                                    <svg className='icon-svg' width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                    <span>kotaloaswini@gmail.com</span>
                                </a>
                            </div>
                            <div className='contributor-socials'>
                                <a href="https://github.com/KotaloAswini" target="_blank" rel="noopener noreferrer" title="GitHub" className='social-btn github'>
                                    <svg viewBox="0 0 24 24" width="18" height="18">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    <span>GitHub</span>
                                </a>
                                <a href="https://www.linkedin.com/in/kotaloaswini/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className='social-btn linkedin'>
                                    <svg viewBox="0 0 24 24" width="18" height="18">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    <span>LinkedIn</span>
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
