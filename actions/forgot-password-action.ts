"use server";

import {
  ErrorResponseSchema,
  ForgotPasswordSchema,
  SuccessSchema
} from "@/src/schemas";

type Actionstate = {
  errors: string[];
  success: string;
};
export async function forgotPassword(
  prevState: Actionstate,
  formData: FormData
) {
  const registerData = {
    email: formData.get("email")
  };

  const forgotPassword = ForgotPasswordSchema.safeParse(registerData);

  if (!forgotPassword.success) {
    return {
      errors: forgotPassword.error.issues.map((err) => err.message),
      success: ""
    };
  }

  //enviar la peticion a nuestra  api
  const url = `${process.env.API_URL}/auth/forgot-password`;
  //eviar peticion al backend
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: forgotPassword.data.email
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
