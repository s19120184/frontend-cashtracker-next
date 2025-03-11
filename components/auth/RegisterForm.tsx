"use client"

import { register } from "@/actions/create-account-action"
import { useActionState } from "react"
import ErrorMessage from "../ui/ErrorMessage"
import SuccessMessage from "../ui/SuccsesMessage"


export default function RegisterForm() {

   const [state, dispatch]=useActionState(register,
    {
       errors:[],
       success:''
      })

  
  return (

     
    <form className="mt-14 space-y-5" noValidate  action={dispatch}>
      {state.errors.map(error=> <ErrorMessage key={error} >{error}</ErrorMessage>)}

      {state.success && <SuccessMessage key={1} >{state.success}</SuccessMessage>}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-bold text-2xl">
            Email
          </label>
          <input
            type="email"
            className="w-full border boder-gray-300 p-3 rounded-lg"
            name="email"
            placeholder="Email de Registro"
            id="email"
          />
          <div className="flex flex-col gap-2">
            <label className="font-bold text-2xl">Nombre</label>
            <input
              type="name"
              placeholder="Nombre de Registro"
              className="w-full border border-gray-300 p-3 rounded-lg"
              name="name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-2xl">Password</label>
            <input
              type="password"
              placeholder="Password de Registro"
              className="w-full border border-gray-300 p-3 rounded-lg"
              name="password"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-2xl">Repetir Password</label>
            <input
              id="password_confirmation"
              type="password"
              placeholder="Repite Password de Registro"
              className="w-full border border-gray-300 p-3 rounded-lg"
              name="password_confirmation"
            />
          </div>

          <input type="submit" className="bg-purple-800 w-full p-3 rounded-lg text-white font-black text-xl cursor-poiter block" />
        </div>
      </form>
  )
}
