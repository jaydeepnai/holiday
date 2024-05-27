import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { UserMenu } from "./UserMenu";
import { User } from "@prisma/client";
import { SafeUser } from "@/types";
import Categories from "./Categories";


interface NavbarProps {
  CurrentUser?: SafeUser | null;
}

const Navbar:React.FC<NavbarProps> =  ({
CurrentUser
})=> {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                <Logo/>
                <SearchBar/>
                <UserMenu CurrentUser= {CurrentUser}/>
            </div>
        </Container>
      </div>
      <Categories/>
    </div>
  );
}

export default Navbar;
