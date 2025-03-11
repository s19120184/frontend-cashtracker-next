import EditBudtgetForm from "@/components/budgets/EditBudtgetForm";
import { getbudget } from "@/src/services/budtget";

import { Metadata } from "next";
import Link from "next/link";



//crear metadata dinamica funcion propia de next que la ejecuta automaticamente
export async function generateMetadata({params}:{params:{id:string}}):Promise<Metadata>{
   const {id}= await params;
   const budget= await getbudget(id)

   return{
    title:`CashTracker - ${budget.name}`,
    description:`CashTracker - ${budget.name}`,
   }
}


export default async function EditBudgetPage({
  params
}: {
  params: { id: string };
}) {
  //obtenemos el id desde al ruta dinamica
  const { id } = await params;

  const budget = await getbudget(id);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto">
          <h1 className="font-black text-4xl text-purple-950 my-5">
            Editar Presupuesto: {budget.name}
          </h1>
          <p className="text-xl font-bold">
            Llena el formulario y crea un nuevo {""}
            <span className="text-amber-500">presupuesto</span>
          </p>
        </div>
        <Link
          href={"/admin"}
          className="bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Volver
        </Link>
      </div>
      <div className="p-10 mt-10  shadow-lg border ">
        <EditBudtgetForm budget={budget} />
      </div>
    </>
  );
}
