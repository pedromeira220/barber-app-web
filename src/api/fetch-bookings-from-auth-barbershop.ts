import { api } from '@/lib/api'
import { Booking } from '@/interfaces/booking'

export interface FetchBookingsFromAuthBarbershopQuery {
  serviceName?: string
  professionalName?: string
  date?: Date
}

export interface FetchBookingsFromAuthBarbershopResponse {
  bookings: Booking[]
}

export async function fetchBookingsFromAuthBarbershop({ date, professionalName, serviceName }: FetchBookingsFromAuthBarbershopQuery) {
  return api.get<FetchBookingsFromAuthBarbershopResponse>('/bookings', {
    params: {
      date,
      professionalName,
      serviceName
    }
  })
}
