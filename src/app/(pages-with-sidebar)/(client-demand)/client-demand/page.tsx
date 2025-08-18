"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import GenericChart from "@/components/charts/Generic";
import BasicTableOne from "@/components/tables/BasicTableOne";
import BubbleChart from "@/components/charts/Bubble";

const categories1 = ["Total 100%"];
const series1 = [
    { name: "Desconhecido", data: [20] }, // separate 20% client
    { name: "Client 1", data: [15] },
    { name: "Client 2", data: [15] },
    { name: "Client 3", data: [15] },
    { name: "Client 4", data: [10] },
    { name: "Client 5", data: [10] },
    { name: "Client 6", data: [15] },
];

// Define the table data using the interface
const tableData = [
    {
        id: 1,
        name: "Client A",
        bill: 1.87,
        operation1: "+",
        strategy: 3.42,
        operation2: "+",
        demand: 3.42,
        operation3: "=",
        evaluation: 1.87,
    },
    {
        id: 2,
        name: "Client B",
        bill: 4.23,
        operation1: "+",
        strategy: 0.95,
        operation2: "+",
        demand: 0.95,
        operation3: "=",
        evaluation: 4.23,
    },
    {
        id: 3,
        name: "Client C",
        bill: 3.57,
        operation1: "+",
        strategy: 0.95,
        operation2: "+",
        demand: 2.11,
        operation3: "=",
        evaluation: 2.41,
    },
    {
        id: 4,
        name: "Client D",
        bill: 0.67,
        operation1: "+",
        strategy: 0.95,
        operation2: "+",
        demand: 4.88,
        operation3: "=",
        evaluation: -3.26,
    },
    {
        id: 5,
        name: "Client E",
        bill: 2.99,
        operation1: "+",
        strategy: 1.42,
        operation2: "+",
        demand: 1.42,
        operation3: "=",
        evaluation: 2.99,
    },
    {
        id: 6,
        name: "Client F",
        bill: 4.1,
        operation1: "+",
        strategy: 1.42,
        operation2: "+",
        demand: 0.33,
        operation3: "=",
        evaluation: 5.19,
    },
];
const tableHeaders = ["Nome", "Demanda", "", "Faturamento", "", "Estrategico", "", "Avaliacao"];

const categories2 = ["Total %"];
const series2 = [
    {
        name: "Clients",
        type: "bubble",
        data: tableData.map((client) => ({
            x: client.demand, // X-axis
            y: client.bill, // Y-axis
            z: client.strategy, // Bubble size
            name: client.name, // For tooltip
        })),
    },
];

export default function Page() {
    return (
        <div className="space-y-6 co">
            <div className="space-y-6 co">
                <PageBreadcrumb pageTitle="Gestao de clientes" />
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-1">
                        <ComponentCard title="Percentual da capacidade de trabalho">
                            <GenericChart
                                categories={categories1}
                                series={series1}
                                xAxisTittle="Demanda dos ultimos 6 meses"
                                trend={false}
                                stacked
                                isPercent
                            />
                        </ComponentCard>
                    </div>
                    <div className="flex-1 space-y-1">
                        <ComponentCard title="Performance detalhada">
                            <BubbleChart
                                categories={categories2}
                                series={series2}
                                yAxisTittle="Faturamento"
                                xAxisTittle="Demanda de trabalho"
                                trend={false}
                                keepXaxis
                                keepYaxis
                            />
                        </ComponentCard>
                    </div>
                </div>
            </div>
            <div className="space-y-6">
                <div className="space-y-6">
                    <ComponentCard title="Clientes">
                        <BasicTableOne tableHeaders={tableHeaders} tableData={tableData} />
                    </ComponentCard>
                </div>
            </div>
        </div>
    );
}
