import { api } from '@/lib/api'

export interface GetPaymentsResponse {
  payments: {
    id: string,
    date: string,
    valueInCents: number,
    method: "CARD" | "PIX" | "CASH",
    clientName: string,
    serviceName: string
  }[]
}

export async function getPayments() {
  return api.get<GetPaymentsResponse>('/payments')
}
