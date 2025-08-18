"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import GenericChart from "@/components/charts/Generic";

const categories = [
    "Sprint1",
    "Sprint2",
    "Sprint3",
    "Sprint4",
    "Sprint5",
    "Sprint6",
    "Sprint7",
    "Sprint8",
    "Sprint9",
    "Sprint10",
    "Sprint11",
    "Sprint12",
];

const devs = ["Dev1 (Junior)", "Dev2", "Dev3", "Dev4", "Dev5", "Dev6 (Senior)"];

// Base data
const cards = [120, 80, 95, 70, 85, 60];
const points = [200, 230, 250, 220, 240, 400];
const bugsBase = [25, 5, 18, 3, 2, 12];

// -------------------------
// 1️⃣ Performance do time
// -------------------------
const seriesPerformance = [
    {
        name: "Pontos",
        type: "bar",
        data: [168, 250, 201, 220, 240, 385, 210, 215, 230, 290, 280, 300], // Sprint6 is high
    },
    {
        name: "Bugs",
        type: "bar",
        data: [25, 8, 18, 5, 7, 12, 12, 10, 32, 15, 20, 12], // Sprint7 normal, no spike
    },
];

// -------------------------
// 2️⃣ Detected Technical Debt
// -------------------------
const seriesDetected = devs.map((dev, i) => {
    const data = categories.map((_, sprint) => {
        // Spike in Sprint6
        const spike = sprint === 5 ? 1.5 : 1;
        const todos = Math.round((cards[i] / 10) * spike);
        const fixme = Math.round((bugsBase[i] / 2) * spike);
        const tmp = Math.round((cards[i] / 20) * spike);

        // Sprint7 remains normal despite previous spike
        return sprint === 6 ? Math.round(cards[i] / 10 + bugsBase[i] / 2 + cards[i] / 20) : todos + fixme + tmp;
    });
    return { name: dev, type: "bar", data };
});

// -------------------------
// 3️⃣ Estimated Technical Debt
// -------------------------
const seriesEstimated = devs.map((dev, i) => {
    const data = categories.map((_, sprint) => {
        const baseDebt = bugsBase[i] * 5 + points[i] / 8 - cards[i] / 25;

        // Spike in Sprint6
        const spike = sprint === 5 ? 1.5 : 1;

        // Sprint7 remains normal despite previous spike
        return sprint === 6 ? Math.round(baseDebt) : Math.round(baseDebt * spike);
    });
    return {
        name: dev,
        type: "area",
        data,
        areaStyle: {
            color: "rgba(59, 130, 246, 0.3)", // Blue with 30% opacity
        },
        lineStyle: {
            color: "rgba(59, 130, 246, 1)", // Solid blue line
        },
        smooth: true,
    };
});

const colors = ["rgb(0, 143, 251)", "rgb(255, 69, 96)", "rgb(0, 227, 150)"];

export default function Page() {
    return (
        <div className="space-y-6">
            <PageBreadcrumb pageTitle="Performance" />

            {/* Performance do time */}
            <ComponentCard className="flex-1 space-y-1" title="Performance do time">
                <GenericChart
                    categories={categories}
                    series={seriesPerformance}
                    horizontal={false}
                    yAxisTittle="Pontos"
                    trend={true}
                    stacked
                    colors={colors}
                />
            </ComponentCard>

            {/* Detected Technical Debt */}
            <ComponentCard className="flex-1 space-y-1" title="Débito técnico detectado">
                <GenericChart
                    categories={categories}
                    series={seriesDetected}
                    horizontal={false}
                    yAxisTittle="Debt Count"
                    stacked
                    colors={colors}
                />
            </ComponentCard>

            {/* Estimated Technical Debt */}
            <ComponentCard className="flex-1 space-y-1" title="Débito técnico detectado">
                <GenericChart
                    categories={categories}
                    series={seriesEstimated}
                    horizontal={false}
                    yAxisTittle="Estimated Debt"
                />
            </ComponentCard>
        </div>
    );
}
