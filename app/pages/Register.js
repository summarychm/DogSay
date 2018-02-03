import React from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import {Button, Text} from 'react-native-elements';
import Toast from 'react-native-easy-toast';

import {CountDownText, Config, Request, Tools} from 'saytools';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSendCode: false,
      phoneNumber: "",
      phoneCode: "",
      user: {},
    }
    if (this.state.user.id !== undefined) {
      this.props.navigation.navigate("Tabs");
    }
  }

  componentDidMount() {
    console.log("componentDidMount");
    Tools.GetUserData((ret) => {
      console.log("ret", ret);
      this.setState({user: ret}, () => {
        //跳转到主页中
        if (ret !== undefined)
          this.props.navigation.navigate("Tabs");
      });
    });
  }

  render() {
    

    return (
      <View style={styles.container}>
        <Text h2>用户登录</Text>
        <TextInput style={styles.phoneNumber}
                   placeholder="请输入手机号"
                   onChangeText={(val) => this.setState({phoneNumber: val})}
                   keyboardType="numeric"
        />
        <View style={styles.codeView}>
          <TextInput style={styles.phoneCode}
                     onChangeText={(val) => this.setState({phoneCode: val})}
          />
          <View style={styles.countDown}>
            {this.state.isSendCode ?
              <CountDownText
                style={styles.countDownText}
                countType='seconds' // 计时类型：seconds / date
                auto={true} // 自动开始,false的话可通过ref.xxx.start()控制          
                timeLeft={5} // 正向计时 时间起点为0秒
                step={-1} // 计时步长，以秒为单位，正数则为正计时，负数为倒计时
                startText='获取验证码' // 开始的文本
                endText='获取验证码' // 结束的文本
                intervalText={(sec) => sec + '秒重新获取'} // 定时的文本回调
                afterEnd={() => {
                  this.setState({isSendCode: false})
                }} // 结束回调
              />
              :
              <Button
                title={"获取验证码"}
                buttonStyle={styles.phoneButton}
                onPress={() => {
                  this.setState({isSendCode: true})
                }}/>
            }
          </View>
        </View>
        <Button
          title="登录"
          buttonStyle={styles.registerButton}
          onPress={e => this._register(e)}/>
        <Toast
          ref={node => this.Toast = node}
          opacity={0.7}
          position='center'
        />
      </View>)
  }

  //登录
  _register = (e) => {
    e.preventDefault();
    if (!this.state.phoneNumber || !this.state.phoneCode) {
      this.Toast.show("请输入手机号和验证码!");
      return null;
    }
    let params = {
      phoneNumber: this.state.phoneNumber,
    }
    Request.get(Config.URL.user, params)
      .catch(error => {
        console.error("登录错误!", error);
      })
      .then(response => {
        console.log("response", response);
        //查看是否是老用户
        if (response.length !== 1) {
          //将该手机号注册为新用户          
          return Alert.alert("提示", "该手机号暂未注册,是否注册?", [
            {text: '注册', onPress: () => this._signup(params)},
            {
              text: '取消', onPress: () => {
                return;
              }
            },
          ]);
        } else {
          //老用户登录
          Tools.SaveUserData(response[0], () => {
            this.Toast.show("恭喜登录成功!");
            setTimeout(() => {
              this.props.navigation.navigate("Tabs");
            }, 500);
          })
        }
      })
  };

  //注册账户
  _signup = (params) => {
    params.accessToken = new Date().getTime() + "";
    Request.post(Config.URL.user, params)
      .catch(error => {
        console.error("注册错误!", error);
      })
      .then(response => {
        if (response.id) {
          Tools.SaveUserData(response, () => {
            this.Toast.show("注册成功!");
            setTimeout(() => {
              this.props.navigation.navigate("Tabs");
            }, 500);
          })
        }
        else
          console.log("注册账户错误,", response);
      })
  }

}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#eee',
  },
  phoneNumber: {
    width: Config.Style.DeviceWidth * 0.8,
    marginRight: 10,
    marginTop: 10,
  },
  codeView: {
    width: Config.Style.DeviceWidth * 0.8,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  phoneCode: {
    flex: 1,
    height: 50,
  },
  countDown: {
    flex: 1,
    height: 50,
  },
  phoneButton: {
    backgroundColor: Config.Style.Color_Main,
    borderRadius: 5,
  },
  countDownText: {
    marginLeft: 10,
    borderWidth: 1,
    flex: 1,
    backgroundColor: Config.Style.Color_Main,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    height: 50,
    lineHeight: 50,
  },
  registerButton: {
    margin: 10,
    width: Config.Style.DeviceWidth - 100,
    backgroundColor: Config.Style.Color_Main,
    borderRadius: 5,
  }
});

