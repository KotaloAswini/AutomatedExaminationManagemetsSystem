import { memo } from "react";

const HourglassIcon = ({ className = "", size = 24 }) => {
    return (
        <svg
            className={`icon ${className}`}
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Top frame */}
            <rect x="5" y="2" width="14" height="2" rx="0.5" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5" />
            
            {/* Bottom frame */}
            <rect x="5" y="20" width="14" height="2" rx="0.5" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5" />
            
            {/* Glass body */}
            <path
                d="M7 4V7C7 8.5 8.5 10.5 12 12C8.5 13.5 7 15.5 7 17V20H17V17C17 15.5 15.5 13.5 12 12C15.5 10.5 17 8.5 17 7V4H7Z"
                fill="#fef3c7"
                stroke="#f59e0b"
                strokeWidth="1"
            />
            
            {/* Sand in top */}
            <path
                d="M9 4.5V6C9 7 10 8.5 12 9.5C10 8.5 9 7.5 9 6.5V4.5H15V6C15 7 14 8.5 12 9.5V9.5"
                fill="#fcd34d"
            />
            <path
                d="M9 5V6.5C9 7.5 10.5 9 12 10"
                stroke="#f59e0b"
                strokeWidth="0.3"
            />
            
            {/* Sand falling */}
            <line x1="12" y1="11" x2="12" y2="13" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 1" />
            
            {/* Sand in bottom */}
            <path
                d="M9 19V17.5C9 16.5 10.5 15 12 14L12 14C13.5 15 15 16.5 15 17.5V19H9Z"
                fill="#fcd34d"
            />
            
            {/* Shine effect */}
            <path
                d="M8.5 5.5C8.5 5.5 9 6 9.5 6"
                stroke="white"
                strokeWidth="0.5"
                strokeLinecap="round"
                opacity="0.6"
            />
        </svg>
    );
};

export default memo(HourglassIcon);
