"use server"

import { ErrorResponseSchema, ResetPasswordSchema, SuccessSchema } from "@/src/schemas"

type PrevDataState={
    errors: string[],
    success:string
}
export async function resetPassword(token:string, prevData:PrevDataState , formData:FormData){


    const resetPasswordInput= {
        password:formData.get('password'),
        password_confirmation:formData.get('password_confirmation'),
    }

    const resetPassword = ResetPasswordSchema.safeParse(resetPasswordInput)
    if(!resetPassword.success){
        
        return{
            errors:resetPassword.error.issues.map(err => err.message),
            success:''
        }
    }

    const url= `${process.env.API_URL}/auth/update-password/${token}`
    const req= await fetch(url,{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            password:resetPassword.data.password,
            password_confirmation:resetPassword.data.password_confirmation,
            
        })
    })

    const json = await req.json()
    console.log(json)
    if(!req.ok){
        const{ error } = ErrorResponseSchema.parse(json)
        return{
            errors:[error],
            success:''
        }
    }

    const success= SuccessSchema.parse(json)


    return{
        errors: [],
        success:success
    }
}

