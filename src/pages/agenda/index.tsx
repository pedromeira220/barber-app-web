import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"

// import styles from "./style.css"
import { useAuth } from "@/hooks/use-auth"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { DialogRegisterBooking } from "./dialog-register-booking"
import { useState } from "react"
import { BookingList } from "./booking-list"

export function Agenda() {
  const {authenticatedBarbershop} = useAuth()


  const [dialogRegisterBookingIsOpen, setDialogRegisterBookingIsOpen] = useState(false)

  const clientBookingUrl = `${window.location.protocol}//${window.location.host}/agenda-cliente/${authenticatedBarbershop?.id}`; 

  return (
    <div className="grid min-h-screen grid-cols-5">
      <Sidebar />

      <div className="col-span-4 flex flex-col gap-6 border-l p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Agenda da barbearia: {authenticatedBarbershop?.name}
            </h2>
            <p>
              <a className="font-semibold text-primary" href={clientBookingUrl} target="_blank" rel="noopener noreferrer">{clientBookingUrl}</a>
            </p>
          </div>

          <div className="flex flex-row gap-2">
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
        <BookingList />
      </div>
    </div>
  )
}