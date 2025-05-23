import React, { useState } from 'react';
import Image from 'next/image';
import Checkbox from '../ui/Checkbox';
import CustomInput, { EmailIcon, LockIcon } from '../ui/CustomInput';

interface FormData {
     email: string;
     password: string;
}

interface Step1FormProps {
     formData: FormData;
     handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
     handleNext: () => void;
     handleSignIn: () => void;
}

const Step1Form: React.FC<Step1FormProps> = ({ handleNext, handleSignIn }) => {
     const [formData, setFormData] = useState<FormData>({
          email: "",
          password: "",
     });

     const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
          setFormData(prev => ({
               ...prev,
               [field]: e.target.value
          }));
     };

     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          console.log('Form Data:', formData);
          alert('Form submitted! Check console for data.');
     };

     const resetForm = (): void => {
          setFormData({
               email: "",
               password: "",
          });
     };

     return (
          <div className='w-full text-center max-w-[398px] mx-auto '>
               <h3 className="text-[#111111] font-bold text-[32px] leading-[38px] mb-2.5">Create an Account</h3>
               <p className="text-[#585858] text-base leading-[22px] mb-6 px-2">Gain visibility, increase foot traffic, and manage your profile easily.</p>

               <CustomInput
                    type="email"
                    label="Email"
                    placeholder="Placeholder"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    leftIcon={<EmailIcon />}
                    className='mb-6'
                    required
               />

               <CustomInput
                    type="password"
                    label="Password"
                    placeholder="Placeholder"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    leftIcon={<LockIcon />}
                    required
               />

               <div className="mt-4 flex items-center gap-2.5 mb-8">
                    <Checkbox />
                    <h3 className="text-[#585858] text-sm leading-[20px] font-normal">
                         I accept ExchanGo24 <span className='text-[#20523C] font-semibold'>Terms & Conditions</span>
                    </h3>
               </div>

               <button
                    onClick={handleNext}
                    className="w-full h-[46px] cursor-pointer rounded-md relative text-[#20523C] text-base font-semibold leading-[22px]"
                    style={{
                         background: 'radial-gradient(65.83% 94.77% at 50.34% 116.3%, #C3F63C 0%, #54D10E 100%)',
                         border: '1px solid rgba(255, 255, 255, 0.4)',
                         boxShadow: '0px 4px 4px 0px #FFFFFF52 inset, 0px -4px 4px 0px #FFFFFF52 inset'
                    }}
               >
                    Create my exchange office account
               </button>

               <p className="mt-4 text-base leading-[22px] text-[#585858]">
                    Already have an account?
                    <button onClick={handleSignIn} className="ml-1.5 text-[#20523C] font-semibold cursor-pointer">
                         Sign in
                    </button>
               </p>

               {/* Divider */}
               <div className='my-6 flex items-center gap-3'>
                    <div className='w-full h-[0.5px] bg-[#DEDEDE]'></div>
                    <h3 className='text-[#585858] text-[14px] leading-[20px] font-normal'>or</h3>
                    <div className='w-full h-[0.5px] bg-[#DEDEDE]'></div>
               </div>

               <button className="mb-2 cursor-pointer border border-[#DEDEDE] rounded-lg h-[50px] w-full flex items-center justify-center gap-2 text-[#111111] text-[16px] leading-[22px] font-normal">
                    <Image src="/assets/gmail.svg" alt="Gmail" width={24} height={24} className="mr-2" />
                    Sign in with Gmail
               </button>

               <button className="border cursor-pointer border-[#DEDEDE] rounded-lg h-[50px] w-full flex items-center justify-center gap-2 text-[#111111] text-[16px] leading-[22px] font-normal">
                    <Image src="/assets/facebook.svg" alt="facebook" width={24} height={24} className="mr-2" />
                    Sign in with Facebook
               </button>
          </div>
     );
};

export default Step1Form;