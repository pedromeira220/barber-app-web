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

const chartData = [
  { service: "corte", income: 560, fill: "var(--color-corte)" },
  { service: "corteEBarba", income: 200, fill: "var(--color-corteEBarba)" },
  { service: "quimica", income: 187, fill: "var(--color-quimica)" },
  { service: "other", income: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  income: {
    label: "Receita",
  },
  corte: {
    label: "Corte",
    color: colors.amber[200],
  },
  corteEBarba: {
    label: "Corte & Barba",
    color: colors.amber[300],
  },
  quimica: {
    label: "Química",
    color: colors.amber[400],
  },
  other: {
    label: "Other",
    color: colors.amber[600],
  },
} satisfies ChartConfig

export function IncomePerServiceChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Receita por serviço</CardTitle>
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
            <Pie data={chartData} dataKey="income" nameKey="service" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Mostrando receita por serviço do mês
        </div>
      </CardFooter>
    </Card>
  )
}
