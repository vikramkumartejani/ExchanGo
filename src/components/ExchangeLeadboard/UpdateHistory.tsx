import Image from 'next/image'
import React, { useState } from 'react'

interface UpdateRecord {
     id: string
     date: string
     lastUpdate: string
     changeBy: {
          name: string
          avatar: string
     }
     currency?: {
          code: string
          name: string
          flag: string
          buyingRate: {
               initial: number
               after: number
          }
          sellingRate: {
               initial: number
               after: number
          }
     }
}

const UpdateHistory = () => {
     const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

     const updateData: UpdateRecord[] = [
          {
               id: '1',
               date: 'August 25, 2024',
               lastUpdate: 'Last update at 12:45 PM"',
               changeBy: {
                    name: 'Adam Warlock',
                    avatar: '👤'
               },
               currency: {
                    code: 'USD',
                    name: 'United States dollar',
                    flag: '🇺🇸',
                    buyingRate: {
                         initial: 9.80,
                         after: 9.95
                    },
                    sellingRate: {
                         initial: 9.80,
                         after: 9.95
                    }
               }
          },
          {
               id: '2',
               date: 'August 25, 2024',
               lastUpdate: 'Last update at 12:45 PM"',
               changeBy: {
                    name: 'Adam Warlock',
                    avatar: '👤'
               },
               currency: {
                    code: 'EUR',
                    name: 'Euro',
                    flag: '🇪🇺',
                    buyingRate: {
                         initial: 10.50,
                         after: 10.75
                    },
                    sellingRate: {
                         initial: 10.60,
                         after: 10.85
                    }
               }
          },
          {
               id: '3',
               date: 'August 25, 2024',
               lastUpdate: 'Last update at 12:45 PM"',
               changeBy: {
                    name: 'Adam Warlock',
                    avatar: '👤'
               },
               currency: {
                    code: 'GBP',
                    name: 'British Pound Sterling',
                    flag: '🇬🇧',
                    buyingRate: {
                         initial: 12.20,
                         after: 12.45
                    },
                    sellingRate: {
                         initial: 12.30,
                         after: 12.55
                    }
               }
          },
          {
               id: '4',
               date: 'August 25, 2024',
               lastUpdate: 'Last update at 12:45 PM"',
               changeBy: {
                    name: 'Adam Warlock',
                    avatar: '👤'
               },
               currency: {
                    code: 'AUD',
                    name: 'Australian dollar',
                    flag: 'aud',
                    buyingRate: {
                         initial: 10.50,
                         after: 10.75
                    },
                    sellingRate: {
                         initial: 10.60,
                         after: 10.85
                    }
               }
          },
          {
               id: '5',
               date: 'August 25, 2024',
               lastUpdate: 'Last update at 12:45 PM"',
               changeBy: {
                    name: 'Adam Warlock',
                    avatar: '👤'
               },
               currency: {
                    code: 'EUR',
                    name: 'Euro',
                    flag: '🇪🇺',
                    buyingRate: {
                         initial: 10.50,
                         after: 10.75
                    },
                    sellingRate: {
                         initial: 10.60,
                         after: 10.85
                    }
               }
          }
     ]

     const toggleExpanded = (id: string) => {
          const newExpandedItems = new Set(expandedItems)
          if (newExpandedItems.has(id)) {
               newExpandedItems.delete(id)
          } else {
               newExpandedItems.add(id)
          }
          setExpandedItems(newExpandedItems)
     }

     const currencySvgMap: { [key: string]: string } = {
          'USD': '/assets/usd.svg',
          'EUR': '/assets/eur.svg',
          'GBP': '/assets/gbp.svg',
          'AUD': '/assets/aud.svg',
     }

     const renderCurrencyFlag = (currency: { code: string; flag: string }) => {
          const svgPath = currencySvgMap[currency.code]
          if (svgPath) {
               return (
                    <Image
                         src={svgPath}
                         alt={`${currency.code} Flag`}
                         width={24}
                         height={24}
                         className="object-contain rounded-full flex-shrink-0"
                    />
               )
          }
          return (
               <span className="text-[18px] leading-[22px] font-normal text-[#111111] mb-0.5 flex-shrink-0">
                    {currency.flag}
               </span>
          )
     }

     return (
          <div className="w-full">
               {/* Responsive Table Container */}
               <div className="overflow-x-auto hide-scrollbar">
                    <div className="min-w-[640px] sm:min-w-[776px]">
                         {/* Header */}
                         <div className="grid grid-cols-8 md:grid-cols-14 gap-4 md:px-4 mb-2 md:mb-3">
                              <div className="col-span-1"></div>
                              <div className="col-span-2 md:col-span-3 text-[#111111] text-[14px] leading-[20px] font-medium">Date</div>
                              <div className="col-span-3 md:col-span-5 text-[#111111] text-[14px] leading-[20px] font-medium">Last Update</div>
                              <div className="col-span-2 md:col-span-5 text-[#111111] text-[14px] leading-[20px] font-medium">Change by</div>
                         </div>

                         {/* Update Records */}
                         <div className="space-y-2">
                              {updateData.map((record) => (
                                   <div key={record.id} className="md:px-4 bg-white border-b md:border border-[#DEDEDE] md:rounded-xl">
                                        {/* Main Row */}
                                        <div
                                             className="grid grid-cols-8 md:grid-cols-14 gap-4 py-4 md:py-5 items-start cursor-pointer transition-colors"
                                             onClick={() => toggleExpanded(record.id)}
                                        >
                                             <div className="col-span-1 flex items-center justify-start">
                                                  <svg
                                                       viewBox="0 0 19 19"
                                                       fill="none"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       className={`md:w-[19px] md:h-[19px] w-[18px] h-[18px] transition-transform duration-200 mt-[1px] flex-shrink-0 ${expandedItems.has(record.id) ? 'rotate-180' : ''}`}
                                                  >
                                                       <path
                                                            d="M15.1456 7.06763L10.1881 12.0252C9.60262 12.6106 8.64457 12.6106 8.0591 12.0252L3.10156 7.06763"
                                                            stroke="#292D32"
                                                            strokeWidth="1.14054"
                                                            strokeMiterlimit="10"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                  </svg>
                                             </div>
                                             <div className="col-span-2 md:col-span-3 text-[14px] sm:text-[16px] leading-[17px] sm:leading-[22px] font-normal text-[#111111] truncate">
                                                  {record.date}
                                             </div>
                                             <div className="col-span-3 md:col-span-5 text-[14px] sm:text-[16px] leading-[17px] sm:leading-[22px] font-normal text-[#111111] truncate">
                                                  {record.lastUpdate}
                                             </div>
                                             <div className="col-span-2 md:col-span-5 flex items-center space-x-2.5 min-w-0">
                                                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs flex-shrink-0">
                                                       {record.changeBy.avatar}
                                                  </div>
                                                  <span className="text-[15px] sm:text-[18px] leading-[22px] font-normal text-[#111111] truncate">
                                                       {record.changeBy.name}
                                                  </span>
                                             </div>
                                        </div>

                                        {expandedItems.has(record.id) && <div className='w-full bg-[#DEDEDE] h-[1px]'></div>}

                                        {/* Expanded Content */}
                                        {expandedItems.has(record.id) && record.currency && (
                                             <div className="pb-0 md:pb-6 mt-[22px]">
                                                  {/* Mobile Layout */}
                                                  <div className="block md:hidden">
                                                       <div className="space-y-6 px-4 flex items-start gap-6">
                                                            {/* Currency Info */}
                                                            <div className="flex flex-col items-start gap-3">
                                                                 <div className="text-[#111111] text-[14px] leading-[20px] font-medium min-w-[80px]">Currency:</div>
                                                                 <div className='flex items-center gap-3'>
                                                                      {renderCurrencyFlag(record.currency)}
                                                                      <div>
                                                                           <div className="font-normal text-[#111111] text-[18px] leading-[22px]">{record.currency.code}</div>
                                                                           <div className="text-[10px] leading-[14px] font-normal text-[#585858]">{record.currency.name}</div>
                                                                      </div>
                                                                 </div>
                                                            </div>

                                                            {/* Buying Rate */}
                                                            <div className="space-y-3">
                                                                 <div className="text-[#111111] text-[14px] leading-[20px] font-medium">Buying rate</div>
                                                                 <div className='flex items-start gap-3 justify-center'>
                                                                      <div className="flex flex-col items-start gap-[10px]">
                                                                           <div className="border border-[#DEDEDE] rounded-lg h-[46px] w-[80px] md:w-[100px] flex items-center justify-center">
                                                                                <div className="text-[14px] sm:text-[16px] leading-[17px] sm:leading-[22px] font-normal text-[#111111]">
                                                                                     {record.currency.buyingRate.initial.toFixed(2)}
                                                                                </div>
                                                                           </div>
                                                                           <div className="text-[10px] font-normal leading-[14px] text-[#585858]">Initial rate</div>
                                                                      </div>
                                                                      <div className=" mt-[15px]">
                                                                           <Image src='/assets/arrow-right.svg' alt='arrow-right' width={18} height={18} />
                                                                      </div>
                                                                      <div className="flex flex-col items-start gap-[10px]">
                                                                           <div className="border border-[#DEDEDE] rounded-lg h-[46px] w-[80px] md:w-[100px] flex items-center justify-center">
                                                                                <div className="text-[14px] sm:text-[16px] leading-[17px] sm:leading-[22px] font-normal text-[#111111]">
                                                                                     {record.currency.buyingRate.after.toFixed(2)}
                                                                                </div>
                                                                           </div>
                                                                           <div className="text-[10px] font-normal leading-[14px] text-[#585858]">After update</div>
                                                                      </div>
                                                                 </div>
                                                            </div>

                                                            {/* Selling Rate */}
                                                            <div className="space-y-3">
                                                                 <div className="text-[#111111] text-[14px] leading-[20px] font-medium">Selling rate</div>
                                                                 <div className='flex items-start gap-3 justify-center'>
                                                                      <div className="flex flex-col items-start gap-[10px]">
                                                                           <div className="border border-[#DEDEDE] rounded-lg h-[46px] w-[80px] md:w-[100px] flex items-center justify-center">
                                                                                <div className="text-[14px] sm:text-[16px] leading-[17px] sm:leading-[22px] font-normal text-[#111111]">
                                                                                     {record.currency.sellingRate.initial.toFixed(2)}
                                                                                </div>
                                                                           </div>
                                                                           <div className="text-[10px] font-normal leading-[14px] text-[#585858]">Initial rate</div>
                                                                      </div>
                                                                      <div className="mt-[15px]">
                                                                           <Image src='/assets/arrow-right.svg' alt='arrow-right' width={18} height={18} />
                                                                      </div>
                                                                      <div className="flex flex-col items-start gap-[10px]">
                                                                           <div className="border border-[#DEDEDE] rounded-lg h-[46px] w-[80px] md:w-[100px] flex items-center justify-center">
                                                                                <div className="text-[14px] sm:text-[16px] leading-[17px] sm:leading-[22px] font-normal text-[#111111]">
                                                                                     {record.currency.sellingRate.after.toFixed(2)}
                                                                                </div>
                                                                           </div>
                                                                           <div className="text-[10px] font-normal leading-[14px] text-[#585858]">After update</div>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>

                                                  {/* Desktop Layout */}
                                                  <div className="hidden md:block">
                                                       <div className="flex items-start gap-4 px-4 lg:pl-[55px] overflow-x-auto">
                                                            {/* Currency Info */}
                                                            <div className="min-w-[154px] flex items-start flex-col gap-[17px] flex-shrink-0">
                                                                 <div className="text-[#111111] text-[14px] leading-[20px] font-medium">Currency</div>
                                                                 <div className='flex items-center gap-3'>
                                                                      {renderCurrencyFlag(record.currency)}
                                                                      <div>
                                                                           <div className="font-normal text-[#111111] text-[18px] leading-[22px]">{record.currency.code}</div>
                                                                           <div className="text-[10px] leading-[14px] font-normal text-[#585858]">{record.currency.name}</div>
                                                                      </div>
                                                                 </div>
                                                            </div>

                                                            {/* Buying Rate */}
                                                            <div className="flex-1 min-w-[200px] flex items-start gap-3 flex-col">
                                                                 <div className="text-[#111111] text-[14px] leading-[20px] font-medium">Buying rate</div>
                                                                 <div className='flex items-start gap-2.5 lg:gap-[15px]'>
                                                                      <div className="flex flex-col items-start gap-[10px] flex-shrink-0">
                                                                           <div className="border border-[#DEDEDE] rounded-lg h-[46px] w-[100px] flex items-center justify-center">
                                                                                <div className="text-[16px] leading-[22px] font-normal text-[#111111]">
                                                                                     {record.currency.buyingRate.initial.toFixed(2)}
                                                                                </div>
                                                                           </div>
                                                                           <div className="text-[10px] font-normal leading-[14px] text-[#585858]">Initial rate</div>
                                                                      </div>
                                                                      <div className="mt-[15px] min-w-[18px] flex-shrink-0">
                                                                           <Image src='/assets/arrow-right.svg' alt='arrow-right' width={18} height={18} />
                                                                      </div>
                                                                      <div className="flex flex-col items-start gap-[10px] flex-shrink-0">
                                                                           <div className="border border-[#DEDEDE] rounded-lg h-[46px] w-[100px] flex items-center justify-center">
                                                                                <div className="text-[16px] leading-[22px] font-normal text-[#111111]">
                                                                                     {record.currency.buyingRate.after.toFixed(2)}
                                                                                </div>
                                                                           </div>
                                                                           <div className="text-[10px] font-normal leading-[14px] text-[#585858]">After update</div>
                                                                      </div>
                                                                 </div>
                                                            </div>

                                                            {/* Selling Rate */}
                                                            <div className="flex-1 min-w-[200px] flex items-start gap-3 flex-col">
                                                                 <div className="text-[#111111] text-[14px] leading-[20px] font-medium">Selling rate</div>
                                                                 <div className='flex items-start gap-[15px]'>
                                                                      <div className="flex flex-col items-start gap-[10px] flex-shrink-0">
                                                                           <div className="border border-[#DEDEDE] rounded-lg h-[46px] w-[100px] flex items-center justify-center">
                                                                                <div className="text-[16px] leading-[22px] font-normal text-[#111111]">
                                                                                     {record.currency.sellingRate.initial.toFixed(2)}
                                                                                </div>
                                                                           </div>
                                                                           <div className="text-[10px] font-normal leading-[14px] text-[#585858]">Initial rate</div>
                                                                      </div>
                                                                      <div className="mt-[15px] min-w-[18px] flex-shrink-0">
                                                                           <Image src='/assets/arrow-right.svg' alt='arrow-right' width={18} height={18} />
                                                                      </div>
                                                                      <div className="flex flex-col items-start gap-[10px] flex-shrink-0">
                                                                           <div className="border border-[#DEDEDE] rounded-lg h-[46px] w-[100px] flex items-center justify-center">
                                                                                <div className="text-[16px] leading-[22px] font-normal text-[#111111]">
                                                                                     {record.currency.sellingRate.after.toFixed(2)}
                                                                                </div>
                                                                           </div>
                                                                           <div className="text-[10px] font-normal leading-[14px] text-[#585858]">After update</div>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                        )}
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default UpdateHistory