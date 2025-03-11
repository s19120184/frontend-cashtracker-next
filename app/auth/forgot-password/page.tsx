
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";
import Link from "next/link";


export const metadata:Metadata={
    title:"CashTracker - Olvidé mi password",
    description:"CashTracker - Olvidé mi password",
}

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950 ">¿Olvidate tu contraseña?</h1>
      <p className="text-3xl font-bold">
        aquí puedes <span className="text-amber-500">restableserla</span>
      </p>
       <ForgotPasswordForm/>
       <nav className="mt-10 flex flex-col space-y-4">
        <Link href='/auth/login' className="text-center text-gray-500" >Ya tienes una cuenta? Iniciar Sesion</Link>
        <Link href='/auth/register' className="text-center text-gray-500" >No tienes una cuenta? Crear una</Link>
        
       </nav>
    </>
  );
}