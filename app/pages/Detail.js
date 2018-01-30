import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Video from 'react-native-video';

export default class Detail extends React.Component {
  render() {
    return (<View style={styles.container}>
      <Text>Recording</Text>
      <Video
        source={{
          uri: "http://www.zhangxinxu.com/study/media/cat.mp4",
          mainVer: 1,
          patchVer: 0
        }}
        rate={1.0}                   //是否暂停,0paused,1normal
        volume={1.0}                 // 音量控制,0静音,1正常,更大数字更大倍数
        muted={false}                // 是否静音
        paused={false}               // 是否暂停播放,加载完成就能播放
        resizeMode="cover"           // 视频填充模式
        repeat={true}                // 是否重复播放
        playInBackground={false}     //当app转到后台运行的时候，播放是否暂停
        playWhenInactive={false}     // 但打开控制或通知中心,是否停止播放. 仅适用于IOS
        onLoadStart={this.loadStart} // 视频开始加载回调
        onLoad={this.setDuration}    // 视频加载完成回调
        onProgress={this.setTime}    // 进度控制，每250ms调用一次，以获取视频播放的进度
        onEnd={this.onEnd}           // 播放完成回调
        onError={this.videoError}    // 当视频不能加载，或出错后的回调函数
        style={styles.backgroundVideo}
      />
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
