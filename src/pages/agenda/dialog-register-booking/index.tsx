import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { SelectComponent } from "./select-component";
import { DatePicker } from "./date-picker";

export interface DialogRegisterBookingProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DialogRegisterBooking: React.FC<DialogRegisterBookingProps> = () => {
  return (
    <DialogContent>
      <form
        className="sm:max-w-[425px]"
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
            <Input id="client" className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Telefone
            </Label>
            <Input id="phone" className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Profissional
            </Label>
            
            <SelectComponent
              placeholder="Selecione o profissional"
              items={[
                {
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
                }
              ]}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Serviço
            </Label>
            <SelectComponent
              placeholder="Selecione o serviço"
              items={[
                {
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
                }
              ]}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contactPhone" className="text-right">
                Data
            </Label>
            <DatePicker />
          </div>
        </div>


        <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Horário
            </Label>
            <SelectComponent
              placeholder="Selecione o horário"
              items={[
                {
                  display: "01:00",
                  id: "01-30"
                },
                {
                  display: "01:00",
                  id: "02:30"
                },
                {
                  display: "01:00",
                  id: "03:30"
                },
                {
                  display: "01:00",
                  id: "04:30"
                },
                {
                  display: "01:00",
                  id: "05:30"
                },
                {
                  display: "01:00",
                  id: "06:30"
                },
                {
                  display: "01:00",
                  id: "07:30"
                },
              ]}
            />
          </div>
        <DialogFooter className="mt-4">
          <Button type="submit" >
            Salvar alterações
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}