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
                                <div className='aboutus-tech-logo'>
                                    <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
                                        <path d="M28.546 3.154C26.953 5.86 24.546 8 21.6 9.23c-.246.1-.507.19-.77.27A15.89 15.89 0 0 0 16 8a15.89 15.89 0 0 0-4.83 1.5c-.263-.08-.524-.17-.77-.27C7.454 8 5.047 5.86 3.454 3.154 1.34 6.57 0 10.6 0 15c0 2.58.46 5.05 1.3 7.34.24-.13.49-.25.75-.36C4.86 20.68 8.24 20 12 20c1.36 0 2.68.08 3.94.24a16.09 16.09 0 0 1 .06-8.48c.38-1.34.94-2.58 1.64-3.7A11.88 11.88 0 0 1 22 4.58c.58-.7 1.08-1.48 1.48-2.32.27.28.52.57.76.88zM16 32c5.14 0 9.72-2.42 12.65-6.19-.37-.14-.76-.26-1.16-.37C24.75 24.5 20.54 24 16 24s-8.75.5-11.49 1.44c-.4.11-.79.23-1.16.37C6.28 29.58 10.86 32 16 32z" />
                                        <path d="M5.2 10.86C7.5 12.2 10.47 13 14 13c.68 0 1.35-.03 2-.08-.56 1.7-.88 3.5-.94 5.38C14.36 18.1 13.64 18 12.88 18 8.7 18 5.1 19.17 2.56 21c.8 1.97 1.91 3.76 3.3 5.3C8.2 24.87 11.64 24 16 24c4.36 0 7.8.87 10.14 2.3a15.87 15.87 0 0 0 3.3-5.3C26.9 19.17 23.3 18 19.12 18c-.2 0-.4 0-.6.01.04-1.44.24-2.83.59-4.15.47-1.76 1.2-3.3 2.16-4.56a12.1 12.1 0 0 0 3.82-3.14A15.93 15.93 0 0 0 16 0 15.93 15.93 0 0 0 6.91 6.16 12.1 12.1 0 0 0 5.2 10.86z" opacity="0" />
                                        <path d="M27.3 4.88c-.4.84-.9 1.62-1.48 2.32A11.88 11.88 0 0 0 21.64 8.06a13.9 13.9 0 0 0-1.64 3.7 16.09 16.09 0 0 0-.06 8.48c.76.1 1.54.16 2.34.2C25.66 20.67 28 18.07 28 15c0-.34-.02-.68-.06-1h2.02c.03.33.04.66.04 1 0 8.84-7.16 16-16 16S-2 23.84-2 15 5.16-1 14-1c1.46 0 2.88.2 4.22.56A16.03 16.03 0 0 1 27.3 4.88z" opacity="0" />
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
                <p>&copy; Developer Website by <span className='aboutus-footer-name'>CSE Students</span></p>
                <p className='aboutus-footer-tagline'>Built with passion for innovation and excellence.</p>
            </div>
        </div>
    );
}

export default memo(AboutUsPage);
