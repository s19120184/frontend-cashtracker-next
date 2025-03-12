import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "El email es obligatorio" })
      .email({ message: "El email no es valido" }),
    name: z.string().min(1, { message: "El nombre no puede ir vacio" }),
    password: z
      .string()
      .min(8, { message: "El password es muy corto minimo 8 caracteres" }),
    password_confirmation: z.string()
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Los passwords no son iguales",
    path: ["password_confirmation"]
  });

export const SuccessSchema = z.string();

export const ErrorResponseSchema = z.object({
  error: z.string()
});

export const ErrorResponseSchemaResetPassword= z.string();

export const TokenSchema = z
  .string({ message: "Token no valido" })
  .length(6, { message: "Token no valido" });


export const LoginSchema = z.object({
   email: z.string().min(1,{message: "El email es obligatorio"}).email({message: 'Email no valido'}),
   password: z.string().min(1,{message: "El password no puede ir vacio "})
})

//esquema para validar datos del usuario
export const UserSchema = z.object({
  id:z.number(),
  name:z.string(),
  email:z.string().email()
})

export type User =z.infer<typeof UserSchema>

//esquema para validar email 
export const ForgotPasswordSchema = z.object({
  email: z.string()   
          .min(1, {message: 'El Email es Obligatorio'})
          .email( {message: 'Email no válido'}),
})

//esquema para validar nuevo password
export const ResetPasswordSchema = z.object({
  password: z.string()
          .min(8, {message: 'El Password debe ser de al menos 8 caracteres'}),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Los Passwords no son iguales",
  path: ["password_confirmation"]
});


//esquema para validar budget del formulario
export const DraftBudgetSchema = z.object({
  name: z.string()
          .min(1, {message: 'El Nombre del presupuesto es obligatorio'}),
  amount: z.coerce.
          number({message: 'Cantidad no válida'})
          .min(1, {message: 'Cantidad no válida'}),
})

//validar password
export const PasswordValidationSchema= z.string().min(1,{message:'password no valido'})

//validar expenses
export const ExpenseSchema=z.object({
     id:z.number(),
     name:z.string(),
     amount:z.string(),
     budgetId:z.number(),
})

//esquema para validar un presupuesto 
export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  expenses:z.array(ExpenseSchema)//agregar validacion para arreglo de expenses
})

//esquema para validar un arreglo de presupuestos
export const BudgetsAPIResponseSchema= z.array(BudgetAPIResponseSchema.omit({expenses:true}))

export type Budget =z.infer<typeof BudgetAPIResponseSchema>
export type Expense= z.infer<typeof ExpenseSchema>
export type DrafExpense =z.infer<typeof DraftExpenseSchema>
export type DraftExpenseEdit=z.infer<typeof ExpenseSchema>

//esquema para validar datos de Expenses
export const DraftExpenseSchema= z.object({
  name:z.string().min(1, {message: 'El nombre del gasto es obligatorio'}),
  amount:z.coerce.number().min(1, {message: 'Cantidad no valida'}),
})


//esquema para la validacion de cambio de password
export const UpdatedPasswordSchema= z.object({
  current_password:z.string().min(1, {message:"El password no puede ir vacio"}),
      password:z.string().min(8, {message:"El Nuevo password  debe ser de al menos 8 caracteres"}),
      password_confirmation:z.string()
}).refine((data)=> data.password === data.password_confirmation,{
  message:"Los password no son iguales",
  path:["password_confirmation"]
})


//esquema para validar datos del usuario
export const UserSchemaNewData= z.object({
  name:z.string(),
  email:z.string().email({message:'Email no valido'})
})
