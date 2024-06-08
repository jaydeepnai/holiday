import { getCurrentUser } from '@/action/getCurrentUser'
import getReservations from '@/action/getReservations'
import ClientOnly from '@/components/ClientOnly'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import ReservationsClient from './ReservationsClient'

const Page = async() => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title="Unauthorised" subtitle="Please login"/>
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        params:{ authorId : currentUser.id}
    })

    if(reservations.length === 0){
        return (
            <ClientOnly>
                <EmptyState 
                    title="No reservations found"
                    subtitle="Looks Like You have No Reservations On Your Property"
                />
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default Page
