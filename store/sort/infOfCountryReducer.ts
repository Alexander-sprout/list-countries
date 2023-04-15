import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Country } from "../../types";


const infOfCountrySlice = createSlice({
    name: 'infOfCountryData',
    initialState: {
        country: [] as Country[]
    },
    reducers: {
        setInfOfCountry: (state, { payload }: PayloadAction<Country>) => {
            state.country = []
            state.country = [...state.country, payload]
        }
    }
})

export const { setInfOfCountry } = infOfCountrySlice.actions

export default infOfCountrySlice.reducer