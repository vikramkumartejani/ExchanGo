'use client'
import React, { JSX, useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import RateSetting from '@/components/ExchangeLeadboard/RateSetting';
import UpdateHistory from '@/components/ExchangeLeadboard/UpdateHistory';
import HistoryDropdown from '@/components/ExchangeLeadboard/HistoryDropdown';

interface TabType {
     id: string;
     label: string;
}

const ExchangeLeadboard = () => {
     const [activeTab, setActiveTab] = useState<string>('Rate Setting')

     const tabs: TabType[] = [
          { id: 'Rate Setting', label: 'Rate Setting' },
          { id: 'Update History', label: 'Update History' },
     ]

     const handleTabClick = (tabId: string): void => {
          setActiveTab(tabId)
     }
     const renderTabContent = (): JSX.Element => {
          switch (activeTab) {
               case 'Rate Setting':
                    return (
                         <RateSetting />
                    )
               case 'Update History':
                    return (
                         <UpdateHistory />
                    )
               default:
                    return (
                         <div className=''>
                              <h1>Select a tab</h1>
                         </div>
                    )
          }
     }
     return (
          <DashboardLayout>
               <div className='w-full'>
                    {activeTab === 'Rate Setting' && (
                         <div className='w-full flex items-start justify-between gap-6'>
                              <div>
                                   <h1 className='text-[#111111] text-[32px] leading-[38px] font-bold'>Exchange Leadboard</h1>
                                   <p className='max-w-[509px] text-[#585858] text-[14px] leading-[20px] font-normal mt-2'>Manage exchange rates with precision. Update rates in real-time to ensure transparency and competitiveness in the market.</p>
                              </div>
                              <button className="w-full sm:w-[105px] h-10 sm:h-[46px] cursor-pointer rounded-md relative text-[#20523C] text-base font-semibold leading-[22px]"
                                   style={{ background: 'radial-gradient(65.83% 94.77% at 50.34% 116.3%, #C3F63C 0%, #54D10E 100%)', border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: '0px 4px 4px 0px #FFFFFF52 inset, 0px -4px 4px 0px #FFFFFF52 inset' }}>
                                   Update
                              </button>
                         </div>
                    )}

                    {activeTab === 'Update History' && (
                         <div className='w-full flex items-start justify-between lg:flex-row flex-col gap-4 sm:gap-6'>
                              <div>
                                   <h1 className='text-[#111111] text-[26px] md:text-[32px] leading-[31px] md:leading-[38px] font-bold'>Exchange Update History </h1>
                                   <p className='text-[#585858] text-[14px] leading-[20px] font-normal mt-2'>Here’s a record of all the changes you’ve made to your exchange rates</p>
                              </div>
                              <HistoryDropdown />
                         </div>
                    )}

                    {activeTab === 'Rate Setting' && (
                         <h3 className='text-[#111111] text-[18px] leading-[22px] font-normal pt-8'>
                              <span className='font-bold'>Last Update</span> : April 30, 2024 - 09:45
                         </h3>
                    )}

                    <div className='mt-6 sm:mt-8'>
                         {/* Tab Navigation */}
                         <div className='border-b border-[#DEDEDE] mb-6 sm:mb-8 overflow-hidden relative'>
                              <div className='flex overflow-x-auto hide-scrollbar' style={{ background: "linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)" }}>
                                   {tabs.map((tab: TabType) => (
                                        <button
                                             key={tab.id}
                                             onClick={() => handleTabClick(tab.id)}
                                             className={`flex-shrink-0 px-0 pb-[9.12px] cursor-pointer pt-[8.11px] mr-6 last:mr-0 text-[14px] font-medium leading-[18px] transition-colors whitespace-nowrap ${activeTab === tab.id
                                                  ? 'text-[#111111] border-b-2 border-[#20523C]'
                                                  : 'text-[#585858] border-transparent hover:text-[#585858]'
                                                  }`}
                                             type="button"
                                             aria-selected={activeTab === tab.id}
                                             role="tab"
                                        >
                                             {tab.label}
                                        </button>
                                   ))}
                              </div>
                         </div>

                         {/* Content Area */}
                         <div role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
                              {renderTabContent()}
                         </div>
                    </div>
               </div>
          </DashboardLayout>
     )
}

export default ExchangeLeadboard