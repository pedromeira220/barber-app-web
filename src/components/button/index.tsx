import style from "./button.module.css"
import React, { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  title: string
}

export const Button: React.FC<ButtonProps> = ({title, ...rest}) => {
  return (
    <button className={style.button} {...rest}>
      <span style={{color: "#ffffff", fontWeight: 600}}>{title}</span>
    </button>
  )
}