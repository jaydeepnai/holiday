"use client"
import useCoutries from '@/Hooks/useCountry';
import { SafeUser } from '@/types'
import React from 'react'
import Avatar from '../Navbar/Avatar';
import ListingCategory from './ListingCategory';
import { IconType } from 'react-icons';

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string
    } | undefined;
    locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    category,
    locationValue
}) => {
    const { getAllByValue } = useCoutries()
    const coordinates = getAllByValue(locationValue)?.latlng
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2 ">
                <div className="text-xl font-semibold flex flex-row items-center gap-2 ">
                    <div>
                        Hosted By {user?.name}
                    </div>
                    <Avatar src={user?.image} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>{guestCount} Guests</div>
                    <div>{roomCount} Rooms</div>
                    <div>{bathroomCount} Bathrooms</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500 ">
                {description}
            </div>
        </div>
    )
}

export default ListingInfo
