import { getCurrentUser } from '@/action/getCurrentUser'
import getFavoriteListings from '@/action/getFavorites'
import ClientOnly from '@/components/ClientOnly'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import FavoritesClient from './FavoritesClient'

const Page = async() => {
    const listing = await getFavoriteListings()
    const currentUser =await getCurrentUser()
    if(listing.length == 0){
        return (
        <ClientOnly>
            <EmptyState
                title="No Favorites Found"
                subTitle="Looks like you have no favorites"
            />
        </ClientOnly>
      )
    }

    return (
        <ClientOnly>
            <FavoritesClient
                listings = {listing}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default Page
