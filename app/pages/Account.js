import React from 'react';
import {ScrollView, View, Text, StyleSheet, ImageBackground, TouchableHighlight} from 'react-native';
import {Button, Avatar} from 'react-native-elements';
import Toast from 'react-native-easy-toast';
// import ImagePicker from 'react-native-image-picker';

import {Config, Request, Tools} from 'saytools';

export default class Account extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: "账户详情",
    headerTintColor: '#eee',
    headerRight: <TouchableHighlight
      style={{marginRight: 20}}
      onPress={() => {
        navigation.navigate("AccountEdit")
      }}>
      <Text>编辑</Text>
    </TouchableHighlight>
  })

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    Tools.GetUserData((response) => {
      if (response !== undefined) {
        let user = response;
        user.avatar = user.avatar || "http://dummyimage.com/1280X720/79f2b2";
        this.setState({user: user})
      }
    })
  }

  componentDidMount() {
  }

  render() {
    let user = this.state.user || {};
    console.log("user", user);
    return (<ScrollView style={styles.container}>
      <View style={styles.headerView}>
        <Avatar
          width={Config.Style.DeviceWidth * 0.26}
          height={Config.Style.DeviceWidth * 0.26}
          source={{uri: user.avatar}}
          imageProps={{resizeMode: 'cover'}}
          activeOpacity={0.7}
          containerStyle={styles.headerAvatar}
          overlayContainerStyle={{backgroundColor:"#eee"}}
          onPress={this._pickPhoto}
          rounded
        />
        <View style={styles.headerUserInfo}>
          <Text>昵称: {user.nickname}</Text>
          <Text>品种: {user.breed}</Text>
          <Text>年龄: {user.age}</Text>
          <Text>性别: {user.sex ? "女" : "男"}</Text>
        </View>
      </View>

      <View style={styles.bodyView}>
        <Text>已发布的创意视频</Text>
      </View>
      <View style={styles.signoutView}>
        <Button title={"退出登录"}
                icon={{name: "sign-out", type: "octicon"}}
                onPress={this._signOut}
        />
      </View>
      <Toast
        ref={node => this.ToastComponent = node}
        position='center'
      />
    </ScrollView>)
  }

  //登出事件
  _signOut = () => {
    Tools.RemoveUserData(() => {
      this.ToastComponent.show("退出登录成功!");
      this.timer = setTimeout(() => {
        console.log("跳转");
        this.props.navigation.navigate('Register');
      }, 500);
    });
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
      console.log("showImagePicker");
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#eee'
  },
  headerView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  headerAvatar: {
    flex: 1,
    backgroundColor:'white'
  },
  headerUserInfo: {
    flex: 1,
    alignSelf: 'flex-start',
    //backgroundColor: "#cc0"
  },
  bodyView: {
    flex: 5,
    backgroundColor: "#ccc",
  },
  signoutView: {
    marginTop: 20
  }
});
