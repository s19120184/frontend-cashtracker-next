"use server"

import getToken from "@/src/auth/token";
import { ErrorResponseSchema, SuccessSchema, UserSchemaNewData } from "@/src/schemas";
import { revalidatePath } from "next/cache";


type PrevActionState = {
    errors:string[],
    success:string
}

export async function updateProfile(prevState: PrevActionState,formData: FormData){

    
   const newDataUser =UserSchemaNewData.safeParse({
       name: formData.get('name'),
       email: formData.get('email'),
   })

   if(!newDataUser.success){
       return{
        errors: newDataUser.error.issues.map(err=>err.message),
        success:''
       }
   }

   const token  = await getToken()

   const url =`${process.env.API_URL}/auth/user`
   const req= await fetch(url,{
      method: 'PUT',
      headers:{
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
         name:newDataUser.data.name,
         email:newDataUser.data.email
      })
   })

   const json= await req.json();

   if(!req.ok){
    const {error}= ErrorResponseSchema.parse(json);
    return { 
        errors:[error],
        success:''
    }
   }

   
   revalidatePath(`/admin/profile/settings`)
   const success = SuccessSchema.parse(json);


   return{
    errors:[],
    success:success
   }
   
   


    return{
        errors:[],
        success:''
    }
}