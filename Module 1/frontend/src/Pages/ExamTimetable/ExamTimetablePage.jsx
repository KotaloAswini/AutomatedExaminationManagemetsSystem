import { memo, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Trash from '../../Icons/Trash';
import EditIcon from '../../Icons/Edit';
import SearchIcon from '../../Icons/Search';
import ExamTimetableIcon from '../../Icons/ExamTimetableIcon';
import CrossIcon from '../../Icons/Cross';
import ExamPaperIcon from '../../Icons/ExamPaperIcon';
import '../../Style/Pages/ExamTimetablePage.css';
import { useAlert } from '../../Components/AlertContextProvider';
import { useConfirm } from '../../Components/ConfirmContextProvider';
import Loader from '../../Components/Loader';
import {
    getExams,
    scheduleExam,
    updateExam,
    deleteExam,
    checkConflicts,
    autoResolveConflicts,
    publishTimetable,
    formatTo12Hour
} from '../../Script/ExamDataFetcher';
import { checkDbConnection } from '../../Script/HealthFetcher';
import { getSubjectsDetailsList, saveSubject } from '../../Script/SubjectsDataFetcher';

const TIME_SLOTS = [
    { label: '9:30 AM - 11:00 AM', start: '09:30', end: '11:00', duration: 90 },
    { label: '1:30 PM - 3:00 PM', start: '13:30', end: '15:00', duration: 90 }
];

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
const DEPARTMENTS = ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'IT', 'AIML'];



