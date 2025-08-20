"use client";
import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import GenericChart from "@/components/charts/Generic";
import MultiSelect from "@/components/form/MultiSelect";

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

// Base data (per dev)
const cards = [40, 35, 38, 30, 28, 45]; // productivity base
const bugsBase = [8, 4, 6, 3, 2, 7]; // bug base

// -------------------------
// Productivity = sum of devs (scaled down)
// -------------------------
const teamProductivity = categories.map((_, sprint) =>
    cards.reduce((sum, val) => sum + Math.round(val * (0.4 + Math.random() * 0.3)), 0)
);

// Bugs (keep modest values)
const bugs = categories.map(() => Math.round(5 + Math.random() * 8));

// -------------------------
// Technical Debt (lighter scale)
// -------------------------
const seriesDetected = devs.map((dev, i) => {
    const data = categories.map((_, sprint) => {
        const spike = sprint === 5 ? 1.1 : 1;
        const debt = Math.round((cards[i] / 20 + bugsBase[i] / 4) * spike); // lower scale
        return debt;
    });
    return { name: dev, type: "bar", data };
});

// Total Technical Debt (sum per sprint)
const totalDebt = categories.map((_, sprint) => seriesDetected.reduce((sum, dev) => sum + dev.data[sprint], 0));

// -------------------------
// Client Demand
// -------------------------
const tableData = [
    { id: 1, name: "Client A", demand: 6 },
    { id: 2, name: "Client B", demand: 5 },
    { id: 3, name: "Client C", demand: 4 },
    { id: 4, name: "Client D", demand: 7 },
    { id: 5, name: "Client E", demand: 6 },
    { id: 6, name: "Client F", demand: 3 },
];

const totalDemand = categories.map(() => tableData.reduce((sum, c) => sum + c.demand, 0));

// -------------------------
// ✅ Unified Chart Data
// -------------------------
const unifiedSeries = [
    {
        name: "Team Productivity",
        type: "area",
        data: teamProductivity,
    },
    {
        name: "Bugs",
        type: "area",
        data: bugs,
    },
    {
        name: "Technical Debt",
        type: "area",
        data: totalDebt,
    },
    {
        name: "Clients Demand",
        type: "area",
        data: totalDemand,
    },
];

export default function Page() {
    const [clientSelectedValues, setClientSelectedValues] = useState<string[]>([]);
    const [devsSelectedValues, setDevsSelectedValues] = useState<string[]>([]);

    const multiOptions = [
        { value: "1", text: "Cliente 1", selected: false },
        { value: "2", text: "Cliente 2", selected: false },
        { value: "3", text: "Cliente 3", selected: false },
    ];

    return (
        <div className="space-y-6">
            <PageBreadcrumb pageTitle="Simulação" />
            <div className="space-y-6">
                <ComponentCard className="flex-1 space-y-1" title="Filtragem">
                    <MultiSelect
                        label="Clientes"
                        options={multiOptions}
                        onChange={(values) => setClientSelectedValues(values)}
                    />
                    <MultiSelect
                        label="Desenvolvedores"
                        options={multiOptions}
                        onChange={(values) => setDevsSelectedValues(values)}
                    />
                </ComponentCard>
            </div>
            <div className="space-y-6">
                <ComponentCard className="flex-1 space-y-1" title="Consolidação da simulação">
                    <GenericChart
                        categories={categories}
                        series={unifiedSeries}
                        horizontal={false}
                        yAxisTittle="Valores"
                    />
                </ComponentCard>
            </div>
        </div>
    );
}
