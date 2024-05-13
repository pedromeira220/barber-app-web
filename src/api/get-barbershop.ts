import { api } from '@/lib/api'
import { Barbershop } from '../interfaces/barbershop'

export interface GetBarbershopsResponse {
  barbershops: Barbershop[]
}

export async function getBarbershops() {
  return api.get<GetBarbershopsResponse>('/barbershops')
}
