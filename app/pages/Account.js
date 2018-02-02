import React from 'react';
import {ScrollView, View, Text, StyleSheet, ImageBackground} from 'react-native';
import {Button, Avatar} from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import ImagePicker from 'react-native-image-picker';

import {Config, Request} from 'saytools';
import Register from './Register';

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this._CheckUser();
  }


  render() {
    let user = this.state.user || {};
    user.avatar = user.avatar || "http://dummyimage.com/1280X720/79f2b2"
    if (!user.id)
      return (<View>
        <Text>请先登录</Text>
        <Toast ref={node => this.Toast = node}/>
      </View>);
    else {
      return (<ScrollView style={styles.container}>
        <View style={styles.headerView}>
          <ImageBackground
            source={{uri: user.avatar}}
            style={styles.backgroundImage}
          >
            <Avatar
              width={Config.Style.DeviceWidth * 0.2}
              height={Config.Style.DeviceWidth * 0.2}
              source={{uri: user.avatar}}
              imageProps={{resizeMode: 'cover'}}
              activeOpacity={0.7}
              containerStyle={styles.headerAvatar}
              onPress={this._pickPhoto}
              rounded
            />
          </ImageBackground>
        </View>
        <View style={styles.bodyView}>
          <Text> 个人信息 </Text>
          <Toast ref={node => this.Toast = node}/>
        </View>
      </ScrollView>)
    }

  }

  //更换Avatar
  _pickPhoto = () => {
    const options = {
      title: '选择头像',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '图片库',
      cameraType: 'back',
      mediaType: 'photo',
      videoQuality: 'high',
      durationLimit: 10,
      maxWidth: 600,
      maxHeight: 600,
      aspectX: 2,
      aspectY: 1,
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel)
        return null;
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = {uri: response.uri};
        //   let source = {uri: 'data:image/jpeg;base64,' + response.data};
        let user = this.state.user;
        user.avatar = source;
        this.setState({user: user});
      }
    });
    //上传照片到图床
  }

  //检测用户是否已登录
  _CheckUser = () => {
    //清空user数据 
   // storage.remove({key: 'user'});
    storage.load({key: 'user'})
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            this.props.navigation.navigate("Register");
            break;
          case 'ExpiredError':
            break;
        }
      })
      .then(response => {
        let user = response;
        user.avatar = user.avatar || "http://dummyimage.com/1280X720/79f2b2";
        this.setState({user: user})
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    height: Config.Style.DeviceHeight * 0.2,
//    backgroundColor: "blue",
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAvatar: {
    borderWidth: 2,
  },
  bodyView: {
    flex: 5,
    backgroundColor: "blue",
  },

});
