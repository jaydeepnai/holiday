"use client"
import ListingHead from '@/components/Listings/ListingHead';
import { CategoriesDetails } from '@/components/Navbar/Categories';
import Container from '@/components/Navbar/Container';
import { SafeListing, SafeUser } from '@/types';
import React from 'react'

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
                <div className="flex flex-auto gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imagesSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </Container>
    )
}

export default ListingClient
