import { api } from '@/lib/api'

export interface GetCommissionsRequest {
  query: {
    year: number
    month: number
  }
}

export interface GetCommissionsResponse {
  commissions: {
    id: string,
    date: string,
    professionalName: string,
    serviceName: string,
    valueInCents: number,
    commissionValueInCents: number,
    commissionPercentage: number
  }[]
}

export async function getCommissions({query}: GetCommissionsRequest) {
  return api.get<GetCommissionsResponse>('/commissions', {
    params: query
  })
}
