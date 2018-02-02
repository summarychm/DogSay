import React from 'react';
import {Text, View,TouchableHighlight} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Config} from 'saytools'
import Creation from '../pages/Creation';
import Recording from '../pages/Recording';
import Detail from "../pages/Detail";
import Register from '../pages/Register';
import Account from '../pages/Account';
import AccountEdit from '../pages/AccountEdit';

const CreationStack = StackNavigator({
  Creation: {
    screen: Creation,
    path: '/creation',
    navigationOptions: {
      title: "创意视频",
      headerStyle: {backgroundColor: Config.Style.Color_Main},
      headerTintColor: '#eee',
    }
  },
  Detail: {
    screen: Detail,
    path: '/detail',
    navigationOptions: {
      title: "创意详情",
      headerStyle: {backgroundColor: Config.Style.Color_Main},
      headerTintColor: '#eee',
    }
  }
});
const AccountStack = StackNavigator({
  Account: {
    screen: Account,
    path: '/account',
    navigationOptions: ({navigation}) => ({
      title: "账户详情",
      headerStyle: {backgroundColor: Config.Style.Color_Main},
      headerTintColor: '#eee',
      headerRight: <TouchableHighlight
        style={{marginRight:20}}
        onPress={() => { navigation.navigate("AccountEdit") }}>
        <Text>编辑</Text>
      </TouchableHighlight>
    })
  },
  Register: {
    screen: Register,
    path: '/register',
    navigationOptions: {
      title: "登录创意视频",
      headerStyle: {backgroundColor: Config.Style.Color_Main},
      headerTintColor: '#eee',
    }
  },
  AccountEdit: {
    screen: AccountEdit,
    path: "/account/edit",
    navigationOptions: {
      title: "编辑狗狗信息",
      headerStyle: {backgroundColor: Config.Style.Color_Main},
      headerTintColor: '#eee',
    }
  } 
},{
 // initialRouteName:"AccountEdit"
});

export const Tabs = TabNavigator({
  CreationStack: {
    screen: CreationStack,
    navigationOptions: {
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons size={26}
                  name={focused ? "ios-videocam" : "ios-videocam-outline"}
                  style={{color: tintColor}}
        />
      )
    }
  },
  RecordingStack: {
    screen: Recording,
    path: '/recording',
    navigationOptions: {
      title: "制作视频",
      headerStyle: {backgroundColor: Config.Style.Color_Main},
      headerTintColor: '#eee',
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons size={26}
                  name={focused ? "ios-recording" : "ios-recording-outline"}
                  style={{color: tintColor}}
        />
      )
    }
  },
  AccountStack: {
    screen: AccountStack,
    navigationOptions: {
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons size={26}
                  name={focused ? "ios-more" : "ios-more-outline"}
                  style={{color: tintColor}}
        />
      )
    }
  },
}, {
  initialRouteName: 'AccountStack',
  tabBarPosition: "bottom",
  animationEnabled: true,
  tabBarOptions: {
    showIcon: true,
    swipeEnabled: true,
    showLabel: false,
    activeTintColor: Config.Style.Color_Main,
    inactiveTintColor: "#333",
    style: {backgroundColor: "#eee"}
  }
});

