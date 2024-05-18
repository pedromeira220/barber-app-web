import { api } from '@/lib/api'
import { Barbershop } from '../interfaces/barbershop'

export interface GetAuthenticatedBarbershopResponse {
  barbershop: Barbershop
}

export async function getAuthenticatedBarbershop() {
  return api.get<GetAuthenticatedBarbershopResponse>('/barbershops/auth/me')
}
