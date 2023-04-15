import React, { useEffect } from 'react'
import { ActivityIndicator, Text } from 'react-native'


import styled from 'styled-components/native'
import { fecthAllCountries, setCountriesIsAdd, useAppDispatch, useAppSelector } from '../store'
import { Country } from '../types'
import { loadFavoriteCountries, setFavotitesIsView } from '../store/countries/favoriteReducer'
import { CountryItem } from './CountryItem'


export const CountriesList = () => {
    const [countryList, setCountryList] = React.useState<Country[]>([])
    const { allCountries, loading } = useAppSelector(({ allCountries }) => ({
        allCountries: allCountries.countries,
        loading: allCountries.loading
    }))
    const countries = useAppSelector(({ countriesByRegion }) => countriesByRegion.countries)
    const resultSearchCountry = useAppSelector(({ searchCountry }) => searchCountry.countries)
    const allCouinriesIsAdd = useAppSelector(({ allCountries }) => allCountries.countriesIsAdd)
    const favoriteCountry = useAppSelector(({ favoriteCountries }) => favoriteCountries.favorites)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (countries.length !== countryList.length) {
            setCountryList(countries)
            dispatch(setFavotitesIsView(false))
        }
        if (resultSearchCountry.length !== countryList.length) {
            setCountryList(resultSearchCountry)
            dispatch(setFavotitesIsView(false))
        }
    }, [countries, resultSearchCountry])

    useEffect(() => {
        if (allCountries.length !== countryList.length && !resultSearchCountry.length && !countries.length) {
            setCountryList(allCountries)
        }
    }, [allCountries])

    useEffect(() => {
        dispatch(setCountriesIsAdd(true))
        if (!allCountries.length && !allCouinriesIsAdd) {
            dispatch(loadFavoriteCountries())
            dispatch(fecthAllCountries())
            dispatch(setCountriesIsAdd(true))
        }
    }, [])
    return (
        <Wrapper>
            {countryList.length > 0 && !loading && (
                <List>
                    {countryList.map((el: Country, index) => (
                        <CountryItem
                            country={el}
                            key={index}
                        />
                    ))
                    }
                </List>
            )}
            {loading && (
                <ActivityIndicator />
            )}
            <FavoriteButtonWrapper>
                <FavoriteButton onPress={() => {
                    setCountryList(favoriteCountry)
                    dispatch(setFavotitesIsView(true))
                }}>
                    <Text>
                        Избранные страны
                    </Text>
                </FavoriteButton>
            </FavoriteButtonWrapper>
        </Wrapper>
    )
}
const Wrapper = styled.View`
    padding:7px;
    gap:10px;
    flex-shrink: 1;
    flex-grow: 1;
    width: 100%;
    border:1px solid black;
    flex-direction: column;
    box-sizing: border-box;
`

const List = styled.ScrollView`
    flex-grow:1;
    flex-shrink:1;
`




const FavoriteButton = styled.Pressable`
    justify-content:center;
    align-items:center;
    width:120px;
    height:30px;
    border:0.5px solid black;
    background-color:white;
    border-radius:10px;
`

const FavoriteButtonWrapper = styled.View`
    flex-grow: 1;
    flex-shrink: 1;
`
