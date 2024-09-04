import colors from 'tailwindcss/colors';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-04-01", clients: 12},
  { date: "2024-04-02", clients: 9},
  { date: "2024-04-03", clients: 10},
  { date: "2024-04-04", clients: 6 },
  { date: "2024-04-05", clients: 12},
  { date: "2024-04-06", clients: 8 },
  { date: "2024-04-07", clients: 11 },
]

const chartConfig = {
  views: {
    label: "Visitantes",
  },
  clients: {
    label: "Clientes",
    color: colors.blue[400],
  },
} satisfies ChartConfig

export function ClientsPerDayChart() {
  return (
    <Card className="flex flex-1 flex-col">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Clientes por dia da semana</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
          >
            <CartesianGrid vertical={false} />

            <YAxis
              dataKey="clients"
              tickLine={false}
              axisLine={false}
              tickMargin={32}
              tickFormatter={(value) => {
                return value
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
                return date.toLocaleDateString("en-US", {
                  weekday: "short"
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={"clients"}
              type="monotone"
              stroke={`var(--color-clients)`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
