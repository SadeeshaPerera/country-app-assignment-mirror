export const filterCountries = (countries, searchTerm, region, language) => {
  return countries.filter((country) => {
    const matchesSearch = searchTerm
      ? country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesRegion = region ? country.region === region : true;
    const matchesLanguage = language
      ? country.languages &&
        Object.values(country.languages).some((lang) =>
          lang.toLowerCase().includes(language.toLowerCase())
        )
      : true;
    return matchesSearch && matchesRegion && matchesLanguage;
  });
};
