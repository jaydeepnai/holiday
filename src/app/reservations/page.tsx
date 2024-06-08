import { getCurrentUser } from '@/action/getCurrentUser'
import getReservations from '@/action/getReservations'
import ClientOnly from '@/components/ClientOnly'
import EmptyState from '@/components/EmptyState'
import React from 'react'

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
                    subtitle="Looks like you  "
                />
            </ClientOnly>
        )
    }

  return (
    <div>
      
    </div>
  )
}

export default Page
