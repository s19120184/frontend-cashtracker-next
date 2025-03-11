import AdminMenu from '@/components/admin/adminMenu'
import Logo from '@/components/ui/Logo'
import ToastNotification from '@/components/ui/ToastNotification'
import { verifySessions } from '@/src/auth/dal'
import Link from 'next/link'
import React from 'react'

export default async function AdminLayout({children}:Readonly<{children:React.ReactNode}>) {
  
   const {user} = await verifySessions()

  return (
    <>
      <header className='bg-purple-950 py-5'>
        <div className='max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
          <div className='w-96'>
            <Link href={'/admin'}>
                <Logo />
            </Link>
          </div>
          {/* meun admin */} 
          <AdminMenu user={user} />
        </div>
      </header>
      <section className='max-w-5xl mx-auto mt-20 p-3 py-10'>
        {children}
      </section>
      <ToastNotification />

      <footer className='py-5'>
        <p className='text-center'>
          Todos los Derechos Reservados {new Date().getFullYear()}
        </p>
      </footer>
    </>
    
  )
}
