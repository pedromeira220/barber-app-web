import { Button } from "@/components/ui/button"
import { BarbershopRegisterForm } from "./barbershop-register-form"

export default function RegisterBarbershop() {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Button
          className={"absolute right-4 top-4 md:right-8 md:top-8"}
        >
          Entrar
        </Button>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />

          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            BarberApp
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum enim doloribus suscipit iure vel voluptates rerum! Quidem a atque odit?&rdquo;
              </p>
              <footer className="text-sm">Barbearia do seu zé</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Crie uma conta para sua barbearia
              </h1>
              <p className="text-sm text-muted-foreground">
                Insira as informações abaixo para criar a conta
              </p>
            </div>
            <BarbershopRegisterForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Ao clicar em "cadastrar", você concorda com nossos{" "}
              <a
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termos de serviço
              </a>{" "}
              e{" "}
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Política de privacidade
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}