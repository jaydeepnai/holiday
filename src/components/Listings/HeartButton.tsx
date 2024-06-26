import useFoverites from '@/Hooks/useFoverites';
import { SafeUser } from '@/types';
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps {
    listingID:string;
    currentUser?:SafeUser | null
}

const HeartButton : React.FC<HeartButtonProps> = ({
    listingID,
    currentUser
}) => {
    const {hasFavorites,toggleFoverites} = useFoverites({listingId:listingID,
      currentUser})

  return (
    <div onClick={toggleFoverites} className="ralative hover:opacity-80 transition cursor-pointer">
      <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]"/>
      <AiFillHeart size={24} className={hasFavorites?"fill-rose-500":"fill-neutral-500/700"}/>
    </div>
  )
}

export default HeartButton
