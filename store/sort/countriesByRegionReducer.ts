import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

import { Country } from "../../types"


export const fetchCountriesByRegion = createAsyncThunk(
    'fetchCountriesByRegion',
    async (region: string): Promise<Country[]> => {
        const response = await axios.get(`https://restcountries.com/v3.1/region/${region}`)
        return response.data as Country[]
    }
);

const regionsSlice = createSlice({
    name: 'countriesByRegion',
    initialState: {
        countries: [] as Country[]
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCountriesByRegion.fulfilled,
            (state, { payload }: PayloadAction<Country[]>) => {
                state.countries = payload
            })
    }
})



export default regionsSlice.reducer