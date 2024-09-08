import { api } from '@/lib/api'

export interface GetCommissionIncomeMetricsRequest {
  query: {
    year: number
    month: number
  }
}

export interface GetCommissionIncomeMetricsResponse {
  totalIncomeInCents: number,
  totalProfessionalIncomeInCents: number,
  netIncome: number
}

export async function getCommissionIncomeMetrics({query}: GetCommissionIncomeMetricsRequest) {
  return api.get<GetCommissionIncomeMetricsResponse>('/commissions/income-metrics', {
    params: query
  })
}
