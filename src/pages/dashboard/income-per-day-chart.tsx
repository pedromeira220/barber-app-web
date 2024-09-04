import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import colors from 'tailwindcss/colors';

const chartData = [
  { date: "2024-08-01", income: 312 },
  { date: "2024-08-02", income: 476 },
  { date: "2024-08-03", income: 215 },
  { date: "2024-08-04", income: 189 },
  { date: "2024-08-05", income: 423 },
  { date: "2024-08-06", income: 332 },
  { date: "2024-08-07", income: 287 },
  { date: "2024-08-08", income: 174 },
  { date: "2024-08-09", income: 456 },
  { date: "2024-08-10", income: 298 },
  { date: "2024-08-11", income: 389 },
  { date: "2024-08-12", income: 221 },
  { date: "2024-08-13", income: 317 },
  { date: "2024-08-14", income: 267 },
  { date: "2024-08-15", income: 480 },
  { date: "2024-08-16", income: 368 },
  { date: "2024-08-17", income: 279 },
  { date: "2024-08-18", income: 134 },
  { date: "2024-08-19", income: 491 },
  { date: "2024-08-20", income: 305 },
  { date: "2024-08-21", income: 198 },
  { date: "2024-08-22", income: 411 },
  { date: "2024-08-23", income: 256 },
  { date: "2024-08-24", income: 373 },
  { date: "2024-08-25", income: 144 },
  { date: "2024-08-26", income: 328 },
  { date: "2024-08-27", income: 492 },
  { date: "2024-08-28", income: 211 },
  { date: "2024-08-29", income: 453 },
  { date: "2024-08-30", income: 172 },
  { date: "2024-08-31", income: 488 }
];

const chartConfig = {
  views: {
    label: "Receita do dia",
  },
  income: {
    label: "Income",
    color: colors.amber[500],
  },
} satisfies ChartConfig

export function IncomePerDayChart() {
  return (
    <Card className="flex flex-1 flex-col">
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey="income"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              }}
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  formatter={(value) => Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                />
              }
            />
            <Line
              dataKey={"income"}
              type="monotone"
              stroke={`var(--color-income)`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
