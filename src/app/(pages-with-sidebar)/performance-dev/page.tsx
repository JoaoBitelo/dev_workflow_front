"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import GenericChart from "@/components/charts/Generic";

const colors = ["rgb(0, 143, 251)", "rgb(255, 69, 96)", "rgb(0, 227, 150)"];
const categories = ["Dev1 (Junior)", "Dev2", "Dev3", "Dev4", "Dev5", "Dev6 (Senior)"];

// Base data
const cards = [120, 80, 95, 70, 85, 60]; // quantity resolved
const bugs = [25, 5, 18, 3, 2, 12]; // bugs (junior, mid, senior)
const points = [200, 230, 250, 220, 240, 400]; // complexity

// Series for cards and bugs
const seriesCards = [
    { name: "Cards Resolved", type: "bar", data: cards },
    { name: "Bugs", type: "bar", data: bugs },
];

// Series for points
const seriesPoints = [{ name: "Points", type: "bar", data: points }];

// Dynamic calculation for sprints
const categories2 = ["Sprint1", "Sprint2", "Sprint3", "Sprint4", "Sprint5", "Sprint6"];

const series2 = categories.map((dev, devIndex) => {
    // Base score per dev
    const baseScore = (cards[devIndex] * points[devIndex]) / 100 - bugs[devIndex] * 2;

    // Generate 6 sprints with small variations
    const data = categories2.map((_, sprintIndex) => {
        const variation = (sprintIndex % 2 === 0 ? 1 : -1) * (10 + devIndex * 2);
        return Math.round(baseScore + variation);
    });

    return { name: dev, data };
});

export default function Page() {
    return (
        <div className="space-y-6">
            <PageBreadcrumb pageTitle="Performance individual" />
            <div className="flex space-x-4">
                <ComponentCard className="flex-1 space-y-1" title="Quantidade de cards resolvidos">
                    <GenericChart
                        categories={categories}
                        series={seriesCards}
                        horizontal={true}
                        trend={false}
                        stacked
                        colors={colors}
                    />
                </ComponentCard>
                <ComponentCard className="flex-1 space-y-1" title="Pontos resolvidos">
                    <GenericChart
                        categories={categories}
                        series={seriesPoints}
                        horizontal={true}
                        trend={false}
                        stacked
                        colors={colors}
                    />
                </ComponentCard>
            </div>
            <div className="space-y-6">
                <ComponentCard title="Performance detalhada">
                    <GenericChart
                        categories={categories2}
                        series={series2}
                        horizontal={false}
                        yAxisTittle="Pontos"
                        xAxisTittle="Sprints"
                        trend={true}
                    />
                </ComponentCard>
            </div>
        </div>
    );
}
