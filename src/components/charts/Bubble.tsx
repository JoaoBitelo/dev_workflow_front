"use client";
import React, { useState, useEffect } from "react";
// import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

interface ChartProps {
    categories: string[];
    series: ApexAxisChartSeries;
    horizontal?: boolean;
    yAxisTittle?: string;
    xAxisTittle: string;
    trend: boolean | undefined;
    stacked?: boolean | undefined;
    isPercent?: boolean | undefined;
    keepXaxis?: boolean | undefined;
    keepYaxis?: boolean | undefined;
}

const BubbleChart: React.FC<ChartProps> = ({ series, keepXaxis, keepYaxis }) => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const allPoints = series[0].data;

    // Find min/max for x and y
    const xValues = allPoints
        .filter(
            (p): p is { x: number; y: number; z: number } =>
                typeof p === "object" && p !== null && "x" in p && "y" in p && "z" in p
        )
        .map((p) => p.x);
    const yValues = allPoints
        .filter(
            (p): p is { x: number; y: number; z: number } =>
                typeof p === "object" && p !== null && "x" in p && "y" in p && "z" in p
        )
        .map((p) => p.y);
    const zValues = allPoints
        .filter(
            (p): p is { x: number; y: number; z: number } =>
                typeof p === "object" && p !== null && "x" in p && "y" in p && "z" in p
        )
        .map((p) => p.z); // bubble sizes

    // Calculate extra padding based on max bubble radius
    const maxZ = Math.max(...zValues);
    const extraPadding = maxZ * 0.08; // adjust multiplier as needed

    const xMin = Math.min(...xValues) - extraPadding;
    const xMax = Math.max(...xValues) + extraPadding;

    const yMin = Math.min(...yValues) - extraPadding;
    const yMax = Math.max(...yValues) + extraPadding;

    useEffect(() => {
        // Read only from localStorage
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        if (savedTheme) {
            setTheme(savedTheme);
            if (savedTheme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }, [theme]);

    const xaxis = keepXaxis
        ? [
              {
                  x: 2.5,
                  strokeDashArray: 4,
                  borderColor: "#888",
                  label: {
                      text: "Faturamento alto",
                      style: { color: "#fff", background: "transparent" },
                      orientation: "",
                      offsetY: 10,
                  },
              },
              {
                  x: 2.5,
                  strokeDashArray: 4,
                  borderColor: "#888",
                  label: {
                      position: "bottom",
                      text: "Faturamento baixo",
                      style: { color: "#fff", background: "transparent" },
                      orientation: "",
                      offsetY: -10,
                  },
              },
          ]
        : [];

    const yaxis = keepYaxis
        ? [
              {
                  y: 2.5,
                  strokeDashArray: 4,
                  borderColor: "#888",
                  label: {
                      text: "Demanda alta",
                      style: { color: "#fff", background: "transparent" },
                  },
              },
              {
                  y: 2.5,
                  strokeDashArray: 4,
                  borderColor: "#888",
                  label: {
                      position: "bottom",
                      text: "Demanda baixa",
                      style: { color: "#fff", background: "transparent" },
                      offsetX: 50,
                  },
              },
          ]
        : [];

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "bubble",
            height: 450,
        },
        xaxis: { min: xMin, max: xMax },
        yaxis: { min: yMin, max: yMax },
        markers: {
            strokeWidth: 0, // removes the outline around bubbles
            hover: { sizeOffset: 5 },
        },
        annotations: {
            // Vertical line for X-axis threshold (demand)
            xaxis,
            // Horizontal line for Y-axis threshold (bill)
            yaxis,
        },
        dataLabels: {
            enabled: true,
            formatter: function (_unused, opts) {
                const data = opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex];
                return data.name; // show client name inside the bubble
            },
            style: {
                colors: [theme === "dark" ? "var(--color-gray-300)" : "var(--color-gray-500)"], // dynamic color
                fontSize: "18px",
                fontWeight: "bold",
            },
        },
        tooltip: {
            shared: false,
            intersect: true,
            custom: ({ seriesIndex, dataPointIndex, w }) => {
                const client = w.config.series[seriesIndex].data[dataPointIndex];
                return `<div style="padding:8px;">
                <strong>${client.name}</strong><br/>
                Demand: ${client.x}<br/>
                Bill: ${client.y}<br/>
                Strategy: ${client.z}
            </div>`;
            },
        },
    };

    return (
        <div className="max-w-full overflow-x-auto custom-scrollbar">
            <div id="bubbleChartUnique" className="min-w-[200px]">
                <ReactApexChart options={options} series={series} type="bar" height={300} />
            </div>
        </div>
    );
};

export default BubbleChart;
