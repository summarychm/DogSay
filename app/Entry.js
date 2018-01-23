import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {GGButton} from "ggdomain/component";
// import Icon from 'react-native-vector-icons/Ionicons';

//自定义的支持图标和文本一起显示的TabBar组件
import TabBarBasic from './common/TabBarBasic'
//import TabBarIconExample from './example/TabBarIconExample';

const Video = () => (<Text>Video</Text>)
const List = () => (<Text>List</Text>)
const User = () => (<Text>User</Text>)
export default class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: "key1", title: "视频列表", icon: "ios-speedometer", Component: Video},
        {key: "key2", title: "视频录制", icon: "ios-basketball", Component: List},
        {key: "key3", title: "个人中心", icon: "ios-game-controller-b", Component: User}
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TabBarBasic tabs={this.state} handleIndexChange={this.handleIndexChange} />
      </View>

    )
    
    /*
    <Text>测试页面</Text>
        <Text>测试页面</Text>
        <GGButton backgroundColor={"red"} loading={this.state.loading} onPress={this.onPress} >测试按钮</GGButton>
    
    let tabAry = [
      {title: "视频列表", iconName: "ios-speedometer"},
      {title: "视频录制", iconName: "ios-basketball"},
      {title: "个人中心", iconName: "ios-game-controller-b"}
    ];
    return (
      <View style={styles.container}>
        <Text>View</Text>
        <BottomTabBar/>
      </View>
    );*/
  }
  handleIndexChange = (index) => {
    this.setState({
      index:index
    })
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#dd735c',
  }
});

