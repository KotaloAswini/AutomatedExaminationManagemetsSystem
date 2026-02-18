import { memo } from 'react';
import '../../Style/Pages/AboutUs.css';
import Github from '../../Icons/Github';
import Linkedin from '../../Icons/Linkedin';

function AboutUsPage() {
    return (
        <div className='page aboutus-page'>
            <div className='aboutus-content'>

                {/* Hero Section */}
                <div className='aboutus-hero'>
                    <div className='aboutus-hero-badge'>ABOUT AEMS</div>
                    <h1 className='aboutus-hero-title'>
                        Automated Examination<br />
                        <span className='aboutus-hero-highlight'>Management System</span>
                    </h1>
                    <p className='aboutus-hero-subtitle'>
                        A modern web application that helps institutions create, organize, and publish exam schedules quickly and efficiently.
                    </p>
                </div>

                <div className='aboutus-section'>

                    {/* Mission Card */}
                    <div className='aboutus-mission-card'>
                        <div className='aboutus-mission-icon'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <div className='aboutus-mission-content'>
                            <h2>From the Developers</h2>
                            <p>
                                Exam scheduling is a time-consuming task that demands careful planning to avoid conflicts and ensure fairness. Managing timetables manually often leads to errors, overlapping schedules, and wasted effort.
                            </p>
                            <p>
                                To simplify this process, we built the <strong>AEMS</strong> — enabling administrators to add subjects, set exam dates and times, detect scheduling conflicts, and share finalized timetables with students and staff.
                            </p>
                        </div>
                    </div>

                    {/* Features */}
                    <div className='aboutus-features-section'>
                        <div className='aboutus-section-header'>
                            <h2>Core Features</h2>
                            <div className='aboutus-section-line'></div>
                        </div>
                        <div className='aboutus-features-grid'>
                            <div className='aboutus-feature' data-accent='blue'>
                                <div className='aboutus-feature-icon'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                </div>
                                <h3>Create & Manage</h3>
                                <p>Easily create and edit exam timetables with an intuitive interface</p>
                            </div>
                            <div className='aboutus-feature' data-accent='green'>
                                <div className='aboutus-feature-icon'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                                </div>
                                <h3>Publish & Share</h3>
                                <p>Share finalized timetables with students and staff instantly</p>
                            </div>
                            <div className='aboutus-feature' data-accent='purple'>
                                <div className='aboutus-feature-icon'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                </div>
                                <h3>Export as PDF</h3>
                                <p>Download and distribute timetables as professional PDF files</p>
                            </div>
                            <div className='aboutus-feature' data-accent='orange'>
                                <div className='aboutus-feature-icon'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                                </div>
                                <h3>Subject Management</h3>
                                <p>Organize subjects, semesters, and exam configurations easily</p>
                            </div>
                        </div>
                    </div>

                    {/* Contributors Section */}
                    <div className='contributors-section'>
                        <div className='contributors-card-container'>
                            <div className='contributors-header'>
                                <div className='contributors-icon-box'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                </div>
                                <div className='contributors-title-web'>
                                    <h2>Contributors</h2>
                                    <p>Meet the team behind this project</p>
                                </div>
                            </div>
                            <div className='contributors-grid'>
                                {/* Developer 1 */}
                                <div className='developer-card'>
                                    <div className='dev-avatar-wrapper'>
                                        <div className='dev-avatar gradient-blue'>LM</div>
                                    </div>
                                    <h3 className='dev-name'>Lalan Mahato</h3>
                                    <div className='dev-role'>FULL STACK DEVELOPER</div>
                                    <a href="mailto:imlalan7@gmail.com" className='dev-email'>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                        imlalan7@gmail.com
                                    </a>
                                    <div className='dev-socials'>
                                        <a href="https://github.com/lalankumar17" target="_blank" rel="noopener noreferrer" className='dev-social-link'>
                                            <Github width={18} height={18} />
                                            GitHub
                                        </a>
                                        <a href="https://www.linkedin.com/in/lalankumar17/" target="_blank" rel="noopener noreferrer" className='dev-social-link'>
                                            <Linkedin width={18} height={18} />
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>

                                {/* Developer 2 */}
                                <div className='developer-card'>
                                    <div className='dev-avatar-wrapper'>
                                        <div className='dev-avatar gradient-orange'>KA</div>
                                    </div>
                                    <h3 className='dev-name'>K. Aswini</h3>
                                    <div className='dev-role'>FULL STACK DEVELOPER</div>
                                    <a href="mailto:kotaloaswini@gmail.com" className='dev-email'>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                        kotaloaswini@gmail.com
                                    </a>
                                    <div className='dev-socials'>
                                        <a href="https://github.com/KotaloAswini" target="_blank" rel="noopener noreferrer" className='dev-social-link'>
                                            <Github width={18} height={18} />
                                            GitHub
                                        </a>
                                        <a href="https://www.linkedin.com/in/kotaloaswini/" target="_blank" rel="noopener noreferrer" className='dev-social-link'>
                                            <Linkedin width={18} height={18} />
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className='aboutus-tech-section'>
                        <div className='aboutus-section-header'>
                            <h2>Built With</h2>
                            <div className='aboutus-section-line'></div>
                        </div>
                        <div className='aboutus-tech-grid'>
                            <div className='aboutus-tech-item react'>
                                <div className='aboutus-tech-logo'>
                                    <svg viewBox="-11.5 -10.23 23 20.46" width="28" height="28">
                                        <circle r="2.05" fill="currentColor" />
                                        <g stroke="currentColor" strokeWidth="1" fill="none">
                                            <ellipse rx="11" ry="4.2" />
                                            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                                            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                                        </g>
                                    </svg>
                                </div>
                                <span className='aboutus-tech-name'>React</span>
                                <span className='aboutus-tech-desc'>Frontend UI</span>
                            </div>
                            <div className='aboutus-tech-item spring'>
                                <div className="aboutus-tech-logo">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="28" height="28">
                                        <path fill="#6db33f" d="M116.2 25.6L68.8 3.2c-2.9-1.4-6.2-1.4-9.1 0L11.8 25.6C7.5 27.6 5 32 5 36.8v46.1c0 4.8 2.5 9.2 6.8 11.2l47.9 22.4c1.3.6 2.8 1 4.3 1 1.5 0 2.9-.3 4.3-1l47.9-22.4c4.3-2 6.8-6.4 6.8-11.2V36.8c0-4.8-2.6-9.2-6.8-11.2z" />
                                        <path fill="#fff" d="M64 35.8c-2.7 0-4.9 2.2-4.9 4.9v23.6c0 2.7 2.2 4.9 4.9 4.9s4.9-2.2 4.9-4.9V40.7c0-2.7-2.1-4.9-4.9-4.9z" />
                                        <path fill="#fff" d="M64 92.4C48.8 92.4 36.4 80 36.4 64.9c0-8.6 4-16.2 10.3-21.3 2.1-1.7 5.2-1.4 6.9.7 1.7 2.1 1.4 5.2-.7 6.9-4.3 3.5-7 8.7-7 14.6 0 10.4 8.5 18.9 18.9 18.9 10.4 0 18.9-8.5 18.9-18.9 0-5.9-2.7-11.1-7-14.6-2.1-1.7-2.4-4.8-.7-6.9 1.7-2.1 4.8-2.4 6.9-.7 6.3 5.1 10.3 12.7 10.3 21.3.1 15.1-12.3 27.4-27.5 27.4z" />
                                    </svg>
                                </div>
                                <span className='aboutus-tech-name'>Spring Boot</span>
                                <span className='aboutus-tech-desc'>Backend API</span>
                            </div>
                            <div className='aboutus-tech-item mongo'>
                                <div className='aboutus-tech-logo'>
                                    <svg viewBox="0 0 256 549" width="20" height="28" fill="currentColor">
                                        <path d="M175.622 61.108C152.612 33.807 132.797 6.078 128.749.32a1.03 1.03 0 0 0-1.492 0c-4.048 5.759-23.863 33.487-46.874 60.788-197.507 251.896 31.108 421.89 31.108 421.89l1.917 1.28c1.172 26.14 5.21 60.842 5.21 60.842h8.874s4.037-34.702 5.21-60.842l1.917-1.28s228.614-169.994 31.003-421.89" />
                                        <path d="M136.53 468.505s-10.257-5.04-12.6-8.44l12.174-532.66h1.572l11.323 532.66c-2.556 3.826-12.47 8.44-12.47 8.44" fill="rgba(255,255,255,0.2)" />
                                    </svg>
                                </div>
                                <span className='aboutus-tech-name'>MongoDB</span>
                                <span className='aboutus-tech-desc'>Database</span>
                            </div>
                            <div className='aboutus-tech-item vite'>
                                <div className='aboutus-tech-logo'>
                                    <svg viewBox="0 0 410 404" width="28" height="28" fill="none">
                                        <path d="M399.641 59.525L215.643 388.545c-3.816 6.832-13.678 6.978-17.691.262L7.028 59.525c-4.431-7.418 2.348-16.225 10.664-13.736L205 99.528l187.308-53.74c8.316-2.489 15.095 6.319 10.664 13.737z" fill="url(#a)" />
                                        <path d="M292.965 1.472L156.801 28.791c-2.65.532-4.602 2.835-4.697 5.539l-7.105 202.229c-.136 3.864 3.554 6.728 7.214 5.6l37.18-11.46c4.003-1.233 7.904 2.054 7.26 6.123l-10.663 67.363c-.71 4.489 3.93 7.795 7.82 5.566l24.241-13.888c3.876-2.22 8.499.98 7.84 5.422l-16.976 114.585c-1.013 6.839 8.093 10.098 11.49 4.113l2.269-3.995L375.055 94.27c2.262-4.394-1.86-9.262-6.604-7.803l-38.622 11.882c-4.24 1.303-8.136-2.598-7.148-7.156l18.898-85.472c.987-4.546-2.9-8.466-7.148-7.164z" fill="url(#b)" />
                                        <defs><linearGradient id="a" x1="6.7" y1="32.8" x2="235" y2="344" gradientUnits="userSpaceOnUse"><stop stopColor="#41D1FF" /><stop offset="1" stopColor="#BD34FE" /></linearGradient><linearGradient id="b" x1="194.7" y1="8.8" x2="236.1" y2="293" gradientUnits="userSpaceOnUse"><stop stopColor="#FFBD4F" /><stop offset="1" stopColor="#FF9640" /></linearGradient></defs>
                                    </svg>
                                </div>
                                <span className='aboutus-tech-name'>Vite</span>
                                <span className='aboutus-tech-desc'>Build Tool</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <div className='aboutus-footer'>
                <p>&copy; 2026 Nitte, Bangalore | Site by <span className='aboutus-footer-name chillipages-brand'>CSE Students</span></p>
            </div>
        </div>
    );
}

export default memo(AboutUsPage);
