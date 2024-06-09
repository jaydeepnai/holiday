"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Logo = () => {
  const router = useRouter();
  // <Image
  //   alt="logo"
  //   className="hidden md:block cursor-pointer"
  //   height={"100"}
  //   width={"100"}
  //   src="next.svg"
  // />
  return (
    <div className="font-bold text-4xl cursor-pointer" onClick={()=>router.push("/")}>
      It's Holiday
    </div>
  );
};

export default Logo;
