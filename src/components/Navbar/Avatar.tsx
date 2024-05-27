import Image from "next/image";
import React from "react";

interface AvararProps {
  src?: string | undefined;
}

const Avatar: React.FC<AvararProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height={60}
      width={30}
      alt="Avatar"
      src={src || "/vercel.svg"}
    />
  );
};

export default Avatar;
