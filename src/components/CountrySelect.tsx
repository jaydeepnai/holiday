import React from "react";
import useCoutries from "@/Hooks/useCountry";
import Select from "react-select";

export type CoutrySelectValue = {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
};

interface CountrySelectProps {
  value?: CoutrySelectValue;
  onChange: (value: CoutrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAllCountries, getAllByValue } = useCoutries();
  return (
    <div>
      <Select
        placeholder="Select Place"
        isClearable
        options={getAllCountries()}
        value={value}
        onChange={(value) => onChange(value as CoutrySelectValue)}
      />
    </div>
  );
};

export default CountrySelect;
