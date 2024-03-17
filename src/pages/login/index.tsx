import React from "react";
import style from "./Login.module.css"
import { Input } from "../../components/input";
import { Button } from "../../components/button";

export const Login: React.FC = () => {
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

              <Input inputId="email" label="Email"/>
              <Input inputId="password" label="Senha"/>
            </div>
            <Button title="Entrar"/>
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