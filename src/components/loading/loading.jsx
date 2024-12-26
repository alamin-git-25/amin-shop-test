// LineLoader.jsx
import React from "react";

const LineLoader = () => {
    return (
        <div className="relative w-full h-1 bg-gray-200 overflow-hidden">
            <div className="absolute w-1/3 h-full bg-blue-500 animate-slide"></div>
        </div>
    );
};

export default LineLoader;
