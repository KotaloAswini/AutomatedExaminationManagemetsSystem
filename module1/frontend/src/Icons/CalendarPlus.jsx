import { memo } from "react";

const CalendarPlus = ({ size = 24, className = "" }) => {
    return (
        <svg
            className={`icon ${className}`}
            viewBox="0 0 24 24"
            width={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-4 5h-2v2h-2v-2H9v-2h2v-2h2v2h2v2z" />
        </svg>
    );
};

export default memo(CalendarPlus);
