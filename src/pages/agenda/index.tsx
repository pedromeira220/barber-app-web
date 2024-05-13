import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"

export function Agenda() {
  return (
    <div className="grid min-h-screen grid-cols-5">
      <Sidebar />

      <div className="col-span-4 flex flex-col gap-6 border-l p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Agenda da barbearia do seu zé
            </h2>
            <p className="text-muted-foreground">
              Consulte os agendamentos do dia
            </p>
          </div>

          <div className="flex flex-row gap-2">
            <Button variant="outline">Bloquear horário</Button>
            <Button>Cadastrar agendamento</Button>
          </div>
            
        </div>

        <div className="rounded-md border">
          <p>agenda</p>
        </div>
      </div>
    </div>
  )
}