import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Config} from 'saytools'
import Creation from '../pages/Creation';
import Recording from '../pages/Recording';
import Account from '../pages/Account';
import Detail from "../pages/Detail";
import Register from '../pages/Register';


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
    navigationOptions: {
      title: "账户详情",
      headerStyle: {backgroundColor: Config.Style.Color_Main},
      headerTintColor: '#eee',
    }
  }
});
const RecordingStack = StackNavigator({
  Recording: {
    screen: Recording,
    path: '/recording',
    navigationOptions: {
      title: "制作视频",
      headerStyle: {backgroundColor: Config.Style.Color_Main},
      headerTintColor: '#eee',
    }
  }
});
const RegisterStack = StackNavigator({
  Recording: {
    screen: Register,
    path: '/Register',
    navigationOptions: {
      title: "注册登录视频",
      headerStyle: {backgroundColor: Config.Style.Color_Main},
      headerTintColor: '#eee',
    }
  }
});

export const Tabs = TabNavigator({
  RegisterStack: {
    screen: RegisterStack,
    navigationOptions: {
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons size={26}
                  name={focused ? "ios-aperture" : "ios-aperture-outline"}
                  style={{color: tintColor}}
        />
      )
    }
  },
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
    screen: RecordingStack,
    navigationOptions: {
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

