import React from "react";
import { MetricHeading } from "./metric-heading";
import { useQuery } from "@tanstack/react-query";
import { getMetrics } from "@/api/get-metrics";

interface MetricsSectionProps {
  year: number | null
  month: number | null
}

export const MetricsSection: React.FC<MetricsSectionProps> = ({month,year}) => {

  const {data: metrics, isLoading} = useQuery({
    queryKey: ["metrics", month, year],
    queryFn: async () => {

      if(!month || !year) {
        return
      }

      const response = await getMetrics({
        query: {
          month,
          year
        }
      })

      return response.data
    },
    enabled: !!month && !!year,
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
        value={isLoading || !metrics?.completedBookings.completedBookingsCount ? "..." : String(metrics?.completedBookings.completedBookingsCount)}
      />
    </div>
  )
}