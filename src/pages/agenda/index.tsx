import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"

// import styles from "./style.css"
import { useAuth } from "@/hooks/use-auth"
import { CloudSun, MoonStar, Sunrise } from "lucide-react"
import { SelectFilter } from "./select-filter"
import { DatePickerFilter } from "./date-picker-filter"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { DialogRegisterBooking } from "./dialog-register-booking"
import { useState } from "react"
// Para fazer a estilização usando o css ao inves do tailwind, utilize esse objeto que contem as classes css

// Na hora de colocar em um elemento seria algo assim
// <div className={style.container}></div>
// Coloque entre chaves e acesse o nome da propriedade definida no arquivo css

export function Agenda() {
  const {authenticatedBarbershop} = useAuth()

  const [dialogRegisterBookingIsOpen, setDialogRegisterBookingIsOpen] = useState(false)

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
            <Dialog
              open={dialogRegisterBookingIsOpen}
              onOpenChange={setDialogRegisterBookingIsOpen}
            >
              <DialogTrigger asChild>
                <Button>Cadastrar agendamento</Button>
              </DialogTrigger>

              <DialogRegisterBooking 
                setOpen={setDialogRegisterBookingIsOpen}
              />
            </Dialog>
            
            
          </div>
            
        </div>

        <div className="flex items-center gap-8">
          <SelectFilter 
            placeholder="Selecione um profissional"
            label="Profissional"
            items={[{
              display: "Pedro",
              id: "pedro"
            },
            {
              display: "José",
              id: "jose"
            },
            {
              display: "João",
              id: "joao"
            },
            {
              display: "Fulano",
              id: "fulano"
            }]}
          />

          <SelectFilter 
            placeholder="Selecione um serviço"
            label="Serviços"
            items={[{
              display: "Corte",
              id: "corte"
            },
            {
              display: "Corte e barba",
              id: "corte-barba"
            },
            {
              display: "barba",
              id: "barba"
            }]}
          />

          <DatePickerFilter />
        </div>

        <div className="rounded-md border">
          <div className="flex items-center justify-between px-3 py-5 border-b">
            <div className="flex items-center gap-3">
              <Sunrise className="text-primary" size={20} />
              <span className="text-sm">Manhã</span>
            </div>

            <span>09h-12h</span>
          </div>

          <div className="p-5">
            <div className="py-2 flex items-center gap-3">
              <span className="font-bold">11:00-11:30</span>
              <span>Nome do cliente - Corte e barba - Nome do profissional</span>
            </div>

            <div className="py-2 flex items-center gap-3">
              <span className="font-bold">11:00-11:30</span>
              <span>Nome do cliente - Corte e barba - Nome do profissional</span>
            </div>
          </div>
          
        </div>

        <div className="rounded-md border">
          <div className="flex items-center justify-between px-3 py-5 border-b">
            <div className="flex items-center gap-3">
              <CloudSun className="text-primary" size={20} />
              <span className="text-sm">Tarde</span>
            </div>

            <span>13h-18h</span>
          </div>

          <div className="p-5">
            <div className="py-2 flex items-center gap-3">
              <span className="font-bold">11:00-11:30</span>
              <span>Nome do cliente - Corte e barba - Nome do profissional</span>
            </div>

            <div className="py-2 flex items-center gap-3">
              <span className="font-bold">11:00-11:30</span>
              <span>Nome do cliente - Corte e barba - Nome do profissional</span>
            </div>
          </div>
          
        </div>

        <div className="rounded-md border">
          <div className="flex items-center justify-between px-3 py-5 border-b">
            <div className="flex items-center gap-3">
              <MoonStar className="text-primary" size={20} />
              <span className="text-sm">Noite</span>
            </div>

            <span>19h-21h</span>
          </div>

          <div className="p-5">
            <div className="py-2 flex items-center gap-3">
              <span className="font-bold">11:00-11:30</span>
              <span>Nome do cliente - Corte e barba - Nome do profissional</span>
            </div>

            <div className="py-2 flex items-center gap-3">
              <span className="font-bold">11:00-11:30</span>
              <span>Nome do cliente - Corte e barba - Nome do profissional</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}