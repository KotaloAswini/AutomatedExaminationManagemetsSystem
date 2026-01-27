import { useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components (Pages)
import DashboardPage from './Pages/Dashboard/DashboardPage'

import Menubar from './Components/Menubar';
import Alert from './Components/Alert';
import Confirm from './Components/Confirm';
import NotFound from './Pages/NotFound/NotFound';
import SettingsPage, { changeTheme } from './Pages/Settings/SettingsPage';
import ExamTimetablePage from './Pages/ExamTimetable/ExamTimetablePage';
import PublishedTimetablePage from './Pages/ExamTimetable/PublishedTimetablePage';

// Styles
import './App.css'
import "./Style/BasicComponents.css"
import "./Style/UnifiedPages.css"

// Scripts

import { addWindowCloseEventHandler, removeWindowCloseEventHandler } from './Script/commonJS';

// Contexts
import { AlertProvider, useAlert } from './Components/AlertContextProvider';
import { ConfirmProvider, useConfirm } from './Components/ConfirmContextProvider';


function App() {
	return (
		<AlertProvider>
			<ConfirmProvider>
				<BrowserRouter>
					<MainApp />
				</BrowserRouter>
			</ConfirmProvider>
		</AlertProvider>
	)
}

function MainApp() {
	const app = useRef(null)

	const { showWarningConfirm } = useConfirm()
	const { showError } = useAlert()

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
		autoToggleInResize();
		window.addEventListener("resize", () => {
			autoToggleInResize()
		})
		addWindowCloseEventHandler(showWarningConfirm, showError)

		// Initialize Theme from LocalStorage
		const savedTheme = localStorage.getItem('theme') || 'Light';
		changeTheme(savedTheme);

		return () => {
			window.removeEventListener("resize", () => {
				autoToggleInResize()
			})
			removeWindowCloseEventHandler()
		}
	}, [showError, showWarningConfirm])

	return (
		<div className='app light' ref={app}>
			<Alert />
			<Confirm />
			<Menubar />

			<div className='main-container'>
				<Routes>
					<Route path="/" element={<DashboardPage />} />

					<Route path="/ExamTimetable" element={<ExamTimetablePage />} />
					<Route path="/ViewTimetable" element={<PublishedTimetablePage />} />
					<Route path="/Settings" element={<SettingsPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
