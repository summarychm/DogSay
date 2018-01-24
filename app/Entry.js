import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {GGButton} from "ggdomain/component";
// import Icon from 'react-native-vector-icons/Ionicons';

//自定义的支持图标和文本一起显示的TabBar组件
import TabBarBasic from './domain/pages/common/TabBarBasic'

const Video = () => (<Text>Video</Text>)
const List = () => (<Text>List</Text>)
const User = () => (<Text>User</Text>)
export default class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 2,
      selectedTab:2
    };
    this.tabRouters=[{
      key: "videocam",
      //title: "视频列表",
      iconName: "ios-videocam-outline",
      selectedIconName: "ios-videocam",
      Component: Video
    }, {
      key: "recording",
      //title: "视频录制",
      iconName: "ios-recording-outline",
      selectedIconName: "ios-recording",
      Component: List
    }, {
      key: "userinfo",
      // title: "个人中心",
      iconName: "ios-more-outline",
      selectedIconName: "ios-more",
      Component: User
    }]
  }

  render() {
    console.log(11);
    return (
      <View style={styles.container}>
        <TabBarBasic  index={this.state.index} routes={this.tabRouters}  handleIndexChange={this.handleIndexChange}/>
      </View>
    )
  }
  handleIndexChange = (index) => {
    console.log(index);

    this.setState({
      index: index,
      selectedTab:this.tabRouters[index].key
    })
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  //  backgroundColor: '#dd735c',
  }
});

