import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProfessionalsFromBarbershop } from "@/api/fetch-professionals-from-barbershop";
import { fetchServicesFromBarbershop } from "@/api/fetch-services-from-barbershop";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMinutes } from "date-fns";
import { SelectComponent } from "@/components/select-component";
import { DatePicker } from "../agenda/dialog-register-booking/date-picker";
import { useParams } from "react-router-dom";
import { makeBooking } from "@/api/make-booking";
import { toast } from "sonner";



const registerBookingManuallyFormSchema = z.object({
  clientName: z.string(),
  clientPhone: z.string(),
  professionalId: z.string().uuid(),
  serviceId: z.string().uuid(),
  date: z.date(),
  bookingTimeInMinutes: z.number()
})

type RegisterBookingManuallyFormSchemaInputs = z.infer<typeof registerBookingManuallyFormSchema>

const AgendaCliente: React.FC = () => {

  // const queryClient = useQueryClient()

  const params = useParams()

  const currentPageBarbershopId = params.barbershopId

  const { data: professionals } = useQuery({
    queryKey: ["professionals", "barbershop", currentPageBarbershopId],
    queryFn: async () => {
      const response = await fetchProfessionalsFromBarbershop({ barbershopId: currentPageBarbershopId ?? "" })

      return response.data.professionals
    }
  })

  const { data: services } = useQuery({
    queryKey: ["services", "barbershop", currentPageBarbershopId],
    queryFn: async () => {
      const response = await fetchServicesFromBarbershop({ barbershopId: currentPageBarbershopId ?? "" })

      return response.data.services
    }
  })

  const { register, control, handleSubmit, formState: {isValid}, reset } = useForm<RegisterBookingManuallyFormSchemaInputs>({
    resolver: zodResolver(registerBookingManuallyFormSchema),
    defaultValues: {
      date: undefined
    }
  })

  const handleRegisterBooking = async (data: RegisterBookingManuallyFormSchemaInputs) => {

    const bookingDate = addMinutes(data.date, data.bookingTimeInMinutes)

    try {
      await makeBooking({
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        date: bookingDate,
        professionalId: data.professionalId,
        serviceId: data.serviceId,
        status: "PENDING",
        barbershopId: currentPageBarbershopId ?? ""
      })

      toast.success("Agendamento realizado com sucesso")

      reset()
    } catch (error) {
      console.error("> erro ao cadastrar agendamento", error);
      toast.error("Erro ao realizar agendamento")
    }
  }

  return (
    <div className="w-screen">
      <form
        className="sm:max-w-[425px] mx-auto mt-24"
        onSubmit={handleSubmit(handleRegisterBooking)}
      >
        <div>
          <p className="text-lg font-semibold leading-none tracking-tight">Realize seu agendamento</p>
          <p>Preencha os dados para completar o agendamento</p>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="client" className="text-right">
              Cliente
            </Label>
            <Input id="client" className="col-span-3" {...register("clientName")} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Telefone
            </Label>
            <Input id="phone" className="col-span-3" {...register("clientPhone")} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Profissional
            </Label>

            <Controller
              control={control}
              name="professionalId"
              render={({ field }) => {
                return (
                  <SelectComponent
                    placeholder="Selecione o profissional"
                    items={
                      !professionals ? [] : professionals?.map(professional => {
                        return {
                          display: professional.name,
                          id: professional.id
                        }
                      })}
                    onValueChange={field.onChange}
                  />
                )
              }}
            />

          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Serviço
            </Label>
            <Controller
              control={control}
              name="serviceId"
              render={({ field }) => {
                return (
                  <SelectComponent
                    placeholder="Selecione o serviço"
                    items={
                      !services ? [] : services?.map(service => {
                        return {
                          display: service.name,
                          id: service.id
                        }
                      })}
                    onValueChange={field.onChange}
                  />
                )
              }}
            />

          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contactPhone" className="text-right">
              Data
            </Label>
            
            <Controller 
              control={control}
              name="date"
              render={({field}) => {
                return (
                  <DatePicker
                    date={field.value}
                    onSelectDate={field.onChange}
                  />
                )
              }}
            />

          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">
            Horário
          </Label>
          <Controller
            control={control}
            name="bookingTimeInMinutes"
            render={({ field }) => {
              return (
                <SelectComponent
                  placeholder="Selecione o horário"
                  items={Array.from({
                    length: 24
                  }).map((_, index) => {
                    return {
                      display: `${index}:00`,
                      id: index * 60
                    }
                  }).filter(data => {
                    if(data.id < 9 * 60 || data.id > 20 * 60) {
                      return false
                    }
                    return true
                  }).map(data => {
                    return {
                      display: data.display,
                      id: String(data.id)
                    }
                  })}
                  onValueChange={(value) => field.onChange(Number(value))}
                />
              )
            }}
          />
        </div>
        <div className="mt-4">
          <Button type="submit" disabled={!isValid}>
            Realizar agendamento
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AgendaCliente