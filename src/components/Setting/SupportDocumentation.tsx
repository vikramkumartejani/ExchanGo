import React, { useState, useEffect } from 'react';
import PlusIcon from '../SvgIcons/PlusIcon';
import ToggleButton from '../ui/ToggleButton';
import DeleteIcon from '../SvgIcons/DeleteIcon';

interface FAQItem {
     id: number;
     question: string;
     answer: string;
     isLocked: boolean;
}

const STORAGE_KEY = 'support_faqs';

// Add FAQ Button
const AddFaqButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
     <>
          <button
               onClick={onClick}
               className='border border-[#20523C] rounded-md h-[46px] w-[169px] text-[#20523C] text-[16px] font-medium leading-[22px] hidden sm:flex items-center gap-1 justify-center cursor-pointer'
          >
               <PlusIcon /> Add New Faq
          </button>
          <button
               onClick={onClick}
               className='text-nowrap text-[#20523C] text-[14px] font-medium leading-[17px] sm:hidden flex items-center gap-0.5 justify-center cursor-pointer'
          >
               <PlusIcon /> Add New
          </button>
     </>
);

// Delete FAQ Button
const DeleteFaqButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
     <button onClick={onClick} className='cursor-pointer'>
          <DeleteIcon />
     </button>
);

// Toggle Button Wrapper
const FaqToggleButton: React.FC<{
     checked: boolean;
     onChange: (checked: boolean) => void;
}> = ({ checked, onChange }) => (
     <ToggleButton defaultChecked={checked} size='md' onChange={onChange} />
);

// Save Button
const SaveFaqsButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
     <button
          onClick={onClick}
          className='w-full sm:w-[145px] h-[46px] cursor-pointer rounded-md relative text-[#20523C] text-base font-semibold leading-[22px]'
          style={{
               background: 'radial-gradient(65.83% 94.77% at 50.34% 116.3%, #C3F63C 0%, #54D10E 100%)',
               border: '1px solid rgba(255, 255, 255, 0.4)',
               boxShadow: '0px 4px 4px 0px #FFFFFF52 inset, 0px -4px 4px 0px #FFFFFF52 inset',
          }}
     >
          Save Update
     </button>
);

