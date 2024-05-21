import { api } from "@/lib/api"

export interface LoginBarbershopQuery {
  email: string
  password: string
}

export async function loginBarbershop({
  email,
  password,
}: LoginBarbershopQuery) {
  return api.post(`/barbershops`, {
    email,
    password,
  })
}
