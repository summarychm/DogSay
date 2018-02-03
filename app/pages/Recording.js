import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

import {Config} from 'saytools';

export default class Recording extends React.Component {
  render() {
    return (<View style={styles.container}>
      <View style={styles.headerView}>
        <Button
          icon={{name: 'cloud-upload', size: 20}}
          title={"上传狗狗视频"}
          buttonStyle={{backgroundColor:Config.Style.Color_Main}}
        />
      </View>
      <View style={styles.bodyView}>

      </View>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyView: {
    flex: 1,
  }
});
