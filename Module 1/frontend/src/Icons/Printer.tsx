import React, { memo } from "react";

interface PrinterProps {
    className?: string;
    width?: number;
    height?: number;
    color?: string;
}

const Printer: React.FC<PrinterProps> = ({
    className = "",
    width = 16,
    height = 16,
    color = "currentColor"
}) => {
    return (
        <svg
            className={`icon ${className}`}
            viewBox="0 0 24 24"
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
        </svg>
    );
};

export default memo(Printer);
