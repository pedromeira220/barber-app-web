import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
// import styles from "./style.css"
import { useAuth } from "@/hooks/use-auth"
// Para fazer a estilização usando o css ao inves do tailwind, utilize esse objeto que contem as classes css

// Na hora de colocar em um elemento seria algo assim
// <div className={style.container}></div>
// Coloque entre chaves e acesse o nome da propriedade definida no arquivo css

export function Agenda() {
  const {authenticatedBarbershop} = useAuth()

  return (
    <div className="grid min-h-screen grid-cols-5">
      <Sidebar />

      <div className="col-span-4 flex flex-col gap-6 border-l p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Agenda da {authenticatedBarbershop?.name}
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