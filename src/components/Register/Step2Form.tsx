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

     // Individual field errors
     const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

     // Validation function
     const validateForm = (): boolean => {
          const errors: {[key: string]: string} = {};
          
          if (!formData.officeName.trim()) {
               errors.officeName = 'Office name is required';
          }
          if (!formData.registrationNumber.trim()) {
               errors.registrationNumber = 'Commercial registration number is required';
          }
          if (!formData.licenseNumber.trim()) {
               errors.licenseNumber = 'Currency exchange license number is required';
          }
          if (!formData.streetAddress.trim()) {
               errors.streetAddress = 'Street address is required';
          }
          if (!formData.city.trim()) {
               errors.city = 'City is required';
          }
          if (!formData.province.trim()) {
               errors.province = 'Province is required';
          }
          
          setFieldErrors(errors);
          return Object.keys(errors).length === 0;
     };

     const handleNextClick = () => {
          if (validateForm()) {
               handleNext();
          }
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
                    <div className='mt-[28px]'>
                         <CustomInput
                              type="text"
                              name="officeName"
                              label="Office Name"
                              placeholder="Enter office name"
                              value={formData.officeName}
                              onChange={handleInputChange}
                              required
                         />
                         {fieldErrors.officeName && (
                              <div className="mt-1 text-red-500 text-sm text-left">
                                   {fieldErrors.officeName}
                              </div>
                         )}
                    </div>
                    
                    <div className='mt-6'>
                         <CustomInput
                              type="text"
                              name="registrationNumber"
                              label="Commercial Registration Number"
                              placeholder="Enter registration number"
                              value={formData.registrationNumber}
                              onChange={handleInputChange}
                              required
                         />
                         {fieldErrors.registrationNumber && (
                              <div className="mt-1 text-red-500 text-sm text-left">
                                   {fieldErrors.registrationNumber}
                              </div>
                         )}
                    </div>
                    
                    <div className='mt-6'>
                         <CustomInput
                              type="text"
                              name="licenseNumber"
                              label="Currency Exchange License Number"
                              placeholder="Enter license number"
                              value={formData.licenseNumber}
                              onChange={handleInputChange}
                              required
                         />
                         {fieldErrors.licenseNumber && (
                              <div className="mt-1 text-red-500 text-sm text-left">
                                   {fieldErrors.licenseNumber}
                              </div>
                         )}
                    </div>
                    
                    <div className='mt-6'>
                         <CustomInput
                              type="text"
                              name="streetAddress"
                              label="Street Address"
                              placeholder="Enter street address"
                              value={formData.streetAddress}
                              onChange={handleInputChange}
                              required
                         />
                         {fieldErrors.streetAddress && (
                              <div className="mt-1 text-red-500 text-sm text-left">
                                   {fieldErrors.streetAddress}
                              </div>
                         )}
                    </div>
                    
                    <div className='mt-6'>
                         <CustomInput
                              type="text"
                              name="city"
                              label="City"
                              placeholder="Enter city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                         />
                         {fieldErrors.city && (
                              <div className="mt-1 text-red-500 text-sm text-left">
                                   {fieldErrors.city}
                              </div>
                         )}
                    </div>
                    
                    <div className='mt-6'>
                         <CustomInput
                              type="text"
                              name="province"
                              label="Province"
                              placeholder="Enter province"
                              value={formData.province}
                              onChange={handleInputChange}
                              required
                         />
                         {fieldErrors.province && (
                              <div className="mt-1 text-red-500 text-sm text-left">
                                   {fieldErrors.province}
                              </div>
                         )}
                    </div>
                    <button
                         onClick={handleNextClick}
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