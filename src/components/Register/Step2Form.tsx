'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import CustomInput, { EmailIcon } from '../ui/CustomInput';
import FileUpload from '../SvgIcons/FileUpload';
import ImageUpload from '../ImageUpload';

interface FormData {
     officeName: string;
     registrationNumber: string;
     licenseNumber: string;
     streetAddress: string;
     city: string;
     province: string;
     phoneNumber: string;
     whatsappNumber: string;
}

interface Step2FormProps {
     formData: FormData;
     handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
     handleNext: () => void;
}

const Step2Form: React.FC<Step2FormProps> = ({ formData, handleInputChange, handleNext }) => {
     const [uploadedFile, setUploadedFile] = useState<File | null>(null);
     const [error, setError] = useState<string>('');

     const handleImageUpload = (file: File, previewUrl: string) => {
          setUploadedFile(file);
          setError('');
          console.log('File uploaded:', file.name);
          console.log('Preview URL:', previewUrl);

     };

     return (
          <div className='w-full text-center max-w-[398px] mx-auto '>
               <h3 className="text-[#111111] font-bold text-[32px] leading-[38px] mb-2.5">Office Information</h3>
               <p className="text-[#585858] text-base leading-[22px] mb-6 px-2">Let us know more about your office by completing the details below</p>

               <div className="">

                    <ImageUpload
                         onImageUpload={handleImageUpload}
                         maxSizeInMB={8}
                         recommendedSize="256x256"
                         acceptedFormats={['.png', '.jpeg', '.jpg', '.gif']}
                    />

                    <CustomInput
                         type="email"
                         label="Office Name"
                         placeholder="Placeholder"
                         value={formData.officeName}
                         // onChange={handleInputChange('officeName')}
                         leftIcon={<EmailIcon />}
                         className='mt-[28px]'
                         required
                    />

                    <CustomInput
                         type="email"
                         label="Commercial Registration Number"
                         placeholder="Placeholder"
                         value={formData.registrationNumber}
                         // onChange={handleInputChange('officeName')}
                         leftIcon={<EmailIcon />}
                         className='mt-6'
                         required
                    />

                    <CustomInput
                         type="email"
                         label="Currency Exchange License Number"
                         placeholder="Placeholder"
                         value={formData.licenseNumber}
                         // onChange={handleInputChange('officeName')}
                         leftIcon={<EmailIcon />}
                         className='mt-6'
                         required
                    />

                    <CustomInput
                         type="email"
                         label="Street Address"
                         placeholder="Placeholder"
                         value={formData.streetAddress}
                         // onChange={handleInputChange('officeName')}
                         leftIcon={<EmailIcon />}
                         className='mt-6'
                         required
                    />

                    <CustomInput
                         type="email"
                         label="City"
                         placeholder="Placeholder"
                         value={formData.streetAddress}
                         leftIcon={<EmailIcon />}
                         className='mt-6  w-fit'
                         required
                    />

                    <CustomInput
                         type="email"
                         label="Province"
                         placeholder="Placeholder"
                         value={formData.streetAddress}
                         leftIcon={<EmailIcon />}
                         className='mt-6 w-fit'
                         required
                    />



                    {/* <div className="flex items-center">
                         <input type="checkbox" id="whatsapp" className="mr-2" />
                         <label htmlFor="whatsapp" className="text-sm text-gray-600">
                              This is also my WhatsApp number
                         </label>
                         <button className="ml-auto text-blue-500 text-sm">+ Add new number</button>
                    </div> */}

                    {/* <div className="flex items-center space-x-2">
                         <select className="border border-gray-300 rounded px-2 py-2">
                              <option>+121</option>
                         </select>
                         <input
                              type="text"
                              name="whatsappNumber"
                              value={formData.whatsappNumber}
                              onChange={handleInputChange}
                              placeholder="Type your office number"
                              className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                         />
                    </div> */}
                    <button
                         onClick={handleNext}
                         className="mt-6 w-full h-[46px] cursor-pointer rounded-md relative text-[#20523C] text-base font-semibold leading-[22px]"
                         style={{
                              background: 'radial-gradient(65.83% 94.77% at 50.34% 116.3%, #C3F63C 0%, #54D10E 100%)',
                              border: '1px solid rgba(255, 255, 255, 0.4)',
                              boxShadow: '0px 4px 4px 0px #FFFFFF52 inset, 0px -4px 4px 0px #FFFFFF52 inset'
                         }}
                    >
                         Next
                    </button>
               </div>
          </div>
     );
};

export default Step2Form;