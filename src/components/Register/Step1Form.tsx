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

     const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
     const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);

     const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
          setFormData(prev => ({
               ...prev,
               [field]: e.target.value
          }));

          if (fieldErrors[field]) {
               setFieldErrors(prev => ({
                    ...prev,
                    [field]: ''
               }));
          }
     };

     const isValidEmail = (email: string): boolean => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
     };

     const isValidPassword = (password: string): boolean => {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
          return passwordRegex.test(password);
     };

     const validateForm = (): boolean => {
          const errors: { [key: string]: string } = {};

          if (!formData.email.trim()) {
               errors.email = 'Email is required';
          } else if (!isValidEmail(formData.email)) {
               errors.email = 'Please enter a valid email address';
          }

          if (!formData.password.trim()) {
               errors.password = 'Password is required';
          } else if (formData.password.length < 8) {
               errors.password = 'Password must be at least 8 characters long';
          } else if (!isValidPassword(formData.password)) {
               errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
          }

          if (!isTermsAccepted) {
               errors.terms = 'You must accept the Terms & Conditions to continue';
          }

          setFieldErrors(errors);
          return Object.keys(errors).length === 0;
     };

     const handleNextClick = () => {
          if (validateForm()) {
               handleNext();
          }
     };

     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (validateForm()) {
               console.log('Form Data:', formData);
               alert('Form submitted! Check console for data.');
          }
     };

     const resetForm = (): void => {
          setFormData({
               email: "",
               password: "",
          });
          setFieldErrors({});
          setIsTermsAccepted(false);
     };

     const handleCheckboxChange = (checked: boolean) => {
          setIsTermsAccepted(checked);
          if (checked && fieldErrors.terms) {
               setFieldErrors(prev => ({
                    ...prev,
                    terms: ''
               }));
          }
     };

     return (
          <div className='w-full text-center max-w-[398px] mx-auto '>
               <h3 className="text-[#111111] font-bold text-[32px] leading-[38px] mb-2.5">Create an Account</h3>
               <p className="text-[#585858] text-base leading-[22px] mb-6 px-2">Gain visibility, increase foot traffic, and manage your profile easily.</p>

               <div className='mb-6'>
                    <CustomInput
                         type="email"
                         name="email"
                         label="Email"
                         placeholder="Enter your email"
                         value={formData.email}
                         onChange={handleInputChange('email')}
                         leftIcon={<EmailIcon />}
                         required
                    />
                    {fieldErrors.email && (
                         <div className="mt-1 text-red-500 text-sm text-left">
                              {fieldErrors.email}
                         </div>
                    )}
               </div>

               <div className='mb-4'>
                    <CustomInput
                         type="password"
                         name="password"
                         label="Password"
                         placeholder="Enter your password"
                         value={formData.password}
                         onChange={handleInputChange('password')}
                         leftIcon={<LockIcon />}
                         required
                    />
                    {fieldErrors.password && (
                         <div className="mt-1 text-red-500 text-sm text-left">
                              {fieldErrors.password}
                         </div>
                    )}
                    {!fieldErrors.password && formData.password && (
                         <div className="mt-1 text-gray-500 text-xs text-left">
                              Password must be at least 8 characters with uppercase, lowercase, and number
                         </div>
                    )}
               </div>

               <div className="mt-4 flex items-start gap-2.5 mb-2">
                    <Checkbox
                         checked={isTermsAccepted}
                         onChange={handleCheckboxChange}
                    />
                    <h3 className="text-[#585858] text-sm leading-[20px] font-normal text-left">
                         I accept ExchanGo24 <span className='text-[#20523C] font-semibold'>Terms & Conditions</span>
                    </h3>
               </div>
               {fieldErrors.terms && (
                    <div className="mb-4 text-red-500 text-sm text-left">
                         {fieldErrors.terms}
                    </div>
               )}

               <button
                    onClick={handleNextClick}
                    className="mt-6 w-full h-[46px] cursor-pointer rounded-md relative text-[#20523C] text-base font-semibold leading-[22px]"
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