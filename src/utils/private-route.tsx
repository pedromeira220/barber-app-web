import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
  const { authenticatedBarbershop, isGetAuthBarberPending, isLoginPending, fetchAuthenticatedBarbershop } = useAuth();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Checar se já tem um token guardado e, se tiver, tentar buscar a barbearia autenticada
    const token = localStorage.getItem('@barber-app-web:token-1.0.0');
    if (token && !authenticatedBarbershop) {
      fetchAuthenticatedBarbershop().finally(() => {
        setInitialized(true); // Indica que a inicialização foi concluí da
      });
    } else {
      setInitialized(true); // Não precisa buscar a barbearia, pode prosseguir
    }
  }, [fetchAuthenticatedBarbershop, authenticatedBarbershop]);

  if (!initialized || isGetAuthBarberPending || isLoginPending) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-primary"/>
      </div>
    );
  }

  if (!authenticatedBarbershop) {
    return <Navigate to="/login" />;
  }

  return children;

}