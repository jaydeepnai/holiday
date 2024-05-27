"use client";
import React, { useMemo, useState } from "react";
import {
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
import Counter from "../Input/Counter";
import ImageUpload from "../Input/ImageUpload";
import Input from "../Input/Input";
import axios from "axios";
import toast from "react-hot-toast";

enum Steps {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if(step !== Steps.PRICE){
      return onNext(); 
    }

    setIsLoading(true);

    axios.post('/api/listing',data).then((response) => {
      toast.success("Listing Created!")
      router.refresh();
      setStep(Steps.CATEGORY)
      RentModel.onClose()
    }).catch((error) => {
      toast.error(error.message);
      console.log(error);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const WatchCategory = watch("category");
  const WatchLocation = watch("location");
  const WatchGuestCount = watch("guestCount");
  const WatchRoomCount = watch("roomCount");
  const WatchBathroomsCount = watch("bathroomCount");
  const ImageSrc = watch("imageSrc");
  const parsedGuestCount = parseInt(WatchGuestCount, 10) || 0;
  const parsedRoomsCount = parseInt(WatchRoomCount, 10) || 0;
  const parsedBathroomCount = parseInt(WatchBathroomsCount, 10) || 0;
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
        <CountrySelect value={WatchLocation} onChange={(value)=> setCustomValue("location",value)}/>
      </div>
    );
  }

  if (step == Steps.INFO) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share Some Basic About Your Place"
          center={false}
          subTitle="WHat Amenitites Do you Have  ?"
        />
          <Counter
                value={parsedGuestCount}
                onChange={(value) => {
                    setCustomValue("guestCount", value);
                }}
                title="Number of Guests"
                subtitle="How Many Guests?"
            />
          <Counter
                value={parsedRoomsCount}
                onChange={(value) => {
                    setCustomValue("roomCount", value);
                }}
                title="Number of Rooms"
                subtitle="How Many Rooms DO you Have?"
            />
          <Counter
                value={parsedBathroomCount}
                onChange={(value) => {
                    setCustomValue("bathroomCount", value);
                }}
                title="Number of Bathrooms"
                subtitle="How Many Bathrooms Do you have?"
            />
      </div>
    );
  }

  if (step == Steps.IMAGES) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add Photo of Your Place"
          center={false}
          subTitle="Show Your Place Please?"
        />
          <ImageUpload value={ImageSrc} 
           onChange={(value) => {
            setCustomValue("imageSrc", value);
        }}
          />
      </div>
      )
  }

  if (step == Steps.DESCRIPTION) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Would You like to Describe Your Place ?"
          center={false}
          subTitle="Short and Sweet Works Best!?"
        />
          <Input
          id="title"
          labal="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          />
          <Input
          id="description"
          labal="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          />
      </div>
      )
  }

  if (step == Steps.PRICE) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Please Set-Up Your Price ?"
          center={false}
          subTitle="How Do You Charge Per Night?"
        />
          <Input
          id="pyrice"
          labal="Price"
          disabled={isLoading}
          type="number"
          register={register}
          errors={errors}
          required
          />
      </div>
      )
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
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RentModel;
