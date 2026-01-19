import { url as API_URL } from './fetchUrl';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { Subject } from '../data/Types';

// Helper to format time to 12-hour format
export function formatTo12Hour(timeStr: string): string {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    return `${hour}:${minutes} ${ampm}`;
}

// Types
export interface Exam {
    id: string; // MongoDB uses string IDs
    semester: number;
    courseName: string;
    examDate: string;
    startTime: string;
    endTime: string;
    hallId: string;
    facultyName: string;
    department: string;
    durationMinutes: number;
    testCoordinator?: string;
    hod?: string;
    examType?: string;
    status: 'DRAFT' | 'PUBLISHED';
}

export interface Conflict {
    type: 'STUDENT' | 'HALL' | 'FACULTY';
    message: string;
    examId1: string; // MongoDB uses string IDs
    examId2: string; // MongoDB uses string IDs
}

export interface ConflictResponse {
    conflictFree: boolean;
    conflicts: Conflict[];
}

export interface ExamRequest {
    semester: number;
    courseName: string;
    examDate: string;
    startTime: string;
    endTime: string;
    hallId?: string;
    facultyName?: string;
    department?: string;
    durationMinutes?: number;
    testCoordinator?: string;
    hod?: string;
    examType?: string;
}

// Get all exams (optionally filter by semester and department)
export async function getExams(semester?: number, department?: string, status?: 'DRAFT' | 'PUBLISHED'): Promise<Exam[]> {
    const params = new URLSearchParams();
    if (semester) params.append('semester', semester.toString());
    if (department) params.append('department', department);
    if (status) params.append('status', status);

    const url = `${API_URL}/api/exams${params.toString() ? '?' + params.toString() : ''}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch exams');
        return await response.json();
    } catch (error) {
        console.error('Error fetching exams:', error);
        return [];
    }
}

// Schedule new exam
export async function scheduleExam(
    exam: ExamRequest,
    onSuccess: (data: Exam) => void,
    onError: (msg: string) => void
): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/api/exams`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exam)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to schedule');
        }

        const data = await response.json();
        onSuccess(data);
    } catch (error) {
        onError(error instanceof Error ? error.message : 'Failed to schedule exam');
    }
}

// Update exam (manual adjustment)
export async function updateExam(
    id: string, // MongoDB uses string IDs
    updates: Partial<ExamRequest>,
    onSuccess: (data: Exam) => void,
    onError: (msg: string) => void
): Promise<void> {
    try {
        console.log('Sending PUT request to:', `${API_URL}/api/exams/${id}`);
        console.log('Request body:', updates);

        const response = await fetch(`${API_URL}/api/exams/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const error = await response.json();
            console.error('Error response:', error);
            throw new Error(error.error || 'Failed to update');
        }

        const data = await response.json();
        console.log('Update successful, received data:', data);
        onSuccess(data);
    } catch (error) {
        console.error('Update exam error:', error);
        onError(error instanceof Error ? error.message : 'Failed to update exam');
    }
}

// Delete exam
export async function deleteExam(
    id: string, // MongoDB uses string IDs
    onSuccess: () => void,
    onError: (msg: string) => void
): Promise<void> {
    console.log('deleteExam called with ID:', id);
    console.log('API URL:', `${API_URL}/api/exams/${id}`);
    try {
        const response = await fetch(`${API_URL}/api/exams/${id}`, {
            method: 'DELETE'
        });

        console.log('Delete response status:', response.status);
        if (!response.ok) {
            const error = await response.json();
            console.error('Delete error response:', error);
            throw new Error(error.error || 'Failed to delete');
        }

        console.log('Delete successful, calling onSuccess');
        onSuccess();
    } catch (error) {
        console.error('Delete exception:', error);
        onError(error instanceof Error ? error.message : 'Failed to delete exam');
    }
}

// Check for conflicts
export async function checkConflicts(semester?: number, department?: string): Promise<ConflictResponse> {
    const params = new URLSearchParams();
    if (semester) params.append('semester', semester.toString());
    if (department) params.append('department', department);

    const url = `${API_URL}/api/exams/conflicts${params.toString() ? '?' + params.toString() : ''}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to check conflicts');
        return await response.json();
    } catch (error) {
        console.error('Error checking conflicts:', error);
        return { conflictFree: true, conflicts: [] };
    }
}

// Auto-resolve conflicts
export async function autoResolveConflicts(
    semester?: number,
    department?: string,
    onSuccess: (data: { resolved: number; message: string }) => void = () => { },
    onError: (msg: string) => void = () => { }
): Promise<void> {
    const params = new URLSearchParams();
    if (semester) params.append('semester', semester.toString());
    if (department) params.append('department', department);

    const url = `${API_URL}/api/exams/auto-resolve${params.toString() ? '?' + params.toString() : ''}`;

    try {
        const response = await fetch(url, { method: 'POST' });
        if (!response.ok) throw new Error('Failed to auto-resolve conflicts');
        const data = await response.json();
        onSuccess(data);
    } catch (error) {
        onError(error instanceof Error ? error.message : 'Failed to auto-resolve');
    }
}

// Publish timetable
export async function publishTimetable(
    semester?: number,
    department?: string,
    onSuccess: (data: { message: string; published: number }) => void = () => { },
    onError: (msg: string) => void = () => { }
): Promise<void> {
    const params = new URLSearchParams();
    if (semester) params.append('semester', semester.toString());
    if (department) params.append('department', department);

    const url = `${API_URL}/api/exams/publish${params.toString() ? '?' + params.toString() : ''}`;

    try {
        const response = await fetch(url, { method: 'PUT' });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to publish');
        }
        const data = await response.json();
        onSuccess(data);
    } catch (error) {
        onError(error instanceof Error ? error.message : 'Failed to publish');
    }
}

