export interface Booking {
  id: string,
  startDate: string,
  endDate: string,
  createdAt: string,
  barbershopId: string,
  clientId: string,
  serviceId: string,
  professionalId: string,
  observations: string | null,
  client: {
    id: string,
    name: string,
    phone: string,
    barbershopId: string
  },
  professional: {
    id: string,
    name: string,
    email: string,
    phone: string,
    cpf: string,
    barbershopId: string
  },
  service: {
    id: string,
    name: string,
    priceInCents: number,
    description: string,
    durationInMinutes: number,
    barbershopId: string
  }
}