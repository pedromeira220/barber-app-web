import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import colors from 'tailwindcss/colors';

const chartData = [
  { professional: "João", income: 186 },
  { professional: "José", income: 305 },
  { professional: "Felipe", income: 237 },
  { professional: "Fulano", income: 73 },
]

const chartConfig = {
  income: {
    label: "Receita",
    color: colors.amber[500],
  },
} satisfies ChartConfig

export function ProfessionalIncomeChart() {
  return (
    <Card className="flex flex-1 flex-col">
      <CardHeader>
        <CardTitle>Receita por profissional</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="professional"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 7)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="income" fill="var(--color-income)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
