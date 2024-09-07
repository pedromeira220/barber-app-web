import { api } from "@/lib/api"

export interface RegisterPaymentManuallyRequest {
  body: {
    date: string,
    bookingId: string,
    method: "CARD" | "PIX" | "CASH",
    valueInCents: number | undefined
  }
}

export async function registerPaymentManually({
  body: {
    bookingId,
    date,
    method,
    valueInCents
  }
}: RegisterPaymentManuallyRequest) {
  return api.post(`/payments`, {
    bookingId,
    date,
    method,
    valueInCents
  })
}
