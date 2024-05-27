import countries from "world-countries"

const formatedCoutries = countries.map(country =>({
    value : country.cca2,
    label : country.name.common,
    flag : country.flag,
    latlng : country.latlng,
    region : country.region,
})) 


const useCoutries = ()=>{
    const getAllCountries = ()=> formatedCoutries;

    const getAllByValue = (value : string)=>{
        return formatedCoutries.find((item)=> item.value === value)
    }

    return {
        getAllCountries,
        getAllByValue
    }
}

export default useCoutries;