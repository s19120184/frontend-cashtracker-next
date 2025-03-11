import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useActionState, useEffect } from "react";
import createExpense from "@/actions/create-expense-action";
import { useParams } from "next/navigation";
import ErrorMessage from "../ui/ErrorMessage";
import { toast } from "react-toastify";

export default function AddExpenseForm({closeModal}:{ closeModal :() => void}) {

    //en client componente recuperamos los parametros con useParams
    const {id} = useParams()

    const createExpeseWithBudgetId= createExpense.bind(null, +id!)
    const [state, dispath] = useActionState(createExpeseWithBudgetId,{
        errors:[],
        success: ''
    })


    useEffect(()=>{
        if(state.success){
            toast.success(state.success)
            closeModal()
        }
    },[state])


  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
      
      </DialogTitle>

      <p className="text-xl font-bold">Llena el formulario y crea un {''}
        <span className="text-amber-500">gasto</span>
      </p>

      {state.errors.map(error =>  <ErrorMessage key={error} >{error}</ErrorMessage>) }
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
        action={dispath}
      >
        <ExpenseForm/>

        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value='Registrar Gasto'
        />
      </form>
    </>
  )
}