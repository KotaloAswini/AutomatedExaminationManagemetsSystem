export default function ExamTimetableIcon({ 
    size = 32, 
    className = "", 
    color = "currentColor" 
}: { 
    size?: number, 
    className?: string, 
    color?: string 
}) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.11 22 21 21.1 21 20V6C21 4.9 20.11 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8Z" fill={color}/>
             <path d="M7 12H17V14H7V12Z" fill={color} fillOpacity="0.7"/>
             <path d="M7 16H14V18H7V16Z" fill={color} fillOpacity="0.7"/>
        </svg>
    );
}
