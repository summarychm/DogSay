import React from 'react';
import {ScrollView, View, Text, StyleSheet, ImageBackground, Alert} from 'react-native';

import Register from './Register';
import {Button, Avatar} from 'react-native-elements';
import {Config, Request} from 'saytools';

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount(message = "props") {
    console.log(message, this.props);
    storage.load({key: 'user'})
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            return Alert.alert("Account警告", "请先登录!", [
              {text: '确定', onPress: () => this.props.navigation.navigate("Register")},
            ]);
            break;
          case 'ExpiredError':
            break;
        }
      })
      .then(response => {
        this.setState({
          user: response
        })
      });
  }

  render() {
    let user = this.state.user || {};
    console.log(user);
    if (!user.id)
      return <Text>还未登录</Text>;
    else {
      return (<ScrollView style={styles.container}>
        <View style={styles.header}>
          {/*<ImageBackground
            sourse={{uri: user.avatar}}
            style={styles.backgroundImage}
          >
            <Avatar
              width={Config.Style.DeviceWidth * 0.2}
              height={Config.Style.DeviceWidth * 0.2}
              source={{uri: user.avatar}}
              imageProps={{resizeMode: 'cover'}}
              activeOpacity={0.7}
              rounded
            />
          </ImageBackground>*/}
        </View>
        <View>
          <Text>个人信息</Text>
        </View>

      </ScrollView>)
    }

  }
}

const styles = StyleSheet.create({
  container: {
    width: Config.Style.DeviceWidth,
    backgroundColor: 'red',
  },
  backgroundImage: {
    width: Config.Style.DeviceWidth,
    height: Config.Style.DeviceWidth * 0.4
  }
});
