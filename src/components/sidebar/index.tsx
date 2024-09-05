import { cn } from '@/lib/utils'
import { ComponentProps, useState } from 'react'
import { Button } from '../ui/button'
import { Calendar, Contact, LayoutDashboard, LogOut, Scissors, Users } from 'lucide-react'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { DialogUpdateBarbershop } from './dialog-update-barbershop'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'

interface SidebarProps extends ComponentProps<'div'> { }

export function Sidebar({ className }: SidebarProps) {

  const navigate = useNavigate()

  const { authenticatedBarbershop, logout } = useAuth()

  // const { data: profile, isLoading: isLoadingProfile } = useQuery({
  //   queryKey: ['barbershop'],
  //   queryFn: getProfile,
  //   staleTime: Infinity,
  // })

  const [isUpdateBarbershopDialogOpen, setIsUpdateBarbershopDialogOpen] = useState(false)

  const handleChangeRoute = (routeName: string) => {
    navigate(routeName)
  }

  const handleLogout = async () => {
    if (!confirm("Tem certeza que deseja deslogar")) {
      return
    }

    try {
      await logout()
      navigate("/login")

    } catch (error) {
      console.error("Eror ao deslogar");
      console.error(error);

    }

  }

  if (!authenticatedBarbershop) {
    return null
  }

  return (
    <div className={cn('pb-4 h-full', className)}>
      <div className="py-4 px-3 flex flex-col h-full">
        <div className="py-2 flex flex-col gap-4 h-full">
          <div className='p-2'>
            <img src="./barber-hub-logo.png" className='w-40' />
          </div>

          <Dialog
            open={isUpdateBarbershopDialogOpen}
            onOpenChange={setIsUpdateBarbershopDialogOpen}
          >
            <DialogTrigger asChild>
              <button className='flex flex-row items-center gap-2 hover:bg-slate-100 rounded-md py-2 hover:cursor-pointer justify-start'>
                <img src="logo-barbearia.jpeg" className='w-10 h-10 rounded-full' />

                <div className='flex flex-col items-start'>
                  <p className='font-bold text-start'>{authenticatedBarbershop?.name}</p>
                </div>
              </button>
            </DialogTrigger>

            <DialogUpdateBarbershop
              barbershop={authenticatedBarbershop}
              setOpen={setIsUpdateBarbershopDialogOpen}
            />
          </Dialog>

          <div className="flex flex-col gap-1">
            <Button variant="ghost" className="w-full justify-start"
              onClick={() => {
                handleChangeRoute("/dashboard")
              }}
            >
              <LayoutDashboard size={24} className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start"
              onClick={() => {
                handleChangeRoute("/agenda")
              }}
            >
              <Calendar size={24} className="mr-2 h-4 w-4" />
              Agenda
            </Button>
            <Button variant="ghost" className="w-full justify-start"
              onClick={() => {
                handleChangeRoute("/profissionais")
              }}
            >
              <Contact size={24} className="mr-2 h-4 w-4" />
              Profissionais
            </Button>

            <Button variant="ghost" className="w-full justify-start"
              onClick={() => {
                handleChangeRoute("/servicos")
              }}
            >
              <Scissors size={24} className="mr-2 h-4 w-4" />
              Serviços
            </Button>

            <Button variant="ghost" className="w-full justify-start"
              onClick={() => {
                handleChangeRoute("/clientes")
              }}
            >
              <Users size={24} className="mr-2 h-4 w-4" />
              Clientes
            </Button>
          </div>

          <div className="flex mt-auto">
            <Button variant="ghost" className="w-full justify-start"
              onClick={() => {
                handleLogout()
              }}
            >
              <LogOut size={24} className="mr-2 h-4 w-4" />
              Deslogar
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
