
import { Sidebar } from "@/components/sidebar"
import { IncomePerDayChart } from "./income-per-day-chart"
import { ClientsPerDayChart } from "./clients-per-day-chart"
import { IncomePerProfessionalChart } from "./income-per-professional-chart"
import { IncomePerServiceChart } from "./income-per-service-chart"
import { MetricsSection } from "./metrics-section"
import { MonthPicker } from "./month-picker"
import { useEffect, useState } from "react"

export function Dashboard() {

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
              Dashboard
            </h2>
            <p className="text-muted-foreground">
              Relatórios gerais da barbearia
            </p>
          </div>

            <MonthPicker 
              onSelectMonth={setMonth}
              onSelectYear={setYear}
            />

        </div>

        <div className="flex flex-col gap-12">
          <div className="flex flex-row gap-10">
            <MetricsSection month={month} year={year}/>

            <IncomePerDayChart month={month} year={year}/>
          </div>

          <div className="flex flex-row gap-6">
            <ClientsPerDayChart month={month} year={year}/>
            <IncomePerProfessionalChart month={month} year={year}/>
            <IncomePerServiceChart />
          </div>
        </div>

      </div>
    </div>
  )
}