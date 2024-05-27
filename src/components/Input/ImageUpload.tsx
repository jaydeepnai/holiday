import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, { useCallback } from 'react'
import { TbPhonePause } from 'react-icons/tb';

declare global {
    var cloudinary : any;
}

interface ImageUploadProps {
    onChange :(value : string )=> void;
    value : string;
}

const ImageUpload:React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const handleUpload = useCallback((result : any) => {
        console.log("result",result);
        onChange(result.info.secure_url)
      },  [onChange] )
    
  return (
    <CldUploadWidget 
    onUpload={handleUpload}
    uploadPreset='gdo98qlq'
    options={{
        maxFiles:1
    }}
    >
        {({open})=>{
            return ( 
                <div className='relative 
                cursor-pointer
                hover:opacity-70
                transition
                border-dashed
                border-2
                p-20
                border-neutral-200
                flex
                flex-col
                justify-content
                items-center
                gap-4 
                text-neutral-600
                ' onClick={()=>open?.()}>
                    <TbPhonePause size={50}/>
                    <div className='font-semibold text-lg'>
                        Click t Upload
                    </div>
                    {
                        value &&
                        <div className='absolute inset-0 w-full h-full'>
                            <Image 
                            alt='Upload'
                            fill
                            style={{objectFit:"cover"}}
                            src={value}
                            />
                        </div>
                    }
                </div>
            )
        }}
    </CldUploadWidget>
  )
}

export default ImageUpload
