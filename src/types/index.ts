import { User,Listing } from "@prisma/client";

export type SafeUser = Omit<User,"createdAt" | "emailVarified" | "updatedAt">&{
    createdAt? : string;
    updatedAt? : string;
    emailVarified : string | null;
}

export type safeReservation = Omit<Reservation,"createdAt" |"startDate" |"endDate" | "listing">&{
    createdAt : string;
    startDate : string;
    endDate : string;
    listing : SafeListing;
}
export type SafeListing = Omit<Listing,"created">&{
    created? : string;
}