function ExamTimetablePage() {
    const [exams, setExams] = useState([]);
    const [conflicts, setConflicts] = useState([]);
    const [isConflictFree, setIsConflictFree] = useState(true);
    const [loading, setLoading] = useState(false);
    const [subjectsDetails, setSubjectsDetails] = useState([]);
    const [editingExam, setEditingExam] = useState(null);

    // Modal State
    const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
    const [newSubjectName, setNewSubjectName] = useState('');
    const [newSubjectCode, setNewSubjectCode] = useState('');
    const [newSubjectType, setNewSubjectType] = useState('Theory');

    // Note: Subject entity doesn't have department, so we only save semantic fields


    // Form state
    const [selectedSemester, setSelectedSemester] = useState(1);
    const [selectedDepartment, setSelectedDepartment] = useState('CSE');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [examDate, setExamDate] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(0);
    const [hallId, setHallId] = useState('');
    const [testCoordinator, setTestCoordinator] = useState(() => localStorage.getItem('testCoordinator') || '');
    const [showCourseDropdown, setShowCourseDropdown] = useState(false);
    const [showDeptDropdown, setShowDeptDropdown] = useState(false);
    const [showSemDropdown, setShowSemDropdown] = useState(false);
    const [showTimeSlotDropdown, setShowTimeSlotDropdown] = useState(false);
    const [showExamTypeDropdown, setShowExamTypeDropdown] = useState(false);
    const [examType, setExamType] = useState('MSE I');

    // Search state
    const [searchQuery, setSearchQuery] = useState('');

    // Filter state
    const [filterSemester, setFilterSemester] = useState();
    const [filterDepartment, setFilterDepartment] = useState('');

    const { showError, showSuccess } = useAlert();
    const { showErrorConfirm } = useConfirm();
    const location = useLocation();

    // Load functions memoized
    const loadExams = useCallback(async () => {
        const data = await getExams(filterSemester, filterDepartment || undefined, 'DRAFT');
        setExams(data);
    }, [filterSemester, filterDepartment]);

    const loadConflicts = useCallback(async () => {
        const result = await checkConflicts(filterSemester, filterDepartment || undefined);
        setConflicts(result.conflicts);
        setIsConflictFree(result.conflictFree);
    }, [filterSemester, filterDepartment]);

    // Load initial data
    useEffect(() => {
        loadExams();
        getSubjectsDetailsList(data => setSubjectsDetails(data));
    }, [loadExams]);

    // Check for edit state from navigation
    useEffect(() => {
        if (location.state?.editExam) {
            handleEditExam(location.state.editExam);
        }
    }, [location.state]);

    // Reload when filters change
    useEffect(() => {
        loadExams();
    }, [loadExams]);

    useEffect(() => {
        localStorage.setItem('testCoordinator', testCoordinator);
    }, [testCoordinator]);

    // Check conflicts whenever exams change
    useEffect(() => {
        if (exams.length > 0) {
            loadConflicts();
        } else {
            setConflicts([]);
            setIsConflictFree(true);
        }
    }, [exams, loadConflicts]);

    const handleScheduleExam = useCallback(async () => {
        const isConnected = await checkDbConnection();
        if (!isConnected) {
            showError("Database is not connected. Cannot schedule exam.");
            return;
        }

        if (!selectedCourse || !examDate) {
            showError('Please fill all required fields');
            return;
        }

        // Check if there are already 2 exams for this date, semester, and department
        const examsOnSameDay = exams.filter(exam =>
            exam.examDate === examDate &&
            exam.semester === selectedSemester &&
            exam.department === selectedDepartment
        );

        if (examsOnSameDay.length >= 2) {
            showError(`Maximum 2 subjects allowed per day for ${selectedDepartment} Semester ${selectedSemester}. This date already has ${examsOnSameDay.length} exam(s) scheduled.`);
            return;
        }

        const slot = TIME_SLOTS[selectedTimeSlot];
        const request = {
            semester: selectedSemester,
            courseName: selectedCourse,
            examDate: examDate,
            startTime: slot.start,
            endTime: slot.end,
            durationMinutes: slot.duration,
            hallId: hallId || undefined,
            department: selectedDepartment,
            testCoordinator: testCoordinator || undefined,
            hod: `Dept. of ${selectedDepartment}`,
            examType: examType
        };

        setLoading(true);
        scheduleExam(
            request,
            () => {
                showSuccess('Exam scheduled successfully');
                loadExams();
                setSelectedCourse('');
                setLoading(false);
            },
            (msg) => {
                showError(msg);
                setLoading(false);
            }
        );
    }, [selectedSemester, selectedDepartment, selectedCourse, examDate, selectedTimeSlot, hallId, testCoordinator, examType, exams, showError, showSuccess, loadExams]);

    const handleUpdateExam = useCallback(async () => {
        if (!editingExam) return;

        const isConnected = await checkDbConnection();
        if (!isConnected) {
            showError("Database is not connected. Cannot update exam.");
            return;
        }

        if (!examDate) {
            showError('Please fill all required fields');
            return;
        }

        const slot = TIME_SLOTS[selectedTimeSlot];
        updateExam(
            editingExam.id,
            {
                semester: selectedSemester,
                department: selectedDepartment,
                courseName: selectedCourse,
                examDate: examDate,
                startTime: slot.start,
                endTime: slot.end,
                hallId: hallId,
                durationMinutes: slot.duration,
                testCoordinator: testCoordinator || undefined,
                hod: `Dept. of ${selectedDepartment}`,
                examType: examType
            },
            () => {
                showSuccess('Exam updated');
                loadExams();
                setEditingExam(null);
                resetForm();
            },
            showError
        );
    }, [editingExam, examDate, selectedTimeSlot, hallId, showError, showSuccess, loadExams, selectedSemester, selectedDepartment, selectedCourse, testCoordinator, examType]);

    const handleDeleteExam = useCallback((id) => {
        console.log('Delete button clicked for exam ID:', id);

        showErrorConfirm('⚠️ Permanently delete this exam?', () => {
            console.log('Confirmation approved, calling deleteExam for ID:', id);
            deleteExam(
                id,
                () => {
                    console.log('Delete successful!');
                    showSuccess('Exam deleted successfully');
                    loadExams();
                },
                (msg) => {
                    console.error('Delete failed:', msg);
                    showError('Failed to delete exam: ' + msg);
                }
            );
        });
    }, [showError, showSuccess, showErrorConfirm, loadExams]);

    const handleEditExam = (exam) => {
        setEditingExam(exam);
        setSelectedSemester(exam.semester);
        setSelectedDepartment(exam.department || 'CSE');
        setSelectedCourse(exam.courseName);
        setExamDate(exam.examDate);
        setHallId(exam.hallId || '');
        setTestCoordinator(exam.testCoordinator || '');
        setExamType(exam.examType || 'MSE I');
        // Find matching time slot
        const slotIdx = TIME_SLOTS.findIndex(s => s.start === exam.startTime);
        setSelectedTimeSlot(slotIdx >= 0 ? slotIdx : 0);
    };

    const resetForm = () => {
        setSelectedCourse('');
        setExamDate('');
        setHallId('');
        setTestCoordinator('');
        setExamType('MSE I');
        setSelectedTimeSlot(0);
        setEditingExam(null);
    };

    const handleAutoResolve = useCallback(async () => {
        const isConnected = await checkDbConnection();
        if (!isConnected) {
            showError("Database is not connected. Cannot resolve conflicts.");
            return;
        }

        setLoading(true);
        autoResolveConflicts(
            filterSemester,
            filterDepartment || undefined,
            (data) => {
                showSuccess(data.message);
                loadExams();
                setLoading(false);
            },
            (msg) => {
                showError(msg);
                setLoading(false);
            }
        );
    }, [filterSemester, filterDepartment, showError, showSuccess, loadExams]);

    const handlePublish = useCallback(async () => {
        const isConnected = await checkDbConnection();
        if (!isConnected) {
            showError("Database is not connected. Cannot publish timetable.");
            return;
        }

        if (!isConflictFree) {
            showError('Cannot publish: Please resolve all conflicts first');
            return;
        }

        setLoading(true);
        publishTimetable(
            filterSemester,
            filterDepartment || undefined,
            (data) => {
                showSuccess(data.message);
                loadExams();
                setLoading(false);
            },
            (msg) => {
                showError(msg);
                setLoading(false);
            }
        );
    }, [filterSemester, filterDepartment, isConflictFree, showError, showSuccess, loadExams]);



    // Get courses for selected department and semester
    // Strict filtering - only show courses that match BOTH semester AND department
    const coursesForSemester = subjectsDetails.filter(s =>
        s.sem === selectedSemester &&
        s.department === selectedDepartment
    );

    const handleCourseChange = (e) => {
        const val = e.target.value;
        if (val === '__NEW__') {
            setShowAddSubjectModal(true);
            // Reset modal fields
            setNewSubjectName('');
            setNewSubjectCode('');
            setNewSubjectType('Theory');

        } else {
            setSelectedCourse(val);
        }
    };

    const handleSaveNewSubject = async () => {
        if (!newSubjectName || !newSubjectCode) {
            showError("Please enter Subject Name and Code");
            return;
        }

        const newSub = {
            name: newSubjectName,
            subjectCode: newSubjectCode,
            sem: selectedSemester,
            department: selectedDepartment,
            subjectType: newSubjectType
        };

        setLoading(true);
        saveSubject(
            newSubjectName,
            newSub,
            () => {
                showSuccess("Subject added successfully");
                // Refresh subjects
                getSubjectsDetailsList(data => setSubjectsDetails(data));
                setSelectedCourse(newSubjectName); // Auto-select the new subject
                setShowAddSubjectModal(false);
                setLoading(false);
            },
            (msg) => {
                showError("Failed to add subject: " + msg);
                setLoading(false);
            }
        );
    };

    // Filter exams based on search query
    const filteredExams = exams.filter(exam =>
        exam.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (exam.department && exam.department.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Group exams by date for display
    const examsByDate = filteredExams.reduce((acc, exam) => {
        if (!acc[exam.examDate]) acc[exam.examDate] = [];
        acc[exam.examDate].push(exam);
        return acc;
    }, {});

    const conflictExamIds = new Set(conflicts.flatMap(c => [c.examId1, c.examId2]));

    return (
        <div className='page exam-timetable'>
            <div className='page-header'>
                <h1 className='page-title'>
                    <span className='title-icon' style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: '8px' }}>
                        <ExamTimetableIcon size={32} color="#2563eb" />
                    </span>
                    Examination Timetable
                </h1>
                <div className='header-actions'>
                    <div className="exam-search-container">
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

            <div className='exam-content'>
                {/* Input Panel */}
                <div className='input-panel'>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {editingExam ? (
                            <><EditIcon width={22} height={22} /> Edit Exam</>
                        ) : (
                            <><ExamPaperIcon size={22} /> Schedule Exam</>
                        )}
                    </h2>

                    <div className='form-group'>
                        <label>Department *</label>
                        <div className="custom-select-container">
                            <div
                                className={`custom-select-trigger ${showDeptDropdown ? 'open' : ''}`}
                                onClick={() => setShowDeptDropdown(!showDeptDropdown)}
                            >
                                {selectedDepartment}
                            </div>

                            {showDeptDropdown && (
                                <>
                                    <div
                                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99 }}
                                        onClick={() => setShowDeptDropdown(false)}
                                    />
                                    <div className="custom-select-options">
                                        {DEPARTMENTS.map(dept => (
                                            <div
                                                key={dept}
                                                className="custom-option"
                                                onClick={() => {
                                                    setSelectedDepartment(dept);
                                                    setShowDeptDropdown(false);
                                                }}
                                            >
                                                {dept}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className='form-group'>
                        <label>Semester *</label>
                        <div className="custom-select-container">
                            <div
                                className={`custom-select-trigger ${showSemDropdown ? 'open' : ''}`}
                                onClick={() => setShowSemDropdown(!showSemDropdown)}
                            >
                                Semester {selectedSemester}
                            </div>

                            {showSemDropdown && (
                                <>
                                    <div
                                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99 }}
                                        onClick={() => setShowSemDropdown(false)}
                                    />
                                    <div className="custom-select-options">
                                        {SEMESTERS.map(sem => (
                                            <div
                                                key={sem}
                                                className="custom-option"
                                                onClick={() => {
                                                    setSelectedSemester(sem);
                                                    setShowSemDropdown(false);
                                                }}
                                            >
                                                Semester {sem}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className='form-group'>
                        <label>Course *</label>
                        <div className="custom-select-container">
                            <div
                                className={`custom-select-trigger ${showCourseDropdown ? 'open' : ''}`}
                                onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                            >
                                {selectedCourse ? (
                                    (() => {
                                        const c = coursesForSemester.find(c => c.name === selectedCourse);
                                        return c ? `${c.name} (${c.subjectCode})` : selectedCourse;
                                    })()
                                ) : (
                                    <span style={{ color: 'var(--textColor2)' }}>Select a course</span>
                                )}
                            </div>

                            {showCourseDropdown && (
                                <>
                                    <div
                                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99 }}
                                        onClick={() => setShowCourseDropdown(false)}
                                    />
                                    <div className="custom-select-options">
                                        <div
                                            className="custom-option"
                                            onClick={() => {
                                                setSelectedCourse('');
                                                setShowCourseDropdown(false);
                                            }}
                                        >
                                            Select a course
                                        </div>
                                        {coursesForSemester.map(course => (
                                            <div
                                                key={course.name}
                                                className="custom-option"
                                                onClick={() => {
                                                    setSelectedCourse(course.name);
                                                    setShowCourseDropdown(false);
                                                }}
                                            >
                                                {course.name} ({course.subjectCode})
                                            </div>
                                        ))}
                                        <div
                                            className="custom-option add-new"
                                            onClick={() => {
                                                handleCourseChange({ target: { value: '__NEW__' } });
                                                setShowCourseDropdown(false);
                                            }}
                                        >
                                            + Add New Subject
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className='form-group'>
                        <label>Exam Type *</label>
                        <div className="custom-select-container">
                            <div
                                className={`custom-select-trigger ${showExamTypeDropdown ? 'open' : ''}`}
                                onClick={() => setShowExamTypeDropdown(!showExamTypeDropdown)}
                            >
                                {examType}
                            </div>

                            {showExamTypeDropdown && (
                                <>
                                    <div
                                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99 }}
                                        onClick={() => setShowExamTypeDropdown(false)}
                                    />
                                    <div className="custom-select-options">
                                        <div
                                            className="custom-option"
                                            onClick={() => {
                                                setExamType('MSE I');
                                                setShowExamTypeDropdown(false);
                                            }}
                                        >
                                            MSE I
                                        </div>
                                        <div
                                            className="custom-option"
                                            onClick={() => {
                                                setExamType('MSE II');
                                                setShowExamTypeDropdown(false);
                                            }}
                                        >
                                            MSE II
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className='form-group'>
                        <label>Exam Date *</label>
                        <input
                            type="date"
                            value={examDate}
                            onChange={e => setExamDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div className='form-group'>
                        <label>Time Slot *</label>
                        <div className="custom-select-container">
                            <div
                                className={`custom-select-trigger ${showTimeSlotDropdown ? 'open' : ''}`}
                                onClick={() => setShowTimeSlotDropdown(!showTimeSlotDropdown)}
                            >
                                {TIME_SLOTS[selectedTimeSlot]?.label || 'Select Time Slot'}
                            </div>

                            {showTimeSlotDropdown && (
                                <>
                                    <div
                                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99 }}
                                        onClick={() => setShowTimeSlotDropdown(false)}
                                    />
                                    <div className="custom-select-options">
                                        {TIME_SLOTS.map((slot, idx) => (
                                            <div
                                                key={idx}
                                                className="custom-option"
                                                onClick={() => {
                                                    setSelectedTimeSlot(idx);
                                                    setShowTimeSlotDropdown(false);
                                                }}
                                            >
                                                {slot.label}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className='form-group'>
                        <label>Test Coordinator</label>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={testCoordinator}
                                onChange={e => setTestCoordinator(e.target.value)}
                                placeholder="e.g., Dr. Uma R..."
                                style={{ paddingRight: '2rem' }}
                            />
                            {testCoordinator && (
                                <div
                                    onClick={() => setTestCoordinator('')}
                                    style={{
                                        position: 'absolute',
                                        right: '0.5rem',
                                        cursor: 'pointer',
                                        opacity: 0.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '4px'
                                    }}
                                    title="Clear"
                                >
                                    <CrossIcon size={12} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='form-group'>
                        <label>HOD</label>
                        <input
                            type="text"
                            value={`Dept. of ${selectedDepartment}`}
                            readOnly
                            style={{ backgroundColor: 'var(--bgColor2)', cursor: 'not-allowed' }}
                        />
                    </div>



                    <div className='form-buttons'>
                        {editingExam ? (
                            <>
                                <button className='btn primary' onClick={handleUpdateExam}>
                                    ✓ Update
                                </button>
                                <button className='btn secondary' onClick={resetForm}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button className='btn primary' onClick={handleScheduleExam}>
                                + Add Exam
                            </button>
                        )}
                    </div>
                </div>

                {/* Preview Panel */}
                <div className='preview-panel'>
                    <div className='panel-header'>
                        {/* <h2>Exam Schedule</h2> - Removed as per user request */}
                        <div className='filter-bar'>
                            <select
                                value={filterSemester || ''}
                                onChange={e => setFilterSemester(e.target.value ? Number(e.target.value) : undefined)}
                            >
                                <option value="">All Semesters</option>
                                {SEMESTERS.map(sem => (
                                    <option key={sem} value={sem}>Sem {sem}</option>
                                ))}
                            </select>
                            <select
                                value={filterDepartment}
                                onChange={e => setFilterDepartment(e.target.value)}
                            >
                                <option value="">All Depts</option>
                                {DEPARTMENTS.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                        <div className='status-badge' data-status={isConflictFree ? 'ok' : 'conflict'}>
                            {isConflictFree ? '✓ No Conflicts' : `⚠ ${conflicts.length} Conflict(s)`}
                        </div>
                    </div>

                    {/* Conflict Alert */}
                    {!isConflictFree && (
                        <div className='conflict-alert'>
                            <h3>⚠️ Conflicts Detected</h3>
                            <ul>
                                {conflicts.slice(0, 5).map((c, idx) => (
                                    <li key={idx} className={`conflict-${c.type.toLowerCase()}`}>
                                        <span className='conflict-type'>{c.type}</span>
                                        {c.message}
                                    </li>
                                ))}
                                {conflicts.length > 5 && <li>...and {conflicts.length - 5} more</li>}
                            </ul>
                            <button className='btn warning' onClick={handleAutoResolve}>
                                🔄 Auto-Resolve Conflicts
                            </button>
                        </div>
                    )}

                    {/* Exam Table */}
                    <div className='exam-table-container'>
                        <table className='exam-table'>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Exam Type</th>
                                    <th>Dept</th>
                                    <th>Sem</th>
                                    <th>Course</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(examsByDate)
                                    .sort(([a], [b]) => a.localeCompare(b))
                                    .flatMap(([date, dateExams]) =>
                                        dateExams.map((exam, idx) => (
                                            <tr
                                                key={exam.id}
                                                className={`${conflictExamIds.has(exam.id) ? 'conflict-row' : ''} ${exam.status.toLowerCase()}`}
                                            >
                                                {idx === 0 && (
                                                    <td rowSpan={dateExams.length} className='date-cell'>
                                                        {new Date(date).toLocaleDateString('en-US', {
                                                            weekday: 'short',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </td>
                                                )}
                                                <td className='time-cell'>{formatTo12Hour(exam.startTime)} - {formatTo12Hour(exam.endTime)}</td>
                                                <td style={{ textAlign: 'center' }}><span className='exam-type-badge'>{exam.examType || '-'}</span></td>
                                                <td><span className='dept-badge'>{exam.department || '-'}</span></td>
                                                <td><span className='sem-badge'>Sem {exam.semester}</span></td>
                                                <td className='course-cell'>{exam.courseName}</td>
                                                <td>
                                                    <span className={`status-tag ${exam.status.toLowerCase()}`}>
                                                        {exam.status}
                                                    </span>
                                                </td>
                                                <td className='actions-cell'>
                                                    {exam.status === 'DRAFT' && (
                                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                                            <button
                                                                className='btn-icon'
                                                                onClick={() => handleEditExam(exam)}
                                                                title="Edit"
                                                                style={{ width: '32px', height: '32px', padding: '6px' }}
                                                            >
                                                                <EditIcon width={16} height={16} />
                                                            </button>
                                                            <button
                                                                className='btn-icon delete'
                                                                onClick={() => {
                                                                    console.log('TRASH BUTTON CLICKED!', exam.id);
                                                                    handleDeleteExam(exam.id);
                                                                }}
                                                                title="Delete"
                                                                style={{ width: '32px', height: '32px', padding: '6px' }}
                                                            >
                                                                <Trash width={16} height={16} fill="currentColor" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                            </tbody>
                        </table>
                        {exams.length === 0 && (
                            <div className='empty-state'>
                                <p>📋 No exams scheduled yet.</p>
                                <p>Use the form to add exams.</p>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className='action-buttons' style={{ justifyContent: 'flex-end', marginTop: 'auto' }}>

                        <button
                            className='btn success'
                            onClick={handlePublish}
                            disabled={exams.length === 0 || !isConflictFree || exams.every(e => e.status === 'PUBLISHED')}
                        >
                            ✓ Publish Timetable
                        </button>
                    </div>
                </div>
            </div>

            {loading && <Loader />}

            {/* Add Subject Modal */}
            {showAddSubjectModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add New Subject</h3>
                        <div className="form-group">
                            <label>Subject Name *</label>
                            <input
                                type="text"
                                value={newSubjectName}
                                onChange={e => setNewSubjectName(e.target.value)}
                                placeholder="e.g. Advanced Algorithms"
                            />
                        </div>
                        <div className="form-group">
                            <label>Subject Code *</label>
                            <input
                                type="text"
                                value={newSubjectCode}
                                onChange={e => setNewSubjectCode(e.target.value)}
                                placeholder="e.g. CS501"
                            />
                        </div>

                        <div className="modal-actions">
                            <button className="btn secondary" onClick={() => setShowAddSubjectModal(false)}>Cancel</button>
                            <button className="btn primary" onClick={handleSaveNewSubject}>Save & Select</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default memo(ExamTimetablePage);
