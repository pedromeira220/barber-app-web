import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'
import { Button } from '../ui/button'
import { Calendar, Cog, Home } from 'lucide-react'

interface SidebarProps extends ComponentProps<'div'> { }

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn('pb-4 h-full', className)}>
      <div className="py-4 px-3 flex flex-col h-full">
        <div className="py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            NomeDoApp
          </h2>
          <div className="flex flex-col gap-1">
            <Button variant="ghost" className="w-full justify-start">
              <Home size={24} className="mr-2 h-4 w-4" />
              Início
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <Calendar size={24} className="mr-2 h-4 w-4" />
              Agenda
            </Button>
          </div>
        </div>

        <div className="flex gap-4 w-full mt-auto">
          <div className="flex flex-col gap-1 w-full">
            <Button variant="ghost" className="w-full justify-start">
              <Cog size={24} className="mr-2 h-4 w-4" />
              Configurações
            </Button>
          </div>
        </div>
      </div>


    </div>
  )
}
