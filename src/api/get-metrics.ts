import { api } from '@/lib/api'

export interface GetMetricsRequest {
  query: {
    year: number
    month: number
  }
}

export interface GetMetricsResponse {
  totalIncome: {
    totalIncomeInCents: number,
    diffFromLastMonth: number | null,
    lastMonthTotalIncomeInCents: 3500
  },
  completedBookings: {
    completedBookingsCount: number,
    diffFromLastMoth: number | null,
    lastMonthCompletedBookingsCount: number
  },
  averageTicket: {
    averageTicketInCents: number | null,
    diffFromLastMoth: number | null,
    lastMonthAverageTicketInCents: number | null
  }
}

export async function getMetrics({query}: GetMetricsRequest) {
  return api.get<GetMetricsResponse>('/metrics', {
    params: query
  })
}
