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
import useLoginModel from "@/Hooks/useLogin";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModel = () => {
  const LoginModel = useLoginModel();
  const RegisterModel = useRegisterModel();
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toogleModel= useCallback(()=>{
    LoginModel.onClose()
    RegisterModel.onOpen()
  },[LoginModel,RegisterModel])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials",{
        ...data,
        redirect:false
    }).then((callback)=>{
        setIsLoading(false);
        console.log(callback)
        if(callback?.ok){
            toast.success("login successfully")
            router.refresh()
            LoginModel.onClose()
        }
        if(callback?.error){
            toast.error(callback.error)
        }
    })
  };

  const body = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Airbnb"
        center={false}
        subTitle="Login to your Account"
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
        onClick={()=>signIn("github")}
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
          <div>Not having an Account ?</div>
          <div
            onClick={toogleModel}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Model
      disabled={isLoading}
      isOpen={LoginModel.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={LoginModel.onClose}
      body={body}
      footer={footer}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default LoginModel;
