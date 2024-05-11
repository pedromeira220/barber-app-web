import { api } from "@/lib/api"

export interface RegisterBarbershopQuery {
  name: string
  contactName: string
  email: string
  contactPhone: string
  password: string
}

export async function registerBarbershop({
  contactName,
  contactPhone,
  email,
  name,
  password,
}: RegisterBarbershopQuery) {
  return api.post(`/barbershops`, {
    contactName,
    contactPhone,
    email,
    name,
    password,
  })
}
