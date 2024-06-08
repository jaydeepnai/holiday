"use client"
import React from 'react'
import { Range } from "react-date-range"
import Calender from '../Input/Calender';
import Button from '../Button';

interface ListingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates,
}) => {
    return (
        <div style={{padding: '20px',
            alignItems: 'center',
            justifyContent: 'center',height:'fit-content'}} className="bg-white flex rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div>
                <Calender
                    values={dateRange}
                    disabledDates={disabledDates}
                    onChange={(values) => onChangeDate(values.selection)}
                />
            </div>
                <hr />
            <div>
                <div className="flex flex-row items-center justify-between gap-1 p-4">
                    <div className='flex '>
                        <div className="text-2xl font-semibold pr-3">
                            $ {price}
                        </div>
                        <div className="font-light text-neutral-500">
                            night
                        </div>

                    </div>
                    <div>
                        <div className="p-4 flex flex-row items-center justify-center font-semibold text-lg">
                            <div>
                                Total
                            </div>
                            <div>
                                $ {totalPrice}
                            </div>

                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <Button
                        disabled={disabled}
                        label="Reserve"
                        onClick={onSubmit}
                    />
                </div>

            </div>
        </div>
    )
}

export default ListingReservation
