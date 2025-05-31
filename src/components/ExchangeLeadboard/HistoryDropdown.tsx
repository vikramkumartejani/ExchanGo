import React, { useState, useRef, useEffect } from 'react';

interface DropdownOption {
     value: string;
     label: string;
}

const HistoryDropdown: React.FC = () => {
     const [isOpen, setIsOpen] = useState<boolean>(false);
     const [selectedOption, setSelectedOption] = useState<string>('Last seven days');
     const dropdownRef = useRef<HTMLDivElement>(null);

     const options: DropdownOption[] = [
          { value: 'last-7-days', label: 'Last seven days' },
          { value: 'last-month', label: 'Last one month' },
          { value: 'last-6-months', label: 'Last 6 months' },
          { value: 'last-year', label: 'Last one year' },
          { value: 'all-history', label: 'All history' }
     ];

     const toggleDropdown = () => {
          setIsOpen(!isOpen);
     };

     const handleOptionSelect = (option: DropdownOption) => {
          setSelectedOption(option.label);
          setIsOpen(false);
     };

     // Close dropdown when clicking outside
     useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
               if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
               }
          };

          document.addEventListener('mousedown', handleClickOutside);
          return () => {
               document.removeEventListener('mousedown', handleClickOutside);
          };
     }, []);

     // Close dropdown on Escape key
     useEffect(() => {
          const handleKeyDown = (event: KeyboardEvent) => {
               if (event.key === 'Escape') {
                    setIsOpen(false);
               }
          };

          document.addEventListener('keydown', handleKeyDown);
          return () => {
               document.removeEventListener('keydown', handleKeyDown);
          };
     }, []);

     return (
          <div className='relative w-full lg:w-fit' ref={dropdownRef}>
               <button
                    className='border border-[#20523C] cursor-pointer rounded-lg h-[46px] px-5 flex items-center justify-center gap-2 text-[#20523C] text-[16px] font-medium leading-[22px] w-full'
                    onClick={toggleDropdown}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
               >
                    {selectedOption}
                    <svg
                         width="25"
                         height="25"
                         viewBox="0 0 25 25"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                         className={`transition-transform duration-200 ${isOpen ? '' : '-rotate-180'}`}
                    >
                         <path d="M20.8713 15.2575L14.2612 8.64749C13.4806 7.86685 12.2032 7.86685 11.4225 8.64749L4.8125 15.2575" stroke="#20523C" strokeWidth="1.52072" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
               </button>

               {isOpen && (
                    <div
                         className='py-1 bg-white w-full absolute top-[50px] z-40 rounded-md border border-gray-200'
                         style={{
                              boxShadow: '0px 5px 5px 0px #00000029, 0px 4px 4px 0px #00000014'
                         }}
                         role="listbox"
                    >
                         {options.map((option, index) => (
                              <button
                                   key={option.value}
                                   className={`w-full py-2.5 text-left px-4 text-[#585858] text-[14px] font-normal leading-[20px] hover:bg-gray-50 transition-colors duration-150 ${index < options.length - 1 ? 'border-b border-[#DEDEDE]' : ''
                                        } ${option.label === selectedOption ? 'bg-[#F1F1F1]' : ''
                                        }`}
                                   onClick={() => handleOptionSelect(option)}
                                   role="option"
                                   aria-selected={option.label === selectedOption}
                              >
                                   {option.label}
                              </button>
                         ))}
                    </div>
               )}
          </div>
     );
};

export default HistoryDropdown;