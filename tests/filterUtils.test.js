/**
 * @jest-environment jsdom
 */
import { filterCountries } from "../utils/filterUtils"; // Adjusted the import path

// Ensure Jest environment is recognized
// Jest provides the 'test' and 'expect' functions globally, no import is needed.
// If Jest is not recognized, ensure the testing environment is set up correctly in your project.

const mockCountries = [
  {
    name: { common: "United States" },
    region: "Americas",
    languages: { eng: "English" },
  },
  {
    name: { common: "Germany" },
    region: "Europe",
    languages: { deu: "German" },
  },
  { name: { common: "Japan" }, region: "Asia", languages: { jpn: "Japanese" } },
];

// eslint-disable-next-line no-undef
test("filters countries by search term", () => {
  const searchTerm = "United";
  const result = filterCountries(mockCountries, searchTerm, "", "");
  expect(result).toEqual([mockCountries[0]]);
});

test("filters countries by region", () => {
  const region = "Europe";
  const result = filterCountries(mockCountries, "", region, "");
  expect(result).toEqual([mockCountries[1]]);
});

test("filters countries by language", () => {
  const language = "Japanese";
  const result = filterCountries(mockCountries, "", "", language);
  expect(result).toEqual([mockCountries[2]]);
});

test("filters countries by multiple criteria", () => {
  const searchTerm = "United";
  const region = "Americas";
  const language = "English";
  const result = filterCountries(mockCountries, searchTerm, region, language);
  expect(result).toEqual([mockCountries[0]]);
});

test("returns all countries when no filters are applied", () => {
  const result = filterCountries(mockCountries, "", "", "");
  expect(result).toEqual(mockCountries);
});
