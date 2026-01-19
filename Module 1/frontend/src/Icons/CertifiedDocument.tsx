import React, { memo } from "react";

interface CertifiedDocumentProps {
    className?: string;
    width?: number;
    height?: number;
}

const CertifiedDocument: React.FC<CertifiedDocumentProps> = ({
    className = "",
    width = 24,
    height = 24
}) => {
    return (
        <svg
            className={`icon ${className}`}
            viewBox="0 0 24 24"
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            {/* Document base */}
            <path
                d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                fill="#e8f4fc"
                stroke="#3b82f6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Folded corner */}
            <path
                d="M14 2V8H20"
                fill="#d1e7f8"
                stroke="#3b82f6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Text lines */}
            <line x1="7" y1="11" x2="17" y2="11" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="7" y1="14" x2="13" y2="14" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
            {/* Verification checkmark badge */}
            <circle cx="16" cy="17" r="4" fill="#22c55e" stroke="#16a34a" strokeWidth="0.5" />
            <path
                d="M14 17L15.5 18.5L18.5 15.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    );
};

export default memo(CertifiedDocument);
