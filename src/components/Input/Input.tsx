"use client";

import {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface InputProps {
  id: string;
  labal: string;
  type?: string;
  disabled?: boolean;
  formatedPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

import React from "react";
import { BiDollar } from "react-icons/bi";

const Input: React.FC<InputProps> = ({
  id,
  labal,
  type,
  disabled,
  formatedPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatedPrice && (
        <BiDollar
          size={24}
          className="text-neutral-500 absolute top-5 left-2 "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
        className={`
        peer
        w-full
        p-3 
        pt-5
        font-light
        bg-white
        border-2
        rounded-xl
        outline-none
        transition 
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${formatedPrice ? "pl-9" : "pl-4"}
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
          formatedPrice ? "left-9" : "left-4"
        }
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus: scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? "text-rose-500" : "text-zinc-300"}
      `}
      >
        {labal}
      </label>
    </div>
  );
};

export default Input;
