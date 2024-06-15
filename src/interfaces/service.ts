export interface Service {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  durationInMinutes: number;
  barbershopId: string;
}