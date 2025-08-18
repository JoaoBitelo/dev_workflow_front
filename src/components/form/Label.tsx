import React, { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface LabelProps {
    htmlFor?: string;
    children: ReactNode;
    className?: string;
    placeholder?: string; // Optional hint text
}

const Label: FC<LabelProps> = ({ htmlFor, children, className, placeholder }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={twMerge("mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400", className)}
        >
            <span>{children}</span>
            {placeholder && <span className="block mt-1 text-xs text-gray-400 dark:text-gray-500">{placeholder}</span>}
        </label>
    );
};

export default Label;
