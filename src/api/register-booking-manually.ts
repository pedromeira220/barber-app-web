import { api } from "@/lib/api"

export interface RegisterBookingManuallyQuery {
  date: Date,
  serviceId: string,
  clientName: string,
  clientPhone: string,
  observations?: string,
  professionalId: string
  status: "PENDING" | "COMPLETED" | "CANCELED"
}

export async function registerBookingManually({
  date,
  observations,
  professionalId,
  serviceId,
  clientName,
  clientPhone,
  status
}: RegisterBookingManuallyQuery) {
  return api.post(`/bookings`, {
    clientName,
    clientPhone,
    date,
    observations,
    professionalId,
    serviceId,
    status
  })
}
