import React, { memo } from "react";

const PublishIcon: React.FC<{ size?: number, className?: string }> = ({ size = 24, className = "" }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M5 20H19V18H5M12 2V14M12 2L6 8M12 2L18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};

export default memo(PublishIcon);
