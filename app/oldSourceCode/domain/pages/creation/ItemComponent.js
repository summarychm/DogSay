import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ImageBackground
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {ConstStyle, Device, ConstURL} from 'ggdomain/def';

//创意视频列表项组件
export const ItemComponent = ({item,_votedFn}) => {
  return (
    <TouchableHighlight>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <ImageBackground source={{uri: item.thumb}} style={styles.thumb}>
          <Ionicons name='ios-play' size={28} style={styles.player}/>
        </ImageBackground>
        <View style={styles.itemFooter}>
          <View style={styles.handleBox} >
            <Ionicons size={28}
                      name={item.voted ? 'ios-heart' : 'ios-heart-outline'}
                      style={[styles.Icon, item.voted && {color: ConstStyle.Color_Main}]}/>
            <Text style={styles.handleText} onPress={()=>_votedFn(!item.voted,item)} >喜欢</Text>
          </View>
          <View style={styles.handleBox}>
            <Ionicons name='ios-chatboxes-outline' size={28} style={styles.Icon}/>
            <Text style={styles.handleText}>评论</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width: Device.width,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  title: {
    padding: 10,
    fontSize: 18,
    color: '#333'
  },
  thumb: {
    width: Device.width,
    height: Device.width * 0.56,
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
    color: "#ed7b66"
  },
  //视频项底部footer
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee'
  },
  handleBox: {
    padding: 10,
    flexDirection: 'row',
    width: Device.width / 2 - 0.5,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  Icon: {
    fontSize: 22,
    color: '#333'
  },

  handleText: {
    paddingLeft: 12,
    fontSize: 18,
    color: '#333'
  }
})
