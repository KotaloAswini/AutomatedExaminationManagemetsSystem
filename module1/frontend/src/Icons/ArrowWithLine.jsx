import { memo } from "react";

const ArrowWithLine = ({ size = 24, rotate = 0 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="var(--textColor)"
            style={{ transform: `rotate(${rotate}deg)` }}
        >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M18.29 17.29L14 13v6c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1v-6l-4.29 4.29a.996.996 0 01-1.41 0 .996.996 0 010-1.41L12 9.17l6.71 6.71a.996.996 0 010 1.41c-.39.38-1.03.39-1.42 0zM4 5c0 .55.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1z" />
        </svg>
    );
};

export default memo(ArrowWithLine);
