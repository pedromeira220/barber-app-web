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


export function Pagamentos() {
  const [clientes, setClientes] = useState([
    { id: 1, nome: 'Cliente João', telefone: '11 99999-9999' },
    { id: 2, nome: 'Cliente Maria', telefone: '11 88888-8888' },
    
  ]);
  const [form, setForm] = useState({ nome: '', telefone: '' });
  const [showForm, setShowForm] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState(null);
  const [searchText, setSearchText] = useState("")

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleAdd = () => {
    const newId = clientes.length ? clientes[clientes.length - 1].id + 1 : 1;
    setClientes(prev => [
      ...prev,
      { ...form, id: newId },
    ]);
    setForm({ nome: '', telefone: '' });
    setShowForm(false);
  };

  const handleUpdate = () => {
    setClientes(prev => 
      prev.map(cliente => 
        cliente.id === selectedClienteId ? { ...form, id: selectedClienteId } : cliente
      )
    );
    setForm({ nome: '', telefone: '' });
    setShowForm(false);
    setSelectedClienteId(null);
  };

  const handleEdit = (id: any) => {
    const cliente = clientes.find(cli => cli.id === id);

    if(!cliente) {
      return
    }

    setForm({
      nome: cliente.nome,
      telefone: cliente.telefone
    });
    setShowForm(true);
    setSelectedClienteId(id);
  };

  const handleDelete = (id: number) => {
    setClientes(prev => prev.filter(cli => cli.id !== id));
  };

  const clientesFiltrados = searchText.length > 0 ? 
  clientes.filter(cliente => cliente.nome.toLowerCase().includes(searchText.toLowerCase()))
  :[]

  const listaDeClientesParaExibir = searchText.length > 0 ? clientesFiltrados : clientes

  return (
    <div className="grid min-h-screen grid-cols-5">
      <Sidebar />

      <div className="col-span-4 flex flex-col gap-6 border-l p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Visão dos clientes da barbearia
            </h2>
            <p className="text-muted-foreground">
              Veja aqui todos os clientes da sua barbearia
            </p>
          </div>

          <div className="flex flex-row gap-2">
            <Button onClick={() => setShowForm(true)}>Cadastrar cliente</Button>
          </div>
        </div>

        <div>
          <Input type="text" placeholder="Procure um cliente..." 
            onChange={(event) => {
              setSearchText(event.target.value)
            }}
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listaDeClientesParaExibir.map(cliente => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.nome}</TableCell>
                  <TableCell>{cliente.telefone}</TableCell>
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

        {showForm && (
          <div className="rounded-md border p-4">
            <form className="flex flex-col gap-2">
              <input type="text" name="nome" placeholder="Nome do cliente" value={form.nome} onChange={handleChange} className="p-2 border rounded" />
              <input type="text" name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} className="p-2 border rounded" />
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
