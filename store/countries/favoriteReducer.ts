import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Country } from '../../types'

const COUNTRY_KEY = 'favoriteCountries'


export const addFavoriteCountry = createAsyncThunk(
    'addFavoriteCountries',
    async (country: Country) => {
        const favoriteStorage = await AsyncStorage.getItem(COUNTRY_KEY)
        const favoriteCountries = favoriteStorage ? JSON.parse(favoriteStorage) : []
        if (favoriteCountries.some(item => item.name.common === country.name.common)) {
            console.log('stop')
            return favoriteCountries
        }
        favoriteCountries.push(country)
        await AsyncStorage.setItem(COUNTRY_KEY, JSON.stringify(favoriteCountries))
        return favoriteCountries
    }
)
export const loadFavoriteCountries = createAsyncThunk(
    'loadFavoriteCountries',
    async () => {
        const favoriteStorage = await AsyncStorage.getItem(COUNTRY_KEY)
        return favoriteStorage ? JSON.parse(favoriteStorage) : []
    }
)


const favoritesSlice = createSlice({
    name: 'favoriteCountries',
    initialState: {
        favorites: [] as Country[],
        favoritesIsView: false as boolean
    },
    reducers: {
        setFavotitesIsView: (state, { payload }: PayloadAction<boolean>) => {
            state.favoritesIsView = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addFavoriteCountry.fulfilled, (state, { payload }) => {
                state.favorites = payload
            })
            .addCase(loadFavoriteCountries.fulfilled, (state, { payload }) => {
                state.favorites = payload
            })

    }
})

export const { setFavotitesIsView } = favoritesSlice.actions

export default favoritesSlice.reducer
