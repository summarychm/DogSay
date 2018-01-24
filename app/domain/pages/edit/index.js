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
  background-color: cornflowerblue;
`;

export class Edit extends React.Component {
  render() {
    return (
      <StyleView>
        <Text>Edit 页面</Text>
      </StyleView>
    )
  }
}
