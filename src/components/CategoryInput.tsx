import React from 'react'
import { IconType } from 'react-icons'

interface CategoryInput{
    icon : IconType;
    lable :string;
    selected?:boolean;
    onClick:(value : string )=>void;
} 

const CategoryInput:React.FC<CategoryInput> = ({
    icon:Icon,
    lable,
    selected,
    onClick,
}) => {
  return (
    <div className={`
    rounded-xl
    border-2
    p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${selected ? "border-black": "border-neutral-200"}
    `} onClick={()=> onClick(lable)}>
        <Icon size={20}/>
        <div className='font-semibold'>
            {lable}
        </div>
    </div>
  )
}

export default CategoryInput