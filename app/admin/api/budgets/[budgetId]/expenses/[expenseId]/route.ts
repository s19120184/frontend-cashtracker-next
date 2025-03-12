import { verifySessions } from "@/src/auth/dal"
import getToken from "@/src/auth/token"
import { ExpenseSchema } from "@/src/schemas";
import {  NextResponse } from "next/server"



// export async function GET(
//   request: NextRequest,
//   context: { params: { budgetId: string; expenseId: string } } // 👈 Corrección en la firma
// ) {
//   await verifySessions();

//   const { budgetId, expenseId } = await context.params; // 👈 Acceso correcto

//   const token = await getToken();

//   const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;
 
//   const req = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const json = await req.json();
 

//   if (!req.ok) {
//     return NextResponse.json({ error: json.error }, { status: 403 });
//   }

//   const expense= ExpenseSchema.parse(json)

//   return NextResponse.json(expense);
// }
export async function GET(request: Request, { params }: { params: Promise<{ budgetId: string, expenseId: string }> }) {
  try {
    await verifySessions();

    const { budgetId, expenseId } =await params; // 👈 Acceso directo

    const token = await getToken();

    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;

    const req = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await req.json();

    if (!req.ok) {
      return NextResponse.json({ error: json.error }, { status: 403 });
    }

    const expense = ExpenseSchema.parse(json); // 👈 Validación del esquema

    return NextResponse.json(expense);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error"+error }, { status: 500 });
  }
}