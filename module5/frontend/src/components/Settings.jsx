import React, { useState, useEffect } from 'react';
import './Settings.css';

const Settings = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check local storage or system preference on mount
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.body.classList.add('dark');
        } else {
            setDarkMode(false);
            document.body.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);

        if (newMode) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <div className="settings-container">
            <h1 className="settings-title">Settings</h1>

            <div className="settings-section">
                <h2 className="section-title">Appearance</h2>
                <div className="setting-item">
                    <div className="setting-info">
                        <h3>Dark Mode</h3>
                        <p>Switch between light and dark themes</p>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={toggleDarkMode}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

            <div className="settings-section">
                <h2 className="section-title">About System</h2>
                <div className="setting-item">
                    <div className="setting-info">
                        <h3>Version</h3>
                        <p>Duty Exchange System v1.0.0</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
