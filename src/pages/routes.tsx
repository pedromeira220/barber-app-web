import {createBrowserRouter} from "react-router-dom"
import Login from "./login"
import RegisterBarbershop from "./cadastrar-barbearia"
import { Agenda } from "./agenda"

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
  }
])