import ProgresBar from "@/components/budgets/ProgresBar";
import AddExpenseButton from "@/components/expenses/AddExpenseButton";
import ExpenseMenu from "@/components/expenses/ExpenseMenu";
import Amount from "@/components/ui/Amount";
import ModalContainer from "@/components/ui/ModalContainer";
import { getbudget } from "@/src/services/budtget";
import { formatCurrency } from "@/src/utils";

import { Metadata } from "next";
import React from "react";

//crear metadata dinamica funcion propia de next que la ejecuta automaticamente
export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const budget = await getbudget(id);

  return {
    title: `CashTracker - ${budget.name}`,
    description: `CashTracker - ${budget.name}`
  };
}

export default async function BudgetDetailsPage({
  params
}: {
  params:Promise< { id: string }>;
}) {
  const { id } = await params;

  const budget = await getbudget(id);

  const totalSpent = budget.expenses.reduce(
    (total, expense) => +expense.amount + total,
    0
  ); //el cero para inicializarlo

  const totalAvailable = +budget.amount - totalSpent;

  const percentage = ((totalSpent / +budget.amount) * 100).toFixed(2);

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-black text-4xl text-purple-950">{budget.name}</h1>
          <p className="text-xl font-bold">
            Administra tus {""} <span className="text-amber-500">gastos</span>
          </p>
        </div>
        <AddExpenseButton />
      </div>

      {budget.expenses.length ? (
        <>
          {/* graficar  */}
          <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
            <ProgresBar percentage={+percentage} />

            <div className="flex flex-col justify-center items-center md:items-start gap-5">
              <Amount label="Presupuesto" amount={+budget.amount} />
              <Amount label="Disponible" amount={totalAvailable} />
              <Amount label="Gastado" amount={totalSpent} />
            </div>
          </div>

          <h1 className="font-black text-4xl text-purple-950 mt-10">
            Gastos en este presupuesto
          </h1>

          <ul
            role="list"
            className="divide-y divide-gray-300 border shadow-lg mt-10 "
          >
            {budget.expenses.map((expense) => (
              <li key={expense.id} className="flex justify-between gap-x-6 p-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-semibold text-gray-900">
                      {expense.name}
                    </p>
                    <p className="text-xl font-bold text-amber-500">
                      {formatCurrency(+expense.amount)}
                    </p>
                    <p className="text-gray-500  text-sm"></p>
                  </div>
                </div>
                {/* menu */}
                <ExpenseMenu expenseId={expense.id} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="text-center py-20">No hay gastos</p>
        </>
      )}
      {/* modal */}
      <ModalContainer />
    </>
  );
}
