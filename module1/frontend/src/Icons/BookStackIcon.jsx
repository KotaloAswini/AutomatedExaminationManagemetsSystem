import { memo } from "react";

const BookStackIcon = ({ className = "", size = 24 }) => {
    return (
        <svg
            className={`icon ${className}`}
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Bottom book */}
            <rect x="3" y="16" width="18" height="4" rx="1" fill="#3b82f6" />
            <rect x="3" y="16" width="18" height="4" rx="1" stroke="#2563eb" strokeWidth="0.5" />
            <line x1="5" y1="18" x2="8" y2="18" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Middle book */}
            <rect x="4" y="11" width="16" height="4" rx="1" fill="#60a5fa" />
            <rect x="4" y="11" width="16" height="4" rx="1" stroke="#3b82f6" strokeWidth="0.5" />
            <line x1="6" y1="13" x2="10" y2="13" stroke="#dbeafe" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Top book */}
            <rect x="5" y="6" width="14" height="4" rx="1" fill="#93c5fd" />
            <rect x="5" y="6" width="14" height="4" rx="1" stroke="#60a5fa" strokeWidth="0.5" />
            <line x1="7" y1="8" x2="12" y2="8" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Decorative bookmark */}
            <path d="M17 6V3.5C17 3.22386 17.2239 3 17.5 3H18.5C18.7761 3 19 3.22386 19 3.5V6" fill="#ef4444" />
        </svg>
    );
};

export default memo(BookStackIcon);
