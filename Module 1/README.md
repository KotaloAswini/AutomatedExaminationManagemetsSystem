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

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080

## Features

- Dashboard with stats and quick actions
- Create and manage exam timetables
- Draft and publish workflow
- Export to PDF/Excel
- Dark/Light mode

## Screenshots

### Dashboard
![Dashboard](./frontend/images/dashboard.png)

### Exam Timetable
![Exam Timetable](./frontend/images/exam-timetable.png)

### Settings
![Settings](./frontend/images/settings.png)

