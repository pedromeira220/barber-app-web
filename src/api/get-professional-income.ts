import { api } from '@/lib/api'

export interface GetProfessionalIncomeMetricsRequest {
  query: {
    year: number
    month: number
  }
}

export interface GetProfessionalIncomeMetricsResponse {
  professionals: {
    professionalId: string,
    professionalName: string,
    totalIncomeInCents: number
  }[]
}

export async function getProfessionalIncomeMetrics({query}: GetProfessionalIncomeMetricsRequest) {
  return api.get<GetProfessionalIncomeMetricsResponse>('metrics/professional-income', {
    params: query
  })
}
