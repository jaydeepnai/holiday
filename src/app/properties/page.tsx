import { getCurrentUser } from '@/action/getCurrentUser'
import getReservations from '@/action/getReservations'
import ClientOnly from '@/components/ClientOnly'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import PropertiesClient from './PropertiesClient'
import getListings from '@/action/getListing'

const Page = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="UnAthorised"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    })

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Properties found"
                    subtitle="Looks like you have no Properties"
                />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default Page
