const DraftsDashedIcon = ({ size = 24, color = "currentColor" }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Dashed Rounded Rectangle */}
            <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
                stroke={color}
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeLinecap="round"
            />
            {/* Plus Sign */}
            <path
                d="M12 8V16M8 12H16"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default DraftsDashedIcon;
