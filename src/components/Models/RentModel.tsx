"use client";
import useRegisterModel from "@/Hooks/useRegister";
import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Model from "./Model";
import Heading from "./Heading";
import { useRouter } from "next/navigation";
import useRentModel from "@/Hooks/useRent";
import { CategoriesDetails } from "../Navbar/Categories";
import CategoryInput from "../CategoryInput";
import CountrySelect from "../CountrySelect";

enum Steps {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 5,
  PRICE = 5,
}

const RentModel = () => {
  const RentModel = useRentModel();
  const [step, setStep] = useState(Steps.CATEGORY);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLable = useMemo(() => {
    if (step === Steps.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLable = useMemo(() => {
    if (step === Steps.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: "",
      title: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {};

  const WatchCategory = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  let body = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place ?"
        center={false}
        subTitle="Pick a Cetegory"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {CategoriesDetails.map((category) => (
          <div key={category.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={WatchCategory === category.label}
              lable={category.label}
              icon={category.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step == Steps.LOCATION) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place is located ?"
          center={false}
          subTitle="Help guests find you ?"
        />
        <CountrySelect onChange={}/>
      </div>
    );
  }

  let footer = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
    </div>
  );

  return (
    <Model
      disabled={isLoading}
      isOpen={RentModel.isOpen}
      onClose={RentModel.onClose}
      title="Airbnb Your Home"
      actionLabel={actionLable}
      body={body}
      footer={footer}
      secoundaryActionLabel={secondaryActionLable}
      secondaryAction={step === Steps.CATEGORY ? undefined : onBack}
      onSubmit={onNext}
    />
  );
};

export default RentModel;
