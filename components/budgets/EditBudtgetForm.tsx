"use client"
import { Budget } from "@/src/schemas";
import BudgetForm from "./BudgetForm";
import { useActionState, useEffect, } from "react";
import { editBudget } from "@/actions/edit-budget-action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function EditBudtgetForm({budget}:{budget:Budget}) {

  const router= useRouter()

  const editBudgetwithId= editBudget.bind(null, budget.id )
  const [ state, dispatch ] = useActionState(editBudgetwithId, {
    errors: [],
    success:"",

  })

  useEffect(()=>{
    if(state.errors){
       state.errors.map(error  => toast.error(error))
    }

    if(state.success){
       toast.success(state.success)
       router.push('/admin')
    }

  },[state,router])

  return (
     <form
          className="mt-10 space-y-3"
          noValidate
          action={dispatch}
        >
          <BudgetForm
            budget={budget}  
          />
          
          <input
            type="submit"
            className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
            value='Guardar cambios '
          />
        </form>
  )
}
