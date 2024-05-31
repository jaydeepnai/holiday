import useCoutries from '@/Hooks/useCountry';
import { SafeUser } from '@/types';
import React from 'react'
import Heading from '../Models/Heading';
import HeartButton from './HeartButton';
import Image from 'next/image';

interface ListingHeadProps{
  title : string;
  locationValue : string;
  imageSrc:string;
  id:string;
  currentUser?:SafeUser | null;
}

const ListingHead:React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const {getAllByValue} = useCoutries()
  const location = getAllByValue(locationValue)
  return (
    <>
      <Heading
        title={title}
        center={true}
        subTitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton
            listingID={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}

export default ListingHead
