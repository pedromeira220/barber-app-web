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
import { useQuery } from "@tanstack/react-query";
import { getIncomePerDay } from "@/api/get-income-per-day"
import React from "react";


const chartConfig = {
  views: {
    label: "Receita do dia",
  },
  income: {
    label: "Income",
    color: colors.amber[500],
  },
} satisfies ChartConfig

interface IncomePerDayChartProps {
  year: number | null
  month: number | null
}

export const IncomePerDayChart: React.FC<IncomePerDayChartProps> = ({month,year}) => {

  const { data: incomePerDay, isLoading } = useQuery({
    queryKey: ["metrics/income-per-day", month, year],
    queryFn: async () => {

      console.log({
        month,
        year
      });
      

      if(!month || !year) {
        return []
      }
      
      const response = await getIncomePerDay({
        query: {
          month,
          year
        }
      })

      return response.data.incomePerDay
    },
  })

  console.log(incomePerDay);
  

  if (isLoading) {
    return <p>loading</p>
  }

  console.log(incomePerDay);


  return (
    <Card className="flex flex-1 flex-col">
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={incomePerDay}
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
