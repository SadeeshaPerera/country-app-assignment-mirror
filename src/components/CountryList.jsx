import React from "react";

const CountryList = ({ countries, onSelectCountry, className }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-24">
      {countries.map((country) => (
        <div
          key={country.cca3}
          className={`p-4 bg-white shadow rounded cursor-pointer ${className}`} // Apply hover and shadow styles
          onClick={() => onSelectCountry(country)}
        >
          <img
            src={country.flags.svg}
            alt={`${country.name.common} flag`}
            className="w-full h-32 object-cover mb-2"
          />
          <h2 className="text-lg font-bold">{country.name.common}</h2>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
