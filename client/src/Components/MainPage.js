import React, { Component } from 'react';
import styled from 'styled-components';

export class MainPage extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <MainPageDiv>
                Put your app content here.
            </MainPageDiv>
        );
    }
}

const MainPageDiv = styled.div`

`;