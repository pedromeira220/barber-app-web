/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayments } from "@/api/get-payments";
import { Sidebar } from "@/components/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export function Pagamentos() {

  const {data: payments} = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const response = await getPayments()

      return response.data.payments
    }
  })

  return (
    <div className="grid min-h-screen grid-cols-5">
      <Sidebar />

      <div className="col-span-4 flex flex-col gap-6 border-l p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Histórico de pagamentos
            </h2>
            <p className="text-muted-foreground">
              Veja aqui todos os pagamentos realizados
            </p>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Serviço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                payments?.map(payment => {
                  return (
                  <TableRow>
                    <TableCell>{format(payment.date, "dd-MM-yyyy")}</TableCell>
                    <TableCell>{payment.clientName}</TableCell>
                    <TableCell>{(payment.valueInCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>{payment.serviceName}</TableCell>
                </TableRow>
                  )
                })
              }
                

            </TableBody>
          </Table>
        </div>

      </div>
    </div>
  );
}
