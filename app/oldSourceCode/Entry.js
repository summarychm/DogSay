import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator, addNavigationHelpers, TabNavigator} from 'react-navigation';

import {GGTabBar} from "ggdomain/component";
import {Account, Creation, Edit} from 'ggdomain/pages';
//import {Account} from "./domain/pages/account";



/*const Router = StackNavigator({
  Account: {
    screen: Account,
    navigationOptions: {
      headerTitle: "Account账户页面"
    }
  }, Videcam: {
    screen: Videcam,
    navigationOptions: {
      header: () => null
    }
  }
});
// const App = ({ dispatch, nav }) =>  (
//   <Navigator
//     navigation={addNavigationHelpers({
//       dispatch,
//       state: nav
//     })}
//   />
// );
  Entry: Entry,

*/

export default class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      selectedTab: "videocam"
    };
    this.tabRouters = [{
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
    return (
      <View style={styles.container}>
        {/**/}
        <GGTabBar 
          index={this.state.index} 
          routes={this.tabRouters} 
          handleIndexChange={this.handleIndexChange}
        />
      </View>
    )
  }

  handleIndexChange = (index) => {
    this.setState({
      index: index,
      selectedTab: this.tabRouters[index].key
    })
  }
}

const styles = StyleSheet.create({
  container: {flex: 1}
})

