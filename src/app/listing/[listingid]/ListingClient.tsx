"use client"
import useLoginModel from '@/Hooks/useLogin';
import ListingHead from '@/components/Listings/ListingHead';
import ListingInfo from '@/components/Listings/ListingInfo';
import ListingReservation from '@/components/Listings/ListingReservation';
import { CategoriesDetails } from '@/components/Navbar/Categories';
import Container from '@/components/Navbar/Container';
import { SafeListing, SafeUser, safeReservation } from '@/types';
import { Listing, Reservation } from '@prisma/client';
import axios from 'axios';
import { eachDayOfInterval, differenceInCalendarDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Range } from 'react-date-range';
import toast from 'react-hot-toast';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
}

interface ListingClientProps {
    reservations?: safeReservation[];
    listing: SafeListing & {
        user: SafeUser
    },
    currentUser: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser
}) => {

    const loginModel = useLoginModel()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const disabledDates = useMemo(() => {
        let dates: Date[] = []

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })

            dates = [...dates, ...range]
        })

        return dates

    }, [reservations])

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModel.onOpen()
        }
        setIsLoading(true)
        axios.post("/api/reservations", {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        }).then(() => {
            toast.success("Listing Reserved")
            setDateRange(initialDateRange)
            router.push("/trips")
        }).catch(() => {
            toast.error("Something Went Wrong")
        }).finally(() => {
            setIsLoading(false)
        })
    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModel])

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate,
            )

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price)
            } else {
                setTotalPrice(listing.price)
            }
        }
    }, [])


    const category = useMemo(() => {
        return CategoriesDetails.find((c) => c.label === listing.category)
    }, [listing.category])

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imagesSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-col-1 md:grid-col-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div style={{
                            padding: '20px',
                            display: 'flex',
                            width: '78vw',
                            justifyContent: 'space-between',
                        }}>
                            <div style={{width:"420px"}} className="text-lg font-light text-neutral-500 ">
                            {listing.description}
                            </div>
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient
