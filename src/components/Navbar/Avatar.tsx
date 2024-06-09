import Image from "next/image";
import React from "react";
import { FaRegUser } from "react-icons/fa";

interface AvararProps {
  src?: string | null;
}

const Avatar: React.FC<AvararProps> = ({ src }) => {
  if(src){
    return (
      <Image
        className="rounded-full"
        height={60}
        width={30}
        alt="Avatar"
        src={src}
      />
    )
  }else{
    return <FaRegUser />;
  }
};

export default Avatar;
