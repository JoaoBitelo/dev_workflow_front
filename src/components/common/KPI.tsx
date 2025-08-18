"use client";

import React from "react";
import Badge from "@/components/ui/badge/Badge";
import {
    ArrowDownward,
    ArrowUpward,
    AssignmentTurnedInOutlined,
    AssignmentLateOutlined,
    BugReportOutlined,
    QueryStatsOutlined,
} from "@mui/icons-material";

type TypeIcon = "task-ok" | "task-notok" | "bugs" | "data";
interface TopIconProps {
    className?: string;
    type: TypeIcon;
}

const TopIcon = ({ className, type }: TopIconProps) => {
    switch (type) {
        case "task-ok":
            return <AssignmentTurnedInOutlined className={className} />;
        case "task-notok":
            return <AssignmentLateOutlined className={className} />;
        case "bugs":
            return <BugReportOutlined className={className} />;
        case "data":
            return <QueryStatsOutlined className={className} />;
        default:
            return null; // fallback if type is invalid
    }
};

const KPI = ({
    type,
    label,
    value,
    trend,
    status,
}: {
    type: TypeIcon;
    label: string;
    value: string | number;
    trend: "up" | "down";
    status: "success" | "error";
}) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <TopIcon className="text-gray-800 size-6 dark:text-white/90" type={type} />
            </div>

            <div className="flex items-end justify-between mt-5">
                <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{value}</h4>
                </div>
                {trend === "up" ? (
                    <Badge color={status}>
                        <ArrowUpward fontSize="inherit" />
                        {value}
                    </Badge>
                ) : (
                    <Badge color={status}>
                        <ArrowDownward className="text-error-500" fontSize="inherit" />
                        {value}
                    </Badge>
                )}
            </div>
        </div>
    );
};

export default KPI;
