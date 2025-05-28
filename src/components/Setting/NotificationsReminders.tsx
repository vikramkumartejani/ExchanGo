import React from 'react'
import ToggleButton from '../ui/ToggleButton'

const NotificationsReminders = () => {
     return (
          <div>
               <div className='flex items-start gap-6 justify-between mb-8'>
                    <div>
                         <h2 className='text-[16px] font-semibold leading-[24px]'>Update Rate</h2>
                         <p className='text-[#424242] text-[14px] leading-[21px] font-normal max-w-[295px] mt-1'>Notify me (via WhatsApp or Email) if exchange rates haven’t been updated for 24h</p>
                    </div>
                    <ToggleButton
                         defaultChecked={false}
                         size='md'
                         onChange={(checked) => console.log('Toggle changed:', checked)}
                    />
               </div>
               <div className='bg-[#DEDEDE] w-full h-[1px] mb-6'></div>
               <div className='flex items-end justify-end w-full'>
                    <button
                         className="w-[146px] h-[46px] cursor-pointer rounded-md relative text-[#20523C] text-base font-semibold leading-[22px]"
                         style={{
                              background: 'radial-gradient(65.83% 94.77% at 50.34% 116.3%, #C3F63C 0%, #54D10E 100%)',
                              border: '1px solid rgba(255, 255, 255, 0.4)',
                              boxShadow: '0px 4px 4px 0px #FFFFFF52 inset, 0px -4px 4px 0px #FFFFFF52 inset'
                         }}
                    >
                         Save Update
                    </button>
               </div>
          </div>
     )
}

export default NotificationsReminders