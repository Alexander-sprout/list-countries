
import React from 'react'
import { Main } from './Main'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { InfOfCountry } from './components'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components/native'




export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <SafeArea>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Main} options={{ headerShown: false }} />
            <Stack.Screen name="Inf" component={InfOfCountry} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeArea>
  )
}


const SafeArea = styled.SafeAreaView`
  flex: 1;
  padding-top: 40px;
  padding-bottom: 40px;
`