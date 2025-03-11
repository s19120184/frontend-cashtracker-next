"use server";

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function validateToken(token: string, prevState: ActionStateType) {
  //validamos el token
  const resetPaswordToken = TokenSchema.safeParse(token);

  if (!resetPaswordToken.success) {
    return {
      errors: resetPaswordToken.error.issues.map((err) => err.message),
      success: ""
    };
  }

  const url = `${process.env.API_URL}/auth/validate-token`;
  const req = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: resetPaswordToken.data
    })
  });

  const json = await req.json();

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
    success: success
  };
}
