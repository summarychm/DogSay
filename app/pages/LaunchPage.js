 
import React from 'react';
import {View, Text} from 'react-native';

export default class LaunchPage extends React.Component {
    render() {
    console.log(this.props);
   /* if (this.state.logined) {
      this.props.navigation.navigate("Register");
    } else {
      this.props.navigation.navigate("Account");
    }*/
    return (<View> 
      <Text>启动页</Text>
    </View>)
  }
}

  
