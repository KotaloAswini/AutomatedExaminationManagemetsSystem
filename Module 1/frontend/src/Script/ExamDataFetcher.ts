import { url as API_URL } from './fetchUrl';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
export function generatePrintableHTML(exams: Exam[], title: string): string {
    const groupedByDate = exams.reduce((acc, exam) => {
        if (!acc[exam.examDate]) acc[exam.examDate] = [];
        acc[exam.examDate].push(exam);
        return acc;
    }, {} as Record<string, Exam[]>);

    const rows = Object.entries(groupedByDate)
        .sort(([a], [b]) => a.localeCompare(b))
        .flatMap(([date, dateExams]) => {
            const dateObj = new Date(date);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
            const dateDisplay = `${formattedDate}<br/>${dayName}`;
            
            return dateExams.map((exam, idx) => `
                <tr>
                    ${idx === 0 ? `<td rowspan="${dateExams.length}" class="date-cell">${dateDisplay}</td>` : ''}
                    <td>Semester ${exam.semester}</td>
                    <td>${exam.courseName}</td>
                    <td>${formatTo12Hour(exam.startTime)} - ${formatTo12Hour(exam.endTime)}</td>
                    <td>${exam.hallId || '-'}</td>
                </tr>
            `);
        }).join('');

    return `
<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { text-align: center; color: #333; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background: #6366f1; color: white; }
        .date-cell { background: #f3f4f6; font-weight: bold; }
        @media print { body { padding: 0; } }
    </style>
</head>
<body>
    <h1>${title}</h1>
    <p>Generated: ${new Date().toLocaleString()}</p>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Semester</th>
                <th>Course</th>
                <th>Time</th>
                <th>Room No</th>
            </tr>
        </thead>
        <tbody>${rows}</tbody>
    </table>
</body>
</html>`;
}

// Print timetable
// Print timetable
export function printTimetable(exams: Exam[], title: string = 'Examination Timetable'): void {
    const html = generatePrintableHTML(exams, title);

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

// Download timetable as PDF
export function downloadTimetable(exams: Exam[], title: string = 'Examination Timetable'): void {
    try {
        console.log('Starting PDF generation...');
        const doc = new jsPDF();
        console.log('jsPDF instance created');

        // Title
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        const textWidth = doc.getTextWidth(title);
        const pageWidth = doc.internal.pageSize.getWidth();
        const x = (pageWidth - textWidth) / 2;
        doc.text(title, x, 22);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

        // Prepare table data
        const groupedByDate = exams.reduce((acc, exam) => {
            if (!acc[exam.examDate]) acc[exam.examDate] = [];
            acc[exam.examDate].push(exam);
            return acc;
        }, {} as Record<string, Exam[]>);

        const sortedDates = Object.keys(groupedByDate).sort();

        const tableRows = sortedDates.flatMap(date => {
            const dateExams = groupedByDate[date];
            const dateObj = new Date(date);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
            const dateDisplay = `${formattedDate}\n${dayName}`;
            
            return dateExams.map(exam => [
                dateDisplay,
                `Semester ${exam.semester}`,
                exam.courseName,
                `${formatTo12Hour(exam.startTime)} - ${formatTo12Hour(exam.endTime)}`,
                exam.hallId || '-'
            ]);
        });
        console.log('Table rows prepared:', tableRows.length);

        autoTable(doc, {
            head: [['Date', 'Semester', 'Course', 'Time', 'Room No']],
            body: tableRows,
            startY: 35,
            theme: 'grid',
            headStyles: { fillColor: [99, 102, 241] }, // Indigo color
            columnStyles: {
                0: { fontStyle: 'bold' }
            },
            styles: { fontSize: 10, cellPadding: 3 },
        });
        console.log('autoTable executed');

        // Explicitly create blob and download to ensure filename is respected
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exam_timetable.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('PDF saved manually');
    } catch (error) {
        console.error('PDF Generation Error:', error);
        alert(`Failed to download PDF: ${error instanceof Error ? error.message : String(error)}`);
    }
}
