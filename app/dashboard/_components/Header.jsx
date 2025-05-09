"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react' 

function Header() {
  const path = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    console.log(path)
  }, [path])

  return (
    <div className='bg-secondary shadow-md items-center items-fix
    fixed top-0 left-0 right-0 z-50'>
      <div className='flex p-4 items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Image src={'/logo.svg'} width={50} height={50} alt='Logo' />
          <span className='text-xl font-semibold'>AIMocker</span>
        </div>

        {/* Desktop Menu */}
        <ul className='hidden md:flex gap-6 items-center '>
          <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>Dashboard</li>
          <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>Questions</li>
          <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>Upgrade</li>
          <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>How it Work?</li>
         <li>          <UserButton/>
         </li>
         
        </ul>

        {/* Mobile Menu Button */}
        <div className='md:hidden flex items-center gap-4'>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className='md:hidden flex flex-col gap-4 px-4 pb-4'>
          <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>Dashboard</li>
          <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>Questions</li>
          <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>Upgrade</li>
          <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>How it Work?</li>
          <li><UserButton/></li>
        </ul>
      )}
    </div>
  )
}

export default Header
