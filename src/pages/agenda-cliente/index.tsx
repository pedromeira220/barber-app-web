import React from 'react';
import './style.css';
import secadorImg from '../../assets/secador.jpg';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from "@/components/ui/button"
import { useState } from 'react';

import { DatePickerFilter } from './date-picker-filter'; // Importa o DatePickerFilter

const Select = SelectPrimitive.Root;

const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;



const AgendaCliente: React.FC = () => {
  const [profissionalSelecionado,] = useState('');

  // Função para lidar com o clique no botão "Agendar"
  const handleAgendarClick = () => {
    if (profissionalSelecionado) {
      // Lógica para agendar aqui, como enviar dados para o servidor, etc
    } else {
      alert('Por favor, selecione um profissional.');
    }
  };
  return (
    <div className="container">
      <div className="inner-container lg:h-[80%]">
        <h1>Agendar</h1>
        <div className="divider-horizontal"></div>
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 lg:gap-6">
          <div className="left-side">
            <div className="service-container">
              <img src={secadorImg} alt="Secador" className="service-image" />
              <div className="service-info">
                <p className="service-title">Barba</p>
                <p className="service-duration">25 min</p>
              </div>
              <div className="service-price">17$</div>
            </div>
            <p className="select-profissional">
              Selecionar <span className="bold">Profissional</span>
            </p>
            <Select>
              <SelectTrigger className="mt-4">
                <SelectValue placeholder="Escolha um profissional" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prof1">Pedro</SelectItem>
                <SelectItem value="prof2">Jose</SelectItem>
                <SelectItem value="prof3">Joao</SelectItem>
              </SelectContent>
            </Select>


          </div>

          <div className="right-side">

            <p className="data-title"><strong>Data</strong></p> {/* Adiciona o texto "Data" em negrito */}
            <DatePickerFilter /> {/* Adiciona o componente de calendário */}
            <p className="hora-title"><strong>Hora</strong></p> {/* Adiciona o texto "Hora" em negrito */}

            <div className="horarios-container">
              <div className="horarios-row">
                {['09:00', '10:00', '11:00', '12:00'].map(hora => (
                  <div key={hora} className="horario-item">{hora}</div>
                ))}
              </div>
              <div className="horarios-row">
                {['13:00', '14:00', '15:00', '16:00'].map(hora => (
                  <div key={hora} className="horario-item">{hora}</div>
                ))}
              </div>

            </div>
          </div>
        </div>

        <Button
          onClick={handleAgendarClick} // Chame a função de clique ao clicar no botão
          className='w-full mt-8'
        >
          Agendar
        </Button>
      </div>
    </div>
  );
};

export default AgendaCliente;
