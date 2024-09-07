import { api } from '@/lib/api'

export interface GetAverageBookingsPerDayOfWeekRequest {
  query: {
    year: number
    month: number
  }
}

export interface GetAverageBookingsPerDayOfWeekResponse {
  averageBookingsPerDayOfWeek: {
    dayOfWeek: number,
    averageBookings: number, 
  }[]
}

export async function getAverageBookingsPerDayOfWeek({query}: GetAverageBookingsPerDayOfWeekRequest) {
  return api.get<GetAverageBookingsPerDayOfWeekResponse>('/metrics/average-bookings-per-day-of-week', {
    params: query
  })
}
