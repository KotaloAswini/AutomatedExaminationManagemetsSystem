import { memo } from "react";

const Home = ({ className = "", size = 24, ...props }) => {
    return (
        <svg
            className={`icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12 3L2 12h3v8h14v-8h3L12 3zm5 15h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z"
            />
        </svg>
    );
};

export default memo(Home);
