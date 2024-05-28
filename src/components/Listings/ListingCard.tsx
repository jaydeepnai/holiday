"use client"
import React, { useCallback, useMemo } from 'react'
import { Listing, Reservation } from "@prisma/client"
import { SafeUser } from '@/types';
import { useRouter } from "next/navigation"
import useCoutries from '@/Hooks/useCountry';
import {format} from "date-fns"
import HeartButton from './HeartButton';
import Button from '../Button';
import Image from 'next/image';

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId,
  currentUser,
}) => {
  const router = useRouter()
  const { getAllByValue } = useCoutries()
  const location = getAllByValue(data.locationValue)

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (disabled) return;
    // onAction?.(actionId)
  }, [onAction, actionId, disabled])

  const price = useMemo(() => {
    if(reservation){
      return reservation.totalPrice;
    }
    return data.price
  }, [reservation,data.price])


  const reservationDate = useMemo(() => {
    if(!reservation){
      return null;
    }
    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)
    return `${format(start,"PP")} - ${format(end,"PP")}`
  }, [reservation])

  console.log(data.imagesSrc)

  return (
    <div onClick={()=>router.push(`listings/${data.id}`)}
    className="]
    col-span-1 cursor-pointer group
    "
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
          height={100}
          width={100}
          // fill
          alt="Listing"
          src={data.imagesSrc}
          className="object-cover group-hover:scale-10 transition"
          />
          <div className="absolute top-3 right-3 ">
            <HeartButton
              listingID={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region},{location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>
        {/* {onAction && actionLabel && (
          <Button 
          disabled={disabled} 
          small
          label={actionLabel}
          onClick={handleCancel}
          />
        )} */}
      </div>
    </div>
  )
}

export default ListingCard
