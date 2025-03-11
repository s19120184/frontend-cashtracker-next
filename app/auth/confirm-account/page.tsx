import ConfirmAccountForm from "@/components/auth/ConfirmAccountForm";
export default function ConfirmAccountPage() {
  return (
   <>
    <h1 className="font-black text-6xl text-purple-950 ">Confirma tu cuenta</h1>
      <p className="text-3xl font-bold">
        Ingresa el codigo que recibiste <span className="text-amber-500">por Email</span>
      </p>
      <ConfirmAccountForm/>
   </>
  )
}
