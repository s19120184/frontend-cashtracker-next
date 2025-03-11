"use server";

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas";

type ActionStatetype = {
  errors: string[];
  success: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function ConfirmAccount(
  token: string,
  prevState: ActionStatetype
) {
  const confirmToken = TokenSchema.safeParse(token);
  if (!confirmToken.success) {
    return {
      errors: confirmToken.error.issues.map((issue) => issue.message),
      success: ""
    };
  }

  //confirmasr el usuario
  const url = `${process.env.API_URL}/auth/confirm-account`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: confirmToken.data
    })
  });

  const json = await req.json();

  // .ok engloba todos los errores devuelve true o false
  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json);

    return {
      errors: [error],
      success: ""
    };
  }

  const success = SuccessSchema.parse(json);

  return {
    errors: [],
    success
  };
}
