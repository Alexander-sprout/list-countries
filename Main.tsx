import React from 'react';
import styled from 'styled-components/native';

import { Form } from './components/Form';
import { CountriesList, RegionsList } from './components';

export const Main = () => {
    return (
        <Wrapper>
            <RegionsList />
            <Form />
            <CountriesList />
        </Wrapper>
    );
};

const Wrapper = styled.View`
    flex-direction:column;
    gap:10px;
    width:100%;
    box-sizing: border-box;
    max-height: 100%;
    align-items:center;
` 