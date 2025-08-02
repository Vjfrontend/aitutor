'use client'

import { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'


export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      
      
      <main className="grow">

        {children}

      </main>

      
    </div>
  )
}
