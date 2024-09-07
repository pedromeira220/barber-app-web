import colors from 'tailwindcss/colors';

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAverageBookingsPerDayOfWeek } from '@/api/get-avarage-bookings-per-day-of-week.ts';
import { addDays, format, startOfWeek } from 'date-fns';


const chartConfig = {
  views: {
    label: "Visitantes",
  },
  clients: {
    label: "Clientes",
    color: colors.amber[400],
  },
} satisfies ChartConfig

interface ClientsPerDayChartProps {
  year: number | null
  month: number | null
}

export const ClientsPerDayChart: React.FC<ClientsPerDayChartProps> = ({month,year}) => {

  const { data: averageBookingsPerDayOfWeek, isLoading } = useQuery({
    queryKey: ["/metrics/average-bookings-per-day-of-week", month, year],
    queryFn: async () => {      

      if(!month || !year) {
        return []
      }
      
      const response = await getAverageBookingsPerDayOfWeek({
        query: {
          month,
          year
        }
      })

      return response.data.averageBookingsPerDayOfWeek
    },
  })

  const chartData = useMemo(() => {
    const data: {date: string, clients: number}[] = [];

  const startDate = !year || !month ? new Date(2024, 1, 1) : new Date(year, month - 1, 1)    

  // Encontra o primeiro dia da semana baseado na data fornecida
  const firstDayOfWeek = startOfWeek(new Date(startDate), { weekStartsOn: 0 });    

  // Mapeia os dados de agendamentos para o formato desejado
  (averageBookingsPerDayOfWeek ?? []).forEach((entry) => {

    const { dayOfWeek, averageBookings } = entry;
      
    // Calcula a data correspondente para o dia da semana
    const date = addDays(firstDayOfWeek, dayOfWeek);
    
    // Formata a data para o formato "YYYY-MM-DD"
    const formattedDate = format(date, 'yyyy-MM-dd');    
    
    // Adiciona o objeto no formato desejado ao array de saída
    data.push({ date: formattedDate, clients: averageBookings });
  });

  return data;
  }, [averageBookingsPerDayOfWeek, year, month])

  if(isLoading || !averageBookingsPerDayOfWeek) {
    return <p>Carregando...</p>
  }
  
  console.log({
    chartData
  });
  

  return (
    <Card className="flex flex-1 flex-col">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Agendamentos médios por dia da semana</CardTitle>
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

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("pt-BR", {
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
                    return new Date(value).toLocaleDateString("pt-BR", {
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
