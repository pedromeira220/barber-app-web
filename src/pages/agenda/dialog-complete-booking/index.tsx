import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import React from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerPaymentManually } from "@/api/register-payment-manually";
import { SelectComponent } from "@/components/select-component";
import { useQueryClient } from "@tanstack/react-query";

export interface DialogCompleteBookingProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  bookingId: string
}

const completeBookingFormSchema = z.object({
  method: z.enum(["CARD", "PIX", "CASH"]),
})

type CompleteBookingFormSchemaInputs = z.infer<typeof completeBookingFormSchema>

export const DialogCompleteBooking: React.FC<DialogCompleteBookingProps> = ({setOpen, bookingId}) => {

  const queryClient = useQueryClient()

  const { control, handleSubmit, formState: {isValid} } = useForm<CompleteBookingFormSchemaInputs>({
    resolver: zodResolver(completeBookingFormSchema)
  })

  const handleRegisterBooking = async (data: CompleteBookingFormSchemaInputs) => {

    try {
      await registerPaymentManually({
        body: {
          bookingId,
          date: new Date().toISOString(),
          method: data.method,
          valueInCents: undefined
        }
      })

      setOpen(false)

      queryClient.invalidateQueries({
        exact: false,
        queryKey: ["bookings"]
      })

    } catch (error) {
      console.error("> erro ao completar agendamento", error);
    }
  }

  return (
    <DialogContent>
      <form
        className="sm:max-w-[425px]"
        onSubmit={handleSubmit(handleRegisterBooking)}
      >
        <DialogHeader>
          <DialogTitle>Completar agendamento</DialogTitle>
          <DialogDescription>Complete o agendamento do cliente com os dados do pagamento</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Método pagamento
            </Label>

            <Controller
              control={control}
              name="method"
              render={({ field }) => {
                return (
                  <SelectComponent
                    placeholder="Selecione um método de pagamento"
                    items={[{
                      display: "Cartão",
                      id: "CARD"
                    },
                    {
                      display: "Pix",
                      id: "PIX"
                    },
                    {
                      display: "Dinheiro",
                      id: "CASH"
                    }
                  ]}
                    onValueChange={field.onChange}
                  />
                )
              }}
            />

          </div>

     
        </div>

    
        <DialogFooter className="mt-4">
          <Button type="submit" disabled={!isValid}>
            Completar agendamento
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}