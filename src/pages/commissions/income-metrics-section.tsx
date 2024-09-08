import React from "react";
import { IncomeMetricCard } from "./income-metric-card";

export const IncomeMetricsSection: React.FC = () => {
  return (
    <div className="flex gap-6 items-center">
      <IncomeMetricCard 
        text="Receita líquida"
        value="R$ 1.200,00"
      />
      <span>=</span>
      <IncomeMetricCard 
        text="Receita bruta"
        value="R$ 2.200,00"
      />
      <span>-</span>
      <IncomeMetricCard 
        text="Receita dos profissionais"
        value="R$ 1.000,00"
      />
    </div>
  )
}