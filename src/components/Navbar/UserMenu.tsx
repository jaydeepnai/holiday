"use client";
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import useRegisterModel from "@/Hooks/useRegister";
import useLoginModel from "@/Hooks/useLogin";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/types";
import useRentModel from "@/Hooks/useRent";

interface NavbarProps {
  CurrentUser?: SafeUser | null;
}

export const UserMenu: React.FC<NavbarProps> = ({ CurrentUser }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const RegisterModel = useRegisterModel();
  const RentModel = useRentModel()
  const LoginModel = useLoginModel();

  console.log("CurrentUser"+CurrentUser)

  const Toggle = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const OnRent = useCallback(() => {
    if(!CurrentUser){
      return LoginModel.onOpen();
    }
    RentModel.onOpen();
  }, [CurrentUser,LoginModel,RentModel]);


  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div onClick={OnRent} className="hidden md:block text:sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          AirBnb Your Home
        </div>
        <div
          onClick={Toggle}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={CurrentUser?.image}/>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {CurrentUser ? (
              <>
                <MenuItem onclick={()=>router.push("/trips")} label="My Trips" />
                <MenuItem onclick={()=>router.push("/favorites")} label="My Favorites" />
                <MenuItem onclick={()=>router.push("/reservations")} label="My Reservations" />
                <MenuItem onclick={LoginModel.onOpen} label="My Properties" />
                <MenuItem
                  onclick={RentModel.onClose}
                  label="My Airbnb My House"
                />
                <MenuItem onclick={signOut} label="My Logout" />
              </>
            ) : (
              <>
                <MenuItem onclick={RegisterModel.onOpen} label="SignUp" />
                <MenuItem onclick={LoginModel.onOpen} label="Login" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
