import React from "react";
import { IncomeMetricCard } from "./income-metric-card";
import { useQuery } from "@tanstack/react-query";
import { getCommissionIncomeMetrics } from "@/api/get-commission-income-metrics";

interface IncomeMetricsSectionProps {
  year: number | null
  month: number | null
}

export const IncomeMetricsSection: React.FC<IncomeMetricsSectionProps> = ({month,year}) => {

  const {data: commissionMetrics, isLoading} = useQuery({
    queryKey: ["commissions/metrics", month, year],
    queryFn: async () => {

      if(!month || !year) {
        return
      }

      const response = await getCommissionIncomeMetrics({
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
    <div className="flex gap-6 items-center">
      <IncomeMetricCard 
        text="Receita líquida"
        value={isLoading || !commissionMetrics?.netIncome ? "..." : formatToCurrency(commissionMetrics?.netIncome / 100)}
      />
      <span>=</span>
      <IncomeMetricCard 
        text="Receita bruta"
        value={isLoading || !commissionMetrics?.totalIncomeInCents ? "..." : formatToCurrency(commissionMetrics?.totalIncomeInCents / 100)}
      />
      <span>-</span>
      <IncomeMetricCard 
        text="Receita dos profissionais"
        value={isLoading || !commissionMetrics?.totalProfessionalIncomeInCents ? "..." : formatToCurrency(commissionMetrics?.totalProfessionalIncomeInCents / 100)}
      />
    </div>
  )
}