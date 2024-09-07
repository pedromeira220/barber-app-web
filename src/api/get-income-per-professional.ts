import { api } from '@/lib/api'

export interface GetIncomePerProfessionalRequest {
  query: {
    year: number
    month: number
  }
}

export interface GetIncomePerProfessionalResponse {
  incomePerProfessional: {
    professional: string
    professionalId: string
    income: number
  }[]
}

export async function getIncomePerProfessional({query}: GetIncomePerProfessionalRequest) {
  return api.get<GetIncomePerProfessionalResponse>('/metrics/income-per-professional', {
    params: query
  })
}
