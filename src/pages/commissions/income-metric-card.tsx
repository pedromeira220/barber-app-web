import React from "react";

interface IncomeMetricCardProps {
  text: string
  value: string
}

export const IncomeMetricCard: React.FC<IncomeMetricCardProps> = ({text,value}) => {
  return (
    <div className="flex flex-col gap-2 p-6 border rounded-xl border-zinc-300 flex-1">
      <p className="text-sm text-muted-foreground">{text}</p>
      <h3 className="text text-3xl font-semibold">{value}</h3>
    </div>
  )
}