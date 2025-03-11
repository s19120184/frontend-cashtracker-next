"use server";

import { ErrorResponseSchema, RegisterSchema, SuccessSchema } from "@/src/schemas";

type ActiconStateType = {
  errors: string[];
  success: string
};
export async function register(
 prevData:ActiconStateType,
  formData: FormData,
 
) {
  //recuperar  datos
  const registerData = {
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation")
  };


  //validamos con el schema de zod
  const register = RegisterSchema.safeParse(registerData);

 
  if (!register.success) {
    //obtener los mensajes de error
    const errors = register.error.errors.map((error) => error.message);
    
    return {
      errors,
      success:''
    }
  }

  const url = `${process.env.API_URL}/auth/create-account`;
  //eviar peticion al backend
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: register.data.name,
      password: register.data.password,
      email: register.data.email,
    })
  });

  const json = await req.json();

  if(req.status ===409){
     const error = ErrorResponseSchema.parse(json)
     return{
       errors:[error.error],
       success:''
     }
  }
  const success = SuccessSchema.parse(json);

  return {
    errors: [],
    success: success
  };
}


