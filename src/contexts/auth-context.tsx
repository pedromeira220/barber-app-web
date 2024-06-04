import { getAuthenticatedBarbershop } from "@/api/get-authenticated-barbershop";
import { loginBarbershop } from "@/api/login-barbershop";
import { Barbershop } from "@/interfaces/barbershop";
import { AppError } from "@/lib/app-error";
import { AxiosError } from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";

interface AuthContextType {
  authenticatedBarbershop: Barbershop | null
  login: ({ email, password }: LoginParams) => Promise<void>
  isLoginPending: boolean
  isGetAuthBarberPending: boolean
  fetchAuthenticatedBarbershop: () => Promise<Barbershop | undefined>
  logout: () => Promise<void>
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
  const [isGetAuthBarberPending, setIsGetAuthBarberPending] = useState(false)
  const [isLoginPending, setIsLoginPending] = useState(false)

  const fetchAuthenticatedBarbershop = useCallback(async () => {

    setIsGetAuthBarberPending(true)

    try {
      const response = await getAuthenticatedBarbershop()
      const barbershopFromApi = response.data.barbershop

      setAuthenticatedBarbershop(barbershopFromApi)
      return barbershopFromApi
    } catch(error) {
      console.error("> Erro ao buscar barbearia autenticada");
      console.error(error);
    } finally {
      setIsGetAuthBarberPending(false)
    }
  }, [])

  const login = async ({ email,password }: LoginParams) => {
    setIsLoginPending(true)
    try {
      const response = await loginBarbershop({
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
    }  finally {
      setIsLoginPending(false)
    }
  }

  const logout = async () => {
      setAuthenticatedBarbershop(null)
      localStorage.removeItem('@barber-app-web:token-1.0.0')
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
        login,
        isGetAuthBarberPending,
        isLoginPending,
        fetchAuthenticatedBarbershop,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
} 