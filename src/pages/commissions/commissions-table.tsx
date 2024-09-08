import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getCommissions } from "@/api/get-commissions";
import { format } from "date-fns";

interface CommissionsTableProps {
  year: number | null
  month: number | null
}

export const CommissionsTable: React.FC<CommissionsTableProps> = ({ month, year }) => {

  const { data: commissions } = useQuery({
    queryKey: ["commissions", month, year],
    queryFn: async () => {

      if (!month || !year) {
        return
      }

      const response = await getCommissions({
        query: {
          month,
          year
        }
      })

      return response.data.commissions
    },
    refetchOnWindowFocus: "always"
  })


  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Profissional</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>% Comissão</TableHead>
            <TableHead>Valor comissão</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            commissions?.map(commission => {
              return (
                <TableRow key={commission.id}>
                  <TableCell>{format(new Date(commission.date), "dd-MM-yyyy")}</TableCell>
                  <TableCell>{commission.professionalName}</TableCell>
                  <TableCell>{commission.serviceName}</TableCell>
                  <TableCell>{(commission.valueInCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                  <TableCell>{(commission.commissionPercentage * 100)}%</TableCell>
                  <TableCell>{(commission.commissionValueInCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </div>
  )
}