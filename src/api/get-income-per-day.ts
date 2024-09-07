import { api } from '@/lib/api'

export interface GetIncomePerDayRequest {
  query: {
    year: number
    month: number
  }
}

export interface GetIncomePerDayResponse {
  incomePerDay: {
    date: string
    income: number
  }[]
}

export async function getIncomePerDay({query}: GetIncomePerDayRequest) {
  return api.get<GetIncomePerDayResponse>('/metrics/income-per-day', {
    params: query
  })
}
