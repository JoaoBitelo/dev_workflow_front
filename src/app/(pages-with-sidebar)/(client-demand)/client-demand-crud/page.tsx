"use client";

import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Close, PersonAdd, Done } from "@mui/icons-material";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import React, { useState, useEffect } from "react";
import { useModal } from "@/hooks/useModal";

export default function Page() {
    const [newClient, setNewClient] = useState({ name: "", bill: 0, strategy: 0 });
    const { isOpen, openModal, closeModal } = useModal();
    const [tableData, setTableData] = useState([
        { id: 1, name: "Client A", bill: 1.87, strategy: 3.42, demand: 3.42 },
        { id: 2, name: "Client B", bill: 4.23, strategy: 0.95, demand: 0.95 },
        { id: 3, name: "Client C", bill: 3.57, strategy: 0.95, demand: 2.11 },
        { id: 4, name: "Client D", bill: 0.67, strategy: 0.95, demand: 4.88 },
        { id: 5, name: "Client E", bill: 2.99, strategy: 1.42, demand: 1.42 },
        // { id: 6, name: "Client F", bill: 4.1, strategy: 1.42, demand: 0.33 },
    ]);
    const [normalizedData, setNormalizedData] = useState<any[]>([]);
    const [originalData, setOriginalData] = useState<any[]>([]);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        recalcNormalizedData(tableData);
        if (tableData.length !== originalData.length) {
            setHasChanges(true);
            return;
        }

        const hasChanges = tableData
            .slice() // avoid mutating original array
            .sort((a, b) => a.id - b.id)
            .some((item, i, arr) => {
                const originalItem = [...originalData].sort((a, b) => a.id - b.id)[i];
                return (
                    item.id !== originalItem.id ||
                    item.name != originalItem.name ||
                    item.bill !== originalItem.bill ||
                    item.strategy !== originalItem.strategy ||
                    item.demand !== originalItem.demand
                );
            });
        console.log("hasChanges:", hasChanges);
        setHasChanges(hasChanges);
    }, [tableData]);

    const recalcNormalizedData = (
        data: typeof tableData,
        field?: string,
        changedId?: number,
        newName?: string | number
    ) => {
        const fields = ["bill", "strategy", "demand"] as const;
        const normalized = data.map((item) => ({ ...item }));

        fields.forEach((field) => {
            const values = data.map((item) => Number(item[field]) || 0);
            const maxValue = Math.max(...values);

            normalized.forEach((item) => {
                item[field] = maxValue > 0 ? (Number(item[field]) / maxValue) * 10 : 0;
            });
        });

        // Propagate name only for the changed item
        if (field === "name") {
            const idx = normalized.findIndex((item) => item.id === changedId);
            if (idx !== -1) {
                normalized[idx].name = newName !== undefined ? String(newName) : "";
            }
        }

        setNormalizedData(normalized);
    };

    // Trigger calculation on page render
    useEffect(() => {
        recalcNormalizedData(tableData);
        setOriginalData(tableData);
        setHasChanges(false);
    }, []);

    const handleInputChange = (id: number, field: string, value: number | string) => {
        setTableData((prev) => {
            const updated = prev.map((item) => (item.id === id ? { ...item, [field]: value } : item));
            recalcNormalizedData(updated, field, id, value);
            return updated;
        });
    };

    const handleModalInputChange = (field: string, value: string) => {
        setNewClient((prev) => ({ ...prev, [field]: value }));
    };

    const handleCancelButton = () => {
        setTableData(originalData);
    };

    const handleAddButton = () => {
        openModal();
    };

    const handleSaveButton = () => {
        console.log("salvou");
    };

    const handleDeleteButton = (id: number | string) => {
        setTableData((prev) => prev.filter((item) => item.id !== Number(id)));
    };

    const handleModalSaveButton = () => {
        newClient;
        setTableData([
            ...tableData,
            {
                id: -1,
                name: newClient.name,
                bill: newClient.bill,
                strategy: newClient.bill,
                demand: 0,
            },
        ]);
        closeModal();
    };

    const deleteButton = (itemId: number) => {
        return (
            <Button size="sm" variant="danger" onClick={() => handleDeleteButton(itemId)}>
                Deletar
            </Button>
        );
    };

    return (
        <div className="space-y-3 co">
            <PageBreadcrumb pageTitle="Gestao de clientes" />
            <ComponentCard title="Percentual da capacidade de trabalho">
                <div className="grid grid-cols-2 gap-4">
                    {tableData.map((item, index) => (
                        <ComponentCard
                            key={item.id}
                            title={item.name}
                            bodyClassName="space-y-1"
                            upperBodyClassName="border-t border-gray-100 dark:border-gray-800 sm:p-2"
                            headerClassName="px-3 py-2"
                            headerButton={deleteButton(item.id)}
                        >
                            <div className="flex space-x-4">
                                {/* Editable */}
                                <div className="flex-1 space-y-1">
                                    <ComponentCard
                                        bodyClassName="space-y-1"
                                        upperBodyClassName="border-t border-gray-100 dark:border-gray-800 sm:p-2"
                                        headerClassName="px-3 py-2"
                                    >
                                        <div>
                                            <Label>Nome</Label>
                                            <Input
                                                type="text"
                                                defaultValue={item.name}
                                                onChange={(e) => handleInputChange(item.id, "name", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label>Faturamento</Label>
                                            <Input
                                                type="text"
                                                defaultValue={item.bill}
                                                onChange={(e) =>
                                                    handleInputChange(item.id, "bill", Number(e.target.value))
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label>Valor estrategico</Label>
                                            <Input
                                                type="text"
                                                defaultValue={item.strategy}
                                                onChange={(e) =>
                                                    handleInputChange(item.id, "strategy", Number(e.target.value))
                                                }
                                            />
                                        </div>
                                    </ComponentCard>
                                </div>

                                {/* Read-only normalized */}
                                <div className="flex-1 space-y-1">
                                    <ComponentCard
                                        bodyClassName="space-y-1"
                                        upperBodyClassName="border-t border-gray-100 dark:border-gray-800 sm:p-2"
                                        headerClassName="px-3 py-2"
                                    >
                                        <div>
                                            <Label>Nome</Label>
                                            <Input
                                                type="text"
                                                defaultValue={normalizedData[index]?.name || ""}
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <Label>Faturamento</Label>
                                            <Input
                                                type="text"
                                                defaultValue={normalizedData[index]?.bill || 0}
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <Label>Valor estrategico</Label>
                                            <Input
                                                type="text"
                                                defaultValue={normalizedData[index]?.strategy || 0}
                                                disabled
                                            />
                                        </div>
                                    </ComponentCard>
                                </div>
                            </div>
                        </ComponentCard>
                    ))}
                </div>
            </ComponentCard>

            {/* Botoes flutuando */}
            <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
                <div className="fixed bottom-4 right-4 flex space-x-2 z-50">
                    <button
                        disabled={!hasChanges}
                        onClick={handleCancelButton}
                        className="w-14 h-14 rounded-full text-white shadow-lg flex items-center justify-center bg-blue-500 disabled:bg-gray-200 dark:disabled:!bg-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed"
                    >
                        <Close />
                    </button>

                    <button
                        onClick={handleAddButton}
                        className="w-14 h-14 rounded-full text-white shadow-lg flex items-center justify-center bg-blue-500 disabled:bg-gray-200 dark:disabled:!bg-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed"
                    >
                        <PersonAdd />
                    </button>

                    <button
                        disabled={!hasChanges}
                        onClick={handleSaveButton}
                        className="w-14 h-14 rounded-full text-white shadow-lg flex items-center justify-center bg-green-500 disabled:bg-gray-200 dark:disabled:!bg-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed"
                    >
                        <Done />
                    </button>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] p-5 lg:p-10">
                <h4 className="font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90">Novo cliente</h4>
                <div>
                    <Label>Nome</Label>
                    <Input type="text" onChange={(e) => handleModalInputChange("name", e.target.value)} />
                </div>
                <div>
                    <Label>Faturamento</Label>
                    <Input type="text" onChange={(e) => handleModalInputChange("bill", e.target.value)} />
                </div>
                <div>
                    <Label>Valor estrategico</Label>
                    <Input type="text" onChange={(e) => handleModalInputChange("strategy", e.target.value)} />
                </div>
                <div className="flex items-center justify-end w-full gap-3 mt-8">
                    <Button size="sm" onClick={closeModal}>
                        Cancelar
                    </Button>
                    <Button size="sm" onClick={handleModalSaveButton}>
                        Salvar
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
