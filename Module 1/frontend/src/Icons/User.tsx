import React, { memo } from "react";

interface UserProps {
    className?: string;
    size?: number;
}

const User: React.FC<UserProps> = ({ className = "", size = 24 }) => {
    return (
        <svg className={`icon ${className}`} viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
    );
};

export default memo(User);
