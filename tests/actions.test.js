/**
 * @jest-environment jsdom
 */

import { beforeEach, test, expect } from "@jest/globals";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "jest-fetch-mock";
import { setCountries, fetchCountryDetails } from "../src/redux/actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

beforeEach(() => {
  fetchMock.resetMocks();
});

test("setCountries creates the correct action", () => {
  const countries = [{ name: "Country1" }, { name: "Country2" }];
  const expectedAction = {
    type: "SET_COUNTRIES",
    payload: countries,
  };

  expect(setCountries(countries)).toEqual(expectedAction);
});

test("fetchCountryDetails dispatches SET_SELECTED_COUNTRY on success", async () => {
  const countryCode = "USA";
  const countryData = { name: "United States" };
  fetchMock.mockResponseOnce(JSON.stringify([countryData]));

  const store = mockStore({});
  await store.dispatch(fetchCountryDetails(countryCode));

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: "SET_SELECTED_COUNTRY",
    payload: countryData,
  });
});

test("fetchCountryDetails handles fetch errors gracefully", async () => {
  const countryCode = "INVALID";
  fetchMock.mockRejectOnce(new Error("Failed to fetch"));

  const store = mockStore({});
  await store.dispatch(fetchCountryDetails(countryCode));

  const actions = store.getActions();
  expect(actions).toEqual([]); // No actions should be dispatched on error
});
