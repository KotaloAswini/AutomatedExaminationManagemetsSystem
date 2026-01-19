import { memo, useEffect, useState } from 'react';
import '../../Style/UnifiedPages.css';
import '../../Style/Pages/Dashboard.css';
import { getSubjectsDetailsList, SubjectsDetailsList } from '../../Script/SubjectsDataFetcher';
import { getExamStatus, getExams, Exam } from '../../Script/ExamDataFetcher';
import { getHealthStatus, HealthStatus } from '../../Script/HealthFetcher';
import { Link } from 'react-router-dom';
import Calendar from '../../Icons/Calendar';
import Eye from '../../Icons/Eye';
import SettingIcon from '../../Icons/Setting';
import SubjectsIcon from '../../Icons/SubjectsIcon';
import DraftIcon from '../../Icons/DraftIcon';
import PublishIcon from '../../Icons/PublishIcon';

function DashboardPage() {
    const [subjectCount, setSubjectCount] = useState(0);
    const [examStatus, setExamStatus] = useState({ total: 0, published: 0, draft: 0 });
    const [recentExams, setRecentExams] = useState<Exam[]>([]);
    const [loading, setLoading] = useState(true);
    const [health, setHealth] = useState<HealthStatus>({ backend: 'Loading...', db: 'Loading...' });

    const [semesterDistribution, setSemesterDistribution] = useState<{ [key: string]: number }>({});

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
            getSubjectsDetailsList((data: SubjectsDetailsList) => {
                setSubjectCount(Object.keys(data).length);
            });
            const status = await getExamStatus();
            setExamStatus(status);
            const exams = await getExams();
            setRecentExams(exams.slice(0, 5));

            const healthStatus = await getHealthStatus();
            setHealth(healthStatus);

            // Calculate Semester Distribution for Insights
            const dist: { [key: string]: number } = {};
            exams.forEach(exam => {
                const sem = `Sem ${exam.semester}`;
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
                        <span className='icon-blue'>📚</span>
                        <div>
                            <strong>{subjectCount}</strong>
                            <small>Subjects</small>
                        </div>
                    </div>
                    <div className='mini-stat-item'>
                        <span className='icon-purple'>📝</span>
                        <div>
                            <strong>{examStatus.total}</strong>
                            <small>Exams</small>
                        </div>
                    </div>
                    <div className='mini-stat-item'>
                        <span className='icon-orange'>⏳</span>
                        <div>
                            <strong>{examStatus.draft}</strong>
                            <small>Drafts</small>
                        </div>
                    </div>
                    <div className='mini-stat-item'>
                        <span className='icon-green'>✅</span>
                        <div>
                            <strong>{examStatus.published}</strong>
                            <small>Published</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Row: Workflow */}
            <div className='middle-section'>
                <div className='workflow-compact-card'>
                    <div className='workflow-steps compact'>
                        <div className={`step-item ${subjectCount > 0 ? 'completed' : ''}`}>
                            <div className='step-icon-custom'><SubjectsIcon size={24} /></div>
                            <span className='step-label'>Subjects</span>
                        </div>
                        <div className='step-connector'></div>
                        <div className={`step-item ${examStatus.total > 0 ? 'completed' : ''}`}>
                            <div className='step-icon-custom'><DraftIcon size={24} /></div>
                            <span className='step-label'>Create Draft</span>
                        </div>
                        <div className='step-connector'></div>
                        <div className={`step-item ${examStatus.published > 0 ? 'completed' : ''}`}>
                            <div className='step-icon-custom'><PublishIcon size={24} /></div>
                            <span className='step-label'>Publish</span>
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
                                        <th>Status</th>
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
                                                        <div className='course-id-text'>Dept: {exam.department || 'General'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className='badge-pill-light'>Sem {exam.semester}</span></td>
                                            <td>
                                                <span className={`status-pill ${exam.status.toLowerCase()}`}>
                                                    {exam.status.charAt(0) + exam.status.slice(1).toLowerCase()}
                                                </span>
                                            </td>
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
                    <div className='compact-widget'>
                        {Object.keys(semesterDistribution).length === 0 ? (
                            <p className='text-muted-xs'>No data.</p>
                        ) : (
                            <div className='compact-dist-list'>
                                {Object.entries(semesterDistribution).slice(0, 4).map(([sem, count]) => (
                                    <div key={sem} className='dist-row-sm'>
                                        <span>{sem}</span>
                                        <div className='bar-container-sm'>
                                            <div className='bar-fill-sm' style={{ width: `${(count / examStatus.total) * 100}%` }}></div>
                                        </div>
                                        <span>{count}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default memo(DashboardPage);