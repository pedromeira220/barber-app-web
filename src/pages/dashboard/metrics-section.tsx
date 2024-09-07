import React from "react";
import { MetricHeading } from "./metric-heading";
import { useQuery } from "@tanstack/react-query";
import { getMetrics } from "@/api/get-metrics";

export const MetricsSection: React.FC = () => {

  const year = 2024
  const month = 9

  const {data: metrics, isLoading} = useQuery({
    queryKey: ["metrics", month],
    queryFn: async () => {

      const response = await getMetrics({
        query: {
          month,
          year
        }
      })

      return response.data
    },
  })  

  const formatToCurrency = (value: number) => {
    return  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  return (
    <div className="flex flex-col gap-5">
      <MetricHeading
        diffFromPreviousPeriod={metrics?.totalIncome.diffFromLastMonth}
        text="Receita total"
        value={isLoading || !metrics?.totalIncome.totalIncomeInCents ? "..." : formatToCurrency(metrics?.totalIncome.totalIncomeInCents / 100)}
      />
      <MetricHeading
        diffFromPreviousPeriod={metrics?.averageTicket.diffFromLastMoth}
        text="Ticket médio geral"
        value={isLoading || !metrics?.averageTicket.averageTicketInCents ? "..." : formatToCurrency(metrics?.averageTicket.averageTicketInCents / 100)}
      />
      <MetricHeading
        diffFromPreviousPeriod={metrics?.completedBookings.diffFromLastMoth}
        text="Agendamentos completos"
        value={isLoading ? "..." : String(metrics?.completedBookings.completedBookingsCount)}
      />
    </div>
  )
}