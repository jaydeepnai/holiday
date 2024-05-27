"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Logo = () => {
  const routerf = useRouter();
  return (
    <Image
      alt="logo"
      className="hidden md:block cursor-pointer"
      height={"100"}
      width={"100"}
      src="next.svg"
    />
  );
};

export default Logo;
