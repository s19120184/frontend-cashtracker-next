import BudgetMenu from "@/components/budgets/BudgetMenu";
import DeleteBudgetModal from "@/components/budgets/DeleteBudgetModal";
import getToken from "@/src/auth/token";
import { BudgetsAPIResponseSchema } from "@/src/schemas";
import { formatCurrency } from "@/src/utils";

import { Metadata } from "next";

import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "CashTracker - Panel de administracion",
  description: "Panel de administracion"
};

async function getUserBudgets() {
  const token = await getToken();
  //consulta a la base de datos
  const url = ` ${process.env.API_URL}/budgets`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    next: {
      tags: ["all-budgets"]
    }
  });

  //recuperamos el json
  const json = await req.json();

  //validmos la respueta para tener tipado
  const budgets = BudgetsAPIResponseSchema.parse(json);

  return budgets;
}

export default async function AdminPage() {
  //no devemos utilizar un server action para obtener datos del backend
  const budget = await getUserBudgets();

  

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto">
          <h1 className="font-black text-4xl text-purple-500 my-5">
            Mis Presupuestos
          </h1>
          <p className="text-xl font-bold">
            Maneja y administra tus{" "}
            <span className="text-amber-500">Presupuestos</span>
          </p>
        </div>
        <Link
          href={"/admin/budgets/new"}
          className="bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Crear Presupuesto
        </Link>
      </div>
      {budget.length ? (
        <>
          <ul
            role="list"
            className="divide-y divide-gray-300 border shadow-lg mt-10"
          >
            {budget.map((budgetItem) => (
              <li
                key={budgetItem.id}
                className="flex justify-between gap-x-6 p-5"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      <Link
                        href={`/admin/budgets/${budgetItem.id}`}
                        className="cursor-pointer hover:underline text-2xl font-bold"
                      >
                        {budgetItem.name}
                      </Link>
                    </p>
                    <p className="text-xl font-bold text-amber-500">
                      {formatCurrency(+budgetItem.amount)}
                    </p>
                    <p className="text-gray-500  text-sm"></p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <BudgetMenu budgetId={budgetItem.id} />
                </div>
              </li>
            ))}
          </ul>
          <DeleteBudgetModal/>
        </>
      ) : (
        <p className="text-center py-20">
          No hay presupuestos aun{" "}
          <Link
            className="text-purple-950 font-bold"
            href={"/admin/budgets/new"}
          >
            comiensa creando uno
          </Link>
        </p>
      )}
    </>
  );
}
