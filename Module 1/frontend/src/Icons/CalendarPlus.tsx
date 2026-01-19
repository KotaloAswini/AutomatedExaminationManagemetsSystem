import { memo } from "react";

interface CalendarPlusProps {
    size?: number;
    className?: string;
}

const CalendarPlus: React.FC<CalendarPlusProps> = ({ size = 22, className }) => {
    return (
        <svg 
            className={className} 
            viewBox="0 0 24 24" 
            width={size} 
            height={size} 
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Calendar body */}
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            {/* Calendar hooks */}
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            {/* Calendar divider line */}
            <line x1="3" y1="10" x2="21" y2="10" />
            {/* Plus sign */}
            <line x1="12" y1="14" x2="12" y2="18" />
            <line x1="10" y1="16" x2="14" y2="16" />
        </svg>
    );
};

export default memo(CalendarPlus);
