import { api } from '@/lib/api'
import { Professional } from '@/interfaces/professional'

export interface FetchProfessionalsFromBarbershopQuery {
  barbershopId: string
}

export interface FetchProfessionalsFromBarbershopResponse {
  professionals: Professional[]
}

export async function fetchProfessionalsFromBarbershop({barbershopId}: FetchProfessionalsFromBarbershopQuery) {
  return api.get<FetchProfessionalsFromBarbershopResponse>(`/professionals/barbershop/${barbershopId}`)
}
