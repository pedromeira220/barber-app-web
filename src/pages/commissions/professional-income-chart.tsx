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
import colors from 'tailwindcss/colors';
import { useQuery } from "@tanstack/react-query";
import { getProfessionalIncomeMetrics } from "@/api/get-professional-income";
import { useMemo } from "react";

// const chartData = [
//   { professional: "João", income: 186 },
//   { professional: "José", income: 305 },
//   { professional: "Felipe", income: 237 },
//   { professional: "Fulano", income: 73 },
// ]

const chartConfig = {
  income: {
    label: "Receita",
    color: colors.amber[500],
  },
} satisfies ChartConfig

interface ProfessionalIncomeChartProps {
  year: number | null
  month: number | null
}

export const ProfessionalIncomeChart: React.FC<ProfessionalIncomeChartProps> =({month,year}) => {
  const {data: professionals} = useQuery({
    queryKey: ["metrics/professional-income", month, year],
    queryFn: async () => {      

      if(!month || !year) {
        return []
      }
      
      const response = await getProfessionalIncomeMetrics({
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
        income: professional.totalIncomeInCents / 100
      }
    })
  }, [professionals])

  return (
    <Card className="flex flex-1 flex-col">
      <CardHeader>
        <CardTitle>Receita por profissional</CardTitle>
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
