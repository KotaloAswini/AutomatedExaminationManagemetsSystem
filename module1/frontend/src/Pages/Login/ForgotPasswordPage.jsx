import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../Components/AuthContext';
import { url } from '../../Script/fetchUrl';
import './Login.css';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1); // 1: Email, 2: OTP Input, 3: New Password Input, 4: Success
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const navigate = useNavigate();

    useEffect(() => {
        // If there's a token in the URL, go straight to step 3 (Set New Password)
        if (token) {
            setStep(3);
        }
    }, [token]);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${url}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                setStep(2);
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to send reset link');
            }
        } catch (err) {
            setError('Server connection error. Is the backend running?');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setError('');

        console.log("Resetting password with OTP:", otp);

        try {
            const response = await fetch(`${url}/api/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, token: otp, newPassword })
            });

            console.log("Response status:", response.status);

            if (response.ok) {
                console.log("Step 4: Success");
                setStep(4); // Success
            } else {
                const data = await response.json();
                console.error("Reset error data:", data);
                setError(data.error || 'Invalid or expired token');
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError('Server connection error. Is the backend running?');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>{step === 3 ? "Set New Password" : step === 4 ? "Success!" : "Forgot Password"}</h1>
                    <p>
                        {step === 1 && "Enter your email to reset your password"}
                        {step === 2 && "Verification email sent! Click the link in your email to continue."}
                        {step === 3 && "Please choose a strong password"}
                        {step === 4 && "Your password has been reset successfully"}
                    </p>
                </div>

                {step === 1 && (
                    <form className="login-form" onSubmit={handleEmailSubmit}>
                        {error && <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </span>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your registered email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="login-button" disabled={isLoading}>
                            {isLoading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form className="login-form" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                        <p style={{ color: '#cbd5e1', marginBottom: '1.5rem', textAlign: 'center' }}>
                            Enter the 6-digit code sent to <strong>{email}</strong>
                        </p>
                        <div className="form-group">
                            <label htmlFor="otp">Verification Code</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                </span>
                                <input
                                    type="text"
                                    id="otp"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength="6"
                                    required
                                    style={{ letterSpacing: '0.5rem', textAlign: 'center', fontWeight: 'bold' }}
                                />
                            </div>
                        </div>
                        <button type="submit" className="login-button">
                            Verify OTP
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form className="login-form" onSubmit={handlePasswordReset}>
                        {error && <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}

                        <div className="form-group">
                            <label htmlFor="new-password">New Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                </span>
                                <input
                                    type="password"
                                    id="new-password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                </span>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="login-button" disabled={isLoading}>
                            {isLoading ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                )}

                {step === 4 && (
                    <div className="reset-success" style={{ textAlign: 'center' }}>
                        <div style={{ color: '#4ade80', marginBottom: '1.5rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        </div>
                        <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
                            You can now login with your new password.
                        </p>
                        <button onClick={() => navigate('/login')} className="login-button">
                            Go to Login
                        </button>
                    </div>
                )}

                <div className="login-footer">
                    <p>Remember your password? <Link to="/login">Back to Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
