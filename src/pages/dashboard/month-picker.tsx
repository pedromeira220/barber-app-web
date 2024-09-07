import { SelectComponent } from "@/components/select-component";
import React from "react";

interface MonthPickerProps {
  onSelectMonth: (month: number) => void
  onSelectYear: (month: number) => void
}

export const MonthPicker: React.FC<MonthPickerProps> = ({onSelectMonth,onSelectYear}) => {
  
  const months = [
    { id: 1, name: "Janeiro" },
    { id: 2, name: "Fevereiro" },
    { id: 3, name: "Março" },
    { id: 4, name: "Abril" },
    { id: 5, name: "Maio" },
    { id: 6, name: "Junho" },
    { id: 7, name: "Julho" },
    { id: 8, name: "Agosto" },
    { id: 9, name: "Setembro" },
    { id: 10, name: "Outubro" },
    { id: 11, name: "Novembro" },
    { id: 12, name: "Dezembro" }
  ];

  const years = [2024]

  return (
    <div className="flex flex-row gap-2">
      <SelectComponent 
        placeholder="Mês"
        items={months.map(month => {
          return {
            id: String(month.id),
            display: month.name
          }
        })}
        onValueChange={(value) => {
          onSelectMonth(Number(value))
        }}
      />
      <SelectComponent 
        placeholder="Ano"
        items={years.map(year => {
          return {
            id: String(year),
            display: String(year)
          }
        })}
        onValueChange={(value) => {
          onSelectYear(Number(value))
        }}
      />
    </div>
  )
}