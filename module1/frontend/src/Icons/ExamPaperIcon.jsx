import { memo } from "react";

const ExamPaperIcon = ({ className = "", size = 24 }) => {
    return (
        <svg
            className={`icon ${className}`}
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Paper background */}
            <path
                d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H6Z"
                fill="#f3e8ff"
                stroke="#a855f7"
                strokeWidth="1"
            />
            
            {/* Folded corner */}
            <path
                d="M14 2V6C14 7.10457 14.8954 8 16 8H20"
                fill="#e9d5ff"
                stroke="#a855f7"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M14 2L20 8H16C14.8954 8 14 7.10457 14 6V2Z" fill="#e9d5ff" />
            
            {/* Pencil writing */}
            <path
                d="M16.5 11L10.5 17L8 17.5L8.5 15L14.5 9L16.5 11Z"
                fill="#f59e0b"
                stroke="#d97706"
                strokeWidth="0.5"
            />
            <path d="M14.5 9L16.5 11" stroke="#d97706" strokeWidth="0.5" />
            <path d="M8 17.5L8.5 15" stroke="#d97706" strokeWidth="0.5" />
            
            {/* Text lines */}
            <line x1="7" y1="11" x2="11" y2="11" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="7" y1="14" x2="9" y2="14" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
};

export default memo(ExamPaperIcon);
