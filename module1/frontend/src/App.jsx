import { useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';

// Components (Pages)
import DashboardPage from './Pages/Dashboard/DashboardPage'

import Menubar from './Components/Menubar';
import Alert from './Components/Alert';
import Confirm from './Components/Confirm';
import NotFound from './Pages/NotFound/NotFound';
import SettingsPage, { changeTheme, changeAccent } from './Pages/Settings/SettingsPage';
import ExamTimetablePage from './Pages/ExamTimetable/ExamTimetablePage';
import PublishedTimetablePage from './Pages/ExamTimetable/PublishedTimetablePage';
import AboutUsPage from './Pages/AboutUs/AboutUsPage';
import LoginPage from './Pages/Login/LoginPage';
import ForgotPasswordPage from './Pages/Login/ForgotPasswordPage';
import RegisterPage from './Pages/Login/RegisterPage';

import ProfilePage from './Pages/Profile/ProfilePage';

// Styles
import './App.css'
import "./Style/BasicComponents.css"
import "./Style/UnifiedPages.css"



// Contexts
import { AlertProvider } from './Components/AlertContextProvider';
import { ConfirmProvider } from './Components/ConfirmContextProvider';
import { AuthProvider, useAuth } from './Components/AuthContext';
import { NotificationProvider } from './Components/NotificationContext';

function ProtectedRoute({ children }) {
	const { user, loading } = useAuth();

	if (loading) return null; // Wait for auth check

	if (!user) {
		return <Navigate to="/login" replace />;
	}
	return children;
}

function App() {
	return (
		<AlertProvider>
			<ConfirmProvider>
				<AuthProvider>
					<NotificationProvider>
						<BrowserRouter>
							<MainApp />
						</BrowserRouter>
					</NotificationProvider>
				</AuthProvider>
			</ConfirmProvider>
		</AlertProvider>
	)
}

function MainApp() {
	const app = useRef(null)
	const location = useLocation();
	const { user, loading } = useAuth();

	const isPublicPage = location.pathname === '/login' || location.pathname === '/forgot-password';
	const shouldShowLayout = user && !isPublicPage;


	function autoToggleInResize() {
		if (window.innerWidth <= 1250) {
			if (app.current)
				app.current.classList.add("active");
		} else {
			if (app.current)
				app.current.classList.remove("active");
		}
	}

	useEffect(() => {
		if (shouldShowLayout) {
			autoToggleInResize();
			window.addEventListener("resize", () => {
				autoToggleInResize()
			})
		}

		// Initialize Theme from LocalStorage
		const savedTheme = localStorage.getItem('theme') || 'Light';
		changeTheme(savedTheme);

		// Initialize Accent Color from LocalStorage
		const savedAccent = localStorage.getItem('accentColor') || '#2563eb';
		changeAccent(savedAccent);

		return () => {
			if (shouldShowLayout) {
				window.removeEventListener("resize", () => {
					autoToggleInResize()
				})
			}
		}
	}, [shouldShowLayout])

	if (loading) return null;

	return (
		<div className={`app light ${!shouldShowLayout ? 'login-layout' : ''}`} ref={app} style={!shouldShowLayout ? { display: 'block' } : {}}>
			<Alert />
			<Confirm />
			{shouldShowLayout && <Menubar />}

			<div className={shouldShowLayout ? 'main-container' : ''}>
				<Routes>
					<Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/forgot-password" element={<ForgotPasswordPage />} />

					<Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
					<Route path="/ExamTimetable" element={<ProtectedRoute><ExamTimetablePage /></ProtectedRoute>} />
					<Route path="/ViewTimetable" element={<ProtectedRoute><PublishedTimetablePage /></ProtectedRoute>} />
					<Route path="/Settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
					<Route path="/Profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
					<Route path="/AboutUs" element={<ProtectedRoute><AboutUsPage /></ProtectedRoute>} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
