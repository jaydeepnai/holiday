"use client"
import useSearchModel from '@/Hooks/useSearchModel'
import React from 'react'
import Model from './Model'
import { CoutrySelectValue } from '../CountrySelect'
import Calender from '../Input/Calender'

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModel = () => {
    const searchModel = useSearchModel()
    const router = useRouter()
    const params = useSearchParams()

    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION)
    const [guestCount, setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    })

    const onBack = useCallback(() => {
        setStep((values) => values - 1)
    }, [])

    const onNext = useCallback(() => {
        setStep((values) => values + 1)
    }, [])

    const onSubmit = useCallback(() => {
        if (step !== STEPS.INFO) {
            return onNext()
        }
        let query = {}

        if (params) {
            query = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...query,
            location: location.value,
            guestCount,
            roomCount,
            bathroomCount,
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringfyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })

        setStep(STEPS.LOCATION)

        searchModel.onClose()

        router.push(url)

    }, [
        step,
        searchModel,
        location,
        router,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        onNext,
        params
    ])

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return "Search"
        }

        return "Next"
    }, [step])

    const secoundaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined
        }

        return "Back"
    }, [step])


    let body = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where you wanna go ?"
                subTitle="Find the perfect location!"
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CoutrySelectValue)} 
            />
            <hr/>
        </div>
    );

    if (step == STEPS.DATE) {
        body = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When do you plan to go ?"
                    subTitle="Make sure everyone is free !"
                />
                <Calender
                    value={dateRange}
                    onChange={(value)=>setDateRange(value.selection)}
                />
            </div>
        );
    }

    if (step == Steps.INFO) {
        body = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More Information"
                    subTitle="Find your perfect place!"
                />
                <Counter
                    title="Guests"
                    subtitle="How Many Guests?"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value) }
                />
                <Counter
                    title="Rooms"
                    subtitle="How Many Rooms?"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value) }
                />
                <Counter
                    title="Bathrooms"
                    subtitle="How Many Bathrooms?"
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value) }
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
                    id="price"
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
        <Modelfirst isOpen={searchModel.isOpen}
            onClose={searchModel.onClose}
            onSubmit={searchModel.onOpen}
            title="Filters"
            actionLabel={actionLabel}
            secoundaryActionLabel={secoundaryActionLabel}
            secoundaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body={body}
        />
    )
}

export default SearchModel
