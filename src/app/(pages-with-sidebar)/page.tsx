"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import React from "react";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import KPI from "@/components/common/KPI";
import GenericChart from "@/components/charts/Generic";

const data = [
    { text: "Refactor", value: 120 },
    { text: "Hotfix", value: 80 },
    { text: "Docs", value: 50 },
    { text: "Performance", value: 200 },
    { text: "Bugfix", value: 150 },
    { text: "Tests", value: 90 },
    { text: "Feature", value: 300 },
    { text: "Chore", value: 70 },
    { text: "CI/CD", value: 110 },
    { text: "Config", value: 95 },
    { text: "Optimization", value: 180 },
    { text: "Logging", value: 60 },
    { text: "Monitoring", value: 130 },
    { text: "Security", value: 250 },
    { text: "Deployment", value: 170 },
    { text: "Integration", value: 140 },
    { text: "Scalability", value: 220 },
    { text: "Reliability", value: 160 },
    { text: "Database", value: 210 },
    { text: "API", value: 190 },
    { text: "Frontend", value: 230 },
    { text: "Backend", value: 240 },
    { text: "UI", value: 85 },
    { text: "UX", value: 100 },
    { text: "Testing", value: 125 },
    { text: "Automation", value: 175 },
    { text: "Analytics", value: 155 },
    { text: "Migration", value: 135 },
    { text: "Cache", value: 145 },
    { text: "Proxy", value: 105 },
    { text: "Container", value: 115 },
    { text: "Pipeline", value: 165 },
    { text: "Session", value: 75 },
    { text: "Cookies", value: 65 },
    { text: "Token", value: 185 },
    { text: "Encryption", value: 195 },
    { text: "Compression", value: 125 },
    { text: "Threading", value: 155 },
    { text: "Scheduler", value: 205 },
    { text: "Queue", value: 900 },
];

const root = {
    name: "subjects",
    children: data.map((d) => ({ name: d.text, value: d.value })),
};

// Example: API returns an array of summed production per day for the last 14 days
const apiData = [120, 135, 140, 125, 150, 160, 145, 155, 130, 140, 150, 165, 170, 160];

// Generate last 14 days labels
const dayLabels = Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`);

// Chart series
const seriesProduction = [
    {
        name: "production",
        type: "area",
        data: apiData,
        areaStyle: {
            color: "rgba(59, 130, 246, 0.3)", // Blue with 30% opacity
        },
        lineStyle: {
            color: "rgba(59, 130, 246, 1)", // Solid blue line
        },
        smooth: true,
    },
];

// Example Alert component
const Alert = ({ message, type }: { message: string; type: "info" | "warning" | "error" }) => {
    const colors = {
        info: "bg-blue-100 text-blue-800",
        warning: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800",
    };
    return <div className={`p-3 rounded-md ${colors[type]}`}>{message}</div>;
};

export default function Page() {
    return (
        <div className="space-y-4">
            <PageBreadcrumb pageTitle="Gestão de clientes" />

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <KPI label="Tarefas concluídas" value={98} trend="up" status="success" type="task-ok" />
                <KPI label="Tarefas atrasadas" value={2} trend="down" status="error" type="task-notok" />
                <KPI label="Bugs detectados" value={12} trend="up" status="error" type="bugs" />
                <KPI label="Dados coletados" value={7} trend="up" status="success" type="data" />
            </div>

            {/* Alerts */}
            <div className="space-y-2">
                <Alert message="Sua sprint esta atrasada!" type="error" />
                <Alert message="Cliente Y abriu 3 solicitações esta semana" type="info" />
            </div>

            {/* Charts / Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                <ComponentCard title="Trending no código">
                    <div style={{ height: 430, width: "100%" }}>
                        <ResponsiveCirclePacking
                            data={root}
                            id="name"
                            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                            value="value"
                            padding={3}
                            enableLabels
                            labelsFilter={(n) => n.node.height === 0} // only leaf labels
                            labelsSkipRadius={12} // hide tiny labels
                            label={(n) => n.id as string}
                            labelTextColor={{ from: "color", modifiers: [["darker", 20]] }}
                            borderWidth={1}
                            borderColor={{ from: "color", modifiers: [["darker", 20]] }}
                            animate
                            colorBy="id"
                            theme={{
                                background: "transparent", // makes background transparent
                            }}
                            colors={{ scheme: "blues" }}
                            // colors={(node: any) => (node.depth === 0 ? "transparent" : node.data.color || "#69b3a2")}
                        />
                    </div>
                </ComponentCard>
                <ComponentCard title="Atividade no código">
                    <GenericChart categories={dayLabels} series={seriesProduction} horizontal={false} height={430} />
                </ComponentCard>
            </div>
        </div>
    );
}
