import { getCurrentUser } from "@/action/getCurrentUser";
import getListings, { IListingParams } from "@/action/getListing";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/Listings/ListingCard";
import Container from "@/components/Navbar/Container";

interface HomeProps {
  searchParams : IListingParams
}

const Home = async({searchParams}:HomeProps)=> {
  const listings = await getListings(searchParams)
  const CurrentUser = await getCurrentUser()

  if(listings.length === 0){
    return(
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className="
        justify-center 
        flex
        flex-wrap
        flex-row
        pt-24
        grid-col-1
        sm:grid-col-2
        md:grid-col-3
        lg:grid-col-4
        xl:grid-col-5
        2xl:grid-col-6
        gap-8
        ">
          {listings?.map((l:any)=>{
            return (
              <ListingCard
              currentUser={CurrentUser}
              key={l.id}
              data={l}
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}

export default Home