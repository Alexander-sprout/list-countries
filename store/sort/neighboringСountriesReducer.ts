import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Country } from "../../types";
import axios from "axios";

export const searchNeighbordingCountries = createAsyncThunk(
    'fetchRegions',
    async () => {
        const { data } = await axios.get('https://restcountries.com/v3.1/all?fields=region')
        return data.reduce((total, item: Region) => {
            if (!total.some(el => el.region === item.region)) {
                total = [...total, item]
            }
            return total;
        }, []);
    }
)


const neighbourSlice = createSlice({
    name: 'neighbours',
    initialState: {
        countries: [] as Country[]
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(searchNeighbordingCountries.fulfilled,
            (state, { payload }: PayloadAction<Country[]>) => {
                state.countries = payload
            })
    }
})




export default neighbourSlice.reducer