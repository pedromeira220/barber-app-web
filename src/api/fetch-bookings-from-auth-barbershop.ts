import { api } from '@/lib/api'
import { Booking } from '@/interfaces/booking'

export interface FetchBookingsFromAuthBarbershopQuery {
  serviceId?: string
  professionalId?: string
  date?: Date
}

export interface FetchBookingsFromAuthBarbershopResponse {
  bookings: Booking[]
}

export async function fetchBookingsFromAuthBarbershop({ date, professionalId, serviceId }: FetchBookingsFromAuthBarbershopQuery) {
  return api.get<FetchBookingsFromAuthBarbershopResponse>('/bookings', {
    params: {
      date,
      professionalId,
      serviceId
    }
  })
}
