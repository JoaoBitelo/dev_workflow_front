import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";

interface Clientdata {
    tableHeaders: string[];
    tableData: {
        id: number;
        name: string;
        bill: number;
        operation1: string;
        strategy: number;
        operation2: string;
        demand: number;
        operation3: string;
        evaluation: number;
    }[];
}

const BasicTableOne: React.FC<Clientdata> = ({ tableHeaders, tableData }) => {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[1102px]">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                {tableHeaders.map((item, index) => (
                                    <TableCell
                                        key={index}
                                        isHeader
                                        className="py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                                    >
                                        {item}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {tableData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="px-1 py-1 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="px-1 py-1 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                        {item.demand}
                                    </TableCell>
                                    <TableCell className="px-1 py-1 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                        {item.operation1}
                                    </TableCell>
                                    <TableCell className="px-1 py-1 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                        {item.bill}
                                    </TableCell>
                                    <TableCell className="px-1 py-1 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                        {item.operation2}
                                    </TableCell>
                                    <TableCell className="px-1 py-1 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                        {item.strategy}
                                    </TableCell>
                                    <TableCell className="px-1 py-1 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                        {item.operation3}
                                    </TableCell>
                                    <TableCell
                                        className={`px-1 py-1 text-center text-theme-sm ${
                                            item.evaluation < 0
                                                ? "text-red-500"
                                                : item.evaluation <= 2
                                                ? "text-yellow-700"
                                                : "text-green-500"
                                        }`}
                                    >
                                        {item.evaluation}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default BasicTableOne;
