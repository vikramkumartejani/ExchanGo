import React, { useState } from 'react';

interface PasswordData {
     oldPassword: string;
     newPassword: string;
     confirmPassword: string;
}

const AccessSecurity = () => {
     const [passwordData, setPasswordData] = useState<PasswordData>({
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
     });

     const [showPasswords, setShowPasswords] = useState({
          old: false,
          new: false,
          confirm: false
     });

     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [showSuccessModal, setShowSuccessModal] = useState(false);
     const [deleteReason, setDeleteReason] = useState('');
     const [errors, setErrors] = useState<Partial<PasswordData>>({});

     const validatePasswords = (): boolean => {
          const newErrors: Partial<PasswordData> = {};

          if (!passwordData.oldPassword) {
               newErrors.oldPassword = 'Old password is required';
          }

          if (!passwordData.newPassword) {
               newErrors.newPassword = 'New password is required';
          } else if (passwordData.newPassword.length < 8) {
               newErrors.newPassword = 'Password must be at least 8 characters';
          }

          if (!passwordData.confirmPassword) {
               newErrors.confirmPassword = 'Please confirm your password';
          } else if (passwordData.newPassword !== passwordData.confirmPassword) {
               newErrors.confirmPassword = 'Passwords do not match';
          }

          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
     };

     const handlePasswordChange = (field: keyof PasswordData, value: string) => {
          setPasswordData(prev => ({
               ...prev,
               [field]: value
          }));

          // Clear error when user starts typing
          if (errors[field]) {
               setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[field];
                    return newErrors;
               });
          }
     };

     const togglePasswordVisibility = (field: 'old' | 'new' | 'confirm') => {
          setShowPasswords(prev => ({
               ...prev,
               [field]: !prev[field]
          }));
     };

     const handleSavePassword = () => {
          if (validatePasswords()) {
               // Simulate API call
               setTimeout(() => {
                    setShowSuccessModal(true);
                    setPasswordData({
                         oldPassword: '',
                         newPassword: '',
                         confirmPassword: ''
                    });
               }, 500);
          }
     };

     const handleDeleteAccount = () => {
          // Simulate account deletion
          console.log('Account deleted with reason:', deleteReason);
          setShowDeleteModal(false);
          // Redirect or show confirmation
     };

     // Delete Modal Component
     const DeleteModal: React.FC = () => (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
               <div className='bg-white rounded-2xl p-6 w-full max-w-md mx-auto'>
                    <h2 className='text-xl font-semibold text-[#111111] mb-2'>Delete Account ?</h2>
                    <p className='text-[#424242] text-sm mb-1'>Are you sure you want to Delete your account ?</p>
                    <p className='text-red-600 text-sm font-medium mb-6'>
                         <span className='font-semibold'>Warning</span> this is permanent and cannot be undone!
                    </p>

                    <div className='mb-6'>
                         <label className='block text-sm font-medium text-[#111111] mb-2'>
                              Why do you leave
                         </label>
                         <select
                              value={deleteReason}
                              onChange={(e) => setDeleteReason(e.target.value)}
                              className='w-full border border-[#DEDEDE] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#54D10E]'
                         >
                              <option value=''>Choose an option</option>
                              <option value='not-useful'>Not useful anymore</option>
                              <option value='found-alternative'>Found better alternative</option>
                              <option value='privacy-concerns'>Privacy concerns</option>
                              <option value='too-expensive'>Too expensive</option>
                              <option value='technical-issues'>Technical issues</option>
                              <option value='other'>Other</option>
                         </select>
                    </div>

                    <div className='flex gap-3'>
                         <button
                              onClick={() => setShowDeleteModal(false)}
                              className='flex-1 bg-[#F5F5F5] text-[#424242] py-2.5 rounded-lg font-medium hover:bg-[#E0E0E0] transition-colors'
                         >
                              Cancel
                         </button>
                         <button
                              onClick={handleDeleteAccount}
                              className='flex-1 bg-[#D03739] text-white py-2.5 rounded-lg font-medium hover:bg-[#B02426] transition-colors'
                         >
                              Delete
                         </button>
                    </div>
               </div>
          </div>
     );

     // Success Modal Component
     const SuccessModal: React.FC = () => (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
               <div className='bg-white rounded-2xl p-8 w-full max-w-md mx-auto text-center relative overflow-hidden'>
                    <div className='relative z-10'>
                         <div className='w-20 h-20 bg-[#20523C] rounded-full flex items-center justify-center mx-auto mb-6'>
                              <svg width="40" height="40" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M4.16406 9.98002L8.04838 13.8643L15.8307 6.0957" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                         </div>

                         <h2 className='text-xl font-semibold text-[#111111] mb-2'>Password Update !</h2>
                         <p className='text-[#424242] text-sm mb-8'>Your password has been changed successfully</p>

                         <button
                              onClick={() => setShowSuccessModal(false)}
                              className='w-full py-3 rounded-lg font-medium text-white transition-colors'
                              style={{
                                   background: 'radial-gradient(65.83% 94.77% at 50.34% 116.3%, #C3F63C 0%, #54D10E 100%)',
                                   border: '1px solid rgba(255, 255, 255, 0.4)',
                                   boxShadow: '0px 4px 4px 0px #FFFFFF52 inset, 0px -4px 4px 0px #FFFFFF52 inset'
                              }}
                         >
                              Back to Dashboard
                         </button>
                    </div>
               </div>
          </div>
     );

     return (
          <div>
               <div className='flex items-start gap-4 justify-between mb-[30px]'>
                    <div>
                         <h3 className='text-[16px] leading-[24px] font-semibold mb-1'>Email</h3>
                         <p className='w-[291px] text-[#424242] text-[14px] leading-[21px] font-normal'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>
                    </div>
                    <div className='max-w-[388px] w-full relative bg-white border border-[#DEDEDE] rounded-lg px-4 h-[56px] opacity-60 select-none'>
                         <label className='absolute -top-2 left-2.5 bg-white px-1.5 text-xs leading-[17px] font-medium text-[#111111] flex items-center gap-1'>Your Email</label>
                         <div className='flex items-center'>
                              <input type='email' readOnly defaultValue="AtlasExchange@gmail.com"
                                   className='flex-1 bg-transparent py-[18px] border-0 outline-none text-[#111111] placeholder-[#585858] text-sm leading-[20px] font-normal'
                              />
                              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M4.16406 9.98002L8.04838 13.8643L15.8307 6.0957" stroke="#2DB245" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                         </div>
                    </div>
               </div>

               <div className='w-full bg-[#DEDEDE] h-[1px] mb-6'></div>

               <div className='flex items-start gap-4 justify-between'>
                    <div>
                         <h3 className='text-[16px] leading-[24px] font-semibold mb-1'>Change your Password </h3>
                         <p className='w-[291px] text-[#424242] text-[14px] leading-[21px] font-normal'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.</p>
                    </div>
                    <div className='max-w-[388px] w-full space-y-8'>
                         {/* Old Password */}
                         <div className='w-full space-y-1'>
                              <div className='w-full relative bg-white border rounded-lg px-4 h-[56px] border-[#DEDEDE]'>
                                   <label className='absolute -top-2 left-2.5 bg-white px-1.5 text-xs leading-[17px] font-medium text-[#111111] flex items-center gap-1'>Old Password</label>
                                   <div className='flex items-center'>
                                        <input
                                             type={showPasswords.old ? 'text' : 'password'}
                                             placeholder='Placeholder'
                                             value={passwordData.oldPassword}
                                             onChange={(e) => handlePasswordChange('oldPassword', e.target.value)}
                                             className='flex-1 bg-transparent py-[18px] border-0 outline-none text-[#111111] placeholder-[#585858] text-sm leading-[20px] font-normal'
                                        />
                                   </div>
                              </div>
                              {errors.oldPassword && (
                                   <div className='flex items-center gap-1 text-red-500 text-xs'>
                                        <span>{errors.oldPassword}</span>
                                   </div>
                              )}
                         </div>

                         {/* New Password */}
                         <div className='w-full space-y-1'>
                              <div className='w-full relative bg-white border rounded-lg px-4 h-[56px] border-[#DEDEDE]'>
                                   <label className='absolute -top-2 left-2.5 bg-white px-1.5 text-xs leading-[17px] font-medium text-[#111111] flex items-center gap-1'>New Password</label>
                                   <div className='flex items-center'>
                                        <input
                                             type={showPasswords.new ? 'text' : 'password'}
                                             placeholder='Placeholder'
                                             value={passwordData.newPassword}
                                             onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                                             className='flex-1 bg-transparent py-[18px] border-0 outline-none text-[#111111] placeholder-[#585858] text-sm leading-[20px] font-normal'
                                        />
                                        <button
                                             type="button"
                                             onClick={() => togglePasswordVisibility('new')}
                                             className='ml-2'
                                        >
                                             {showPasswords.new ? (
                                                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M12.1083 8.6543L7.89167 12.871" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                       <path d="M14.8417 4.92096L5.15833 14.6043" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                       <path d="M6.94252 6.32096C3.50002 8.17096 1.66669 10.7626 1.66669 10.7626C1.66669 10.7626 4.16669 16.0959 10 16.0959C11.325 16.0959 12.55 15.721 13.625 15.096" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                       <path d="M7.01562 13.246C8.34896 13.246 9.99896 11.9126 9.99896 10.2626" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             ) : (
                                                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M12.9823 10.2626C12.9823 11.9126 11.649 13.246 9.99896 13.246C8.34896 13.246 7.01562 11.9126 7.01562 10.2626C7.01562 8.61263 8.34896 7.2793 9.99896 7.2793C11.649 7.2793 12.9823 8.61263 12.9823 10.2626Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                       <path d="M9.99792 17.154C12.9396 17.154 15.6813 15.4206 17.5896 12.4206C18.3396 11.2456 18.3396 9.27064 17.5896 8.09564C15.6813 5.09564 12.9396 3.3623 9.99792 3.3623C7.05625 3.3623 4.31458 5.09564 2.40625 8.09564C1.65625 9.27064 1.65625 11.2456 2.40625 12.4206C4.31458 15.4206 7.05625 17.154 9.99792 17.154Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                  </svg>
                                             )}
                                        </button>
                                   </div>
                              </div>
                              {errors.newPassword && (
                                   <div className='flex items-center gap-1 text-red-500 text-xs'>
                                        <span>{errors.newPassword}</span>
                                   </div>
                              )}
                         </div>

                         {/* Confirm Password */}
                         <div className='w-full space-y-1'>
                              <div className='w-full relative bg-white border rounded-lg px-4 h-[56px] border-[#DEDEDE] '>
                                   <label className='absolute -top-2 left-2.5 bg-white px-1.5 text-xs leading-[17px] font-medium text-[#111111] flex items-center gap-1'>Re-type New Password</label>
                                   <div className='flex items-center'>
                                        <input
                                             type={showPasswords.confirm ? 'text' : 'password'}
                                             placeholder='Placeholder'
                                             value={passwordData.confirmPassword}
                                             onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                                             className='flex-1 bg-transparent py-[18px] border-0 outline-none text-[#111111] placeholder-[#585858] text-sm leading-[20px] font-normal'
                                        />

                                   </div>
                              </div>
                              {errors.confirmPassword && (
                                   <div className='flex items-center gap-1 text-red-500 text-xs'>
                                        <span>{errors.confirmPassword}</span>
                                   </div>
                              )}
                         </div>
                    </div>
               </div>

               <div className='w-full bg-[#DEDEDE] h-[1px] mt-8 mb-6'></div>

               <div className='flex items-start gap-4 justify-between mb-[30px]'>
                    <div>
                         <h3 className='text-[16px] leading-[24px] font-semibold mb-1'>Delete Account</h3>
                         <p className='w-[291px] text-[#424242] text-[14px] leading-[21px] font-normal'>Deleting your account will remove all of your information from our database. This cannot be Undone</p>
                    </div>
                    <button
                         onClick={() => setShowDeleteModal(true)}
                         className='bg-[#D03739] border border-[#FFFFFF66] h-[46px] w-[168px] rounded-md text-[16px] leading-[22px] font-semibold text-white hover:bg-[#B02426] transition-colors'
                    >
                         Delete Account
                    </button>
               </div>

               <div className='w-full bg-[#DEDEDE] h-[1px] mt-8 mb-6'></div>

               <div className='w-full flex items-end justify-end'>
                    <button
                         onClick={handleSavePassword}
                         className="w-full sm:w-[146px] h-[46px] cursor-pointer rounded-md relative text-[#20523C] text-base font-semibold leading-[22px] hover:opacity-90 transition-opacity"
                         style={{
                              background: 'radial-gradient(65.83% 94.77% at 50.34% 116.3%, #C3F63C 0%, #54D10E 100%)',
                              border: '1px solid rgba(255, 255, 255, 0.4)',
                              boxShadow: '0px 4px 4px 0px #FFFFFF52 inset, 0px -4px 4px 0px #FFFFFF52 inset'
                         }}
                    >
                         Save Update
                    </button>
               </div>

               {/* Modals */}
               {showDeleteModal && <DeleteModal />}
               {showSuccessModal && <SuccessModal />}
          </div>
     );
};

export default AccessSecurity;