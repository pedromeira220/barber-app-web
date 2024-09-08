import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
import colors from "tailwindcss/colors"
import { useQuery } from "@tanstack/react-query"
import React, { useMemo } from "react"
import { getBarbershopIncomePerProfessionalMetrics } from "@/api/get-barbershop-income-per-professional"

// const chartData = [
//   { professional: "João", income: 186 },
//   { professional: "José", income: 305 },
//   { professional: "Felipe", income: 237 },
//   { professional: "Fulano", income: 73 },
// ]

const chartConfig = {
  income: {
    label: "Receita",
    color: colors.amber[300],
  },
} satisfies ChartConfig

interface BarbershopIncomePerProfessionalChartProps {
  year: number | null
  month: number | null
}

export const BarbershopIncomePerProfessionalChart: React.FC<BarbershopIncomePerProfessionalChartProps> = ({month,year}) => {

  const {data: professionals} = useQuery({
    queryKey: ["metrics/barbershop-income-per-professional", month, year],
    queryFn: async () => {      

      if(!month || !year) {
        return []
      }
      
      const response = await getBarbershopIncomePerProfessionalMetrics({
        query: {
          month,
          year
        }
      })

      return response.data.professionals
    },
  })

  const chartData = useMemo(() => {

    if(!professionals) {
      return []
    }

    return professionals.map(professional => {
      return {
        professional: professional.professionalName,
        income: professional.totalGrossRevenueInCents / 100
      }
    })
  }, [professionals])
  
  chartData

  return (
    <Card className="flex flex-1 flex-col">
      <CardHeader>
        <CardTitle>Receita da barbearia por professional</CardTitle>
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
