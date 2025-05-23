import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'

interface Step3FormProps { }

const Step3Form: React.FC<Step3FormProps> = () => {
     const [markerPosition, setMarkerPosition] = useState({ x: 50, y: 45 })
     const [streetAddress, setStreetAddress] = useState('')
     const [isLoading, setIsLoading] = useState(false)
     const [showSuccessModal, setShowSuccessModal] = useState(false)
     const [isDragging, setIsDragging] = useState(false)
     const mapRef = useRef<HTMLDivElement>(null)

     const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
          if (mapRef.current) {
               const rect = mapRef.current.getBoundingClientRect()
               const x = ((e.clientX - rect.left) / rect.width) * 100
               const y = ((e.clientY - rect.top) / rect.height) * 100
               setMarkerPosition({ x, y })
          }
     }

     const handleMarkerDrag = (e: React.MouseEvent<HTMLDivElement>) => {
          if (isDragging && mapRef.current) {
               const rect = mapRef.current.getBoundingClientRect()
               const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
               const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))
               setMarkerPosition({ x, y })
          }
     }

     const handleSetLocation = async () => {
          if (!streetAddress.trim()) return

          setIsLoading(true)

          setTimeout(() => {
               setIsLoading(false)
               setShowSuccessModal(true)
          }, 2000)
     }

     const handleGoToDashboard = () => {
          setShowSuccessModal(false)
          console.log('Navigate to dashboard')
     }

     return (
          <div className='w-full max-w-[818px] mx-auto text-center'>
               <h3 className="text-[#111111] font-bold text-[32px] leading-[38px] mb-2.5">Set Office Location</h3>
               <p className="text-[#585858] text-base leading-[22px] mb-6 px-2">Provide your office's location details to complete your profile.</p>

               <div className='my-[26px]'>
                    {/* Map */}
                    <div className="mb-[34px]">
                         <Image src='/assets/map.svg' alt='map' width={818} height={400} />
                    </div>

                    {/* Street Address Input */}
                    <div className='w-full relative bg-white border border-[#DEDEDE] rounded-lg py-[18px] px-4 max-w-[398px] mx-auto h-[56px]'>
                         <label className="absolute -top-2 left-2.5 bg-white px-1.5 text-xs leading-[17px] font-medium text-[#111111]">
                              Street Address
                         </label>
                         <div className="flex items-center">
                              <div className="mr-1"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M1.52344 5.18661V11.6733C1.52344 12.9399 2.42344 13.4599 3.51677 12.8333L5.08344 11.9399C5.42344 11.7466 5.9901 11.7266 6.34344 11.9066L9.84344 13.6599C10.1968 13.8333 10.7634 13.8199 11.1034 13.6266L13.9901 11.9733C14.3568 11.7599 14.6634 11.2399 14.6634 10.8133V4.32661C14.6634 3.05994 13.7634 2.53994 12.6701 3.16661L11.1034 4.05994C10.7634 4.25328 10.1968 4.27328 9.84344 4.09328L6.34344 2.34661C5.9901 2.17328 5.42344 2.18661 5.08344 2.37994L2.19677 4.03328C1.82344 4.24661 1.52344 4.76661 1.52344 5.18661Z" stroke="#292D32" strokeLinecap="round" strokeLinejoin="round" />
                                   <path d="M5.71094 2.66663V11.3333" stroke="#292D32" strokeLinecap="round" strokeLinejoin="round" />
                                   <path d="M10.4844 4.41333V13.3333" stroke="#292D32" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              </div>

                              <input
                                   type="text"
                                   value={streetAddress}
                                   onChange={(e) => setStreetAddress(e.target.value)}
                                   placeholder="Placeholder"
                                   className='flex-1 bg-transparent border-0 outline-none text-[#111111] placeholder-[#585858] text-sm leading-[20px] font-normal'
                              />

                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13Z" stroke="#20523C" strokeLinecap="round" strokeLinejoin="round" />
                                   <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#20523C" strokeLinecap="round" strokeLinejoin="round" />
                                   <path d="M8 2.66671V1.33337" stroke="#20523C" strokeLinecap="round" strokeLinejoin="round" />
                                   <path d="M2.66927 8H1.33594" stroke="#20523C" strokeLinecap="round" strokeLinejoin="round" />
                                   <path d="M8 13.3334V14.6667" stroke="#20523C" strokeLinecap="round" strokeLinejoin="round" />
                                   <path d="M13.3359 8H14.6693" stroke="#20523C" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>

                         </div>
                    </div>

                    {/* Set Location Button */}
                    <button
                         onClick={handleSetLocation}
                         disabled={!streetAddress.trim() || isLoading}
                         className="mt-[26px] w-full h-[46px] max-w-[398px] disabled:cursor-not-allowed mx-auto cursor-pointer rounded-md relative text-[#20523C] text-base font-semibold leading-[22px]"
                         style={{
                              background: 'radial-gradient(65.83% 94.77% at 50.34% 116.3%, #C3F63C 0%, #54D10E 100%)',
                              border: '1px solid rgba(255, 255, 255, 0.4)',
                              boxShadow: '0px 4px 4px 0px #FFFFFF52 inset, 0px -4px 4px 0px #FFFFFF52 inset'
                         }}
                    >
                         Set this Location
                    </button>
               </div>

               {/* Dotted Circle Loading Modal */}
               {isLoading && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-75 flex items-center justify-center z-50">
                         <div className="flex flex-col items-center">
                              <div className="relative mb-6 w-16 h-16">
                                   <div className="animate-spin w-full h-full">
                                        {Array.from({ length: 8 }).map((_, i) => {
                                             const angle = (i * 45) * (Math.PI / 180);
                                             const radius = 28;
                                             const x = Math.cos(angle) * radius;
                                             const y = Math.sin(angle) * radius;
                                             return (
                                                  <div
                                                       key={i}
                                                       className={`absolute w-2.5 h-2.5 rounded-full ${i < 3 ? 'bg-[#C0ED81]' : 'bg-[#C0ED81]'
                                                            }`}
                                                       style={{
                                                            left: `${32 + x - 5}px`,
                                                            top: `${32 + y - 5}px`,
                                                       }}
                                                  />
                                             );
                                        })}
                                   </div>
                              </div>
                         </div>
                    </div>
               )}

               {/* Success Modal */}
               {showSuccessModal && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                         <div className="bg-white rounded-lg max-w-[529px] w-full mx-4 text-center">
                              {/* Confetti Animation */}
                              <div className="relative mb-6 w-full">
                                  <Image src='/assets/confeti.svg' alt='confeti' width={1000} height={150} />
                                  <Image src='/assets/thankyou.svg' alt='thankyou' width={144} height={115} className='max-w-[144px] mx-auto -mt-[110px]' />
                              </div>

                              <div className='mt-[37px] px-[65px]'>

                              <h3 className="text-[20px] leading-[24px] font-bold text-[#111111] mb-2">Thank you for Registering.</h3>
                              <p className="text-[#585858] text-[14px] leading-[20px] font-normal max-w-[400px] mx-auto">
                                   Our team will now review your office information. You’ll receive a confirmation email within 24 to 48 hours. Once your account is approved, you’ll be able to access your dashboard and set exchange rates.
                              </p>

                              <button
                                   onClick={handleGoToDashboard}
                                   
                                   className="mt-[16px] mb-[36px] w-full h-[46px] max-w-[179px] mx-auto cursor-pointer rounded-md relative text-[#20523C] text-base font-semibold leading-[22px]"
                                   style={{
                                        background: 'radial-gradient(65.83% 94.77% at 50.34% 116.3%, #C3F63C 0%, #54D10E 100%)',
                                        border: '1px solid rgba(255, 255, 255, 0.4)',
                                        boxShadow: '0px 4px 4px 0px #FFFFFF52 inset, 0px -4px 4px 0px #FFFFFF52 inset'
                                   }}
                                   >
                                   Go to Dashboard
                              </button>
                                   </div>
                         </div>
                    </div>
               )}

               {isDragging && (
                    <div
                         className="fixed inset-0 z-40"
                         onMouseUp={() => setIsDragging(false)}
                         onMouseLeave={() => setIsDragging(false)}
                    />
               )}
          </div>
     )
}

export default Step3Form