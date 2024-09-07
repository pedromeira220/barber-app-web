/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { DatePickerFilter } from "@/components/date-picker-filter";  // Importe o DatePickerFilter

export function Pagamentos() {
  const [clientes, setClientes] = useState([
    { id: 1, nome: 'Cliente João', telefone: '11 99999-9999', data: '2023-08-21', valor: 'R$ 150,00', servico: 'Consultoria' },
    { id: 2, nome: 'Cliente Maria', telefone: '11 88888-8888', data: '2023-08-22', valor: 'R$ 200,00', servico: 'Desenvolvimento' },
  ]);
  
  const [form, setForm] = useState({ nome: '', telefone: '', data: '', valor: '', servico: '' });
  const [showForm, setShowForm] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setForm(prevForm => ({
        ...prevForm,
        data: date.toISOString().split("T")[0],  // Converte a data para o formato 'YYYY-MM-DD'
      }));
    }
  };

  const handleAdd = () => {
    const newId = clientes.length ? clientes[clientes.length - 1].id + 1 : 1;
    setClientes(prev => [
      ...prev,
      { ...form, id: newId },
    ]);
    setForm({ nome: '', telefone: '', data: '', valor: '', servico: '' });
    setShowForm(false);
  };

  const handleUpdate = () => {
    setClientes(prev => 
      prev.map(cliente => 
        cliente.id === selectedClienteId ? { ...form, id: selectedClienteId } : cliente
      )
    );
    setForm({ nome: '', telefone: '', data: '', valor: '', servico: '' });
    setShowForm(false);
    setSelectedClienteId(null);
  };

  const handleEdit = (id: number) => {
    const cliente = clientes.find(cli => cli.id === id);

    if (!cliente) {
      return;
    }

    setForm({
      nome: cliente.nome,
      telefone: cliente.telefone,
      data: cliente.data,
      valor: cliente.valor,
      servico: cliente.servico,
    });
    setShowForm(true);
    setSelectedClienteId(id);
  };

  const handleDelete = (id: number) => {
    setClientes(prev => prev.filter(cli => cli.id !== id));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const clientesFiltrados = searchText.length > 0 ? 
    clientes.filter(cliente => cliente.nome.toLowerCase().includes(searchText.toLowerCase()))
    : [];

  const listaDeClientesParaExibir = searchText.length > 0 ? clientesFiltrados : clientes;
  const paginatedClientes = listaDeClientesParaExibir.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(listaDeClientesParaExibir.length / itemsPerPage);

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

          <div className="flex flex-row gap-2">
            <Button onClick={() => setShowForm(true)}>Adicionar pagamento anual</Button>
          </div>
        </div>

        <div>
          <Input type="text" placeholder="Buscar pagamento de cliente..." 
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Data</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedClientes.map(cliente => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.data}</TableCell> {/* Certifique-se de que a data é exibida */}
                  <TableCell>{cliente.nome}</TableCell>
                  <TableCell>{cliente.telefone}</TableCell>
                  <TableCell>{cliente.valor}</TableCell>
                  <TableCell>{cliente.servico}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => handleEdit(cliente.id)}>Editar</Button>
                      <Button variant="secondary" onClick={() => handleDelete(cliente.id)}>Deletar</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {listaDeClientesParaExibir.length > itemsPerPage && (
          <div className="flex justify-between items-center mt-4">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
              ← Previous
            </Button>
            <span>{currentPage} / {totalPages}</span>
            <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next →
            </Button>
          </div>
        )}

{showForm && (
  <div className="rounded-md border p-4">
    <form className="flex flex-col gap-2">
      <input 
        type="text" 
        name="nome" 
        placeholder="Nome do cliente" 
        value={form.nome} 
        onChange={handleChange} 
        className="p-2 border rounded" 
      />
      <input 
        type="text" 
        name="telefone" 
        placeholder="Telefone" 
        value={form.telefone} 
        onChange={handleChange} 
        className="p-2 border rounded" 
      />
      {/* Insira o componente DatePickerFilter aqui */}
      <DatePickerFilter onSelectDate={handleDateChange} /> 
      <input 
        type="text" 
        name="valor" 
        placeholder="Valor" 
        value={form.valor} 
        onChange={handleChange} 
        className="p-2 border rounded" 
      />
      <input 
        type="text" 
        name="servico" 
        placeholder="Serviço" 
        value={form.servico} 
        onChange={handleChange} 
        className="p-2 border rounded" 
      />
      <div className="flex justify-end">
        {selectedClienteId ? (
          <Button onClick={handleUpdate} type="button">Atualizar</Button>
        ) : (
          <Button onClick={handleAdd} type="button">Adicionar</Button>
        )}
      </div>
    </form>
  </div>
)}

      </div>
    </div>
  );
}
