"use client";
import React, { useMemo } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

interface ChartProps {
    colors?: string[];
    categories: string[];
    series: ApexAxisChartSeries;
    horizontal?: boolean;
    yAxisTittle?: string;
    xAxisTittle?: string;
    trend?: boolean | undefined;
    stacked?: boolean | undefined;
    isPercent?: boolean | undefined;
    height?: number | undefined;
}

const GenericChart: React.FC<ChartProps> = ({
    colors,
    categories,
    series,
    horizontal = false,
    yAxisTittle,
    xAxisTittle,
    trend,
    stacked,
    isPercent,
    height,
}) => {
    // Recalculate finalSeries whenever series or trend changes
    const finalSeries = useMemo(() => {
        if (!trend) return series;

        // Get the top (max) value for each index
        const maxData = series[0].data.map((_, idx) => Math.max(...series.map((dev: any) => dev.data[idx])));

        return [
            ...series,
            {
                name: "Tendencia",
                type: "line",
                data: maxData,
            },
        ];
    }, [series, trend]);

    const options: ApexOptions = {
        colors,
        // theme: {
        //     // mode: "dark",
        //     palette: "palette1",
        //     monochrome: {
        //         enabled: true,
        //         color: "rgb(37, 90, 238)",
        //         shadeTo: "dark",
        //         shadeIntensity: 0.65,
        //     },
        // },

        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "bar",
            stacked,
        },
        plotOptions: {
            bar: {
                horizontal,
                columnWidth: "50%",
                borderRadius: 5,
                borderRadiusApplication: "end",
                barHeight: "80%",
            },
        },
        dataLabels: {
            enabled: finalSeries[0].type === "bubble" || isPercent ? true : false,
            formatter: function (val, opts) {
                if (isPercent) {
                    return isPercent ? val + "%" : val;
                }
                return opts.seriesIndex === 0 ? opts.w.globals.labels[opts.dataPointIndex] : val;
            },
            style: {
                fontSize: "14px",
                colors: ["#000"],
            },
            offsetY: 4, // 0 is roughly vertical center
        },
        stroke: {
            width: finalSeries.map((s) => (s.type === "line" ? 3 : 1)), // width 0 for bar, 4 for line
        },
        xaxis: {
            categories,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            title: {
                text: xAxisTittle,
            },
        },
        annotations: {
            xaxis: [
                {
                    x: categories[Math.floor(categories.length / 2)], // middle of 12 sprints
                    strokeDashArray: 4,
                    borderColor: "#888",
                    label: {
                        text: "Simulação",
                        orientation: "",
                        offsetY: 15,
                        style: { color: "#fff", background: "transparent" },
                    },
                },
            ],
        },
        legend: {
            show: true,
            position: "top",
            horizontalAlign: "left",
            fontFamily: "Outfit",
        },
        yaxis: {
            title: {
                text: yAxisTittle,
            },
            max: isPercent === true ? 100 : undefined,
        },
        grid: {
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        fill: finalSeries.some((s) => s.type === "area")
            ? {
                  type: "gradient",
                  gradient: {
                      shade: "light",
                      type: "vertical",
                      shadeIntensity: 0.1,
                      opacityFrom: 0.4,
                      opacityTo: 0,
                      stops: [0, 100],
                  },
              }
            : {
                  type: "gradient", // solid
                  opacity: 1,
              },
        tooltip: {
            shared: false,
            intersect: true,
            y: {
                formatter: (val) => (isPercent ? val + "%" : String(val)),
            },
        },
    };

    return (
        <div className="max-w-full overflow-x-auto custom-scrollbar">
            <div id="chartOne" className="min-w-[200px]">
                <ReactApexChart options={options} series={finalSeries} type="bar" height={height ? height : 300} />
            </div>
        </div>
    );
};

export default GenericChart;
