import { Sidebar } from "@/components/sidebar";
import React, { useEffect, useState } from "react";
import { MonthPicker } from "../dashboard/month-picker";
import { BarbershopIncomePerProfessionalChart } from "./barbershop-income-per-professional-chart";
import { ProfessionalIncomeChart } from "./professional-income-chart";
import { IncomeMetricsSection } from "./income-metrics-section";
import { CommissionsTable } from "./commissions-table";

export const Commissions: React.FC = () => {

  const [month, setMonth] = useState<null | number>(null)
  const [year, setYear] = useState<null | number>(null)

  useEffect(() => {
    const currentDate = new Date();

    // Obter o mês atual (1 para Janeiro, 12 para Dezembro)
    const currentMonth = currentDate.getMonth() + 1; // getMonth() retorna 0 para Janeiro, 11 para Dezembro, por isso somamos 1

    // Obter o ano atual
    const currentYear = currentDate.getFullYear();

    // Setar os estados de mês e ano
    setMonth(currentMonth);
    setYear(currentYear);
  }, []);

  return (
    <div className="grid min-h-screen grid-cols-5">
      <Sidebar />

      <div className="col-span-4 flex flex-col gap-6 border-l p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Comissões
            </h2>
            <p className="text-muted-foreground">
              Relatórios e métricas de comissionamento dos profissionais
            </p>
          </div>

          <MonthPicker
            onSelectMonth={setMonth}
            onSelectYear={setYear}
          />

        </div>

        <div className="flex flex-col gap-12">
          <IncomeMetricsSection
            month={month}
            year={year}
          />

          <div className="flex gap-8">
            <BarbershopIncomePerProfessionalChart
              month={month}
              year={year}
            />
            <ProfessionalIncomeChart
              month={month}
              year={year}
            />
          </div>
          <CommissionsTable
            month={month}
            year={year}
          />
        </div>

      </div>
    </div>
  )
}