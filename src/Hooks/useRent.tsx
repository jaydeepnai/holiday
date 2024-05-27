import { create } from "zustand";

interface RentModel {
    isOpen : boolean,
    onOpen : ()=> void,
    onClose : ()=> void,
}

const useRentModel = create<RentModel>((set)=>({
    isOpen : false,
    onOpen : ()=> set({isOpen : true}),
    onClose : ()=> set({isOpen : false}),
}))

export default useRentModel;