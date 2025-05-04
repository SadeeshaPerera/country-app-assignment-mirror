import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCountries } from "./redux/actions";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const isLoading = countries.length === 0;
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [regionFilter, setRegionFilter] = useState(""); // State for region filter
  const [languageFilter, setLanguageFilter] = useState(""); // State for language filter
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 10; // Number of items per page
  const [languageOptions, setLanguageOptions] = useState([]); // State for language options
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => dispatch(setCountries(data)))
      .catch((error) => console.error("Error fetching countries:", error));
  }, [dispatch]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const languages = new Set();
        data.forEach((country) => {
          if (country.languages) {
            Object.values(country.languages).forEach((lang) =>
              languages.add(lang)
            );
          }
        });
        setLanguageOptions(Array.from(languages).sort());
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode"; // Dynamically set body class
  }, [isDarkMode]);

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter ? country.region === regionFilter : true;
    const matchesLanguage = languageFilter
      ? country.languages &&
        Object.values(country.languages).some((lang) =>
          lang.toLowerCase().includes(languageFilter.toLowerCase())
        )
      : true;
    return matchesSearch && matchesRegion && matchesLanguage;
  });

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const paginatedCountries = filteredCountries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen p-4`}
    >
      <header
        className={`flex flex-col md:flex-row ${
          selectedCountry ? "justify-center" : "justify-between"
        } items-center mb-4`}
      >
        <h2
          className={`text-3xl font-bold mb-2 md:mb-0 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Country Explorer
        </h2>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isDarkMode
              ? "bg-white text-black border-gray-600" // Light background for dark mode
              : "bg-gray-800 text-white border-gray-300" // Dark background for light mode
          }`}
        >
          {isDarkMode ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12H3m15.07 6.07l-.71-.71M6.34 6.34l-.71-.71m12.02 12.02l-.71-.71M6.34 17.66l-.71-.71M12 5a7 7 0 100 14 7 7 0 000-14z"
                />
              </svg>
              Light Mode
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                />
              </svg>
              Dark Mode
            </>
          )}
        </button>
      </header>
      {!selectedCountry && (
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${
                isDarkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-black border-gray-300"
              }`}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
          <div className="relative">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className={`appearance-none p-2 pr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${
                isDarkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              <option value="">Filter by region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div className="relative">
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className={`appearance-none p-2 pr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${
                isDarkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              <option value="">Filter by language</option>
              {languageOptions.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      )}
      {isLoading ? (
        <p className="text-center">Loading countries...</p>
      ) : selectedCountry ? (
        <CountryDetails
          country={selectedCountry}
          onBack={() => setSelectedCountry(null)}
          isDarkMode={isDarkMode} // Pass dark mode state
        />
      ) : filteredCountries.length === 0 ? (
        <p className="text-center text-gray-500">
          There is no country like that.
        </p>
      ) : (
        <>
          <CountryList
            countries={paginatedCountries}
            onSelectCountry={setSelectedCountry}
            className="hover:shadow-lg transition-shadow duration-300 rounded-lg border border-white p-4"
          />
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 disabled:opacity-50 ${
                isDarkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-white border-gray-300"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2 disabled:opacity-50 ${
                isDarkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-white border-gray-300"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
