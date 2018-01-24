import React from 'react';
import {
  View,
  Text
} from 'react-native';
import styled from 'styled-components';
import {
  COLOR_BUTTON,
  PaddingTopVal
} from 'ggdomain/def';

const StyleView = styled.View`
  flex:1;
  background-color: #eee;
`;
const StyleHeaderVew=styled.View`
  padding-top: ${PaddingTopVal}px;
  padding-bottom: 12px;
  background-color: ${COLOR_BUTTON};
`;
const StyledHeaderText=styled.Text`
  color:#fff;
  font-size: 16px;
  text-align: center;
  font-weight: 600;
`;

export class Creation extends React.Component {
  render() {
    return (
      <StyleView>
        <StyleHeaderVew>
          <StyledHeaderText>列表页面</StyledHeaderText>
        </StyleHeaderVew>
        <Text>Creation 页面</Text>
      </StyleView>
    )
  }
}
