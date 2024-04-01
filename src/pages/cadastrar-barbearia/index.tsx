import React, { useState } from "react";
import style from "./cadastrar-barbearia.module.css"
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { api } from "../../lib/api";

export const CadastrarBarbearia: React.FC = () => {

  const [nomeBarbearia, setNomeBarbearia] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const handleCadastrarBarbearia = async () => {

    if(!nomeBarbearia) {
      return
    }

    if(!email) {
      return
    }

    if(!senha) {
      return
    }

    await api.post("/cadastrar-barbearia", {
      nome: nomeBarbearia,
      email,
      senha
    })
    
    console.log("Barbearia cadastrada com sucesso");

    // TODO: levar para o dashboard
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
          <div>
            <h2 className={style.title}>Crie sua conta aqui</h2>
            <p className={style.subtitle}>Coloque suas informações para cadastro da sua barbearia</p>
          </div>
          <div style={{
            marginTop: 32,
            display: "flex",
            gap: 24,
            flexDirection: "column"
          }}>
            <div style={{
              marginTop: 32,
              display: "flex",
              gap: 20,
              flexDirection: "column"
            }}>

              <Input inputId="nome" label="Nome da barbearia" onChange={(e) => {
                setNomeBarbearia(e.target.value)
              }}/>
              <Input inputId="email" label="Email de acesso" onChange={(e) => {
                setEmail(e.target.value)
              }}/>
              <Input inputId="password" label="Senha" onChange={(e) => {
                setSenha(e.target.value)
              }}/>
      {/*               <Input inputId="nome-contato" label="Nome para contato"/>
              <Input inputId="telefone-contato" label="Telefone para contato"/> */}
            </div>
            <Button title="Cadastrar" onClick={handleCadastrarBarbearia}/>
          </div>

          <div style={{
            marginTop: 32
          }}>
            <p style={{
              textAlign: "center"
            }}>Já tem conta? <span style={{
              fontWeight: 600,
              color: "#DC6803",
              cursor: "pointer"
            }}>Entre na sua conta</span></p>
          </div>
      </div>
    </div>
  )
}