import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import styled from 'styled-components';

import {GGButton,TabBarBasic} from "ggdomain/component";
import {Account,Creation,Edit} from 'ggdomain/pages';

const StyleView=styled.View`
  flex:1;
`;

export default class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      selectedTab:"videocam"
    };
    this.tabRouters=[{
      key: "videocam",
      //title: "视频列表",
      iconName: "ios-videocam-outline",
      selectedIconName: "ios-videocam",
      Component: Creation
    }, {
      key: "recording",
      //title: "视频录制",
      iconName: "ios-recording-outline",
      selectedIconName: "ios-recording",
      Component: Edit
    }, {
      key: "userinfo",
      // title: "个人中心",
      iconName: "ios-more-outline",
      selectedIconName: "ios-more",
      Component: Account
    }]
  }

  render() {
    console.log(11);
    return (
      <StyleView >
        <TabBarBasic  index={this.state.index} routes={this.tabRouters}  handleIndexChange={this.handleIndexChange}/>
      </StyleView>
    )
  }
  handleIndexChange = (index) => {
    this.setState({
      index: index,
      selectedTab:this.tabRouters[index].key
    })
  }
}


