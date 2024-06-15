import { api } from '@/lib/api'
import { Service } from '@/interfaces/service'

export interface FetchServicesFromBarbershopQuery {
  barbershopId: string
}

export interface FetchServicesFromBarbershopResponse {
  services: Service[]
}

export async function fetchServicesFromBarbershop({barbershopId}: FetchServicesFromBarbershopQuery) {
  return api.get<FetchServicesFromBarbershopResponse>(`/services/barbershop/${barbershopId}`)
}
