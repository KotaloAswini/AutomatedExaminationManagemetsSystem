import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DutyExchangeForm.css';

const DutyExchangeForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        allotted: {
            name: '',
            dutyType: '',
            date: '',
            facultySignature: '',
            hodSignature: '',
        },
        exchangedWith: {
            name: '',
            dutyType: '',
            date: '',
            facultySignature: '',
            hodSignature: '',
        },
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('info'); // 'success', 'error', 'info'

    const showCustomAlert = (message, type = 'info') => {
        setModalMessage(message);
        setModalType(type);
        setShowModal(true);
        // Auto-hide after 1.5 seconds
        setTimeout(() => setShowModal(false), 1500);
    };

    const handleChange = (section, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    const handleFileChange = (section, field, event) => {
        const file = event.target.files[0];
        if (file) {
            // Create a fake local URL for preview
            const previewUrl = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: previewUrl } }));
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    const validateForm = () => {
        const sections = ['allotted', 'exchangedWith'];
        for (const section of sections) {
            for (const key in formData[section]) {
                if (!formData[section][key]) {
                    showCustomAlert(`Required: ${formatLabel(key)} (${section === 'allotted' ? 'Allotted Duty' : 'Duty Exchanged With'})`, 'error');
                    return false;
                }
            }
        }
        return true;
    };

    const handleCreation = () => {
        console.log('Form Created:', formData);
        showCustomAlert('Duty Exchange Form Created Successfully!', 'success');
    };

    const handlePrint = async () => {
        if (!validateForm()) return;

        try {
            // Send data to backend before printing
            const response = await fetch('http://localhost:8080/api/duty-exchange', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Data saved to backend');
                window.print();
            } else {
                console.error('Failed to save data');
                showCustomAlert('Failed to save data to backend, but printing will proceed.', 'error');
                // Optional: still allow print?
                window.print();
            }
        } catch (error) {
            console.error('Error saving data:', error);
            showCustomAlert('Error connecting to backend.', 'error');
            // Allow print anyway?
            window.print();
        }
    };

    const handleUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        console.log('File Uploaded:', file.name);

        // Create a blob URL for the file
        const fileUrl = URL.createObjectURL(file);

        // Save to localStorage for the preview page to access later
        localStorage.setItem('previewFileUrl', fileUrl);
        localStorage.setItem('previewFileName', file.name);

        showCustomAlert(`File "${file.name}" uploaded successfully! You can view it in 'View Timetable'.`, 'success');
    };

    return (
        <div className="form-container">
            <header className="form-header">
                <h2>NMIT, BENGALURU</h2>
                <h3>MSE DUTY EXCHANGE FORM</h3>
            </header>

            <div className="form-grid">
                {/* Allotted Duty Section */}
                <div className="form-section">
                    <h4 className="section-title">ALLOTTED DUTY</h4>
                    {Object.keys(formData.allotted).map((key) => (
                        <div key={`allotted-${key}`} className="form-group">
                            <label>{formatLabel(key)}</label>
                            {key === 'dutyType' ? (
                                <select
                                    value={formData.allotted[key]}
                                    onChange={(e) => handleChange('allotted', key, e.target.value)}
                                >
                                    <option value="">Select Duty Type</option>
                                    <option value="MSE">MSE</option>
                                    <option value="SEE">SEE</option>
                                </select>
                            ) : key.includes('Signature') ? (
                                <div className="signature-container">
                                    {formData.allotted[key] ? (
                                        <div className="signature-preview-wrapper">
                                            <img
                                                src={formData.allotted[key]}
                                                alt="Signature"
                                                className="signature-preview"
                                            />
                                            <button
                                                className="btn-clear-signature"
                                                onClick={() => handleChange('allotted', key, '')}
                                                title="Change Signature"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange('allotted', key, e)}
                                            className="file-input"
                                        />
                                    )}
                                </div>
                            ) : (
                                <input
                                    type={key === 'date' ? 'date' : 'text'}
                                    value={formData.allotted[key]}
                                    onChange={(e) => handleChange('allotted', key, e.target.value)}
                                    placeholder={`Enter ${formatLabel(key)}`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Duty Exchanged With Section */}
                <div className="form-section">
                    <h4 className="section-title">DUTY EXCHANGED WITH</h4>
                    {Object.keys(formData.exchangedWith).map((key) => (
                        <div key={`exchangedWith-${key}`} className="form-group">
                            <label>{formatLabel(key)}</label>
                            {key === 'dutyType' ? (
                                <select
                                    value={formData.exchangedWith[key]}
                                    onChange={(e) => handleChange('exchangedWith', key, e.target.value)}
                                >
                                    <option value="">Select Duty Type</option>
                                    <option value="MSE">MSE</option>
                                    <option value="SEE">SEE</option>
                                </select>
                            ) : key.includes('Signature') ? (
                                <div className="signature-container">
                                    {formData.exchangedWith[key] ? (
                                        <div className="signature-preview-wrapper">
                                            <img
                                                src={formData.exchangedWith[key]}
                                                alt="Signature"
                                                className="signature-preview"
                                            />
                                            <button
                                                className="btn-clear-signature"
                                                onClick={() => handleChange('exchangedWith', key, '')}
                                                title="Change Signature"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange('exchangedWith', key, e)}
                                            className="file-input"
                                        />
                                    )}
                                </div>
                            ) : (
                                <input
                                    type={key === 'date' ? 'date' : 'text'}
                                    value={formData.exchangedWith[key]}
                                    onChange={(e) => handleChange('exchangedWith', key, e.target.value)}
                                    placeholder={`Enter ${formatLabel(key)}`}
                                />
                            )}
                        </div>
                    ))}
                </div>

            </div>

            {/* Print-Only Table Layout */}
            <div className="printable-form">
                <table className="print-table">
                    <thead>
                        <tr>
                            <th colSpan="4" className="print-header-main">NMIT, BENGALURU</th>
                        </tr>
                        <tr>
                            <th colSpan="4" className="print-header-sub">MSE DUTY EXCHANGE FORM</th>
                        </tr>
                        <tr>
                            <th colSpan="2">ALLOTTED DUTY</th>
                            <th colSpan="2">DUTY EXCHANGED WITH</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="label-cell">Name of the Faculty</td>
                            <td className="value-cell">{formData.allotted.name}</td>
                            <td className="label-cell">Name of the Faculty</td>
                            <td className="value-cell">{formData.exchangedWith.name}</td>
                        </tr>
                        <tr>
                            <td className="label-cell">Type of Duty</td>
                            <td className="value-cell">{formData.allotted.dutyType}</td>
                            <td className="label-cell">Type of Duty</td>
                            <td className="value-cell">{formData.exchangedWith.dutyType}</td>
                        </tr>
                        <tr>
                            <td className="label-cell">Date of Exchange</td>
                            <td className="value-cell">{formatDate(formData.allotted.date)}</td>
                            <td className="label-cell">Date of Exchange</td>
                            <td className="value-cell">{formatDate(formData.exchangedWith.date)}</td>
                        </tr>
                        <tr className="signature-row">
                            <td className="label-cell">Signature of the Faculty</td>
                            <td className="value-cell">
                                {formData.allotted.facultySignature && (
                                    <img src={formData.allotted.facultySignature} alt="Sign" className="print-signature" />
                                )}
                            </td>
                            <td className="label-cell">Signature of the Faculty</td>
                            <td className="value-cell">
                                {formData.exchangedWith.facultySignature && (
                                    <img src={formData.exchangedWith.facultySignature} alt="Sign" className="print-signature" />
                                )}
                            </td>
                        </tr>
                        <tr className="signature-row">
                            <td className="label-cell">Signature of the HOD</td>
                            <td className="value-cell">
                                {formData.allotted.hodSignature && (
                                    <img src={formData.allotted.hodSignature} alt="Sign" className="print-signature" />
                                )}
                            </td>
                            <td className="label-cell">Signature of the HOD</td>
                            <td className="value-cell">
                                {formData.exchangedWith.hodSignature && (
                                    <img src={formData.exchangedWith.hodSignature} alt="Sign" className="print-signature" />
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="action-buttons">
                <button className="btn-print" onClick={handlePrint}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
                    </svg>
                    Print
                </button>
                <div className="upload-wrapper">
                    <input
                        type="file"
                        id="file-upload"
                        onChange={handleUpload}
                        hidden
                        accept="application/pdf,image/*"
                    // To validate BEFORE opening dialog, we would need to not use <label> for input
                    // but a button that triggers click programmatically.
                    // But validating on change is also fine.
                    />
                    <label
                        htmlFor="file-upload"
                        className="btn-upload"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M5 20h14v-2H5v2zm0-10h4v6h6v-6h4l-7-7-7 7z" />
                        </svg>
                        Upload
                    </label>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className={`modal-content ${modalType}`}>
                        <p>{modalMessage}</p>
                        <button className="btn-close" onClick={() => setShowModal(false)} title="Close">
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const formatLabel = (key) => {
    const labels = {
        name: 'Name of the Faculty',
        dutyType: 'Type of Duty',
        date: 'Date of Exchange',
        facultySignature: 'Signature of the Faculty',
        hodSignature: 'Signature of the HOD',
    };
    return labels[key] || key;
};

export default DutyExchangeForm;
