"use client"
import ListingHead from '@/components/Listings/ListingHead';
import ListingInfo from '@/components/Listings/ListingInfo';
import { CategoriesDetails } from '@/components/Navbar/Categories';
import Container from '@/components/Navbar/Container';
import { SafeListing, SafeUser } from '@/types';
import { Listing, Reservation } from '@prisma/client';
import React, { useMemo } from 'react'

interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser
    },
    currentUser: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser
}) => {
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
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient
