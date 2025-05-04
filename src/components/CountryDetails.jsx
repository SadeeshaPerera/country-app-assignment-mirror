import React from "react";

function CountryDetails({ country, onBack, isDarkMode }) {
  return (
    <div
      className={`p-4 shadow rounded ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="text-left mb-4">
        <button
          onClick={onBack}
          className={`px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isDarkMode
              ? "bg-gray-700 text-black border-gray-600"
              : "bg-white text-white border-gray-300"
          }`}
        >
          Back
        </button>
      </div>
      <img
        src={country.flags.svg}
        alt={`${country.name.common} flag`}
        className="w-full h-48 object-cover mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{country.name.common}</h2>
      <p>
        <strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}
      </p>
      <p>
        <strong>Region:</strong> {country.region}
      </p>
      <p>
        <strong>Population:</strong> {country.population.toLocaleString()}
      </p>
      <p>
        <strong>Languages:</strong>{" "}
        {country.languages
          ? Object.values(country.languages).join(", ")
          : "N/A"}
      </p>
    </div>
  );
}

export default CountryDetails;
