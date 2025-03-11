import { cookies } from "next/headers";


export default async function getToken(){
    const token = (await cookies()).get("CASHATRACKER_TOKEN")?.value;

    return token;
}