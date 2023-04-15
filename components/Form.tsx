import React from 'react'
import { Keyboard, Pressable, Text, TextInput } from 'react-native'
import styled from 'styled-components/native'
import { searchCountry, useAppDispatch } from '../store'



export const Form = () => {
    const dispatch = useAppDispatch()
    const [name, setName] = React.useState('')
    return (
        <Wrapper>
            <Input onChangeText={(text) => setName(text)} />
            <Button onPress={() => {
                dispatch(searchCountry(name))
                Keyboard.dismiss()
            }}>
                <Text>Поиск</Text>
            </Button>
        </Wrapper>
    )

}

const Wrapper = styled.View`
    height: 64px;
    width:90%;
    gap:10px;
    border:1px solid black;
    flex-direction:row;
    justify-content:center;
    align-items:center;
`

const Input = styled.TextInput`
    width:200px;
    height:40px;
    border:0.5px solid black;
    border-radius:13px;
`

const Button = styled.Pressable`
    width:120px;
    height:40px;
    border:0.5px solid black;
    justify-content:center;
    align-items:center;
    border-radius:13px;
`