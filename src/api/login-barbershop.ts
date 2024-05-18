import { api } from "@/lib/api"

export interface LoginBarbershopQuery {
  email: string
  password: string
}

export interface LoginBarbershopResponse {
  token: string
}

export async function loginBarbershop({
  email,
  password,
}: LoginBarbershopQuery) {
  return api.post<LoginBarbershopResponse>(`/login`, {
    email,
    password,
  })
}
