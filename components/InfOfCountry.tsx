import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import styled from 'styled-components/native'
import { searchCountryByCode, useAppDispatch, useAppSelector } from '../store'
import { Country } from '../types'
import { NeighbourCountries } from './NeighbourCountries'

export const InfOfCountry = ({ navigation }) => {
    const { hasSearchCountry, searchCountryCioc, searchCountryEl } = useAppSelector(({ searchCountry }) => searchCountry.searchingCountry.length > 0
        ? ({
            hasSearchCountry: true,
            searchCountryCioc: searchCountry.searchingCountry[0].cioc,
            searchCountryEl: searchCountry.searchingCountry[0]
        })
        : ({
            hasSearchCountry: false
        }))
    const allCountries = useAppSelector(({ allCountries }) => allCountries.countries)

    const country = useAppSelector(({ infOfCountryData }) => infOfCountryData.country)

    const countriesToRender = hasSearchCountry
        ? allCountries.filter((el) => el.borders?.includes(searchCountryCioc as string))
        : country


    return (
        <Wrapper>
            <BackButton onPress={() => navigation.navigate('Home')}>
                <Text>
                    Назад
                </Text>
            </BackButton>
            <Content>
                {countriesToRender.map((el: Country, index) => {
                    return (
                        <Container
                            key={index}
                        >
                            <FeatureContainer>
                                <FeatureText>Название : {el.name.common}</FeatureText>
                                <FeatureText>Столица : {el.capital}</FeatureText>
                                <FeatureText>Население : {el.population}</FeatureText>
                                <FeatureText>Площадь : {el.area}</FeatureText>
                                <FeatureText>Код страны : {el.cca2}</FeatureText>
                                {el.languages && Object.keys(el.languages).length > 0 &&
                                    <FeatureText>Языки : {Object.entries(el.languages)
                                        .map((el) => el[1])
                                        .map((languages, id) => {
                                            return (
                                                <FeatureText key={id}>{languages + ', '}</FeatureText>
                                            )
                                        })}</FeatureText>
                                }
                                <FeatureText>Соседние страны : </FeatureText>
                                <NeighbourCountries
                                    targetCountryCioc={countriesToRender[0].cioc}
                                />
                            </FeatureContainer>
                            <View style={{ 'marginBottom': 15 }}>
                                <Flag>
                                    {el.flag}
                                </Flag>

                            </View>
                        </Container>
                    )
                })
                }
            </Content>
        </Wrapper>
    )
}
const Wrapper = styled.View`
    margin:auto;
    padding:7px;
    height:90%;
    width:90%;
    gap:10px;
    border:1px solid black;
    flex-direction:column;
    flex-wrap:wrap;
`

const Container = styled.View`
    flex-direction:row;
    margin:auto;
`

const Flag = styled.Text`
    margin-top:-17px;
    font-size:70px;
`

const FeatureContainer = styled.View`
    width:250px;
    height:250px;
    border:1px solid black;
    margin-left:7px;
    padding:3px;
    `

const FeatureText = styled.Text`
    font-size:15px;
`

const Content = styled.ScrollView`
    flex-grow: 1;
    flex-shrink: 1;
`

const BackButton = styled.Pressable`
    width:150px;
    height:50px;
    border:0.5px solid black;
    justify-content:center;
    align-items:center;
`