
import { Sidebar } from "@/components/sidebar"
import { DatePicker } from "../agenda/date-picker"
import { MetricHeading } from "./metric-heading"
import { IncomePerDayChart } from "./income-per-day-chart"

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

        <div className="flex flex-row gap-8">
          <div className="flex flex-col gap-5">
            <MetricHeading 
              change={0.092}
              text="Receita total"
              value={"R$9.672,00"}
            />
            <MetricHeading 
              change={0.066}
              text="Ticket médio geral"
              value={"R$40,30"}
            />
            <MetricHeading 
              change={0.081}
              text="Serviços efetuados"
              value={"240"}
            />
          </div>

          <IncomePerDayChart />
        </div>

      </div>
    </div>
  )
}