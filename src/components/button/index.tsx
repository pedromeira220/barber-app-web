import style from "./button.module.css"
import React from "react";

interface ButtonProps {
  title: string
}

export const Button: React.FC<ButtonProps> = ({title}) => {
  return (
    <button className={style.button}>
      <span style={{color: "#ffffff", fontWeight: 600}}>{title}</span>
    </button>
  )
}