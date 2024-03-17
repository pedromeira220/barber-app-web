import React from "react";
import style from "./input.module.css"

interface InputProps {
  inputId: string
  label?: string
}

export const Input: React.FC<InputProps> = ({label, inputId}) => {
  return (
    <div style={{
      display: "flex",
      gap: 6,
      flexDirection: "column"
    }}>

      {
        label ? (
          <label htmlFor={inputId} className={style.label}>{label}</label>
        ) : null
      }

    <div className={style.container}>
      <input type="text" className={style.control} id={inputId}/>
    </div>
    </div>
  )
}