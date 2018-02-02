import React from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Config} from 'saytools'
import Creation from '../pages/Creation';
import Detail from "../pages/Detail";
import Recording from '../pages/Recording';
import Account from '../pages/Account';
import AccountEdit from '../pages/AccountEdit';
import Register from '../pages/Register';

//创意视频相关栈
const CreationStack = StackNavigator({
  Creation: {
    screen: Creation,
    path: '/creation',
    navigationOptions: {
      title: "创意视频",
      headerStyle: {shadowOpacity: 0, height: 48, backgroundColor: Config.Style.Color_Main},
      headerTitleStyle: {color: '#fff', fontSize: 16, alignSelf: 'center'},
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
}, {
  navigationOptions: {
    // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)  
    headerStyle: {shadowOpacity: 0, height: 48, backgroundColor: Config.Style.Color_Main},
    headerTitleStyle: {color: '#fff', fontSize: 16}, //alignSelf:'center'  文字居中  
    headerBackTitleStyle: {color: '#fff', fontSize: 12},
    gesturesEnabled: true,//是否支持滑动返回收拾，iOS默认支持，安卓默认关闭  
  }
});

//账户相关Stack栈
const AccountStack = StackNavigator({
  Account: {
    screen: Account,
    path: '/account',
    navigationOptions: ({navigation}) => ({
      title: "账户详情",
      headerStyle: {backgroundColor: Config.Style.Color_Main},
      headerTintColor: '#eee',
      headerRight: <TouchableHighlight
        style={{marginRight: 20}}
        onPress={() => {
          navigation.navigate("AccountEdit")
        }}>
        <Text>编辑</Text>
      </TouchableHighlight>
    })
  },
  AccountEdit: {
    screen: AccountEdit,
    path: "/account/edit",
    navigationOptions: {
      title: "编辑狗狗信息",
      headerStyle: {backgroundColor: Config.Style.Color_Main},
      headerTintColor: '#eee',
    }
  },
}, {
  initialRouteName: "Account",
  navigationOptions: {
    // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)  
    headerStyle: {height: 48, backgroundColor: Config.Style.Color_Main},
    headerTitleStyle: {color: '#fff', fontSize: 16, alignSelf: 'center'},
    headerBackTitleStyle: {color: '#fff', fontSize: 12},
    gesturesEnabled: true,//是否支持滑动返回收拾，iOS默认支持，安卓默认关闭  
  },
});

//tabbar相关栈
const Tabs = TabNavigator({
  CreationStack: {
    screen: CreationStack,
    tabBarVisible:false, 
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
  initialRouteName: 'CreationStack',
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
export const AppRouters = StackNavigator({
  Register: {
    screen: Register,
    navigationOptions: {
      title: "登录创意视频",
      headerStyle: {backgroundColor: Config.Style.Color_Main},
      headerTintColor: '#eee',
    }
  },
  Tabs: {screen: Tabs}
}, {
  initialRouteName: "Register",
  
  navigationOptions: {
    // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)  
    headerStyle: {shadowOpacity: 0, height: 48, backgroundColor: Config.Style.Color_Main},
    headerTitleStyle: {color: '#fff', fontSize: 16, alignSelf: 'center'},
    headerBackTitleStyle: {color: '#fff', fontSize: 12},
    gesturesEnabled: true,//是否支持滑动返回收拾，iOS默认支持，安卓默认关闭  
  },
  mode: 'modal',
  headerMode: 'none',
});


/*
const defaultGetStateForAction = Tabs.router.getStateForAction;

Tabs.router.getStateForAction = (action, state) => {
  //页面是MeScreen并且 global.user.loginState = false || ''（未登录）  
  console.log("action", action,"state",state);
  
if (action.routeName ==='MeScreen'&& !global.user.loginState) {
    this.routes = [
      ...state.routes,
      {key: 'id-'+Date.now(), routeName: 'Login', params: { name: 'name1'}},
    ];
    return {
      ...state,
      routes,
      index: this.routes.length - 1,
    };
  }
  return defaultGetStateForAction(action, state);
}; */

