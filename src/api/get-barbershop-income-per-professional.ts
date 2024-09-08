import { api } from '@/lib/api'

export interface GetBarbershopIncomePerProfessionalMetricsRequest {
  query: {
    year: number
    month: number
  }
}

export interface GetBarbershopIncomePerProfessionalMetricsResponse {
  professionals: {
    professionalId: string,
    professionalName: string,
    totalGrossRevenueInCents: number
  }[]
}

export async function getBarbershopIncomePerProfessionalMetrics({query}: GetBarbershopIncomePerProfessionalMetricsRequest) {
  return api.get<GetBarbershopIncomePerProfessionalMetricsResponse>('metrics/barbershop-income-per-professional', {
    params: query
  })
}
