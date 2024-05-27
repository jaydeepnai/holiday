"use client";
import useRegisterModel from "@/Hooks/useRegister";
import axios from "axios";
import React, { useCallback, useState } from "react";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Model from "./Model";
import { BiHeading } from "react-icons/bi";
import Heading from "./Heading";
import Input from "../Input/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import useLoginModel from "@/Hooks/useLogin";

const RegisterModel = () => {
  const RegisterModel = useRegisterModel();
  const LoginModel = useLoginModel();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const toogleModel= useCallback(()=>{
    RegisterModel.onClose()
    LoginModel.onOpen()
  },[LoginModel,RegisterModel])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        RegisterModel.onClose();
        LoginModel.onOpen();
        toast.success("Account Created Succesfully!");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const body = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Airbnb"
        center={false}
        subTitle="Create An Account"
      />
      <Input
        id="email"
        labal="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        labal="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        labal="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footer = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue With Google"
        onClick={()=>signIn("google")}
        icon={FcGoogle}
      />
      <Button
        outline
        label="Continue With Github"
        onClick={() => signIn("github")}
        icon={AiFillGithub}
      />
      <div
      className="
      text-neutral-500
      text-center
      mt-4
      font-light"
      >
        <div className="justify-center flex flex-row items-center gap-2">
          <div>
            Already have an Account ? 
          </div>
          <div onClick={toogleModel} className="text-neutral-800 cursor-pointer hover:underline">
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Model
      disabled={isLoading}
      isOpen={RegisterModel.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={RegisterModel.onClose}
      body={body}
      footer={footer}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterModel;
