"use client";

import { ConfirmAccount } from "@/actions/confirm-account-action";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";

export default function ConfirmAccountForm() {

  const router= useRouter()
  const [token, setToken] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  //enviar parametros adicionales en este caso el token
  const confirmAccountWithToken = ConfirmAccount.bind(null, token);
  const [state, dispatch] = useActionState(confirmAccountWithToken, {
    errors: [],
    success:""
  });

  //escuchar cuando isComplete es true
  useEffect(() => {
    if (isComplete) {
      dispatch();
    }
  
  }, [isComplete,dispatch]);


  //escuchar los cambios en el state
  useEffect(() => {
     if(state.errors){
      state.errors.forEach(error=> {
        toast.error(error)
      })
     }
     if(state.success){
       toast.success(state.success,{
        //redireccionar al usuario
         onClose:()=>{
             router.push('/auth/login')
         }
       })
     }
  },[state,router]);

  //asignar el valor del token al estado
  const handleChange = (token: string) => {
    setIsComplete(false)
    setToken(token);
  };

  //poner isComplete en true
  const handleComplete = () => {
    setIsComplete(true);
  };

  return (
    <>
     
      <div className="flex justify-center gap-5 my-10">  
        <PinInput
          value={token}
          onChange={handleChange}
          onComplete={handleComplete}
        >
          <PinInputField className="h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white " />
          <PinInputField className="h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white " />
          <PinInputField className="h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white " />
          <PinInputField className="h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white " />
          <PinInputField className="h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white " />
          <PinInputField className="h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white " />
        </PinInput>
      </div>
    </>
  );
}
