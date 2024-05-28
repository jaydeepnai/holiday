"use client"
import React from 'react'
import {useRouter} from "next/navigation"
import Heading from './Models/Heading';
import Button from './Button';

interface EmptyStateProps {
    title?: string;
    subtitle?:string;
    showReset?: boolean;
}

const EmptyState:React.Fc<EmptyStateProps> = ({
    title = "No Exact Matches",
    subtitle ="Try Changing or Remove Some Of Your Filter",
    showReset,
}) => {
    const router = useRouter()
  return (
    <div className="
    h-[60vh]
    flex
    flex-col
    gap-2
    justify-center
    items-center
    ">
      <Heading
      center={true}
      title={title}
      subtitle={subtitle}
      />
      <div className="w-48 mt-4">
        {showReset && (<Button outline label="Remove All Filters"
        onClick={()=>router.push("/")}
        />)}
      </div>
    </div>
  )
}

export default EmptyState
