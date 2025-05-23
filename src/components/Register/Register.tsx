import React from 'react';
import Header from '../Header';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';

interface FormData {
     email: string;
     password: string;
     officeName: string;
     registrationNumber: string;
     licenseNumber: string;
     streetAddress: string;
     city: string;
     province: string;
     phoneNumber: string;
     whatsappNumber: string;
}

interface RegisterProps {
     step: number;
     formData: FormData;
     handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
     handleNext: () => void;
     handleSignIn: () => void;
}

const Register: React.FC<RegisterProps> = ({
     step,
     formData,
     handleInputChange,
     handleNext,
     handleSignIn,
}) => {
     return (
          <div className="flex flex-col">
               <Header step={step} handleSignIn={handleSignIn} />
               <div className="my-[80px] flex-grow flex items-center flex-col justify-center">
                    {step === 1 && (
                         <Step1Form
                              formData={formData}
                              handleInputChange={handleInputChange}
                              handleNext={handleNext}
                              handleSignIn={handleSignIn}
                         />
                    )}
                    {step === 2 && (
                         <Step2Form
                              formData={formData}
                              handleInputChange={handleInputChange}
                              handleNext={handleNext}
                         />
                    )}
                    {step === 3 && (
                         <Step3Form
                              // formData={formData}
                              // handleInputChange={handleInputChange}
                              // handleNext={handleNext}
                         />
                    )}
               </div>
          </div>
     );
};

export default Register;