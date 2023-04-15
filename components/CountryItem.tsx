import React from 'react'
import { addFavoriteCountry, setInfOfCountry, useAppDispatch, useAppSelector } from '../store'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { Country } from '../types'
import { Text, View } from 'react-native'

type Props = {
    country: Country
}

export const CountryItem = ({ country }: Props) => {
    const navigation = useNavigation<any>()
    const favoriteIsView = useAppSelector(({ favoriteCountries }) => favoriteCountries.favoritesIsView)
    const dispatch = useAppDispatch()

    const { name, capital, population, cca2, area, languages } = country
    return (
        <Container
            onPress={() => {
                dispatch(setInfOfCountry(country))
                navigation.navigate('Inf')
            }}
        >
            <View style={{ 'marginBottom': 15 }}>
                <Flag favoriteIsView={favoriteIsView}>
                    {country.flag}
                </Flag>
                {!favoriteIsView &&
                    <AddFromFavorites onPress={() => {
                        dispatch(addFavoriteCountry(country))
                    }}>
                        <Text>
                            В избранное
                        </Text>
                    </AddFromFavorites>
                }
            </View>
            <FeatureContainer>
                <FeatureText>Название : {name.official}</FeatureText>
                <FeatureText>Столица : {capital}</FeatureText>
                <FeatureText>Население : {population}</FeatureText>
                <FeatureText>Площадь : {area}</FeatureText>
                <FeatureText>Код страны : {cca2}</FeatureText>
                {languages && Object.keys(languages).length > 0 &&
                    <FeatureText>Языки : {Object.entries(languages)
                        .map((el) => el[1])
                        .map((languages, id) => {
                            return (
                                <FeatureText key={id}>{languages + ', '}</FeatureText>
                            )
                        })}</FeatureText>
                }
            </FeatureContainer>
        </Container>
    )
}


const Container = styled.TouchableOpacity`
    flex-direction:row;
    margin:auto;
`

export type FlagProps = {
    favoriteIsView: boolean
}

const Flag = styled.Text<FlagProps>`
    font-size:70px;
    margin-top: ${({ favoriteIsView }) =>
    (favoriteIsView
        ? '0px'
        : '-15px')};
`

const FeatureContainer = styled.View`
    width:250px;
    height:100px;
    border:1px solid black;
    margin-left:7px;
    padding:3px;
`

const FeatureText = styled.Text`
    font-size:9px;
`

const AddFromFavorites = styled.Pressable`
    width:80px;
    height:30px;
    border:0.5px solid black;
    border-radius:10px;
    justify-content:center;
    align-items:center;
`