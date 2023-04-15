import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import regionsList from './sort/regionsReducer'
import countriesByRegion from './sort/countriesByRegionReducer'
import searchCountry from './sort/searchCountryReducer'
import allCountries from './countries/fullCountriesReducer'
import favoriteCountries from './countries/favoriteReducer'
import infOfCountryData from './sort/infOfCountryReducer'
import neighbours from './sort/neighboringСountriesReducer'


export const store = configureStore({
    reducer: {
        regionsList,
        countriesByRegion,
        searchCountry,
        allCountries,
        favoriteCountries,
        infOfCountryData,
        neighbours
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector