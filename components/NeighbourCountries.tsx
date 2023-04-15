import React from 'react'
import styled from 'styled-components/native'
import { searchCountryByCode, useAppDispatch, useAppSelector } from '../store'

type Props = {
    targetCountryCioc: string
}

export const NeighbourCountries = ({ targetCountryCioc }: Props) => {
    const dispatch = useAppDispatch()
    const neighbourCountries = useAppSelector(({ allCountries }) => allCountries.countries.filter((c) => (
        c.borders?.includes(targetCountryCioc)
    )))

    return (
        <>
            {neighbourCountries.map(({ cca2, cioc, name }) => (
                <BorderCountryWrapper key={cca2}>
                    <BorderCountryButton onPress={() => {
                        dispatch(searchCountryByCode(cioc))
                    }}>
                        <BorderCountryText>
                            {name.common}
                        </BorderCountryText>
                    </BorderCountryButton>
                </BorderCountryWrapper>
            ))}
            {neighbourCountries.length === 0 && (
                <FeatureText>Отсутствуют</FeatureText>
            )}
        </>
    )
}

const BorderCountryButton = styled.Pressable`
    align-items: center;
    justify-content: center;
    max-width: 300px;
    width: 100%;
    border: 1px solid #1f93f1;
`

const BorderCountryWrapper = styled.View`
    margin-bottom:15px;
    align-items: center;
`

const FeatureText = styled.Text`
    font-size:15px;
    color: #000;
`

const BorderCountryText = styled.Text`
    font-size:20px;
`