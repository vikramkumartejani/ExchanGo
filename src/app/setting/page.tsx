'use client'
import DashboardLayout from '@/components/DashboardLayout'
import React, { useState } from 'react'

const Setting = () => {
     const [activeTab, setActiveTab] = useState('Office Information')
     const [isVisible, setIsVisible] = useState(true)
     const [officeName, setOfficeName] = useState('')

     const tabs = [
          'Office Information',
          'Image & Logo',
          'Access & Security',
          'Notifications & Reminders',
          'Support & Documentation'
     ]

     return (
          <DashboardLayout>
               <div>
                    <h3 className='text-[#111111] font-bold text-[32px] leading-[38px] mb-2'>Setting</h3>
                    <p className='text-[#585858] text-[14px] font-normal leading-[20px]'>Update setting for better features performance</p>

                    <div className='mt-6'>
                         {/* Tab Navigation */}
                         <div className='border-b border-[#DEDEDE] mb-8 overflow-hidden'>
                              <div className='flex overflow-x-auto hide-scrollbar'>
                                   {tabs.map((tab) => (
                                        <button
                                             key={tab}
                                             onClick={() => setActiveTab(tab)}
                                             className={`flex-shrink-0 px-0 pb-[9.12px] cursor-pointer pt-[8.11px] mr-6 text-[14px] font-medium leading-[18px] transition-colors whitespace-nowrap ${activeTab === tab
                                                       ? 'text-[#111111] border-b-2 border-[#20523C]'
                                                       : 'text-[#585858] border-transparent hover:text-[#585858]'
                                                  }`}
                                        >
                                             {tab}
                                        </button>
                                   ))}
                              </div>
                         </div>

                         {/* Content Area */}
                         {activeTab === 'Office Information' && (
                              <div className=''>
                                  <h1>Office Information</h1>
                              </div>
                         )}

                         {/* Content Area */}
                         {activeTab === 'Image & Logo' && (
                              <div className=''>
                                  <h1>Image & Logo</h1>
                              </div>
                         )}

                         {/* Content Area */}
                         {activeTab === 'Access & Security' && (
                              <div className=''>
                                  <h1>Access & Security</h1>
                              </div>
                         )}

                         {/* Content Area */}
                         {activeTab === 'Notifications & Reminders' && (
                              <div className=''>
                                  <h1>Notifications & Reminders</h1>
                              </div>
                         )}

                         {/* Content Area */}
                         {activeTab === 'Support & Documentation' && (
                              <div className=''>
                                  <h1>Support & Documentation</h1>
                              </div>
                         )}
                    </div>
               </div>
          </DashboardLayout>
     )
}

export default Setting