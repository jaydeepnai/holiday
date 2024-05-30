import { User,Listing } from "@prisma/client";

export type SafeUser = Omit<User,"createdAt" | "emailVarified" | "updatedAt">&{
    createdAt? : string;
    updatedAt? : string;
    emailVarified : string | null;
}

export type SafeListing = Omit<Listing,"created">&{
    created? : string;
}