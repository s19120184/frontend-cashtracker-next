

export default function ErrorMessage({children}:{children:React.ReactNode}) {
  return (
    <p className='text-center my-4 bg-red-600 text-white p-2 '>{children}</p>
  )
}
