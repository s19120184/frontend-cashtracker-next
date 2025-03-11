
//instalar npm server-only

import "server-only"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { UserSchema } from "../schemas";
import { cache } from "react";

//para identificar el usuario autenticado
//cahe para cuando los datos no van a cambiar tenerlos en cache
export const verifySessions = cache(async () => {
  //obtener el jwt en las cookies
  const token = (await cookies()).get("CASHATRACKER_TOKEN")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  const url = `${process.env.API_URL}/auth/user`;
  //metodo GET esta por default en fect no es necesario especificarlo
  const req = await fetch(url, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const session = await req.json();
  const result = UserSchema.safeParse(session);

  //si la respuesta no es la correcta redirigimos al login
  if (!result.success) {
    redirect("/auth/login");
  }

  return {
    user: result.data,
    isAuth: true
  };
});
