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
            {/* Outer glow */}
            <circle cx="12" cy="12" r="10" fill="#dcfce7" />
            
            {/* Main circle */}
            <circle
                cx="12"
                cy="12"
                r="9"
                fill="#22c55e"
                stroke="#16a34a"
                strokeWidth="1"
            />
            
            {/* Inner gradient circle */}
            <circle
                cx="12"
                cy="12"
                r="7"
                fill="url(#greenGradient)"
            />
            
            {/* Checkmark */}
            <path
                d="M8 12.5L10.5 15L16 9"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            
            {/* Shine effect */}
            <ellipse
                cx="9"
                cy="8"
                rx="2"
                ry="1"
                fill="white"
                opacity="0.3"
                transform="rotate(-30 9 8)"
            />
            
            <defs>
                <linearGradient id="greenGradient" x1="12" y1="5" x2="12" y2="19" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4ade80" />
                    <stop offset="1" stopColor="#16a34a" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default memo(CheckCircleIcon);
