import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import styles from "./style.css"
// Para fazer a estilização usando o css ao inves do tailwind, utilize esse objeto que contem as classes css

// Na hora de colocar em um elemento seria algo assim
// <div className={style.container}></div>
// Coloque entre chaves e acesse o nome da propriedade definida no arquivo css

export function Profissionais() {
  return (
    <div className="grid min-h-screen grid-cols-5">
      <Sidebar />

      <div className="col-span-4 flex flex-col gap-6 border-l p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Visão dos profissionais cadastrados
            </h2>
            <p className="text-muted-foreground">
              Veja aqui todos os profissionais
            </p>
          </div>

          <div className="flex flex-row gap-2">
            <Button>Cadastrar profissional</Button>
          </div>
            
        </div>

        <div className="rounded-md border">
          <p>tabela com os dados dos profissionais</p>
        </div>
      </div>
    </div>
  )
}