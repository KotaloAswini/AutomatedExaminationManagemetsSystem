import { memo } from "react";

const PublishIcon = ({ className = "", size = 24 }) => {
    return (
        <svg
            className={`icon ${className}`}
            viewBox="0 0 24 24"
            width={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z" />
        </svg>
    );
};

export default memo(PublishIcon);
