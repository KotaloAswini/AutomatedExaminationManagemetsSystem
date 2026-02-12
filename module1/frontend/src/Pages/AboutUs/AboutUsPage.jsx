import { memo } from 'react';
import '../../Style/Pages/AboutUs.css';

function AboutUsPage() {
    return (
        <div className='page aboutus-page'>
            <div className='aboutus-content'>
                <div className='aboutus-section'>
                    {/* From the Developers */}
                        <div className='aboutus-developers-section'>
                            <h2>From the Developers</h2>
                            <p className='aboutus-developers-text'>
                                Exam scheduling is a time-consuming task that requires careful planning to avoid conflicts and ensure fairness. Managing timetables manually often leads to errors, overlapping schedules, and wasted effort. To simplify this process, we built the Exam Timetable Creator — a web application that helps institutions create, organize, and publish exam schedules quickly and efficiently. The system allows administrators to add subjects, set exam dates and times, detect scheduling conflicts, and share finalized timetables with students and staff. With features like PDF export and a simple interface, it makes exam management quick and easy.
                            </p>
                        </div>

                    {/* Features */}
                        <div className='aboutus-features-section'>
                            <h2>Features</h2>
                            <div className='aboutus-features-grid'>
                                <div className='aboutus-feature'>
                                    <div className='aboutus-feature-icon'>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                    </div>
                                    <div>
                                        <h3>Create & Manage</h3>
                                        <p>Easily create and edit exam timetables</p>
                                    </div>
                                </div>
                                <div className='aboutus-feature'>
                                    <div className='aboutus-feature-icon'>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                                    </div>
                                    <div>
                                        <h3>Publish & Share</h3>
                                        <p>Share timetables with students and staff</p>
                                    </div>
                                </div>
                                <div className='aboutus-feature'>
                                    <div className='aboutus-feature-icon'>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                    </div>
                                    <div>
                                        <h3>Export as PDF</h3>
                                        <p>Download timetables as PDF files</p>
                                    </div>
                                </div>
                                <div className='aboutus-feature'>
                                    <div className='aboutus-feature-icon'>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                                    </div>
                                    <div>
                                        <h3>Subject Management</h3>
                                        <p>Add and organize subjects and exams</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className='aboutus-tech-section'>
                            <h2>Tech Stack</h2>
                            <div className='aboutus-tech-grid'>
                                <div className='aboutus-tech-item react'>
                                    <span className='aboutus-tech-name'>React</span>
                                    <span className='aboutus-tech-desc'>Frontend UI</span>
                                </div>
                                <div className='aboutus-tech-item spring'>
                                    <span className='aboutus-tech-name'>Spring Boot</span>
                                    <span className='aboutus-tech-desc'>Backend API</span>
                                </div>
                                <div className='aboutus-tech-item mongo'>
                                    <span className='aboutus-tech-name'>MongoDB</span>
                                    <span className='aboutus-tech-desc'>Database</span>
                                </div>
                                <div className='aboutus-tech-item vite'>
                                    <span className='aboutus-tech-name'>Vite</span>
                                    <span className='aboutus-tech-desc'>Build Tool</span>
                                </div>
                            </div>
                        </div>

                    </div>
            </div>

            {/* Footer */}
            <div className='aboutus-footer'>
                <p>&copy; 2026 Exam Timetable Creator. All rights reserved.</p>
            </div>
        </div>
    );
}

export default memo(AboutUsPage);
