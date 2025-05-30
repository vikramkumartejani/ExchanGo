import React, { useState, useRef } from 'react'
import ImageUpload from '../ImageUpload'
import Image from 'next/image';

interface UploadedImage {
     id: string;
     file: File;
     previewUrl: string;
     name: string;
}

const ImageLogo = () => {
     const [uploadedFile, setUploadedFile] = useState<File | null>(null);
     const [officeImages, setOfficeImages] = useState<UploadedImage[]>([]);
     const [isDragOver, setIsDragOver] = useState(false);
     const fileInputRef = useRef<HTMLInputElement>(null);

     const handleImageUpload = (file: File, previewUrl: string) => {
          setUploadedFile(file);
          console.log('File uploaded:', file.name);
          console.log('Preview URL:', previewUrl);
     };

     const handleOfficeImageUpload = (files: FileList | File[]) => {
          const fileArray = Array.from(files);
          const validFiles = fileArray.filter(file => {
               const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
               const maxSize = 8 * 1024 * 1024; // 8MB
               return validTypes.includes(file.type) && file.size <= maxSize;
          });

          const newImages: UploadedImage[] = validFiles.map(file => ({
               id: Date.now() + Math.random().toString(36),
               file,
               previewUrl: URL.createObjectURL(file),
               name: file.name
          }));

          setOfficeImages(prev => [...prev, ...newImages]);
     };

     const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
          const files = event.target.files;
          if (files && files.length > 0) {
               handleOfficeImageUpload(files);
          }
          // Reset input value to allow same file selection
          if (event.target) {
               event.target.value = '';
          }
     };

     const handleDragOver = (event: React.DragEvent) => {
          event.preventDefault();
          setIsDragOver(true);
     };

     const handleDragLeave = (event: React.DragEvent) => {
          event.preventDefault();
          setIsDragOver(false);
     };

     const handleDrop = (event: React.DragEvent) => {
          event.preventDefault();
          setIsDragOver(false);

          const files = event.dataTransfer.files;
          if (files && files.length > 0) {
               handleOfficeImageUpload(files);
          }
     };

     const handleUploadClick = () => {
          fileInputRef.current?.click();
     };

     const removeImage = (imageId: string) => {
          setOfficeImages(prev => {
               const imageToRemove = prev.find(img => img.id === imageId);
               if (imageToRemove) {
                    URL.revokeObjectURL(imageToRemove.previewUrl);
               }
               return prev.filter(img => img.id !== imageId);
          });
     };

     // Clean up object URLs when component unmounts
     React.useEffect(() => {
          return () => {
               officeImages.forEach(image => {
                    URL.revokeObjectURL(image.previewUrl);
               });
          };
     }, []);

     return (
          <>
               <div className='flex items-start sm:flex-row flex-col gap-4 justify-between'>
                    <div>
                         <h2 className='text-[16px] font-semibold leading-[24px] mb-1'>Update Logo</h2>
                         <p className='sm:max-w-[291px] text-[#424242] text-[14px] font-normal leading-[21px]'>
                              Upload a image and add it to your logo. .png, .jpeg, .gif, files up to 8MB. Recommended size 256x256
                         </p>
                    </div>
                    <div className='sm:max-w-[388px] flex items-center gap-5'>
                         <ImageUpload
                              onImageUpload={handleImageUpload}
                              maxSizeInMB={8}
                              recommendedSize="256x256"
                              acceptedFormats={['.png', '.jpeg', '.jpg', '.gif']}
                         />
                    </div>
               </div>

               <div className='bg-[#DEDEDE] w-full h-[1px] mt-6 sm:mt-8 mb-6'></div>

               <div className='flex items-start sm:flex-row flex-col gap-4 justify-between'>
                    <div>
                         <h2 className='text-[16px] font-semibold leading-[24px] mb-1'>Office Media</h2>
                         <p className='sm:max-w-[291px] text-[#424242] text-[14px] font-normal leading-[21px]'>
                              To enhance visibility and user trust, kindly provide images showing the exterior and interior of your office, including a clear front view.
                         </p>
                    </div>
                    <div className='sm:max-w-[386px] w-full'>
                         <button
                              onClick={handleUploadClick}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                              className={`w-full sm:min-w-full border-dashed border rounded-md cursor-pointer h-[150px] flex items-center justify-center flex-col transition-colors ${isDragOver
                                   ? 'border-[#20523C] bg-[#F0F8F0]'
                                   : 'border-[#DEDEDE] hover:border-[#20523C] hover:bg-[#FAFAFA]'
                                   }`}
                         >
                              <Image src='/assets/document-upload.svg' alt='document-upload' width={32} height={32} />
                              <h3 className='mt-2 text-[12px] leading-[16px] font-normal text-[#424242]'>
                                   <span className='text-[#20523C] font-medium'>Click to upload</span> or drag and drop
                              </h3>
                         </button>

                         <input
                              ref={fileInputRef}
                              type="file"
                              multiple
                              accept=".png,.jpeg,.jpg,.gif"
                              onChange={handleFileSelect}
                              className="hidden"
                         />

                         <div className='mt-4 sm:mt-3 grid grid-cols-4 sm:grid-cols-5 gap-2.5 sm:gap-[6.5px] '>
                              {/* Show uploaded images first, then placeholder boxes */}
                              {officeImages.map((image, index) => (
                                   <div key={image.id} className='relative group'>
                                        <div className={`w-full border border-solid rounded-md h-[50px] overflow-hidden bg-white ${index === 0 ? 'border-[#20523C]' : 'border-[#DEDEDE]'
                                             }`}>
                                             <img
                                                  src={image.previewUrl}
                                                  alt={image.name}
                                                  className='w-full h-full object-cover'
                                             />
                                        </div>
                                        {/* Show "Main Photo" label on first image */}
                                        {index === 0 && (
                                             <div className='absolute top-0 left-0 bg-[#20523C] text-white text-[9px] leading-[12px] pl-1 pr-0.5 py-[1.5px] rounded-tl-md rounded-br-[4px] text-center'>
                                                  Main Photo
                                             </div>
                                        )}
                                   </div>
                              ))}

                              {Array.from({ length: Math.max(0, 5 - officeImages.length) }).map((_, index) => (
                                   <div
                                        key={`placeholder-${index}`}
                                        className='w-full border border-dashed border-[#DEDEDE] bg-[#F8F8F8] rounded-md h-[50px] flex items-center justify-center'
                                   >
                                        <Image src='/assets/random-image.svg' alt='placeholder' width={20} height={20} />
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>

               <div className='bg-[#DEDEDE] w-full h-[1px] mt-6 sm:mt-8 mb-6'></div>
               <div className='flex items-end justify-end w-full'>
                    <button
                         className="w-full sm:w-[146px] h-[40px] sm:h-[46px] cursor-pointer rounded-md relative text-[#20523C] text-base font-semibold leading-[22px]"
                         style={{
                              background: 'radial-gradient(65.83% 94.77% at 50.34% 116.3%, #C3F63C 0%, #54D10E 100%)',
                              border: '1px solid rgba(255, 255, 255, 0.4)',
                              boxShadow: '0px 4px 4px 0px #FFFFFF52 inset, 0px -4px 4px 0px #FFFFFF52 inset'
                         }}
                    >
                         Save Update
                    </button>
               </div>
          </>
     )
}

export default ImageLogo