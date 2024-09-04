import {createBrowserRouter} from "react-router-dom"
import Login from "./login"
import RegisterBarbershop from "./cadastrar-barbearia"
import { Agenda } from "./agenda"
import { Profissionais } from "./profissionais"
import { Clientes } from "./clientes"
import { Servicos } from "./servicos"
import AgendaCliente from "./agenda-cliente"
import { PrivateRoute } from "@/utils/private-route"
import { Dashboard } from "./dashboard"

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
    element: <PrivateRoute><Agenda /></PrivateRoute>
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>
  },
  {
    path: "/profissionais",
    element: <PrivateRoute><Profissionais /></PrivateRoute>
  },
  {
    path: "/clientes",
    element: <PrivateRoute><Clientes /></PrivateRoute>
  },
  {
    path: "/servicos",
    element: <PrivateRoute><Servicos /></PrivateRoute>
  },
  {
    path: "/agenda-cliente",
    element: <AgendaCliente />
  }

]) 