import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/hooks/use-auth"
import { useNavigate } from "react-router-dom"
import { AppError } from "@/lib/app-error"
import { toast } from "sonner"

interface BarbershopRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const loginBarbershopFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type loginBarbershopFormSchemaInputs = z.infer<typeof loginBarbershopFormSchema>

export function LoginBarbershopForm({ className, ...props }: BarbershopRegisterFormProps) {

  const navigate = useNavigate()
  const { login } = useAuth()

  const {register, handleSubmit, formState: {isLoading}} = useForm<loginBarbershopFormSchemaInputs>({
    resolver: zodResolver(loginBarbershopFormSchema),
  })

  const handleRegisterBarbershop = async (data: loginBarbershopFormSchemaInputs) => {
    
    try {
      await login({
        email: data.email,
        password: data.password
      })

      navigate("/agenda")
    } catch (error) {
      if(error instanceof AppError) {
        toast.error(error.message)
        return
      }

      toast.error("Erro ao tentar fazer login")
    }

  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(handleRegisterBarbershop)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
           
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