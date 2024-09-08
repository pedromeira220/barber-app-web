import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const CommissionsTable: React.FC = () => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Profissional</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>% Comissão</TableHead>
            <TableHead>Valor comissão</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>José</TableCell>
            <TableCell>Corte e barba</TableCell>
            <TableCell>{(3000 / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
            <TableCell>{(0.5 * 100)}%</TableCell>
            <TableCell>{(1500 / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
          </TableRow>


        </TableBody>
      </Table>
    </div>
  )
}