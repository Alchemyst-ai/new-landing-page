'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Blogs = () => {

  const router = useRouter();
    
  return (
    <div className=' h-screen w-screen p-10'>
        <div className='border border-[#242422] max-w-max rounded-xl flex flex-col justify-center items-center gap-3 overflow-hidden w-[25rem]' onClick={() => {
            router.push('/blogs/pre-seed')
        }}>
            <div className='w-full flex justify-center items-center'>
                <Image src="/blog/preseedweb.webp" alt="Parineeta" width={500} height={500} />
            </div>
            <div className='w-full py-2'>
                {/* <div>
                    <p>Company</p>
                </div> */}
                <div className='p-3'>
                    <div className='text-xl font-bold mb-6'>
                        <p>Alchemyst AI raises $300K Pre-Seed Round</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-gray-600'>Parineeta</p>
                        <p className='text-gray-600'>Oct 19,2024 | 7minutes</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Blogs