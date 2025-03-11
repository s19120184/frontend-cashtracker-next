"use server"

import { DraftBudgetSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"


type ActionCreateBudget={
    errors: string[],
    success:string
}
export async  function createBudget(preveData:ActionCreateBudget, formData: FormData){
   
    //validar las entradas del formularion
    const budget= DraftBudgetSchema.safeParse({
        name:formData.get('name'),
        amount:formData.get('amount'),
    })

    //de no ser validas las entradas retornamos los errores
    if(!budget.success){
        return{
            errors:budget.error.issues.map(error => error.message),
            success:''
        }
    }

    //obtener la cookie de sesion
    const token = (await cookies()).get("CASHATRACKER_TOKEN")?.value

    const url =`${process.env.API_URL}/budgets`


    const req = await fetch(url, {
        method:'POST',
        headers:{
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }, body: JSON.stringify({
            name:budget.data.name,
            amount:budget.data.amount
        })
    })

    const json= await req.json()

    revalidatePath('/admin')
    const success = SuccessSchema.parse(json)


    return{
        errors:[],
        success:success
    }

}