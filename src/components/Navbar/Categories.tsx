"use client"
import React from 'react'
import { GiBoatFishing, GiIsland, GiLandMine, GiWindmill } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import Container from './Container'
import CategoryBox from '../CategoryBox'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

export const CategoriesDetails = [
    {
        label : "Beach",
        icon : TbBeach,
        description : "This Property is near to the beach",
    },
    {
        label : "Windmill",
        icon : GiWindmill,
        description : "This Property is near to the Windmill",
    },
    {
        label : "Modern",
        icon : MdOutlineVilla,
        description : "This Property is Modern",
    },
    {
        label : "CountrySide",
        icon : TbMountain,
        description : "This Property is in CountrySide",
    },
    {
        label : "Pools",
        icon : TbPool,
        description : "This Property has a pool",
    },
    {
        label : "Island",
        icon : GiIsland,
        description : "This Property is on island",
    },
    {
        label : "Lack",
        icon : GiBoatFishing,
        description : "This Property has a lack",
    },
] 

const Categories = () => {

    const params = useSearchParams()
    const categoryName = params?.get("category")
    const pathName = usePathname()

    const isMainPage = pathName === "/"

    if(!isMainPage){
        return null
    }

  return (
    <Container>
        <div className='
        category
        pt-2
        px-20
        flex
        flex-row 
        items-center
        justify-between
        overflow-x-auto
        '>
            {
                CategoriesDetails.map((category) =>(
                    <CategoryBox 
                    key={category.label} 
                     label={category.label} 
                     selected= {categoryName === category.label}
                    icon ={category.icon}/>
                ))
            }
        </div>
    </Container>
  )
}

export default Categories