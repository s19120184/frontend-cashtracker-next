import Image from "next/image";


export default function Logo() {
  return (
    <Image width={400} height={100} src="/logo.svg"  alt="Logo CashTracker" priority/>
  )
}
