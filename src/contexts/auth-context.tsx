import { getAuthenticatedBarbershop } from "@/api/get-authenticated-barbershop";
import { loginBarbershop } from "@/api/login-barbershop";
import { Barbershop } from "@/interfaces/barbershop";
import { AppError } from "@/lib/app-error";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";

interface AuthContextType {
  authenticatedBarbershop: Barbershop | null
  login: ({ email, password }: LoginParams) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

interface AuthContextProviderProps {
  children: React.ReactNode
}

interface LoginParams {
  email: string
  password: string
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children
}) => {

  const [authenticatedBarbershop, setAuthenticatedBarbershop] = useState<Barbershop | null>(null)

  const {mutateAsync: loginBarbershopApi} = useMutation({
    mutationFn: loginBarbershop
  })

  const {mutateAsync: getAuthenticatedBarbershopApi} = useMutation({
    mutationFn: getAuthenticatedBarbershop
  })

  const fetchAuthenticatedBarbershop = useCallback(async () => {
    try {
      const response = await getAuthenticatedBarbershopApi()
      const barbershopFromApi = response.data.barbershop

      console.log("> barbershopFromApi", barbershopFromApi);
      

      setAuthenticatedBarbershop(barbershopFromApi)
      return barbershopFromApi
    } catch(error) {
      console.error("> Erro ao buscar barbearia autenticada");
      console.error(error);
    } 
  }, [getAuthenticatedBarbershopApi])

  const login = async ({ email,password }: LoginParams) => {
    
    try {
      const response = await loginBarbershopApi({
        email,
        password
      })

      const token = response.data.token

      localStorage.setItem('@barber-app-web:token-1.0.0', token)

      await fetchAuthenticatedBarbershop()
    } catch(error) {
      console.error("Erro no login");
      console.error(error);

      if(error instanceof AxiosError) {
        const errorMessage = error.response?.data.message

        if(errorMessage) {
          throw new AppError(error.response?.data.message)
        }
      }

      throw new AppError("Erro ao tentar fazer login, tente novamente mais tarde")
    } 
  }

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('@barber-app-web:token-1.0.0')

    if(!tokenFromStorage) {
      return
    }

    fetchAuthenticatedBarbershop()
  }, [fetchAuthenticatedBarbershop])

  return (
    <AuthContext.Provider 
      value={{
        authenticatedBarbershop,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  )
} 