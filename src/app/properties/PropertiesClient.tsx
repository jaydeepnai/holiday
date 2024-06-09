"use client"
import ListingCard from '@/components/Listings/ListingCard'
import Heading from '@/components/Models/Heading'
import Container from '@/components/Navbar/Container'
import { SafeListing, SafeUser } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

interface PropertiesClientProps {
    listings: SafeListing[],
    currentUser?: SafeUser | null
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter()
    const [deleteId, setDeleteId] = useState("")

    const onCencel = useCallback((id: string) => {
        setDeleteId(id)

        axios.delete(`/api/listings/${id}`).then(() => {
            toast.success("Listing Deleted")
            router.refresh()
        }).catch((error) => {
            toast.error(error?.response?.data?.error)
        }).finally(()=>{
            setDeleteId("")
        })

    }, [router])


    return (
        <Container>
            <Heading
                title="Properties"
                subTitle="List of your Properties"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {
                    listings.map((l)=>(
                        <ListingCard
                            key={l.id}
                            data={l}
                            actionId={l.id}
                            onAction={onCencel}
                            disabled={deleteId === l.id}
                            actionLabel="Cancel Property"
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    )
}

export default PropertiesClient
