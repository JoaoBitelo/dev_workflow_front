// mockPrompts.ts
import { DataType } from "./types";

export const data: DataType[] = [
  {
    name: "trending",
    description: "Assuntos do momento",
    status: "warning",
  },
  {
    name: "payment",
    description: "Pagamento",
    status: "success",
  },
  {
    name: "performance-individual",
    description: "Performances individuais",
    status: "warning",
  },
  {
    name: "performance-team",
    description: "Performance do time",
    status: "success",
  },
  {
    name: "technical-debt",
    description: "Debito tecnico",
    status: "warning",
  },
  {
    name: "client-demand",
    description: "Demanda por clientes",
    status: "alert",
  },
  {
    name: "bugs-individual",
    description: "Bugs por time",
    status: "alert",
  },
  {
    name: "bugs-team",
    description: "Bugs por individuo",
    status: "success",
  },
];