// Get status
export async function getExamStatus(): Promise<{
    total: number;
    published: number;
    draft: number;
    isFullyPublished: boolean;
}> {
    try {
        const response = await fetch(`${API_URL}/api/exams/status`);
        if (!response.ok) throw new Error('Failed to get status');
        return await response.json();
    } catch (error) {
        console.error('Error getting status:', error);
        return { total: 0, published: 0, draft: 0, isFullyPublished: false };
    }
}

// Get departments list
export async function getDepartments(): Promise<string[]> {
    try {
        const response = await fetch(`${API_URL}/api/exams/departments`);
        if (!response.ok) throw new Error('Failed to get departments');
        return await response.json();
    } catch (error) {
        console.error('Error getting departments:', error);
        return [];
    }
}

// Generate printable timetable HTML
export function generatePrintableHTML(exams: Exam[], subjects: Subject[], title: string): string {
    // Sort exams by date and time
    const sortedExams = [...exams].sort((a, b) => {
        const dateA = new Date(a.examDate + 'T' + a.startTime);
        const dateB = new Date(b.examDate + 'T' + b.startTime);
        return dateA.getTime() - dateB.getTime();
    });

    // Helper to get subject code
    const getSubjectCode = (courseName: string, semester: number) => {
        const subject = subjects.find(s => s.name === courseName && s.sem === semester);
        return subject ? subject.subjectCode : 'N/A';
    };

    // Helper to format date dd-mm-yyyy
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const rows = sortedExams.map((exam, index) => {
        const subjectCode = getSubjectCode(exam.courseName, exam.semester);
        return `
            <tr>
                <td style="text-align: center;">${index + 1}</td>
                <td style="text-align: center; font-weight: bold;">${subjectCode}</td>
                <td style="font-weight: bold; text-transform: uppercase;">${exam.courseName}</td>
                <td style="text-align: center; font-weight: bold;">${formatDate(exam.examDate)}</td>
                <td style="text-align: center; font-weight: bold;">
                    ${formatTo12Hour(exam.startTime)} – ${formatTo12Hour(exam.endTime)}
                </td>
            </tr>
        `;
    }).join('');

    // Department name mapping
    const departmentNames: Record<string, string> = {
        'CSE': 'Computer Science & Engineering',
        'ECE': 'Electronics & Communication Engineering',
        'EEE': 'Electrical & Electronics Engineering',
        'ME': 'Mechanical Engineering',
        'CE': 'Civil Engineering',
        'IT': 'Information Technology',
        'AIML': 'Artificial Intelligence & Machine Learning'
    };

    const departments = Array.from(new Set(exams.map(e => e.department)))
        .map(dept => departmentNames[dept] || dept)
        .join(' & ');

    // Helper function to convert number to ordinal (1st, 2nd, 3rd, 4th, etc.)
    const toOrdinal = (n: number): string => {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    // Convert semesters to ordinal format
    const semesterNumbers = Array.from(new Set(exams.map(e => e.semester))).sort();
    const semesters = semesterNumbers.map(toOrdinal).join(', ');

    // Get exam type (MSE I or MSE II) - use the first exam's type or default
    const examType = exams.length > 0 && exams[0].examType ? exams[0].examType : 'MSE';

    // Get test coordinator - use the first non-empty value or default
    const testCoordinator = exams.find(e => e.testCoordinator)?.testCoordinator || 'N/A';

    // Get Dept codes for signature
    const deptCodes = Array.from(new Set(exams.map(e => e.department))).join(' & ');
    // Enforce (Dept. of <Code>) format
    const hod = `(Dept. of ${deptCodes || 'CSE'})`;

    // Calculate academic years based on exam dates
    // Use simple calendar year range
    let minYear = Infinity;
    let maxYear = -Infinity;

    if (exams.length === 0) {
        const y = new Date().getFullYear();
        minYear = y;
        maxYear = y;
    } else {
        exams.forEach(e => {
            const y = new Date(e.examDate).getFullYear();
            if (y < minYear) minYear = y;
            if (y > maxYear) maxYear = y;
        });
    }

    // If all exams are within one year: 2026 -> 2026-2027
    // If spanning years: 2026, 2027 -> 2026-2027
    const academicYear = (minYear === maxYear)
        ? `${minYear}-${minYear + 1}`
        : `${minYear}-${maxYear}`;

    // Format Exam Type Description
    let examTitlePart = 'EXAMINATION';
    if (examType === 'MSE I') {
        examTitlePart = 'FIRST MID-SEM EXAM [MSE-I]';
    } else if (examType === 'MSE II') {
        examTitlePart = 'SECOND MID-SEM EXAM [MSE-II]';
    } else {
        examTitlePart = `${examType}`;
    }

    return `
<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
    <style>
        body { 
            font-family: "Times New Roman", Times, serif; 
            padding: 20px; 
            max-width: 1000px; 
            margin: 0 auto; 
            color: #000;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 0px solid #000;
            padding-bottom: 10px;
        }
        .logo-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            margin-bottom: 10px;
        }
        .logo-text {
            font-size: 24px;
            font-weight: bold;
            font-family: Arial, sans-serif;
            letter-spacing: 1px;
        }
        .logo-sub {
            font-size: 14px;
            font-weight: normal;
            display: block;
        }
        .department-title {
            font-size: 22px;
            font-weight: bold;
            text-transform: uppercase;
            margin: 40px 0 5px;
            font-family: Arial, sans-serif;
        }
        .exam-title {
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
            font-family: Arial, sans-serif;
            margin-bottom: 5px;
        }
        /* Exam type row removed as it is now part of the title */
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 20px; 
            font-family: Arial, sans-serif;
            font-size: 14px;
        }
        th, td { 
            border: 1px solid #000; 
            padding: 8px 10px; 
            text-align: left; 
            vertical-align: middle;
        }
        th { 
            background: #d1d5db; /* Light gray for print */
            color: #000; 
            font-weight: bold;
            text-align: center;
        }
        .footer {
            margin-top: 100px; /* Shifted down further as requested */
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            font-family: Arial, sans-serif;
            font-weight: bold;
            font-size: 14px;
            padding: 0 20px;
        }
        .signature {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px; /* Reduced gap between title and name */
            padding-top: 40px; /* Space for physical signature above */
        }

        @media print { 
            @page { margin: 0; }
            body { margin: 1.5cm; } 
            .no-print { display: none; }
            th { background-color: #d1d5db !important; -webkit-print-color-adjust: exact; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo-row">
            <img src="/nitte-logo.png" alt="Nitte Logo" style="max-width: 100%; height: auto; max-height: 80px;" />
        </div>
        
        <div class="department-title">
            DEPARTMENT OF ${departments ? departments : 'COMPUTER SCIENCE & ENGINEERING'}
        </div>
        <div class="exam-title">
             ${semesters ? semesters : ''} SEMESTER – ${examTitlePart} TIMETABLE (${academicYear})
        </div>
    </div>

    <table>
        <colgroup>
            <col style="width: 8%;">
            <col style="width: 15%;">
            <col style="width: 42%;">
            <col style="width: 15%;">
            <col style="width: 20%;">
        </colgroup>
        <thead>
            <tr>
                <th>Sl.no</th>
                <th>Sub-code</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Time</th>
            </tr>
        </thead>
        <tbody>
            ${rows}
        </tbody>
    </table>

    <div class="footer">
        <div class="signature">
            <div style="border-top: 1px solid #000; width: 200px; margin-bottom: 5px;"></div>
            <span style="font-weight: bold; font-family: Arial, sans-serif; font-size: 22px;">Test Coordinator</span>
            <span style="font-size: 18px; font-weight: normal; margin-top: 5px;">${testCoordinator}</span>
        </div>
        


        <div class="signature">
             <div style="border-top: 1px solid #000; width: 200px; margin-bottom: 5px;"></div>
             <span style="font-weight: bold; font-family: Arial, sans-serif; font-size: 22px;">HOD</span>
             <span style="font-size: 18px; font-weight: normal;">${hod}</span>
        </div>
    </div>
</body>
</html>`;
}

// Print timetable
export function printTimetable(exams: Exam[], subjects: Subject[], title: string = 'Examination Timetable'): void {
    const html = generatePrintableHTML(exams, subjects, title);

    // Create an invisible iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none'; // Or style.position='absolute'; style.width='0'; style.height='0';
    document.body.appendChild(iframe);

    // Write content to iframe
    const doc = iframe.contentWindow?.document;
    if (doc) {
        doc.open();
        doc.write(html);
        doc.close();

        // Wait for content to load then print
        iframe.contentWindow?.focus();
        // Small timeout to ensure styles/content are ready
        setTimeout(() => {
            iframe.contentWindow?.print();
            // Remove iframe after printing logic is initiated (user closes print dialog)
            // Note: There is no standard way to know when print dialog closes, 
            // but removing it after a longer timeout or keeping it until next print is okay.
            // For safety, let's remove it after a minute or relying on garbage collection isn't enough for DOM.
            // A common pattern is to remove it after a sufficient delay.
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 1000); // 1 second should be enough for the print command to register
        }, 500);
    }
}

