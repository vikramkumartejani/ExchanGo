'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import ToggleButton from './ui/ToggleButton';

const DashboardHeader = () => {
     return (
          <div className='mt-6 lg:mt-[42px] mb-[32px] lg:mb-[52px] max-w-[1160px] px-5 mx-auto w-full flex items-center justify-between'>
               <Image src='/assets/logo.svg' alt='logo' width={190} height={41} className='md:w-[190px] w-[143px]' />
               <div className='flex items-center gap-3 md:gap-6'>
                    <div className='flex items-center gap-2'>
                         <ToggleButton
                              defaultChecked={false}
                              size='lg'
                              onChange={(checked) => console.log('Toggle changed:', checked)}
                              aria-label="Visible for user"
                         />
                         <h2 className="text-[#111111] text-[16px] font-normal md:block hidden">Visible for user</h2>
                    </div>
                    <div className='flex items-center gap-2'>
                         <div>
                              <Image src='/assets/profile.svg' alt='profile' width={52} height={52} className='md:w-[52px] w-[32px]' />
                         </div>
                         <div className='flex items-start flex-col gap-0.5'>
                              <div className='flex items-center gap-2.5'>
                                   <h2 className='text-[#111111] text-[16px] font-medium leading-[19px] md:block hidden'>Welcome, Atlas Exchange</h2>
                                   <svg width="25" height="24" className='cursor-pointer' viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.1994 9.90771L13.5893 16.5178C12.8087 17.2984 11.5313 17.2984 10.7507 16.5178L4.14062 9.90771" stroke="#292D32" strokeWidth="1.52072" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                   </svg>
                              </div>
                              <div className='text-[#585858] text-[16px] font-normal leading-[22px] md:block hidden'>Admin office</div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default DashboardHeader