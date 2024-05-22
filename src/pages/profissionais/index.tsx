import * as React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import styles from "./style.css"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function Profissionais() {
  const [profissionais, setProfissionais] = useState([
    { id: 1, nome: 'Barb João', email: 'joao@exemplo.com', telefone: '11 99999-9999', cpf: '123.456.789-00' },
    { id: 2, nome: 'Barb Maria', email: 'maria@exemplo.com', telefone: '11 99999-9999', cpf: '123.456.789-00' },
  ]);
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', cpf: '' });
  const [showForm, setShowForm] = useState(false);
  const [selectedProfissionalId, setSelectedProfissionalId] = useState(null); 

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setProfissionais([...profissionais, { ...form, id: Date.now() }]);
    setForm({ nome: '', email: '', telefone: '', cpf: '' });
    setShowForm(false); 
  };

  const handleDelete = (id: number) => {
    setProfissionais(profissionais.filter(profissional => profissional.id !== id));
  };

  const handleEdit = (id: number | React.SetStateAction<null>) => { 
    const profissional = profissionais.find((profissional) => profissional.id === id);
    setForm(profissional);
    setSelectedProfissionalId(id);
    setShowForm(true); 
  };

  const handleUpdate = () => {
    const updatedProfissionais = profissionais.map((profissional) =>
      profissional.id === selectedProfissionalId ? { ...form, id: selectedProfissionalId } : profissional
    );
    setProfissionais(updatedProfissionais);
    setForm({ nome: '', email: '', telefone: '', cpf: '' });
    setSelectedProfissionalId(null);
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setSelectedProfissionalId(null); // Resetar o ID selecionado quando abrir o formulário
    setForm({ nome: '', email: '', telefone: '', cpf: '' }); // Resetar o formulário ao abrir
  };

  return (
    <div className="container grid min-h-screen grid-cols-5">
      <Sidebar />

      <div className="col-span-4 flex flex-col gap-4 border-l p-6">
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
            <Button onClick={toggleForm}>Cadastrar profissional</Button>
          </div>
        </div>

        {showForm && (
          <div className="rounded-md border p-4">
            <form className="flex flex-col gap-2">
              <input type="text" name="nome" placeholder="Nome do profissional" value={form.nome} onChange={handleChange} className="p-2 border rounded" />
              <input type="email" name="email" placeholder="Endereço de email" value={form.email} onChange={handleChange} className="p-2 border rounded" />
              <input type="text" name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} className="p-2 border rounded" />
              <input type="text" name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} className="p-2 border rounded" />
              <div className="flex justify-end">
                {selectedProfissionalId ? (
                  <Button onClick={handleUpdate} type="button">Atualizar</Button>
                ) : (
                  <Button onClick={handleAdd} type="button">Adicionar</Button>
                )}
              </div>
            </form>
          </div>
        )}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nome do profissional</TableHead>
                <TableHead>Endereço de email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profissionais.map((profissional) => (
                <TableRow key={profissional.id}>
                  <TableCell className="font-medium">{profissional.nome}</TableCell>
                  <TableCell>{profissional.email}</TableCell>
                  <TableCell>{profissional.telefone}</TableCell>
                  <TableCell>{profissional.cpf}</TableCell>
                  <TableCell className="text-right">
                    <button 
                      onClick={() => handleEdit(profissional.id)} 
                      className="border border-gray-400 text-black bg-transparent font-semibold py-1 px-2 rounded"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(profissional.id)} 
                      className="bg-gray-200 text-black font-semibold py-1 px-2 rounded ml-2"
                    >
                      Deletar
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