// Download timetable as PDF (exact same as print preview)
export async function downloadTimetable(exams: Exam[], subjects: Subject[], title: string = 'Examination Timetable'): Promise<void> {
    // Generate the exact same HTML as print
    const html = generatePrintableHTML(exams, subjects, title);

    // Create hidden iframe to render HTML
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.top = '-9999px';
    iframe.style.width = '800px';
    iframe.style.height = 'auto';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
        document.body.removeChild(iframe);
        throw new Error('Could not access iframe document');
    }

    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();

    // Wait for content to render
    await new Promise(resolve => setTimeout(resolve, 100));

    // Get actual content height
    const contentHeight = iframeDoc.body.scrollHeight;
    iframe.style.height = contentHeight + 'px';

    // Import html2canvas dynamically
    const html2canvas = (await import('html2canvas')).default;

    // Capture only the content area
    const canvas = await html2canvas(iframeDoc.body, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 800,
        height: contentHeight,
        windowWidth: 800
    });

    // Remove iframe
    document.body.removeChild(iframe);

    // Create PDF from canvas - fit to single page
    const imgData = canvas.toDataURL('image/png');
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // If content fits on one page, just add it
    if (imgHeight <= pageHeight - 20) {
        doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    } else {
        // Scale down to fit on one page
        const scaleFactor = (pageHeight - 20) / imgHeight;
        const scaledWidth = imgWidth * scaleFactor;
        const scaledHeight = imgHeight * scaleFactor;
        const xOffset = (pageWidth - scaledWidth) / 2;
        doc.addImage(imgData, 'PNG', xOffset, 10, scaledWidth, scaledHeight);
    }

    // Generate filename
    const dept = exams[0]?.department || 'Exam';
    const sem = exams[0]?.semester || '';
    const examType = (exams[0]?.examType || 'Timetable').replace(' ', '_');
    doc.save(`${dept}_Sem${sem}_${examType}_Timetable.pdf`);
}

