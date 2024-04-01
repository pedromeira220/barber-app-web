import React, { useState } from "react";
import style from "./Login.module.css"
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { api } from "../../lib/api";

export const Login: React.FC = () => {

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const handleLogin = async () => {

    if(!email) {
      return
    }

    if(!senha) {
      return
    }

    api.post("/login", {
      email,
      senha
    }).then(response => {

      console.log(
        {
          data: response.data.barbearia
        }
      );
      

      const token = response.data.barbearia.token


      console.log("> token", token);
      

      localStorage.setItem("#app-barber@1.0.0:token", token)
    })

    

    // TODO: levar para o dashboard
  }


  return (
    <div className={style.container}>
      <div className={style.content}>
          <div>
            <h2 className={style.title}>Entre na sua conta</h2>
            <p className={style.subtitle}>Coloque suas informações de login</p>
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

              <Input inputId="email" label="Email" onChange={(e) => {
                setEmail(e.target.value)
              }}/>
              <Input inputId="password" label="Senha" onChange={(e) => {
                setSenha(e.target.value)
              }}/>
            </div>
            <Button title="Entrar" onClick={handleLogin}/>
          </div>

          <div style={{
            marginTop: 32
          }}>
            <p style={{
              textAlign: "center"
            }}>Não tem conta? <span style={{
              fontWeight: 600,
              color: "#DC6803",
              cursor: "pointer"
            }}>Crie uma agora</span></p>
          </div>
      </div>
    </div>
  )
}