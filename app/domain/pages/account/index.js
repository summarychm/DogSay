import React from 'react';
import {
  View,
  Text
} from 'react-native';
import styled from 'styled-components';

const StyleView = styled.View`
  flex:1;
  justify-content: center;
  align-items: center;
  background-color: #aaa;
`;

export class Account extends React.Component {
  render() {
    return (
      <StyleView>
        <Text>Account 页面</Text>
      </StyleView>
    )
  }
}
