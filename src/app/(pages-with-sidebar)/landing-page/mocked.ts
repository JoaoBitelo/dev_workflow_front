// mockPrompts.ts
import { Prompt } from "./types";

export const prompts: Prompt[] = [
    {
        id: "1",
        name: "Análise de ciclo",
        content: `Responda a seguinte pergunta:
"Qual o total do consenso do ciclo atual?",

Considere utilizar os dados de ciclo e retorne as seguintes informações:
- O total de unidades vendidas no consenso do ciclo atual.
- A receita total correspondente a essas unidades.

Caso o ciclo atual ainda não tenha dados fechados ou disponíveis, informe isso de maneira transparente, sugerindo ao usuário verificar uma data ou etapa específica.
`,
        isEditable: true,
    },
    {
        id: "2",
        name: "Projeção de produtos novos",
        content: `-Liste os produtos novos que estão com projeção de demanda média maior do que suas respectivas vendas dos últimos 3 meses, destacando os valores de projeção média e a média de vendas dos últimos 3 meses.

- Informe a quantidade total de produtos novos com projeção de demanda igual a zero para os próximos 3 meses.

Utilize os dados de ciclo, realizando as operações necessárias para encontrar as duas informações separadamente. Caso algum dado esteja ausente ou incompleto, informe isso de forma clara ao usuário e, se possível, indique quais produtos ou períodos foram afetados.
`,
        isEditable: true,
    },
        {
        id: "3",
        name: "Variação do consenso",
        content: `Liste quais são os 10 itens com maior variação (resultante) absoluta (em R$) positiva e negativa entre o consenso e a previsão estatística e entre o consenso e o consenso anterior?`,
        isEditable: true,
    },
            {
        id: "4",
        name: "Recência de itens substitutos",
        content: `Liste quais itens substitutos estão com recência maior que 90 dias ou frequência menor que 66% ? `,
        isEditable: true,
    },
                {
        id: "5",
        name: "Recência de itens novos",
        content: `Liste quais itens novos estão com recência maior que 90 dias ou frequência menor que 66% ?`,
        isEditable: true,
    },
    {
        id: "99",
        name: "Exemplo de prompt",
        content: "Um exemplo de prompt que pode ser utilizado para testar a aplicação.",
        isEditable: false,
    },
];
