import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { SelectComponent } from "../../../components/select-component";
import { DatePicker } from "./date-picker";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { fetchProfessionalsFromBarbershop } from "@/api/fetch-professionals-from-barbershop";
import { fetchServicesFromBarbershop } from "@/api/fetch-services-from-barbershop";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerBookingManually } from "@/api/register-booking-manually";
import { addMinutes } from "date-fns";

export interface DialogRegisterBookingProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const registerBookingManuallyFormSchema = z.object({
  clientName: z.string(),
  clientPhone: z.string(),
  professionalId: z.string().uuid(),
  serviceId: z.string().uuid(),
  date: z.date(),
  bookingTimeInMinutes: z.number()
})

type RegisterBookingManuallyFormSchemaInputs = z.infer<typeof registerBookingManuallyFormSchema>

export const DialogRegisterBooking: React.FC<DialogRegisterBookingProps> = ({setOpen}) => {

  const queryClient = useQueryClient()

  const { authenticatedBarbershop } = useAuth()

  const { data: professionals } = useQuery({
    queryKey: ["professionals", "barbershop", authenticatedBarbershop?.id],
    queryFn: async () => {
      const response = await fetchProfessionalsFromBarbershop({ barbershopId: authenticatedBarbershop?.id ?? "" })

      return response.data.professionals
    }
  })

  const { data: services } = useQuery({
    queryKey: ["services", "barbershop", authenticatedBarbershop?.id],
    queryFn: async () => {
      const response = await fetchServicesFromBarbershop({ barbershopId: authenticatedBarbershop?.id ?? "" })

      return response.data.services
    }
  })

  const { register, control, handleSubmit, formState: {isValid} } = useForm<RegisterBookingManuallyFormSchemaInputs>({
    resolver: zodResolver(registerBookingManuallyFormSchema),
    defaultValues: {
      date: undefined
    }
  })

  const handleRegisterBooking = async (data: RegisterBookingManuallyFormSchemaInputs) => {

    const bookingDate = addMinutes(data.date, data.bookingTimeInMinutes)

    try {
      await registerBookingManually({
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        date: bookingDate,
        professionalId: data.professionalId,
        serviceId: data.serviceId,
        status: "PENDING"
      })

      queryClient.invalidateQueries({
        exact: false,
        queryKey: ["bookings"]
      })

      setOpen(false)

    } catch (error) {
      console.error("> erro ao cadastrar agendamento", error);
    }
  }

  return (
    <DialogContent>
      <form
        className="sm:max-w-[425px]"
        onSubmit={handleSubmit(handleRegisterBooking)}
      >
        <DialogHeader>
          <DialogTitle>Cadastrar agendamento</DialogTitle>
          <DialogDescription>Cadastre um agendamento manualmente</DialogDescription>
        </DialogHeader>
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
                      id: String(index * 60) 
                    }
                  })}
                  onValueChange={(value) => field.onChange(Number(value))}
                />
              )
            }}
          />
        </div>
        <DialogFooter className="mt-4">
          <Button type="submit" disabled={!isValid}>
            Cadastrar agendamento
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}