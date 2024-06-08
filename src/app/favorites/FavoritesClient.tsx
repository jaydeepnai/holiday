import Heading from '@/components/Models/Heading';
import Container from '@/components/Navbar/Container';
import { SafeListing } from '@/types'
import React from 'react'

interface FavoritesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null
}

const FavoritesClient:React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {
    return (
        <Container>
            <Heading
                title="Favorites"
                subTitle="List of places you have favorited"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                
            </div>
        </Container>
    )
}

export default FavoritesClient
