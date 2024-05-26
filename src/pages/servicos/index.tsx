import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react";

export function Servicos() {
  const [servicos, setServicos] = useState([
    { id: 1, nome: 'Corte Simples', preco: '30.00', barbearia: 'Barbearia A', duracao: '30 min', descricao: 'Corte de cabelo simples' },
    { id: 2, nome: 'Barba', preco: '20.00', barbearia: 'Barbearia B', duracao: '20 min', descricao: 'Aparar e modelar a barba' },
  ]);
  
  const [form, setForm] = useState({ nome: '', preco: '', barbearia: '', duracao: '', descricao: '' });
  const [showForm, setShowForm] = useState(false);
  const [selectedServicoId, setSelectedServicoId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleAdd = () => {
    setServicos(prev => [
      ...prev,
      { ...form, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
    ]);
    setForm({ nome: '', preco: '', barbearia: '', duracao: '', descricao: '' });
    setShowForm(false);
  };

  const handleUpdate = () => {
    setServicos(prev => 
      prev.map(serv => 
        serv.id === selectedServicoId ? { ...form, id: selectedServicoId } : serv
      )
    );
    setForm({ nome: '', preco: '', barbearia: '', duracao: '', descricao: '' });
    setShowForm(false);
    setSelectedServicoId(null);
  };

  const handleEdit = (id) => {
    const servico = servicos.find(serv => serv.id === id);
    setForm(servico);
    setShowForm(true);
    setSelectedServicoId(id);
  };

  const handleDelete = (id) => {
    setServicos(prev => prev.filter(serv => serv.id !== id));
  };

  return (
    <div className="grid min-h-screen grid-cols-5">
      <Sidebar />

      <div className="col-span-4 flex flex-col gap-6 border-l p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Visão dos serviços cadastrados
            </h2>
            <p className="text-muted-foreground">
              Veja aqui todos os serviços
            </p>
          </div>

          <div className="flex flex-row gap-2">
            <Button onClick={() => setShowForm(true)}>Cadastrar serviço</Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nome do serviço</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servicos.map(servico => (
                <TableRow key={servico.id}>
                  <TableCell>{servico.nome}</TableCell>
                  <TableCell>{servico.preco}</TableCell>
                  <TableCell>{servico.duracao}</TableCell>
                  <TableCell>{servico.descricao}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => handleEdit(servico.id)}>Editar</Button>
                      <Button variant="secondary" onClick={() => handleDelete(servico.id)}>Deletar</Button>
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
              <input type="text" name="nome" placeholder="Nome do serviço" value={form.nome} onChange={handleChange} className="p-2 border rounded" />
              <input type="text" name="preco" placeholder="Preço" value={form.preco} onChange={handleChange} className="p-2 border rounded" />
              <input type="text" name="barbearia" placeholder="Barbearia" value={form.barbearia} onChange={handleChange} className="p-2 border rounded" />
              <input type="text" name="duracao" placeholder="Duração" value={form.duracao} onChange={handleChange} className="p-2 border rounded" />
              <input type="text" name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} className="p-2 border rounded" />
              <div className="flex justify-end">
                {selectedServicoId ? (
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
