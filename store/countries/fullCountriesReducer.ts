import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

import { Country } from "../../types"


export const fecthAllCountries = createAsyncThunk(
    'fetchAllCounties',
    async (): Promise<Country[]> => {
        const response = await axios.get(`https://restcountries.com/v3.1/all`)
        return response.data as Country[]
    }
);

const fullListCountriesSlice = createSlice({
    name: 'allCountries',
    initialState: {
        countries: [] as Country[],
        countriesIsAdd: false as boolean,
        loading: true as boolean
    },
    reducers: {
        setCountriesIsAdd: (state, { payload }: PayloadAction<boolean>) => {
            state.countriesIsAdd = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fecthAllCountries.fulfilled,
                (state, { payload }: PayloadAction<Country[]>) => {
                    state.countries = payload
                    state.loading = false
                })
            .addCase(fecthAllCountries.pending, (state) => {
                state.loading = true
            })
            .addCase(fecthAllCountries.rejected, (state) => {
                state.loading = false
            })
    }
})


export const {
    setCountriesIsAdd
} = fullListCountriesSlice.actions

export default fullListCountriesSlice.reducer