import getToken from "@/src/auth/token";
import { BudgetAPIResponseSchema } from "@/src/schemas";
import { notFound } from "next/navigation";
import { cache } from "react";



export const getbudget = cache( async (budgetId: string) => {
    //obtener el token de autenticacion
    const token = await getToken();
    const url = `${process.env.API_URL}/budgets/${budgetId}`;
  
    //enviar el token de autenticacion para obtener los datos del usuario
    const req = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const json = await req.json();

   
  
    if (!req.ok) {
      //not found nos redidirige a un pagina de no encontrado que podemos crear en nuestro sistema de rutas
      notFound();
    }
  
    const budget = BudgetAPIResponseSchema.parse(json);
    return budget;
  });