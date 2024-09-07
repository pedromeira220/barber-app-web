
import { Sidebar } from "@/components/sidebar"
import { DatePicker } from "../agenda/date-picker"
import { IncomePerDayChart } from "./income-per-day-chart"
import { ClientsPerDayChart } from "./clients-per-day-chart"
import { IncomePerProfessionalChart } from "./income-per-professional-chart"
import { IncomePerServiceChart } from "./income-per-service-chart"
import { MetricsSection } from "./metrics-section"

export function Dashboard() {

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


          <div className="flex flex-row gap-2">
            <DatePicker />
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex flex-row gap-10">
            <MetricsSection />

            <IncomePerDayChart />
          </div>

          <div className="flex flex-row gap-6">
            <ClientsPerDayChart />
            <IncomePerProfessionalChart />
            <IncomePerServiceChart />
          </div>
        </div>

      </div>
    </div>
  )
}