import { memo, useEffect, useState } from 'react';
import '../../Style/UnifiedPages.css';
import '../../Style/Pages/Dashboard.css';
import { getSubjectsDetailsList } from '../../Script/SubjectsDataFetcher';
import { getExamStatus, getExams } from '../../Script/ExamDataFetcher';
import { getHealthStatus } from '../../Script/HealthFetcher';
import { Link } from 'react-router-dom';
import Calendar from '../../Icons/Calendar';
import Eye from '../../Icons/Eye';
import SettingIcon from '../../Icons/Setting';
import BookStackIcon from '../../Icons/BookStackIcon';
import ExamPaperIcon from '../../Icons/ExamPaperIcon';
import DraftsDashedIcon from '../../Icons/DraftsDashedIcon';
import CheckCircleIcon from '../../Icons/CheckCircleIcon';

function DashboardPage() {
    const [subjectCount, setSubjectCount] = useState(0);
    const [examStatus, setExamStatus] = useState({ total: 0, published: 0, draft: 0 });
    const [recentExams, setRecentExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [health, setHealth] = useState({ backend: 'Loading...', db: 'Loading...' });

    const [semesterDistribution, setSemesterDistribution] = useState({});

    useEffect(() => {
        loadData();
    }, []);

    // Periodic Health Check (every 30 seconds)
    useEffect(() => {
        const checkHealth = async () => {
            const healthStatus = await getHealthStatus();
            setHealth(healthStatus);
        };

        const interval = setInterval(checkHealth, 30000);
        return () => clearInterval(interval);
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            getSubjectsDetailsList((data) => {
                setSubjectCount(Object.keys(data).length);
            });
            const status = await getExamStatus();
            setExamStatus(status);
            const exams = await getExams();
            // Sort by ID to show most recently created exams first
            const sortedByCreation = [...exams].sort((a, b) => {
                if (a.id > b.id) return -1;
                if (a.id < b.id) return 1;
                return 0;
            });
            setRecentExams(sortedByCreation.slice(0, 5));

            const healthStatus = await getHealthStatus();
            setHealth(healthStatus);

            // Calculate Semester Distribution for Insights
            const dist = {};
            exams.forEach(exam => {
                const sem = `SEM ${exam.semester}`;
                dist[sem] = (dist[sem] || 0) + 1;
            });
            setSemesterDistribution(dist);
        } catch (error) {
            console.error('Error loading dashboard:', error);
        }
        setLoading(false);
    };

    return (
        <div className='dashboard-container compact-mode'>

            {/* Top Row: Welcome & Stats */}
            <div className='top-section'>
                <div className='welcome-card'>
                    <div className='welcome-header'>
                        <h1>Welcome, Coordinator</h1>
                        <p>Manage curriculum & exams.</p>
                    </div>
                    <Link to="/ExamTimetable" className='btn-light btn-sm'>+ New Schedule</Link>
                </div>

                <div className='mini-stats'>
                    <div className='mini-stat-item'>
                        <span className='icon-black'><BookStackIcon size={28} /></span>
                        <div>
                            <strong>{subjectCount}</strong>
                            <small>Subjects</small>
                        </div>
                    </div>
                    <div className='mini-stat-item'>
                        <span className='icon-purple'><ExamPaperIcon size={28} /></span>
                        <div>
                            <strong>{examStatus.total}</strong>
                            <small>Exams</small>
                        </div>
                    </div>
                    <div className='mini-stat-item'>
                        <span className='icon-orange'><DraftsDashedIcon size={28} /></span>
                        <div>
                            <strong>{examStatus.draft}</strong>
                            <small>Drafts</small>
                        </div>
                    </div>
                    <div className='mini-stat-item'>
                        <span className='icon-green'><CheckCircleIcon size={28} /></span>
                        <div>
                            <strong>{examStatus.published}</strong>
                            <small>Published</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Row: Workflow Pipeline */}
            <div className='middle-section'>
                <div className='pipeline-card'>
                    <div className='pipeline-header'>
                        <span className='pipeline-tag'>PIPELINE</span>
                    </div>
                    <div className='pipeline-steps'>
                        <div className={`pipe-step ${subjectCount > 0 ? 'passed' : 'pending'}`}>
                            <div className='pipe-indicator'></div>
                            <div className='pipe-info'>
                                <span className='pipe-name'>subjects</span>
                                <span className='pipe-meta'>{subjectCount > 0 ? `${subjectCount} loaded` : 'awaiting...'}</span>
                            </div>
                        </div>
                        <div className='pipe-arrow'>
                            <svg width="20" height="10" viewBox="0 0 20 10"><path d="M0 5h16M12 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <div className={`pipe-step ${examStatus.total > 0 ? 'passed' : 'pending'}`}>
                            <div className='pipe-indicator'></div>
                            <div className='pipe-info'>
                                <span className='pipe-name'>draft</span>
                                <span className='pipe-meta'>{examStatus.total > 0 ? `${examStatus.draft} scheduled` : 'awaiting...'}</span>
                            </div>
                        </div>
                        <div className='pipe-arrow'>
                            <svg width="20" height="10" viewBox="0 0 20 10"><path d="M0 5h16M12 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <div className={`pipe-step ${examStatus.published > 0 ? 'passed' : 'pending'}`}>
                            <div className='pipe-indicator'></div>
                            <div className='pipe-info'>
                                <span className='pipe-name'>publish</span>
                                <span className='pipe-meta'>{examStatus.published > 0 ? `${examStatus.published} live` : 'awaiting...'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row: 3 Columns */}
            <div className='bottom-section-grid'>

                {/* Col 1: Quick Actions */}
                <div className='dashboard-col'>
                    <div className='panel-header-sm'>Quick Actions</div>
                    <div className='compact-actions'>
                        <Link to="/ExamTimetable" className='action-btn'>
                            <Calendar /> Schedule Exam
                        </Link>
                        <Link to="/ViewTimetable" className='action-btn'>
                            <Eye /> View Timetables
                        </Link>
                        <Link to="/Settings" className='action-btn'>
                            <SettingIcon /> Settings
                        </Link>
                    </div>
                    {/* System Status ( moved here to save space) */}
                    <div className='compact-status-box'>
                        <div className='status-row'>
                            <span className={`dot ${(health.backend || 'Disconnected') === 'OK' ? 'success' : 'error'}`}></span> Backend: {health.backend || 'Disconnected'}
                        </div>
                        <div className='status-row'>
                            <span className={`dot ${(health.db || 'Disconnected') === 'Connected' ? 'success' : 'error'}`}></span> DB: {health.db || 'Disconnected'}
                        </div>
                    </div>
                </div>

                {/* Col 2: Recent Activity (Wider) */}
                <div className='dashboard-col wide'>
                    <div className='panel-header-sm'>
                        Recent Activity <Link to="/ViewTimetable" className='link-xs'>View All</Link>
                    </div>
                    <div className='compact-table-container'>
                        {loading ? (
                            <div className='loading-xs'>Loading...</div>
                        ) : recentExams.length === 0 ? (
                            <div className='empty-xs'>No recent exams found.</div>
                        ) : (
                            <table className='compact-table rich-activity-table'>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Course</th>
                                        <th>Sem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentExams.slice(0, 4).map((exam) => (
                                        <tr key={exam.id}>
                                            <td className='date-cell'>
                                                <div className='date-box'>
                                                    <span className='date-month'>{new Date(exam.examDate).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</span>
                                                    <span className='date-day'>{new Date(exam.examDate).getDate()}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='course-row'>
                                                    <div className='course-meta'>
                                                        <div className='course-name-text' title={exam.courseName}>{exam.courseName}</div>
                                                        <div className='course-id-text'>Dept: <span className='dept-badge'>{exam.department || 'CSE'}</span></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className='badge-pill-light'>SEM {exam.semester}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Col 3: Insights */}
                <div className='dashboard-col'>
                    <div className='panel-header-sm'>Insights</div>
                    <div className='insights-panel'>
                        <div className='insights-titlebar'>
                            <div className='insights-tab active'>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                                Semester Distribution
                            </div>
                        </div>
                        {Object.keys(semesterDistribution).length === 0 ? (
                            <div className='insights-content'>
                                <div className='insights-no-data'>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                    <span>No exam data yet</span>
                                </div>
                            </div>
                        ) : (
                            <div className='insights-content'>
                                <div className='insights-metrics-list'>
                                    {Object.entries(semesterDistribution)
                                        .sort(([, a], [, b]) => b - a)
                                        .slice(0, 6)
                                        .map(([sem, count], i) => {
                                            const pct = Math.round((count / examStatus.total) * 100);
                                            const maxCount = Math.max(...Object.values(semesterDistribution));
                                            const barWidth = Math.round((count / maxCount) * 100);
                                            return (
                                                <div key={sem} className='insight-metric' style={{ animationDelay: `${i * 0.06}s` }}>
                                                    <div className='metric-rank'>{i + 1}</div>
                                                    <div className='metric-body'>
                                                        <div className='metric-header'>
                                                            <span className='metric-name'>{sem}</span>
                                                            <span className='metric-numbers'>
                                                                <span className='metric-count'>{count}</span>
                                                                <span className='metric-pct'>{pct}%</span>
                                                            </span>
                                                        </div>
                                                        <div className='metric-bar-bg'>
                                                            <div className={`metric-bar-fill bar-rank-${i}`} style={{ width: `${barWidth}%` }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default memo(DashboardPage);
