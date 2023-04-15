import React, { useEffect } from 'react'
import { ScrollView, Text } from 'react-native'
import styled from 'styled-components/native'


import { fetchCountriesByRegion, fetchRegions, useAppDispatch, useAppSelector } from '../store'


export const RegionsList = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchRegions())
    }, [])
    const regions = useAppSelector(({ regionsList }) => regionsList.regions)
    return (
        <Wrapper>
            <ScrollView horizontal={true}>
                <Container>
                    {regions.map((el, id) => {
                        return (
                            <CountryWrapper
                                key={id}
                                onPress={() => {
                                    dispatch(fetchCountriesByRegion(el.region))
                                }}
                            >
                                <CategoryName>
                                    {el.region}
                                </CategoryName>
                            </CountryWrapper>
                        )
                    })}
                </Container>
            </ScrollView>
        </Wrapper>


    )

}

const Wrapper = styled.View`
    height: 64px;
    width:90%;
    border:1px solid black;
    padding:7px;
`

const CountryWrapper = styled.Pressable`
    width:80px;
    height:30px;
    border:0.5px solid black;
    border-radius:10px;
    justify-content:center;
    align-items:center;
`

const CategoryName = styled.Text`
    font-size:20px

`

const Container = styled.View`
flex-direction:row;
    gap:7px;
align-items:center;
`