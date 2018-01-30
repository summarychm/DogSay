import React from 'react';

import {View, Text, StyleSheet, ImageBackground, TouchableHighlight} from 'react-native';
import {Card, Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons'

import {Request, Config} from 'saytools'

export const CreationItem = ({creation, _votedFn,_openPage}) => {
  creation = creation ? creation.item : {};
  return (<TouchableHighlight onPress={_openPage}>
    <Card containerStyle={styles.cardStyle}>
      <Text style={styles.title} numberOfLines={2} >{creation.title}</Text>
      <ImageBackground source={{uri: creation.thumb}} style={styles.thumb}>
        <Ionicons name='ios-play' size={30} style={styles.player}/>
      </ImageBackground>
      <View style={styles.cardFooter}>
        <Button
          icon={{name: 'ios-heart-outline', type: 'ionicon', style: {color: '#000'}}}
          backgroundColor='#fff'
          containerViewStyle={{flex: 1}}
          fontSize={20}
          textStyle={{color: "#000"}}
          title={'喜欢(' + creation.liketotal + ")"}
          onPress={() => _votedFn(creation)}
        />
        <Button
          icon={{name: 'ios-chatboxes-outline', type: 'ionicon', style: {color: '#000'}}}
          backgroundColor='#fff'
          containerViewStyle={{flex: 1}}
          fontSize={20}
          textStyle={{color: "#000"}}
          title='评论'/>
      </View>
    </Card>
  </TouchableHighlight>)
}

const styles = StyleSheet.create({
  cardStyle: {
    margin: 0,
    padding: 0,
  },
  title: {
    padding: 10,
    fontSize: 18,
    color: '#333',
  },
  thumb: {
    width: Config.Style.DeviceWidth,
    height: Config.Style.DeviceWidth * 0.56,
  },
  player: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 46,
    height: 46,
    paddingTop: 9,
    paddingLeft: 18,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 23,
    color: Config.Style.Color_Main
  },
  cardFooter: {
    flexDirection: 'row',
    flex: 1,
  }
});
