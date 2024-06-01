import { getCurrentUser } from '@/action/getCurrentUser'
import getListingByID from '@/action/getListingById'
import ClientOnly from '@/components/ClientOnly'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import ListingClient from './ListingClient'

interface IParams {
    listingid ? : string
}

const ListingPage = async(params:IParams) => {
    console.log("params",params)
    const listing = await getListingByID(params)
    const currentUser = await getCurrentUser()

    if (!listing){
        return (
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <ListingClient
        listing={listing}
        currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default ListingPage
