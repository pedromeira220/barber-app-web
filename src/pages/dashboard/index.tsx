
import { Sidebar } from "@/components/sidebar"
import { DatePicker } from "../agenda/date-picker"
import { MetricHeading } from "./metric-heading"
import { IncomePerDayChart } from "./income-per-day-chart"
import { ClientsPerDayChart } from "./clients-per-day-chart"
import { IncomePerProfessionalChart } from "./income-per-professional-chart"
import { IncomePerServiceChart } from "./income-per-service-chart"

export function Dashboard() {

  return (
    <div className="grid min-h-screen grid-cols-5">
      <Sidebar />

      <div className="col-span-4 flex flex-col gap-6 border-l p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Dashboard
          </h2>

          <div className="flex flex-row gap-2">
            <DatePicker />
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex flex-row gap-10">
            <div className="flex flex-col gap-5">
              <MetricHeading
                diffFromPreviousPeriod={-0.092}
                text="Receita total"
                value={"R$9.672,00"}
              />
              <MetricHeading
                diffFromPreviousPeriod={0.066}
                text="Ticket médio geral"
                value={"R$40,30"}
              />
              <MetricHeading
                diffFromPreviousPeriod={0.081}
                text="Serviços efetuados"
                value={"240"}
              />
            </div>

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