import {createBrowserRouter} from "react-router-dom"
import Login from "./login"
import RegisterBarbershop from "./cadastrar-barbearia"
import { Agenda } from "./agenda"
import { Profissionais } from "./profissionais"
import { Clientes } from "./clientes"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastrar-barbearia",
    element: <RegisterBarbershop />
  },
  {
    path: "/agenda",
    element: <Agenda />
  },
  {
    path: "/profissionais",
    element: <Profissionais />
  },
  {
    path: "/clientes",
    element: <Clientes />
  }

])