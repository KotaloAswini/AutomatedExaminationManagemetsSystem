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

### Export Options
- **PDF Export**: Generate print-ready timetables using jsPDF
- **Excel Export**: Export data to spreadsheets using SheetJS
- **Email Notifications**: Send timetables via EmailJS

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, TypeScript, Vite 6 |
| **Backend** | Java 21, Spring Boot 3.4 |
| **Database** | MongoDB (Docker) |
| **Build Tools** | Maven, npm |
| **Libraries** | jsPDF, SheetJS (xlsx), PapaParse, React Router 7 |

## 📁 Project Structure

```
Time-Table-Scheduler-ReactJS/
├── backend/                    # Spring Boot API
│   ├── src/main/java/         # Java source files
│   ├── src/main/resources/    # Application properties
│   └── pom.xml                # Maven configuration
├── frontend/                   # React application
│   ├── src/
│   │   ├── Components/        # Reusable UI components
│   │   ├── Pages/             # Page components (Dashboard, ExamTimetable, Settings)
│   │   ├── Icons/             # SVG icon components
│   │   ├── Script/            # Utility functions & API fetchers
│   │   ├── Style/             # CSS stylesheets
│   │   └── data/              # TypeScript types
│   ├── package.json           # npm dependencies
│   └── vite.config.ts         # Vite configuration
├── docker-compose.yml          # MongoDB container setup
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ (for Frontend)
- **Java 21** (for Backend)
- **Docker** (for MongoDB)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Time-Table-Scheduler-ReactJS
   ```

2. **Start the Database** (MongoDB via Docker)
   ```bash
   docker-compose up -d
   ```

3. **Start the Backend** (Spring Boot - runs on port 8080)
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   On Windows:
   ```cmd
   cd backend
   mvnw.cmd spring-boot:run
   ```

4. **Start the Frontend** (Vite dev server - runs on port 5173)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080

## ⚙️ Configuration

### Backend (`backend/src/main/resources/application.properties`)
```properties
spring.application.name=timetable-backend
spring.data.mongodb.uri=mongodb://localhost:27017/timetabledb
server.port=8080
```

### Docker Compose (`docker-compose.yml`)
- MongoDB runs on port **27017**
- Database name: `timetabledb`
- Data persisted in Docker volume `mongodb_data`

## 📜 Available Scripts

### Frontend
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Backend
| Command | Description |
|---------|-------------|
| `./mvnw spring-boot:run` | Start Spring Boot server |
| `./mvnw clean install` | Build the project |
| `./mvnw test` | Run tests |

## 🔮 Future Modules (Roadmap)

This timetable system is designed to be part of a larger **Automated Examination Management System**:

1. **Seating Allotment Module** - Intelligent student distribution across halls
2. **Invigilation Duty Module** - Fair duty allocation with load balancing
3. **B-Form Generation Module** - Print-ready examination documentation
4. **Duty Exchange System** - Faculty duty swap with approval workflow

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes.
