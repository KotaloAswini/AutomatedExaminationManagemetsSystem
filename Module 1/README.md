# Timetable Generation System

A web application for creating and managing examination timetables.

## Tech Stack

- **Frontend**: React, JavaScript, Vite
- **Backend**: Java, Spring Boot
- **Database**: MongoDB

## How to Run

### Prerequisites

- Node.js v18+
- Java 21
- MongoDB (running on localhost:27017)

### Step 1: Start MongoDB

Make sure MongoDB is running on your system.

### Step 2: Start Backend

```bash
cd backend
./mvnw spring-boot:run
```

### Step 3: Start Frontend

```bash
cd frontend
npm install
npm run dev
```

### Step 4: Open the App

## Database Configuration

The backend supports both Local MongoDB and MongoDB Atlas (Cloud). You can switch between them in `backend/src/main/resources/application.properties`.

### 1. Local Database (Default)
Use this for local development. Ensure MongoDB is running locally.
```properties
# Local Database Storage
spring.data.mongodb.uri=mongodb://localhost:27017/timetabledb
```

### 2. Online Database (MongoDB Atlas)
Use this to connect to a cloud database.
```properties
# Online Database Storage
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@<cluster-url>/timetabledb?appName=AEMS
```

### Exam Timetable Printing

The printable format can be accessed via the "Print" button and supports both direct printing and PDF export.

![Exam Timetable Print Format](./frontend/images/exam-timetable-print.png)

## Screenshots

### Dashboard
| Light Mode | Dark Mode |
|Data | Data |
| ![Dashboard](./frontend/images/dashboard.png) | ![Dashboard Dark](./frontend/images/dashboard-dark.png) |

### Exam Timetable
![Exam Timetable](./frontend/images/exam-timetable.png)

### Published Timetable
![Published Timetable](./frontend/images/published-timetable.png)

### Settings
| Light Mode | Dark Mode |
|Data | Data |
| ![Settings](./frontend/images/settings.png) | ![Settings Dark](./frontend/images/settings-dark.png) |

