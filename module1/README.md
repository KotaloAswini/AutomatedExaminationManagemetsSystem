# Automated Exam Management System (AEMS)

A comprehensive web application for scheduling and managing academic exams efficiently.

## 📚 Documentation
Access the comprehensive **User Manual** directly within the application via the **Docs** link in the sidebar. It covers:
- Dashboard features
- Timetable management
- User settings and profile management

## 🛠️ Tech Stack
- **React**: User Interface Library
- **Spring Boot**: Java Application Framework
- **MongoDB**: Document-Oriented Database
- **Vite**: Frontend Build Tool

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- **Node.js**: v18 or higher
- **Java**: JDK 21
- **MongoDB**: Running locally or via Atlas

### 1. Database Setup
Ensure your local MongoDB instance is running.

### 2. Backend Setup
Navigate to the backend directory and start the Spring Boot application.

```bash
cd backend
# Run using Maven wrapper
./mvnw spring-boot:run
```
*The backend server will start at `http://localhost:8080`*

### 3. Frontend Setup
Navigate to the frontend directory, install dependencies, and start the development server.

```bash
cd frontend
# Install dependencies
npm install
# Start the dev server
npm run dev
```
*The frontend application will run at `http://localhost:5173`*

## 🔐 User Authentication
Secure access to the AEMS platform is managed through a robust authentication system.

### 1. Login
Registered users can access their accounts using the login form:
- **Username**: Enter your unique username (e.g., *lalan.kumar*).
- **Password**: Enter your secure password.
- **Visibility Toggle**: Click the eye icon to reveal your password while typing.

> **Error Handling:** If credentials are incorrect, an "Invalid login, please try again" message will appear.

### 2. Create Account (Sign Up)
New users can register for an account by providing the following details:
- **Full Name**: Your official name as it should appear on records.
- **Username**: A unique identifier for your account.
- **Email**: A valid email address for communication and recovery.
- **Password**: Create a strong password and confirm it in the "Repeat your password" field.

### 3. Forgot Password
If you lose access to your account, follow these steps to recover it:
1.  **Request Reset**: Click **Forgot password?** on the login page, enter your registered **Email Address**, and click **Send Reset Link**.
2.  **Verify OTP**: Check your email for a 6-digit verification code. Enter it on the verification screen and click **Verify OTP**.
3.  **Set New Password**: Enter your new password and confirm it. Click **Update Password**.
4.  **Success**: Upon successful reset, you will see a confirmation message. Click **Go to Login** to sign in with your new password.

## 📸 Screenshots

### Dashboard
| Light Mode | Dark Mode |
| --- | --- |
| ![Dashboard](./frontend/images/dashboard.png) | ![Dashboard Dark](./frontend/images/dashboard-dark.png) |

The Dashboard serves as the central hub of the application. It provides a quick overview of system status, upcoming exams, and recent activities.

#### 1. Overview & Quick Actions
- **Welcome Section**: Personalized greeting with a **+ New Schedule** button for quick access.
- **Stats Cards**: Real-time counts for **Subjects**, **Exams**, **Drafts**, and **Published** schedules.

#### 2. Workflow Tracker
A visual progress bar tracking the exam scheduling process:
- **Subjects**: Number of loaded subjects.
- **Draft**: Exams currently in the planning stage.
- **Published**: Finalized exams visible to students.

#### 3. Widgets & Insights
- **My Profile**: Displays user details (Name, Role, Dept) and a link to the full profile.
- **System Status**: Real-time indicators for **System API** and **Database** connectivity.
- **Recent Activity**: A log of recently updated courses and exams.
- **Insights**: Graphical representation of data, such as **Semester Distribution**.

### Exam Timetable Management
The **Examination Timetable** section allows administrators to schedule exams, manage conflicts, and finalize the timetable before publishing.

#### 1. Schedule Exam Form
To schedule a new exam, fill out the following fields:
- **Department & Semester**: Select the target student group (e.g., CSE, SEM 1).
- **Course**: Choose the specific subject for the exam.
- **Exam Type**: Specify the assessment category (e.g., MSE I).
- **Date & Time Slot**: Set the exam schedule (e.g., Morning 09:30 AM - 11:00 AM).
- **Test Coordinator & HOD**: Assign responsible faculty members.

Click **Add Exam** to add it to the draft list.

#### 2. Conflict Management
The system automatically detects scheduling conflicts:
- **Visual Alerts**: A "Conflicts Detected" banner appears if exams overlap for the same students.
- **Auto-Resolve**: Click the **Auto-Resolve Conflicts** button to automatically adjust schedules.
- **Conflict Counter**: A badge (e.g., "1 CONFLICT(S)") indicates the number of unresolved issues.

#### 3. Draft Timetable View
Exams are initially added as drafts:
- **Status**: Marked as **DRAFT** until published.
- **Actions**: Use the **Edit** (pencil) or **Delete** (trash) icons to modify entries.
- **Publish**: Click **Publish Timetable** to finalize and make the schedule visible to students.


### Published Timetable View
The **Published Examination Timetable** allows users to view, search, and manage confirmed exam schedules.

#### 1. Filters & Search
Techniques to refine the displayed timetable:
- **Department**: Filter exams by specific departments (e.g., CSE).
- **Semester**: View exams for a particular semester.
- **Exam Type**: Filter by exam category (e.g., MSE I, MSE II).
- **Search Bar**: Quickly find exams by name or date.

#### 2. Timetable View
The data table presents the following information:
- **Date & Time**: When the exam is scheduled.
- **Exam Type**: The category of the assessment.
- **Department & Semester**: The target student group.
- **Course**: The subject of the exam (e.g., Database Management System).

#### 3. Actions
Authorized users can perform the following actions:
- **Edit (Pencil Icon)**: Modify exam details.
    - *Note:* A confirmation modal will appear: "**Edit published exam? May affect schedules.**"
- **Delete (Trash Icon)**: Permanently remove an exam.
    - *Warning:* You will be asked to confirm: "**Permanently delete this exam?**"

### User Profile
- **Name**: Your full name displayed across the platform.
- **Username**: Unique identifier for logging in and mentions.
- **Designation**: Your professional title (e.g., Associate Professor).
- **Department**: The academic department you belong to (e.g., CSE).
- **Phone Number**: To get the blue verification badge.
- **Email Address**: Registered email for account recovery and communication.


### Settings & Customization
| Light Mode | Dark Mode |
| --- | --- |
| ![Settings](./frontend/images/settings.png) | ![Settings Dark](./frontend/images/settings-dark.png) |

### Print Preview
![Print Format](./frontend/images/exam-timetable-print.png)


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

