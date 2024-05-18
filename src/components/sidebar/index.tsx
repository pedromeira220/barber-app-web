import { cn } from '@/lib/utils'
import { ComponentProps, useState } from 'react'
import { Button } from '../ui/button'
import { Calendar, Home } from 'lucide-react'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { DialogUpdateBarbershop } from './dialog-update-barbershop'

interface SidebarProps extends ComponentProps<'div'> { }

export function Sidebar({ className }: SidebarProps) {

  // const { data: profile, isLoading: isLoadingProfile } = useQuery({
  //   queryKey: ['barbershop'],
  //   queryFn: getProfile,
  //   staleTime: Infinity,
  // })


  const [isUpdateBarbershopDialogOpen, setIsUpdateBarbershopDialogOpen] = useState(false)

  return (
    <div className={cn('pb-4 h-full', className)}>
      <div className="py-4 px-3 flex flex-col h-full">
        <div className="py-2 flex flex-col gap-4">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            NomeDoApp
          </h2>

          <Dialog
            open={isUpdateBarbershopDialogOpen}
            onOpenChange={setIsUpdateBarbershopDialogOpen}
          >
            <DialogTrigger asChild>
              <button className='flex flex-row items-center gap-2 hover:bg-slate-100 rounded-md py-2 hover:cursor-pointer justify-start'>
                <img src="logo-barbearia.jpeg" className='w-10 h-10 rounded-full'/>

                <div className='flex flex-col items-start'>
                  <p className='font-bold text-start'>Barbearia do seu zé</p>
                  <p className='text-primary'>Nível 7</p>
                </div>
              </button>
            </DialogTrigger>

            <DialogUpdateBarbershop
              barbershop={{
                contactName: "José",
                contactPhone: "(11) 12345-6789",
                email: "jose@barberia.com",
                id: "123",
                name: "Barbearia do seu Zé"

              }}
              setOpen={setIsUpdateBarbershopDialogOpen}
            />
          </Dialog>

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

        {/* <div className="flex gap-4 w-full mt-auto">
          <div className="flex flex-col gap-1 w-full">
            <Button variant="ghost" className="w-full justify-start">
              <Cog size={24} className="mr-2 h-4 w-4" />
              Configurações
            </Button>
          </div>
        </div> */}
      </div>
    </div>
  )
}
