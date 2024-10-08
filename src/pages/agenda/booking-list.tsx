import { fetchBookingsFromAuthBarbershop } from "@/api/fetch-bookings-from-auth-barbershop";
import { useQuery } from "@tanstack/react-query";
import { CloudSun, MoonStar, Sunrise } from "lucide-react"
import React, { useMemo, useState } from "react";
import { format, getHours } from "date-fns";
import { Booking } from "@/interfaces/booking";
import { fetchProfessionalsFromBarbershop } from "@/api/fetch-professionals-from-barbershop";
import { useAuth } from "@/hooks/use-auth";
import { fetchServicesFromBarbershop } from "@/api/fetch-services-from-barbershop";
import { SelectComponent } from "../../components/select-component";
import { DatePicker } from "./dialog-register-booking/date-picker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogCompleteBooking } from "./dialog-complete-booking";

const PERIODS = [
  {
    period: "Manhã",
    icon: <Sunrise className="text-primary" size={20} />,
    startHour: 9,
    endHour: 12,
  },
  {
    period: "Tarde",
    icon: <CloudSun className="text-primary" size={20} />,
    startHour: 13,
    endHour: 18,
  },
  {
    period: "Noite",
    icon: <MoonStar className="text-primary" size={20} />,
    startHour: 19,
    endHour: 21,
  }
]

export const BookingList: React.FC = () => {

  const { authenticatedBarbershop } = useAuth()

  const [dialogCompleteBookingIsOpen, setDialogCompleteBookingIsOpen] = useState(false)
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [professionalIdFilter, setProfessionalIdFilter] = useState<string | undefined>(undefined)
  const [serviceIdFilter, setServiceIdFilter] = useState<string | undefined>(undefined)

  const { data: bookings } = useQuery({
    queryKey: ["bookings", professionalIdFilter, dateFilter, serviceIdFilter],
    enabled: !!dateFilter,
    queryFn: async () => {

      const response = await fetchBookingsFromAuthBarbershop({
        date: dateFilter,
        professionalId: professionalIdFilter,
        serviceId: serviceIdFilter
      })

      return response.data.bookings
    },
  })

  const { data: professionals } = useQuery({
    queryKey: ["professionals", "barbershop", authenticatedBarbershop?.id],
    queryFn: async () => {
      const response = await fetchProfessionalsFromBarbershop({ barbershopId: authenticatedBarbershop?.id ?? "" })

      return response.data.professionals
    }
  })

  const { data: services } = useQuery({
    queryKey: ["services", "barbershop", authenticatedBarbershop?.id],
    queryFn: async () => {
      const response = await fetchServicesFromBarbershop({ barbershopId: authenticatedBarbershop?.id ?? "" })

      return response.data.services
    }
  })

  const bookingsSeparateByPeriod = useMemo(() => {
    const bookingsSeparate = PERIODS.map(p => ({
      bookings: [] as Booking[],
      ...p
    }));

    bookings?.forEach(booking => {
      const bookingHour = getHours(new Date(booking.startDate));

      PERIODS.forEach((period, index) => {
        if (bookingHour >= period.startHour && bookingHour <= period.endHour) {
          bookingsSeparate[index].bookings.push(booking);
        }
      });
    });

    return bookingsSeparate.filter(bp => bp.bookings.length > 0);
  }, [bookings]);


  console.log(bookings);


  return (
    <>

      <div className="flex items-center gap-8">
        <SelectComponent
          placeholder="Selecione um profissional"
          items={
            !professionals ? [] : professionals?.map(professional => {
              return {
                display: professional.name,
                id: professional.id
              }
            })}
          onValueChange={setProfessionalIdFilter}
        />

        <SelectComponent
          placeholder="Selecione o serviço"
          items={
            !services ? [] : services?.map(service => {
              return {
                display: service.name,
                id: service.id
              }
            })}
          onValueChange={setServiceIdFilter}
        />

        <DatePicker
          date={dateFilter ? dateFilter : undefined}
          onSelectDate={setDateFilter}
        />
      </div>
      {
        bookingsSeparateByPeriod.length == 0 ? (
          <div className="flex flex-col gap-1 mt-20 items-center">
            <img src="./date-picker.svg" className="w-60 h-60 mb-10" />
            <p className="w-full text-center font-bold">Não há agendamentos no dia</p>
            {
              !dateFilter ? (
                <p className="w-full text-center">Selecione uma data para visualizar agendamentos</p>
              ) : null
            }
          </div>
        ) : null
      }

      {
        bookingsSeparateByPeriod?.map((period) => {
          return (
            <div className="rounded-md border" key={period.period}>
              <div className="flex items-center justify-between px-3 py-5 border-b">
                <div className="flex items-center gap-3">
                  {period.icon}
                  <span className="text-sm">{period.period}</span>
                </div>

                <span>{period.startHour}h-{period.endHour}h</span>
              </div>

              <div className="p-5">

                {
                  period.bookings.map(booking => {
                    return (
                      <div key={booking.id} className="flex items-center justify-between">
                        <div className="py-2 flex items-center gap-3">
                          <span className="font-bold">{format(new Date(booking.startDate), "HH:mm")}-{format(new Date(booking.endDate), "HH:mm")}</span>
                          <span>{booking.client.name} - {booking.service.name} - {booking.professional.name}</span>
                        </div>
                        {
                          booking.status == "PENDING" ? (
                            <Dialog
                              open={dialogCompleteBookingIsOpen}
                              onOpenChange={setDialogCompleteBookingIsOpen}
                            >

                              <DialogTrigger asChild>
                                <Button variant="outline">Completar agendamento</Button>
                              </DialogTrigger>



                              <DialogCompleteBooking
                                setOpen={setDialogCompleteBookingIsOpen}
                                bookingId={booking.id}
                              />
                            </Dialog>
                          ) : null
                        } 

                        {
                          booking.status == "COMPLETED" ? (
                            <span className="text-green-500">Completo</span>
                          ) : null
                        }

{
                          booking.status == "CANCELED" ? (
                            <span className="text-red-500">Cancelado</span>
                          ) : null
                        }

                      </div>
                    )
                  })
                }
              </div>

            </div>
          )
        })
      }
    </>
  )
}