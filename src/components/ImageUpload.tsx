'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import FileUpload from './SvgIcons/FileUpload';

interface ImageUploadProps {
     onImageUpload?: (file: File, previewUrl: string) => void;
     onError?: (error: string) => void;
     maxSizeInMB?: number;
     recommendedSize?: string;
     acceptedFormats?: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
     onImageUpload,
     onError,
     maxSizeInMB = 8,
     recommendedSize = "256x256",
     acceptedFormats = ['.png', '.jpeg', '.jpg', '.gif']
}) => {
     const [previewUrl, setPreviewUrl] = useState<string | null>(null);
     const [isDragging, setIsDragging] = useState(false);
     const [isUploading, setIsUploading] = useState(false);
     const fileInputRef = useRef<HTMLInputElement>(null);

     const validateFile = (file: File): string | null => {
          // Check file size
          const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
          if (file.size > maxSizeInBytes) {
               return `File size must be less than ${maxSizeInMB}MB`;
          }

          // Check file type
          const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
          if (!acceptedFormats.includes(fileExtension)) {
               return `Please upload a file with one of these formats: ${acceptedFormats.join(', ')}`;
          }

          return null;
     };

     const handleFileSelect = async (file: File) => {
          setIsUploading(true);

          const error = validateFile(file);
          if (error) {
               onError?.(error);
               setIsUploading(false);
               return;
          }

          try {
               const url = URL.createObjectURL(file);
               setPreviewUrl(url);
               onImageUpload?.(file, url);
          } catch (err) {
               onError?.('Failed to process the image');
          } finally {
               setIsUploading(false);
          }
     };

     const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0];
          if (file) {
               handleFileSelect(file);
          }
     };

     const handleDragOver = (event: React.DragEvent) => {
          event.preventDefault();
          setIsDragging(true);
     };

     const handleDragLeave = (event: React.DragEvent) => {
          event.preventDefault();
          setIsDragging(false);
     };

     const handleDrop = (event: React.DragEvent) => {
          event.preventDefault();
          setIsDragging(false);

          const file = event.dataTransfer.files?.[0];
          if (file) {
               handleFileSelect(file);
          }
     };

     const handleClick = () => {
          fileInputRef.current?.click();
     };

     const handleRemoveImage = (event: React.MouseEvent) => {
          event.stopPropagation();
          setPreviewUrl(null);
          if (fileInputRef.current) {
               fileInputRef.current.value = '';
          }
     };

     return (
          <div className="flex justify-center items-center cursor-pointer gap-5">
               <div
                    className={`min-w-[100px] min-h-[100px] rounded-full flex items-center justify-center border transition-all duration-200 relative overflow-hidden ${isDragging
                         ? 'border-[#20523C] bg-green-50'
                         : previewUrl
                              ? 'border-[#20523C]'
                              : 'border-[#DEDEDE] hover:border-[#20523C]'
                         }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClick}
               >
                    {isUploading ? (
                         <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#20523C]"></div>
                         </div>
                    ) : previewUrl ? (
                         <>
                              <Image
                                   src={previewUrl}
                                   alt="Uploaded logo"
                                   fill
                                   className="object-cover"
                                   sizes="100px"
                              />
                         </>
                    ) : (
                         <FileUpload />
                    )}
               </div>

               {/* Upload Controls */}
               <div className="flex flex-col items-start gap-1.5">
                    <button
                         onClick={handleClick}
                         disabled={isUploading}
                         className={`border border-[#20523C] rounded-md h-[38px] w-[126px] text-[#20523C] text-[16px] leading-[22px] font-medium transition duration-300 ${isUploading
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-[#20523C] hover:text-white'
                              }`}
                    >
                         {isUploading ? 'Uploading...' : previewUrl ? 'Change Logo' : 'Upload Logo'}
                    </button>
                    <p className="text-left text-[#585858] text-sm leading-[20px] font-normal">
                         {acceptedFormats.join(', ')} files up to {maxSizeInMB}MB. Recommended size {recommendedSize}
                    </p>
               </div>

               {/* Hidden File Input */}
               <input
                    ref={fileInputRef}
                    type="file"
                    accept={acceptedFormats.map(format => `image/*${format}`).join(',')}
                    onChange={handleFileChange}
                    className="hidden"
               />
          </div>
     );
};

export default ImageUpload;