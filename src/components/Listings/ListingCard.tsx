"use client"
import React, { useCallback } from 'react'
import { Listing, Reservation } from "@prisma/client"
import { SafeUser } from '@/types';
import { useRouter } from "next/navigation"
import useCoutries from '@/Hooks/useCountry';
import {format} from "date-fns"

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
    onAction?.(actionId)
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

  return (
    <div onClick={()=>router.push(`listings/${data.id}`)}
    className="]
    col-span-1 cursor-pointer group
    "
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspact-square w-full relative overflow-hidden rounded-xl">
          <Image 
          fill
          alt="Listing"
          src={data.imagesSrc}
          className="object-cover h-full w-full group-hover:scale-10 transition"
          />
        </div>
      </div>
    </div>
  )
}

export default ListingCard