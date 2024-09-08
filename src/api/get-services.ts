import { api } from '@/lib/api'

export interface GetServicesResponse {
  services: {
    id: string;
    name: string;
    priceInCents: number;
    description: string;
    durationInMinutes: number;
    commissionPercentage: number;
    barbershopId: string;
}[]
}

export async function getServices() {
  return api.get<GetServicesResponse>('/services')
}
