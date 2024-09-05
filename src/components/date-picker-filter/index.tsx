import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale/pt-BR';

interface DatePickerFilterProps {
  onSelectDate: (date: Date | undefined) => void;  // Adiciona a prop onSelectDate
}

export const DatePickerFilter: React.FC<DatePickerFilterProps> = ({ onSelectDate }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onSelectDate(selectedDate);  // Chama a função onSelectDate quando a data é selecionada
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}  // Altere aqui para usar handleDateChange
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
