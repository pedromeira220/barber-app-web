import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import colors from "tailwindcss/colors"
import React from "react"

export const description = "A simple pie chart"

const chartData = [
  { professional: "jose", income: 275, fill: "var(--color-jose)" },
  { professional: "joao", income: 200, fill: "var(--color-joao)" },
  { professional: "felipe", income: 187, fill: "var(--color-felipe)" },
  { professional: "pedro", income: 173, fill: "var(--color-pedro)" },
  { professional: "other", income: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  income: {
    label: "Receita",
  },
  jose: {
    label: "José",
    color: colors.amber[200],
  },
  joao: {
    label: "João",
    color: colors.amber[300],
  },
  felipe: {
    label: "Felipe",
    color: colors.amber[400],
  },
  pedro: {
    label: "Pedro",
    color: colors.amber[500],
  },
  other: {
    label: "Other",
    color: colors.amber[600],
  },
} satisfies ChartConfig

interface IncomePerProfessionalChartProps {
  year: number | null
  month: number | null
}

export const IncomePerProfessionalChart: React.FC<IncomePerProfessionalChartProps> = () => {


  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Receita por profissional</CardTitle>
        <CardDescription>Agosto 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              formatter={(value) => {
                return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              }}
            />
            <Pie data={chartData} dataKey="income" nameKey="professional" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Mostrando receita profissional do mês
        </div>
      </CardFooter>
    </Card>
  )
}
