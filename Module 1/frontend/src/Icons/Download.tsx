import React, { memo } from "react";

interface DownloadProps {
    className?: string;
    width?: number;
    height?: number;
    color?: string;
}

const Download: React.FC<DownloadProps> = ({
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    );
};

export default memo(Download);
