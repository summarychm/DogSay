import React from 'react';
import {ActivityIndicator, Image, View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import {Config} from 'saytools';
import DetailCommit from './Components/DetailCommit'

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoLoaed: false, //是否加载成功
      videoPlay: false, //播放状态,true播放中,false 暂停
      videoProgress: 0.01,//播放进度
      videoTotal: 0, //视频总长
      currentTime: 0, //当前播放时间
      videoOk: false, //是否有错误
    }
  }

  render() {
    let creation = this.props.navigation.state.params ? this.props.navigation.state.params.creation.item : {};
    return (<View style={styles.container}>
      <TouchableHighlight onPress={this._onPress}>
        <View style={styles.videoBox}>
          <Video
            source={{
              uri: "https://www.w3cschool.cn/statics/demosource/movie.mp4",
              mainVer: 1,
              patchVer: 0
            }}
            volume={3.0}                 // 音量控制,0静音,1正常,更大数字更大倍数
            muted={false}                // 是否静音
            paused={this.state.videoPlay} // 是否暂停播放,加载完成就能播放
            resizeMode="cover"           // 视频填充模式
            repeat={false}                // 是否重复播放
            playInBackground={false}     // 当app转到后台运行的时候，播放是否暂停
            onLoad={this._onVideoLoad}   // 视频加载完成回调
            onProgress={this._onProgress}// 进度控制，每250ms调用一次，以获取视频播放的进度
            onEnd={this._onEnd}           // 播放完成回调
            onError={this._videoError}    // 当视频不能加载，或出错后的回调函数
            style={styles.backgroundVideo}
            onPress={this._onPress}
          />
          {/*loading*/}
          {!this.state.videoLoaed
          && <ActivityIndicator
            color={Config.Style.Color_Main}
            style={styles.loading}
          />}
          {/*暂停/恢复播放功能*/}
          {this.state.videoLoaed && this.state.videoPlay
          && <Ionicons
            name='ios-play' size={40}
            style={styles.player}
          />}
          {this.state.videoOk && <Text style={styles.failText}>视频播放出错,请稍后再试!</Text>}

        </View>
      </TouchableHighlight>
      {/*播放进度条*/}
      <View style={styles.progressBox}>
        <View style={[styles.progressBar, {
          width: Config.Style.DeviceWidth * this.state.videoProgress
        }]}></View>
      </View>
      {/*创作者信息*/}
      <View style={styles.infoBox}>
        <Image source={{uri: creation.author.avatar}} style={styles.avatar}/>
        <View style={styles.descBox}>
          <Text style={styles.nickname}>{creation.author.nickname}</Text>
          <Text style={styles.title}>{creation.title}</Text>
        </View>
      </View>
      {/*评论详情*/}
      <DetailCommit creationId={creation.id}/>
    </View>)
  }

  _onPress = () => {
    console.log("onpress");
    this.setState(oldState => {
      let newState = _.extend(oldState);

      if (newState.videoProgress === 1) { //重新播放
        newState.videoPlay = true;
        newState.videoProgress = 0.01;
      } else {
        console.log("else", oldState.videoPlay);
        newState.videoPlay = oldState.videoPlay ? false : true;
      }
      console.log(newState, oldState);
      return newState;
    })
  }
  _onVideoLoad = () => {
    if (!this.state.videoLoaed)
      this.setState({videoLoaed: true})
  }
  _onProgress = (data) => {
    let duration = data.playableDuration;
    let currentTime = data.currentTime;
    let percent = Number((currentTime / duration).toFixed(2));
    this.setState({
      videoTotal: duration,
      currentTime: Number(data.currentTime.toFixed(2)),
      videoProgress: percent,
    })
  }
  _onEnd = () => {
    this.setState({
      videoProgress: 1
    })
  }
  _videoError = (err) => {
    console.log("视频播放出错", err);
    this.setState({
      videoOk: true
    })
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  videoBox: {
    width: Config.Style.DeviceWidth,
    height: Config.Style.DeviceWidth * 0.56,
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: 80,
    width: Config.Style.DeviceWidth,
    //backgroundColor: '#000'
  },
  failText: {
    position: 'absolute',
    left: 0,
    top: 80,
    width: Config.Style.DeviceWidth,
    textAlign: 'center',
    color: "#fff",
    backgroundColor: 'transparent'
  },
  player: {
    position: 'absolute',
    left: Config.Style.DeviceWidth / 2 - 20,
    top: 100,
    width: 46,
    height: 46,
    paddingTop: 6,
    paddingLeft: 15,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 23,
    color: Config.Style.Color_Main
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  progressBox: {
    width: Config.Style.DeviceWidth,
    height: 2,
    backgroundColor: '#ccc',
  },
  progressBar: {
    width: 1,
    height: 2,
    backgroundColor: Config.Style.Color_Main
  },

  infoBox: {
    flexDirection: "row",
    margin: 0,
    padding: 0,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 30,
  },
  descBox: {
    flex: 1
  },
  nickname: {
    fontSize: 18,
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    color: "#666"
  },
});
