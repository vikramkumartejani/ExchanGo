import React, { useState } from 'react'

const Checkbox = () => {
     const [checked, setChecked] = useState(false)

     return (
          <div onClick={() => setChecked(!checked)}>
               {!checked ? (
                    <div className='w-[20px] h-[20px] rounded border border-[#DEDEDE] cursor-pointer'></div>
               ) : (
                    <div className='w-[20px] h-[20px] rounded bg-[#20523C] flex items-center justify-center cursor-pointer'>
                         <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.3307 1.33789L4.9974 8.67122L1.66406 5.33789" stroke="white" strokeWidth="1.33333" strokeLinecap="square" />
                         </svg>
                    </div>
               )}
          </div>
     )
}

export default Checkbox