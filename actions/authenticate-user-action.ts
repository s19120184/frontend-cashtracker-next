"use server"

import { ErrorResponseSchema, LoginSchema } from "@/src/schemas"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type actionStatateType={
    errors: string[]
}
export async function authenticate(prevState:actionStatateType, formData: FormData){
  
    const loginCredentials = { 
        email:formData.get('email'),
        password:formData.get('password')
    }


    //validamos login credentials
    const auth= LoginSchema.safeParse(loginCredentials)

    //retornamos le mensaje de error 
    if(!auth.success){
        return{
            errors: auth.error.issues.map(err => err.message)
        }
    }

    const url = `${process.env.API_URL}/auth/login`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
       password: auth.data.password,
       email:auth.data.email
    })
  });

  const json = await req.json();

  

  if(!req.ok){
    //errores que vienen desde el backend
    const {error}= ErrorResponseSchema.parse(json)

    return{
        errors:[error]
    }
  }

    //setear cookies
   (await cookies()).set({
        name:'CASHATRACKER_TOKEN',
        value:json,
        httpOnly:true,
        path:'/'

    })

    //para dirigir a un usuario desde un server action utilizamos
    redirect('/admin')


    //ya no es necesario el return 
}