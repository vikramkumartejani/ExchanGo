import React, { useState, useRef, useEffect } from "react";

export interface CountryCode {
     code: string;
}

interface CountryCodeDropdownProps {
     countryCodes?: CountryCode[];
     defaultValue?: string | null;
     onChange?: (value: CountryCode | null) => void;
}

const defaultCountryCodes: CountryCode[] = [
     { code: "+212" },
     { code: "+94" },
     { code: "+91" },
     { code: "+41" },
];

const CountryCodeDropdown: React.FC<CountryCodeDropdownProps> = ({
     countryCodes = defaultCountryCodes,
     defaultValue = "+212",
     onChange,
}) => {
     const [isOpen, setIsOpen] = useState(false);
     const [selectedCode, setSelectedCode] = useState<CountryCode | null>(
          countryCodes.find((c) => c.code === defaultValue) ?? null
     );

     const containerRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
          function handleClickOutside(event: MouseEvent) {
               if (
                    containerRef.current &&
                    !containerRef.current.contains(event.target as Node)
               ) {
                    setIsOpen(false);
               }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
               document.removeEventListener("mousedown", handleClickOutside);
          };
     }, []);

     function toggleDropdown() {
          setIsOpen((prev) => !prev);
     }

     function handleSelect(code: CountryCode) {
          setSelectedCode(code);
          setIsOpen(false);
          if (onChange) {
               onChange(code);
          }
     }

     return (
          <div className="relative select-none" ref={containerRef}>
               <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    onClick={toggleDropdown}
                    className="w-full cursor-pointer flex items-center justify-between gap-1.5"
               >
                    <span className="text-[#292D32] text-sm leading-[20px] font-normal">
                         {selectedCode?.code || ''}
                    </span>
                    <svg
                         width={20}
                         height={20}
                         viewBox="0 0 20 20"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                         className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                         aria-hidden="true"
                    >
                         <path
                              d="M16.5984 7.45825L11.1651 12.8916C10.5234 13.5333 9.47344 13.5333 8.83177 12.8916L3.39844 7.45825"
                              stroke="#292D32"
                              strokeWidth={1.52072}
                              strokeMiterlimit={10}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                         />
                    </svg>

               </button>

               {isOpen && (
                    <ul
                         tabIndex={-1}
                         role="listbox"
                         aria-activedescendant={ selectedCode ? `country-option-${selectedCode.code}` : undefined}
                         className="absolute z-10 w-full mt-2 max-h-60 bg-white border rounded border-black/20 overflow-auto px-2 min-w-[50px]"
                    >
                         {countryCodes.map((country) => (
                              <li
                                   id={`country-option-${country.code}`}
                                   key={country.code}
                                   role="option"
                                   aria-selected={selectedCode?.code === country.code}
                                   tabIndex={0}
                                   onClick={() => handleSelect(country)}
                                   className='cursor-pointer flex items-center font-medium justify-center text-[#585858] text-sm px-2 py-1.5'
                              >
                                   <span>{country.code}</span>
                              </li>
                         ))}
                    </ul>
               )}
          </div>
     );
};

export default CountryCodeDropdown;
