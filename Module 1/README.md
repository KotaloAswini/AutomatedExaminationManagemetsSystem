# Timetable Generation System

A full-stack application for managing and generating examination timetables. Part of an **Automated Examination Management System** designed to streamline exam scheduling, seating allotment, invigilation duties, and documentation generation.

## 📸 Screenshots

### Dashboard
| Light Mode | Dark Mode |
|------------|-----------|
| ![Dashboard Light Mode](./frontend/images/dashboard.png) | ![Dashboard Dark Mode](./frontend/images/dashboard-dark.png) |

### Exam Timetable
![Exam Timetable Screenshot](./frontend/images/exam-timetable.png)

### Published Timetable
![Published Timetable Screenshot](./frontend/images/published-timetable.png)

### Settings & Contributors
| Light Mode | Dark Mode |
|------------|-----------|
| ![Settings Light Mode](./frontend/images/settings.png) | ![Settings Dark Mode](./frontend/images/settings-dark.png) |

## ✨ Features

### Core Capabilities
- **📊 Dashboard**: Central control panel for managing all examination activities
- **📚 Subject Management**: Add, organize, and manage course subjects
- **📅 Timetable Generation**: Create conflict-free examination schedules
- **📝 Draft & Publish Workflow**: Refine schedules before making them live
- **🌓 Dark/Light Mode**: Toggle between themes for comfortable viewing

### Quick Stats & Actions
- Real-time statistics: subjects count, scheduled exams, drafts, published timetables
- Quick shortcuts: schedule exams, view timetables, access settings
- Recent activity tracking
- System health monitoring (server & database status)


## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, TypeScript, Vite 6 |
| **Backend** | Java 21, Spring Boot 3.4 |
| **Database** | MongoDB (Docker) |
| **Build Tools** | Maven, npm |
| **Libraries** | jsPDF, SheetJS (xlsx), PapaParse, React Router 7 |


### Prerequisites

- **Node.js** v18+ (for Frontend)
- **Java 21** (for Backend)
- **Docker** (for MongoDB)



**Start the Frontend** (Vite dev server - runs on port 5173)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   ### Backend (`backend/src/main/resources/application.properties`)
```properties
spring.application.name=timetable-backend
spring.data.mongodb.uri=mongodb://localhost:27017/timetabledb
server.port=8080
```

**Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080


### Docker Compose (`docker-compose.yml`)
- MongoDB runs on port **27017**
- Database name: `timetabledb`
- Data persisted in Docker volume `mongodb_data`


## 🔮 Future Modules (Roadmap)

This timetable system is designed to be part of a larger **Automated Examination Management System**:

1. **Seating Allotment Module** - Intelligent student distribution across halls
2. **Invigilation Duty Module** - Fair duty allocation with load balancing
3. **B-Form Generation Module** - Print-ready examination documentation
4. **Duty Exchange System** - Faculty duty swap with approval workflow

