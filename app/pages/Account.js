import React from 'react';
import {ScrollView, View, Text, StyleSheet, ImageBackground, TouchableHighlight} from 'react-native';
import Toast from 'react-native-easy-toast';
import {Button, Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

import Register from './Register';
import {Config, Request} from 'saytools';

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
    let options = {
      title: '选择头像',
      cancelButtonTitle: "取消",
      takePhotoButtonTitle: "拍照",
      chooseFromLibraryButtonTitle: "选择相册",
      quality: 0.75,//图像质量
      allowsEditing: true,
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
        // let source = {uri: response.uri};
        let source = {uri: 'data:image/jpeg;base64,' + response.data};
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
        console.log(response);
        response.avatar = response.avatar || "http://dummyimage.com/1280X720/79f2b2";
        this.setState({
          user: response
        })
      });
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width: Config.Style.DeviceWidth,
    //backgroundColor: 'red',
  },
  headerView: {
    flex: 1,
    // height: Config.Style.DeviceHeight * 0.3,
//    backgroundColor: "blue",
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: Config.Style.DeviceWidth,
    height: Config.Style.DeviceWidth * 0.4,
    // flex: 1,
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
