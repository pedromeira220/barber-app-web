import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerBarbershop } from "@/api/register-barbershop"

interface BarbershopRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const registerBarbershopFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  contactName: z.string(),
  contactPhone: z.string()
})

type registerBarbershopFormSchemaInputs = z.infer<typeof registerBarbershopFormSchema>

export function BarbershopRegisterForm({ className, ...props }: BarbershopRegisterFormProps) {

  const {register, handleSubmit, formState: {isLoading}} = useForm<registerBarbershopFormSchemaInputs>({
    resolver: zodResolver(registerBarbershopFormSchema),
  })

  const handleRegisterBarbershop = async (data: registerBarbershopFormSchemaInputs) => {
    
    registerBarbershop({
      contactName: data.contactName,
      contactPhone: data.contactPhone,
      email: data.email,
      name: data.contactPhone,
      password: data.password
    })

  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(handleRegisterBarbershop)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="name" className="mb-2 mt-4">
              Nome da barbearia
            </Label>
            <Input
              placeholder="Ex: barbearia do seu zé"
              autoCapitalize="none"
              disabled={isLoading}
              {...register("name")}
            />
            <Label htmlFor="email" className="mb-2 mt-4">
              Email de acesso
            </Label>
            <Input
              placeholder="nome@exemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            <Label htmlFor="password" className="mb-2 mt-4">
              Senha de acesso
            </Label>
             <Input
              placeholder="Digite sua senha"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            
            <div className="flex flex-row gap-4 mt-4">
              <div>
                <Label htmlFor="contactName" className="mb-2">
                  Nome para contato
                </Label>
                <Input
                  placeholder="Nome para contato"
                  disabled={isLoading}
                  {...register("contactName")}
                />
              </div>
              

              <div>
                <Label htmlFor="contactPhone" className="mb-2 mt-4">
                  Telefone para contato
                </Label>
                <Input
                  placeholder="Telefone para contato"
                  disabled={isLoading}
                  {...register("contactPhone")}
                />
              </div>
              
            </div>
            
          </div>
          <Button disabled={isLoading} className="mt-3">
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
              Criar conta
          </Button>
        </div>
      </form>
   
    </div>
  )
}