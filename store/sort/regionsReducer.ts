import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Region } from "../../types";
import axios from "axios";

export const fetchRegions = createAsyncThunk(
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


const regionsSlice = createSlice({
    name: 'regionsList',
    initialState: {
        regions: [] as Region[]
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRegions.fulfilled,
            (state, { payload }: PayloadAction<Region[]>) => {
                state.regions = payload
            })
    }
})




export default regionsSlice.reducer