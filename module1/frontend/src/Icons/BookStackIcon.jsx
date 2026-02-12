import { memo } from "react";

const BookStackIcon = ({ className = "", size = 24 }) => {
    return (
        <svg
            className={`icon ${className}`}
            viewBox="0 0 512 512"
            width={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
        >
            {/* Font Awesome 5 Solid Layer Group Path */}
            <path d="M12.41 148.02l232.94 104.72c2.53 1.14 5.44 1.14 7.97 0l232.94-104.72c8.93-4.01 8.93-16.6 0-20.62L253.29 22.68c-2.52-1.13-5.44-1.13-7.96 0L12.41 127.4c-8.93 4.02-8.93 16.6 0 20.62zm487.18 59.56l-28.06-12.61L256 313.31 40.47 194.97l-28.06 12.61c-8.8 3.96-8.82 16.51-.05 20.5l232.96 105.89c5.09 2.32 10.99 2.32 16.08 0l233.91-105.89c8.63-3.91 8.63-16.38-.13-20.51zm0 128l-28.06-12.61L256 441.31 40.47 322.97l-28.06 12.61c-8.8 3.96-8.82 16.51-.05 20.5l232.96 105.89c5.09 2.32 10.99 2.32 16.08 0l233.91-105.89c8.63-3.91 8.63-16.38-.13-20.51z" />
        </svg>
    );
};

export default memo(BookStackIcon);
