import { memo } from "react";

const CheckCircleIcon = ({ className = "", size = 24 }) => {
    return (
        <svg
            className={`icon ${className}`}
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="shieldGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#34d399" />
                    <stop offset="1" stopColor="#059669" />
                </linearGradient>
            </defs>

            {/* Shield body */}
            <path
                d="M12 2L4 5.5V11C4 16.25 7.4 21.05 12 22C16.6 21.05 20 16.25 20 11V5.5L12 2Z"
                fill="url(#shieldGrad)"
                stroke="#047857"
                strokeWidth="0.5"
            />

            {/* Inner highlight */}
            <path
                d="M12 3.5L5.5 6.3V11C5.5 15.6 8.4 19.8 12 20.8C15.6 19.8 18.5 15.6 18.5 11V6.3L12 3.5Z"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.8"
            />

            {/* Checkmark */}
            <path
                d="M8.5 12.5L10.8 14.8L15.5 9.5"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Top shine */}
            <ellipse
                cx="10"
                cy="7.5"
                rx="2.5"
                ry="1.2"
                fill="white"
                opacity="0.18"
                transform="rotate(-15 10 7.5)"
            />
        </svg>
    );
};

export default memo(CheckCircleIcon);