const SupportDocumentation = () => {
     const [faqs, setFaqs] = useState<FAQItem[]>([]);

     useEffect(() => {
          const savedFaqs = localStorage.getItem(STORAGE_KEY);
          if (savedFaqs) {
               setFaqs(JSON.parse(savedFaqs));
          } else {
               setFaqs([{ id: Date.now(), question: '', answer: '', isLocked: true }]);
          }
     }, []);

     const handleToggle = (id: number, checked: boolean) => {
          setFaqs(prev =>
               prev.map(faq => (faq.id === id ? { ...faq, isLocked: checked } : faq))
          );
     };

     const handleInputChange = (
          id: number,
          field: 'question' | 'answer',
          value: string
     ) => {
          setFaqs(prev =>
               prev.map(faq => (faq.id === id ? { ...faq, [field]: value } : faq))
          );
     };

     const handleAddFaq = () => {
          const newFaq: FAQItem = {
               id: Date.now(),
               question: '',
               answer: '',
               isLocked: false,
          };
          setFaqs(prev => [...prev, newFaq]);
     };

     const handleDeleteFaq = (id: number) => {
          setFaqs(prev => prev.filter(faq => faq.id !== id));
     };

     const handleSaveAll = () => {
          const lockedFaqs = faqs.map(faq => ({
               ...faq,
               isLocked: true,
          }));
          const faqsToSave = lockedFaqs.filter(faq => faq.isLocked);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(faqsToSave));
          setFaqs(lockedFaqs);
     };

     return (
          <>
               <div className='flex items-start gap-6 justify-between w-full'>
                    <div className='w-full'>
                         <div className='flex items-center justify-between gap-2 w-full'>
                              <h2 className='text-[16px] font-semibold leading-[24px]'>FAQ</h2>
                              <div className='sm:hidden block'>
                                   <AddFaqButton onClick={handleAddFaq} />
                              </div>
                         </div>
                         <p className='text-[#424242] text-[14px] leading-[21px] font-normal sm:max-w-[295px] mt-1.5 sm:mt-1'>
                              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.
                         </p>
                    </div>
                    <div className='sm:block hidden'>
                         <AddFaqButton onClick={handleAddFaq} />
                    </div>
               </div>

               {faqs.map((faq, index) => (
                    <div key={faq.id} className='max-w-[679px] flex sm:flex-row flex-col items-start gap-6 mt-4 sm:mt-6'>
                         <div className='w-full sm:hidden flex items-center justify-between gap-4'>
                              <h2 className='text-[14px] font-semibold leading-[18px]'>Question {index + 1}</h2>
                              <div className='flex items-center gap-3'>
                                   <DeleteFaqButton onClick={() => handleDeleteFaq(faq.id)} />
                                   <FaqToggleButton
                                        checked={faq.isLocked}
                                        onChange={checked => handleToggle(faq.id, checked)}
                                   />
                              </div>
                         </div>
                         <div className='max-w-[580px] w-full'>
                              <div className='w-full relative bg-white border border-[#DEDEDE] rounded-lg px-4 h-[56px]'>
                                   <label className='absolute -top-2 left-2.5 bg-white px-1.5 text-xs leading-[17px] font-medium text-[#111111] flex items-center gap-1'>
                                        Question <span className='sm:block hidden'>{index + 1}</span>
                                   </label>
                                   <div className='flex items-center'>
                                        <input
                                             type='text'
                                             placeholder='Placeholder'
                                             value={faq.question}
                                             readOnly={faq.isLocked}
                                             onChange={e => handleInputChange(faq.id, 'question', e.target.value)}
                                             className='flex-1 bg-transparent py-[18px] border-0 outline-none text-[#111111] placeholder-[#585858] text-sm leading-[20px] font-normal'
                                        />
                                   </div>
                              </div>

                              <div className='mt-4 w-full relative bg-white border border-[#DEDEDE] rounded-lg'>
                                   <label className='absolute -top-2 left-2.5 bg-white px-1.5 text-xs leading-[17px] font-medium text-[#111111]'>
                                        Answer
                                   </label>
                                   <div className='flex items-center'>
                                        {faq.isLocked ? (
                                             <h3 className='py-[14px] sm:py-[18px] px-4 text-[14px] leading-[20px] font-normal text-[#111111]'>
                                                  {faq.answer || 'No answer provided.'}
                                             </h3>
                                        ) : (
                                             <textarea
                                                  placeholder='Placeholder'
                                                  value={faq.answer}
                                                  readOnly={faq.isLocked}
                                                  onChange={e => handleInputChange(faq.id, 'answer', e.target.value)}
                                                  className='px-4 flex-1 max-h-fit bg-transparent py-[14px] sm:py-[18px] min-h-[96px] border-0 outline-none text-[#111111] placeholder-[#585858] text-sm leading-[20px] font-normal'
                                             />
                                        )}
                                   </div>
                              </div>
                         </div>

                         <div className='mt-4 hidden sm:flex items-center gap-4'>
                              <FaqToggleButton
                                   checked={faq.isLocked}
                                   onChange={checked => handleToggle(faq.id, checked)}
                              />
                              <DeleteFaqButton onClick={() => handleDeleteFaq(faq.id)} />
                         </div>
                    </div>
               ))}

               <div className='bg-[#DEDEDE] w-full h-[1px] mt-8 sm:block hidden'></div>

               <div className='flex items-end justify-end w-full mt-10 sm:mt-4 pb-10'>
                    <SaveFaqsButton onClick={handleSaveAll} />
               </div>
          </>
     );
};

export default SupportDocumentation;
