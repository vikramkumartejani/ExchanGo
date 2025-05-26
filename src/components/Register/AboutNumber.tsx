import React, { useState } from 'react'
import CountryCodeDropdown from '../ui/CountryCodeDropdown'
import Checkbox from '../ui/Checkbox'

const AboutNumber = () => {
     const [isWhatsAppSame, setIsWhatsAppSame] = useState(false)
     const [showOtherNumber, setShowOtherNumber] = useState(false)

     function handleCheckboxChange(checked: boolean): void {
          setIsWhatsAppSame(checked)
     }

     function handleAddNewNumber(): void {
          setShowOtherNumber(true)
     }

     function handleCancelNewNumber(): void {
          setShowOtherNumber(false)
     }

     return (
          <div className='mt-6'>
               <div className='w-full relative bg-white border border-[#DEDEDE] rounded-lg py-[18px] px-4 h-[56px]'>
                    <label className="absolute -top-2 left-2.5 bg-white px-1.5 text-xs leading-[17px] font-medium text-[#111111]">
                         Primary Phone Number
                    </label>
                    <div className="flex items-center">
                         <CountryCodeDropdown />
                         <input
                              type='number'
                              placeholder="e.g. +212 6 12 34 56 78"
                              className='ml-4  flex-1 bg-transparent border-0 outline-none text-[#111111] placeholder-[#585858] text-sm leading-[20px] font-normal'
                         />
                    </div>
               </div>

               <div className='mt-2.5 flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-1.5'>
                         <Checkbox checked={isWhatsAppSame} onChange={handleCheckboxChange} />
                         <h3 className='text-[#585858] text-[12px] leading-[17px] font-normal'>Is this also your WhatsApp number?</h3>
                    </div>
                    <div className='flex items-center gap-4'>
                         {!showOtherNumber ? (
                              <button
                                   onClick={handleAddNewNumber}
                                   className='text-[#20523C] text-[14px] leading-[20px] font-medium cursor-pointer flex items-center gap-1'
                              >
                                   <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.16406 9H13.6263" stroke="#20523C" strokeWidth="1.01381" strokeLinecap="round" />
                                        <path d="M8.89062 13.731V4.2688" stroke="#20523C" strokeWidth="1.01381" strokeLinecap="round" />
                                   </svg>
                                   Add new Number
                              </button>
                         ) : (
                              <button
                                   onClick={handleCancelNewNumber}
                                   className='text-[#20523C] text-[14px] leading-[20px] font-medium cursor-pointer flex items-center gap-1'
                              >
                                   <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.16406 9H13.6263" stroke="#20523C" strokeWidth="1.01381" strokeLinecap="round" />
                                   </svg>
                                   Cancel
                              </button>
                         )}
                    </div>
               </div>

               {!isWhatsAppSame && (
                    <div className='mt-6 w-full relative bg-white border border-[#DEDEDE] rounded-lg py-[18px] px-4 h-[56px]'>
                         <label className="absolute -top-2 left-2.5 bg-white px-1.5 text-xs leading-[17px] font-medium text-[#111111]">
                              Whatsapp Number
                         </label>
                         <div className="flex items-center">
                              <CountryCodeDropdown />
                              <input
                                   type='number'
                                   placeholder="Type your Office number"
                                   className='ml-4  flex-1 bg-transparent border-0 outline-none text-[#111111] placeholder-[#585858] text-sm leading-[20px] font-normal'
                              />
                         </div>
                    </div>
               )}

               {showOtherNumber && (
                    <div className='mt-6 w-full relative bg-white border border-[#DEDEDE] rounded-lg py-[18px] px-4 h-[56px]'>
                         <label className="absolute -top-2 left-2.5 bg-white px-1.5 text-xs leading-[17px] font-medium text-[#111111]">
                              Other Number
                         </label>
                         <div className="flex items-center">
                              <CountryCodeDropdown />
                              <input
                                   type='number'
                                   placeholder="Type your Office number"
                                   className='ml-4  flex-1 bg-transparent border-0 outline-none text-[#111111] placeholder-[#585858] text-sm leading-[20px] font-normal'
                              />
                         </div>
                    </div>
               )}
          </div>
     )
}

export default AboutNumber