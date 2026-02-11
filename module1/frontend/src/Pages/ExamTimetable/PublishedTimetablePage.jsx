import { memo, useEffect, useState, useCallback } from 'react';
import '../../Style/Pages/ExamTimetablePage.css';
import { useAlert } from '../../Components/AlertContextProvider';
import { useConfirm } from '../../Components/ConfirmContextProvider';
import {
    getExams,
    printTimetable,
    downloadTimetable,
    formatTo12Hour,
    deleteExam,
    updateExam
} from '../../Script/ExamDataFetcher';
import Trash from '../../Icons/Trash';
import EditIcon from '../../Icons/Edit';
import { getSubjectsDetailsList } from '../../Script/SubjectsDataFetcher';
import SearchIcon from '../../Icons/Search';
import ExamTimetableIcon from '../../Icons/ExamTimetableIcon';
import Printer from '../../Icons/Printer';
import Download from '../../Icons/Download';

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
const DEPARTMENTS = ['CSE', 'AE', 'CE', 'ECE', 'EEE', 'ME', 'ISE', 'AI&DS', 'AI&ML'];

function PublishedTimetablePage() {
    const { showError, showSuccess } = useAlert();
    const { showErrorConfirm } = useConfirm();
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterSemester, setFilterSemester] = useState();
    const [filterDepartment, setFilterDepartment] = useState('');
    const [filterExamType, setFilterExamType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Edit modal state
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingExam, setEditingExam] = useState(null);
    const [editDepartment, setEditDepartment] = useState('');
    const [editSemester, setEditSemester] = useState(1);
    const [editCourse, setEditCourse] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editStartTime, setEditStartTime] = useState('');
    const [editEndTime, setEditEndTime] = useState('');
    const [editRoomNo, setEditRoomNo] = useState('');
    const [editExamType, setEditExamType] = useState('MSE I');
    const [editTestCoordinator, setEditTestCoordinator] = useState('');
    const [subjectsDetails, setSubjectsDetails] = useState([]);

    // Print modal state
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [printDepartment, setPrintDepartment] = useState('');
    const [printSemester, setPrintSemester] = useState();
    const [printExamType, setPrintExamType] = useState('');

    // Download modal state
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [downloadDepartment, setDownloadDepartment] = useState('');
    const [downloadSemester, setDownloadSemester] = useState();
    const [downloadExamType, setDownloadExamType] = useState('');

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const examData = await getExams(filterSemester, filterDepartment || undefined, 'PUBLISHED');
            setExams(examData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [filterSemester, filterDepartment]);

    useEffect(() => {
        loadData();
        getSubjectsDetailsList(data => {
            const subjects = data;
            console.log('Loaded subjects:', subjects);
            setSubjectsDetails(subjects);
        });
    }, [loadData, filterSemester, filterDepartment]);

    const handlePrint = () => {
        if (exams.length === 0) {
            showError('No exams available to print');
            return;
        }
        // Reset print filters and show modal
        setPrintDepartment('');
        setPrintSemester(undefined);
        setPrintExamType('');
        setShowPrintModal(true);
    };

    const handleConfirmPrint = () => {
        if (!printDepartment || !printSemester || !printExamType) {
            showError('Please select Department, Semester, and Exam Type');
            return;
        }

        // Filter exams based on selection
        const filteredExams = exams.filter(exam =>
            exam.department === printDepartment &&
            exam.semester === printSemester &&
            (printExamType === 'Retest' ? exam.examType.includes('Retest') : exam.examType === printExamType)
        );

        if (filteredExams.length === 0) {
            showError(`No exams found for ${printDepartment} SEM ${printSemester} ${printExamType}`);
            return;
        }

        setShowPrintModal(false);
        printTimetable(filteredExams, subjectsDetails, 'Examination Timetable');
    };

    const handleDownload = () => {
        if (exams.length === 0) {
            showError('No exams available to download');
            return;
        }
        // Reset download filters and show modal
        setDownloadDepartment('');
        setDownloadSemester(undefined);
        setDownloadExamType('');
        setShowDownloadModal(true);
    };

    const handleConfirmDownload = async () => {
        if (!downloadDepartment || !downloadSemester || !downloadExamType) {
            showError('Please select Department, Semester, and Exam Type');
            return;
        }

        // Filter exams based on selection
        const filteredExams = exams.filter(exam =>
            exam.department === downloadDepartment &&
            exam.semester === downloadSemester &&
            (downloadExamType === 'Retest' ? exam.examType.includes('Retest') : exam.examType === downloadExamType)
        );

        if (filteredExams.length === 0) {
            showError(`No exams found for ${downloadDepartment} SEM ${downloadSemester} ${downloadExamType}`);
            return;
        }

        setShowDownloadModal(false);

        // Direct PDF download with exact same format as print
        try {
            await downloadTimetable(filteredExams, subjectsDetails, 'Examination Timetable');
            showSuccess('PDF downloaded successfully!');
        } catch (error) {
            console.error('Download error:', error);
            showError('Failed to download PDF. Please try again.');
        }
    };

    const handleDelete = (id) => {
        showErrorConfirm('⚠️ Permanently delete this exam?', () => {
            console.log('Deleting exam with ID:', id);
            setLoading(true);
            deleteExam(
                id,
                () => {
                    console.log('Delete successful, reloading data');
                    showSuccess('Exam deleted successfully');
                    loadData();
                },
                (msg) => {
                    console.error('Delete failed:', msg);
                    showError('Failed to delete exam: ' + msg);
                    setLoading(false);
                }
            );
        });
    };

    const handleEdit = (exam) => {
        console.log('Editing exam:', exam);
        console.log('Available subjects:', subjectsDetails);
        console.log('Subjects for semester', exam.semester, ':', subjectsDetails.filter(s => s.sem === exam.semester));
        setEditingExam(exam);
        setEditDepartment(exam.department || 'CSE');
        setEditSemester(exam.semester);
        setEditCourse(exam.courseName);
        setEditDate(exam.examDate);
        setEditStartTime(exam.startTime);
        setEditEndTime(exam.endTime);
        setEditRoomNo(exam.hallId || '');
        setEditExamType(exam.examType || 'MSE I');
        setEditTestCoordinator(exam.testCoordinator || '');
        setShowEditModal(true);
    };

    const handleSaveEdit = async () => {
        if (!editingExam) return;

        if (!editDepartment || !editSemester || !editCourse || !editDate || !editStartTime || !editEndTime) {
            showError('Please fill all required fields');
            return;
        }

        // Calculate duration in minutes
        const start = editStartTime.split(':');
        const end = editEndTime.split(':');
        const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);
        const endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);
        const durationMinutes = endMinutes - startMinutes;

        const updateData = {
            department: editDepartment,
            semester: editSemester,
            courseName: editCourse,
            examDate: editDate,
            startTime: editStartTime,
            endTime: editEndTime,
            durationMinutes: durationMinutes,
            examType: editExamType,
            testCoordinator: editTestCoordinator
        };

        console.log('Updating exam ID:', editingExam.id);
        console.log('Update data:', updateData);

        setLoading(true);
        updateExam(
            editingExam.id,
            updateData,
            (updatedExam) => {
                console.log('Exam updated successfully:', updatedExam);
                showSuccess('Exam updated successfully');
                setShowEditModal(false);
                setEditingExam(null);
                loadData();
            },
            (msg) => {
                console.error('Error updating exam:', msg);
                showError(msg);
                setLoading(false);
            }
        );
    };

    const handleCancelEdit = () => {
        setShowEditModal(false);
        setEditingExam(null);
    };

    // Group exams by date
    const examsByDate = exams
        .filter(exam =>
            (!filterExamType || exam.examType === filterExamType) &&
            (searchQuery === '' ||
                exam.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (exam.department && exam.department.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        )
        .reduce((acc, exam) => {
            if (!acc[exam.examDate]) acc[exam.examDate] = [];
            acc[exam.examDate].push(exam);
            return acc;
        }, {});

    return (
        <div className='page exam-timetable student-view'>
            <div className='page-header'>
                <h1 className='page-title'>
                    <span className='title-icon'><ExamTimetableIcon size={28} /></span>
                    Published Examination Timetable
                </h1>
                <div className='header-actions'>

                    {exams.length > 0 && (
                        <>
                            <button
                                className='btn btn-print'
                                onClick={handlePrint}
                            >
                                <Printer width={14} height={14} /> Print
                            </button>
                            <button
                                className='btn btn-download'
                                onClick={handleDownload}
                            >
                                <Download width={14} height={14} /> Download
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Filters */}
            <div className='filter-section'>
                <div className='filter-bar'>
                    <label>Filter by:</label>
                    <select
                        value={filterDepartment}
                        onChange={e => setFilterDepartment(e.target.value)}
                    >
                        <option value="">All Departments</option>
                        {DEPARTMENTS.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                    <select
                        value={filterSemester || ''}
                        onChange={e => setFilterSemester(e.target.value ? Number(e.target.value) : undefined)}
                    >
                        <option value="">All Semesters</option>
                        {SEMESTERS.map(sem => (
                            <option key={sem} value={sem}>SEM {sem}</option>
                        ))}
                    </select>
                    <select
                        value={filterExamType}
                        onChange={e => setFilterExamType(e.target.value)}
                    >
                        <option value="">Exam Type</option>
                        <option value="MSE I">MSE I</option>
                        <option value="MSE II">MSE II</option>
                        <option value="Retest MSE I">Retest MSE I</option>
                        <option value="Retest MSE II">Retest MSE II</option>
                    </select>

                    <div className="exam-search-container" style={{ marginLeft: 'auto' }}>
                        <span className="exam-search-icon" style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: '16px', height: '16px' }}>
                                <SearchIcon fillColor="#64748b" />
                            </div>
                        </span>
                        <input
                            type="text"
                            className="exam-search-input"
                            placeholder="Search exams..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Timetable Display */}
            <div className='timetable-display'>
                {loading ? (
                    <div className='loading-state'>Loading...</div>
                ) : exams.length === 0 ? (
                    <div className='empty-state'>
                        <p>📭 No published examination timetable available yet.</p>
                        <p>Please check back later.</p>
                    </div>
                ) : (
                    <div className='exam-table-container'>
                        <table className='exam-table'>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Exam Type</th>
                                    <th>Department</th>
                                    <th>Semester</th>
                                    <th>Course</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(examsByDate)
                                    .sort(([a], [b]) => a.localeCompare(b))
                                    .flatMap(([date, dateExams]) =>
                                        dateExams.map((exam, idx) => (
                                            <tr key={exam.id}>
                                                {idx === 0 && (
                                                    <td rowSpan={dateExams.length} className='date-cell'>
                                                        {(() => {
                                                            const d = new Date(date);
                                                            const day = String(d.getDate()).padStart(2, '0');
                                                            const month = String(d.getMonth() + 1).padStart(2, '0');
                                                            const year = d.getFullYear();
                                                            return `${day}-${month}-${year}`;
                                                        })()}
                                                    </td>
                                                )}
                                                <td>{formatTo12Hour(exam.startTime)} - {formatTo12Hour(exam.endTime)}</td>
                                                <td style={{ textAlign: 'center' }}><span className='exam-type-badge'>{exam.examType || '-'}</span></td>
                                                <td><span className='dept-badge'>{exam.department || 'N/A'}</span></td>
                                                <td><span className='sem-badge'>SEM {exam.semester}</span></td>
                                                <td>{exam.courseName}</td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                                        <button
                                                            className='btn-icon'
                                                            title='Edit Exam'
                                                            onClick={() => handleEdit(exam)}
                                                            style={{ width: '32px', height: '32px', padding: '6px' }}
                                                        >
                                                            <EditIcon width={16} height={16} />
                                                        </button>
                                                        <button
                                                            className='btn-icon delete'
                                                            title='Delete Exam'
                                                            onClick={() => handleDelete(exam.id)}
                                                            style={{ width: '32px', height: '32px', padding: '6px' }}
                                                        >
                                                            <Trash width={16} height={16} fill="currentColor" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>



            {/* Edit Modal */}
            {showEditModal && editingExam && (
                <div className='modal-overlay' onClick={handleCancelEdit}>
                    <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                        <div className='modal-header'>
                            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <EditIcon width={24} height={24} />
                                Edit Exam
                            </h2>
                            <button className='modal-close' onClick={handleCancelEdit}>×</button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-row'>
                                <div className='form-group'>
                                    <label>Department *</label>
                                    <select
                                        value={editDepartment}
                                        onChange={(e) => setEditDepartment(e.target.value)}
                                        className='form-select'
                                    >
                                        {DEPARTMENTS.map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='form-group'>
                                    <label>Semester *</label>
                                    <select
                                        value={editSemester}
                                        onChange={(e) => setEditSemester(Number(e.target.value))}
                                        className='form-select'
                                    >
                                        {SEMESTERS.map(sem => (
                                            <option key={sem} value={sem}>SEM {sem}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className='form-group'>
                                <label>Course *</label>
                                <select
                                    value={editCourse}
                                    onChange={(e) => setEditCourse(e.target.value)}
                                    className='form-select'
                                >
                                    <option value="">Select a course</option>
                                    {/* Show current course if it exists and isn't in the filtered list */}
                                    {editCourse && !subjectsDetails.some(s => s.name === editCourse && s.sem === editSemester) && (
                                        <option value={editCourse}>{editCourse} (Current)</option>
                                    )}
                                    {subjectsDetails
                                        .filter(s => s.sem === editSemester)
                                        .map(subject => (
                                            <option key={subject.name} value={subject.name}>
                                                {subject.name} ({subject.subjectCode})
                                            </option>
                                        ))
                                    }
                                    {/* Fallback: show all subjects if none match the semester */}
                                    {subjectsDetails.filter(s => s.sem === editSemester).length === 0 &&
                                        subjectsDetails.length > 0 && (
                                            <>
                                                <option disabled>─── All Subjects ───</option>
                                                {subjectsDetails.map(subject => (
                                                    <option key={subject.name} value={subject.name}>
                                                        {subject.name} ({subject.subjectCode}) - SEM {subject.sem}
                                                    </option>
                                                ))}
                                            </>
                                        )}
                                </select>
                            </div>

                            <div className='form-row'>
                                <div className='form-group'>
                                    <label>Exam Date *</label>
                                    <input
                                        type="date"
                                        value={editDate}
                                        onChange={(e) => setEditDate(e.target.value)}
                                        className='form-input'
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Exam Type</label>
                                    <select
                                        value={editExamType}
                                        onChange={(e) => setEditExamType(e.target.value)}
                                        className='form-select'
                                    >
                                        <option value="MSE I">MSE I</option>
                                        <option value="MSE II">MSE II</option>
                                        <option value="Retest MSE I">Retest MSE I</option>
                                        <option value="Retest MSE II">Retest MSE II</option>
                                    </select>
                                </div>
                            </div>

                            <div className='form-row'>
                                <div className='form-group'>
                                    <label>Start Time *</label>
                                    <input
                                        type="time"
                                        value={editStartTime}
                                        onChange={(e) => setEditStartTime(e.target.value)}
                                        className='form-input'
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>End Time *</label>
                                    <input
                                        type="time"
                                        value={editEndTime}
                                        onChange={(e) => setEditEndTime(e.target.value)}
                                        className='form-input'
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Test Coordinator</label>
                                    <input
                                        type="text"
                                        value={editTestCoordinator}
                                        onChange={(e) => setEditTestCoordinator(e.target.value)}
                                        className='form-input'
                                        placeholder="Coordinator"
                                    />
                                </div>
                            </div>


                        </div>
                        <div className='modal-footer'>
                            <button className='btn secondary' onClick={handleCancelEdit}>Cancel</button>
                            <button className='btn primary' onClick={handleSaveEdit}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .student-view .filter-section {
                    background: var(--containerColor, #fff);
                    padding: 1rem 1.25rem;
                    border-radius: 10px;
                    margin-bottom: 1rem;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                }
                .student-view .filter-bar {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                }
                .student-view .filter-bar label {
                    font-weight: 500;
                    color: var(--textColor2, #666);
                }
                .student-view .timetable-display {
                    background: var(--containerColor, #fff);
                    padding: 1.25rem;
                    border-radius: 10px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                }
                .student-view .loading-state {
                    text-align: center;
                    padding: 3rem;
                    color: var(--textColor2, #888);
                }
                .student-view .timetable-footer {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 1rem;
                    font-size: 0.85rem;
                    color: var(--textColor2, #666);
                }
                .student-view .note {
                    font-style: italic;
                }

                /* Edit Modal Styles */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    animation: fadeIn 0.2s ease;
                }

                .modal-content {
                    background: var(--containerColor, #fff);
                    border-radius: 12px;
                    width: 90%;
                    max-width: 500px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                    animation: slideUp 0.3s ease;
                }

                .modal-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid var(--borderColor, #e0e0e0);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .modal-header h2 {
                    margin: 0;
                    font-size: 1.5rem;
                    color: var(--textColor, #333);
                }

                .modal-close {
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: var(--textColor2, #666);
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    transition: all 0.2s;
                }

                .modal-close:hover {
                    background: var(--hoverColor, #f0f0f0);
                    color: var(--textColor, #333);
                }

                .modal-body {
                    padding: 1.5rem;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .form-group {
                    margin-bottom: 1.25rem;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: var(--textColor, #333);
                }

                .form-select,
                .form-input {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid var(--borderColor, #ddd);
                    border-radius: 8px;
                    font-size: 1rem;
                    background: var(--containerColor, #fff);
                    color: var(--textColor, #333);
                    transition: all 0.2s;
                }

                .form-select {
                    cursor: pointer;
                }

                .form-select:focus,
                .form-input:focus {
                    outline: none;
                    border-color: var(--primaryColor, #007bff);
                    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
                }

                .modal-footer {
                    padding: 1.5rem;
                    border-top: 1px solid var(--borderColor, #e0e0e0);
                    display: flex;
                    justify-content: flex-end;
                    gap: 0.75rem;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from {
                        transform: translateY(20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>

            {/* Print Selection Modal */}
            {showPrintModal && (
                <div className='modal-overlay' style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div className='modal-content' style={{
                        background: 'var(--containerColor)',
                        padding: '30px',
                        borderRadius: '12px',
                        minWidth: '400px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                    }}>
                        <h3 style={{ marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            🖨️ Print Timetable
                        </h3>

                        <div className='form-group' style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Department *</label>
                            <select
                                value={printDepartment}
                                onChange={e => setPrintDepartment(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
                            >
                                <option value="">Select Department</option>
                                {DEPARTMENTS.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>

                        <div className='form-group' style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Semester *</label>
                            <select
                                value={printSemester || ''}
                                onChange={e => setPrintSemester(e.target.value ? Number(e.target.value) : undefined)}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
                            >
                                <option value="">Select Semester</option>
                                {SEMESTERS.map(sem => (
                                    <option key={sem} value={sem}>SEM {sem}</option>
                                ))}
                            </select>
                        </div>

                        <div className='form-group' style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Exam Type *</label>
                            <select
                                value={printExamType}
                                onChange={e => setPrintExamType(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
                            >
                                <option value="">Select Exam Type</option>
                                <option value="MSE I">MSE I</option>
                                <option value="MSE II">MSE II</option>
                                <option value="Retest">Retest</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button
                                className='btn secondary'
                                onClick={() => setShowPrintModal(false)}
                                style={{ padding: '10px 20px' }}
                            >
                                Cancel
                            </button>
                            <button
                                className='btn primary'
                                onClick={handleConfirmPrint}
                                style={{ padding: '10px 20px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                            >
                                🖨️ Print
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Download Selection Modal */}
            {showDownloadModal && (
                <div className='modal-overlay' style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div className='modal-content' style={{
                        background: 'var(--containerColor)',
                        padding: '30px',
                        borderRadius: '12px',
                        minWidth: '400px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                    }}>
                        <h3 style={{ marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Download width={20} height={20} color="#28a745" /> Download Timetable
                        </h3>

                        <div className='form-group' style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Department *</label>
                            <select
                                value={downloadDepartment}
                                onChange={e => setDownloadDepartment(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
                            >
                                <option value="">Select Department</option>
                                {DEPARTMENTS.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>

                        <div className='form-group' style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Semester *</label>
                            <select
                                value={downloadSemester || ''}
                                onChange={e => setDownloadSemester(e.target.value ? Number(e.target.value) : undefined)}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
                            >
                                <option value="">Select Semester</option>
                                {SEMESTERS.map(sem => (
                                    <option key={sem} value={sem}>Semester {sem}</option>
                                ))}
                            </select>
                        </div>

                        <div className='form-group' style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Exam Type *</label>
                            <select
                                value={downloadExamType}
                                onChange={e => setDownloadExamType(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
                            >
                                <option value="">Select Exam Type</option>
                                <option value="MSE I">MSE I</option>
                                <option value="MSE II">MSE II</option>
                                <option value="Retest">Retest</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button
                                className='btn secondary'
                                onClick={() => setShowDownloadModal(false)}
                                style={{ padding: '10px 20px' }}
                            >
                                Cancel
                            </button>
                            <button
                                className='btn primary'
                                onClick={handleConfirmDownload}
                                style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                            >
                                <Download width={14} height={14} color="white" /> Download
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default memo(PublishedTimetablePage);
