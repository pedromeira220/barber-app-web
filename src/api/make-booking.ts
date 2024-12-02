import { api } from "@/lib/api"

export interface MakeBookingQuery {
  date: Date,
  serviceId: string,
  clientName: string,
  clientPhone: string,
  observations?: string,
  professionalId: string
  status: "PENDING" | "COMPLETED" | "CANCELED"
  barbershopId: string
}

export async function makeBooking({
  date,
  observations,
  professionalId,
  serviceId,
  clientName,
  clientPhone,
  status,
  barbershopId
}: MakeBookingQuery) {
  return api.post(`/bookings/client`, {
    clientName,
    clientPhone,
    date,
    observations,
    professionalId,
    serviceId,
    status,
    barbershopId
  })
}
