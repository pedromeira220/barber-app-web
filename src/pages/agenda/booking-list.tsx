import { fetchBookingsFromAuthBarbershop } from "@/api/fetch-bookings-from-auth-barbershop";
import { useQuery } from "@tanstack/react-query";
import { CloudSun, MoonStar, Sunrise } from "lucide-react"
import React, { useMemo } from "react";
import { SelectFilter } from "./select-filter";
import { DatePickerFilter } from "./date-picker-filter";
import { format, getHours } from "date-fns";
import { Booking } from "@/interfaces/booking";

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

  const { data: bookings } = useQuery({
    queryKey: ["bookings"], //TODO: passar aqui os filtros
    queryFn: async () => {
      const response = await fetchBookingsFromAuthBarbershop({})

      return response.data.bookings
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

  return (
    <>

      <div className="flex items-center gap-8">
        <SelectFilter
          placeholder="Selecione um profissional"
          label="Profissional"
          items={[{
            display: "Pedro",
            id: "pedro"
          },
          {
            display: "José",
            id: "jose"
          },
          {
            display: "João",
            id: "joao"
          },
          {
            display: "Fulano",
            id: "fulano"
          }]}
        />

        <SelectFilter
          placeholder="Selecione um serviço"
          label="Serviços"
          items={[{
            display: "Corte",
            id: "corte"
          },
          {
            display: "Corte e barba",
            id: "corte-barba"
          },
          {
            display: "barba",
            id: "barba"
          }]}
        />

        <DatePickerFilter />
      </div>

      <div className="flex flex-col gap-8">
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
                        <div className="py-2 flex items-center gap-3" key={booking.id}>
                          <span className="font-bold">{format(new Date(booking.startDate), "HH:mm")}-{format(new Date(booking.endDate), "HH:mm")}</span>
                          <span>{booking.client.name} - {booking.service.name} - {booking.professional.name}</span>
                        </div>
                      )
                    })
                  }
                </div>

              </div>
            )
          })
        }
      </div>
    </>
  )
}