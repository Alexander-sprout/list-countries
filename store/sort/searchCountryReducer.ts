import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Country } from "../../types";

export const searchCountry = createAsyncThunk(
    'searchCountries',
    async (name: string): Promise<Country[]> => {
        axios.get(`https://restcountries.com/v3.1/name/${name}`)
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
        const data = await response.data as Country[]
        return data
    }
)
export const searchCountryByCode = createAsyncThunk(
    'fetchCountriesByCode',
    async (code: string): Promise<Country[]> => {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`)
        const data = await response.data as Country[]
        return data
    }

)

const searchSlice = createSlice({
    name: "searchCountry",
    initialState: {
        countries: [] as Country[],
        searchingCountry: [] as Country[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        builder
            .addCase(searchCountry.fulfilled, (state, { payload }: PayloadAction<Country[]>) => {
                state.countries = payload
            })
            .addCase(searchCountryByCode.fulfilled, (state, { payload }: PayloadAction<Country[]>) => {
                state.searchingCountry = payload
            })
    },
})


export default searchSlice.reducer;

