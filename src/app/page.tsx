'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Register from '../components/Register/Register';

const Home: React.FC = () => {
     const router = useRouter();
     const [step, setStep] = useState(1);
     const [formData, setFormData] = useState({
          email: '',
          password: '',
          officeName: '',
          registrationNumber: '',
          licenseNumber: '',
          streetAddress: '',
          city: '',
          province: '',
          phoneNumber: '',
          whatsappNumber: '',
     });

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
     };

     const handleNext = () => {
          if (step === 1) {
               setStep(2);
          } else if (step === 2) {
               setStep(3);
               console.log('Form Data:', formData);
          }
     };

     const handleSignIn = () => {
          router.push('/login');
     };

     return (
          <Register
               step={step}
               formData={formData}
               handleInputChange={handleInputChange}
               handleNext={handleNext}
               handleSignIn={handleSignIn}
          />
     );
};

export default Home;