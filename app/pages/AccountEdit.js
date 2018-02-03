import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import Toast from 'react-native-easy-toast';

import {Config, Request, Tools} from 'saytools';

export default class AccountEdit extends React.Component {
  static navigationOptions = {
    title: "编辑狗狗信息",
    headerTintColor: '#eee',
  }

  constructor(props) {
    super(props);
    this.input = {};
    this.state = {
      submitDisabled: false,
      user: {},
      error: {
        nickname: false,
        breed: false,
        age: false,
      }
    }

  }

  componentDidMount() {
    //获取狗狗的基础信息
    Tools.GetUserData((data) => {
      console.log("data", data);
      this.setState({user: data});
    })
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);k
  }

  render() {
    console.log("render", this.state.user);
    let {user, error} = this.state;
    //昵称,品种,年龄,性别
    return (<View style={styles.container}>
      <View>
        <FormLabel>昵称</FormLabel>
        <FormInput
          ref={node => this.input.nickname = node}
          onChangeText={(text) => this._changeUserState('nickname', text)}
          value={user.nickname}
        />
        {error.nickname && <FormValidationMessage>请输入狗狗的昵称!</FormValidationMessage>}
      </View>
      <View>
        <FormLabel>品种</FormLabel>
        <FormInput
          ref={node => this.input.breed = node}
          onChangeText={(text) => this._changeUserState('breed', text)}
          value={user.breed}
        />
        {error.breed && <FormValidationMessage>请输入狗狗的品种!</FormValidationMessage>}
      </View>
      <View>
        <FormLabel>年龄</FormLabel>
        <FormInput
          ref={node => this.input.age = node}
          onChangeText={(text) => this._changeUserState('age', text)}
          keyboardType={'numeric'}
          value={user.age}
        />
        {error.age && <FormValidationMessage>请输入狗狗的年龄!</FormValidationMessage>}
      </View>
      <Button
        title="提交修改"
        icon={{name: "ios-checkmark", type: "ionicon", size: 32}}
        disabled={this.state.submitDisabled}
        backgroundColor={this.state.submitDisabled ? "#9E9E9E" : Config.Style.Color_Main}
        onPress={e => this._submit(e)}
      />
      <Toast ref={node => this.Toast = node}
             opacity={0.7}
             position='center'
      />
    </View>)
  }

  //保存用户的输入
  _changeUserState = (state, text) => {
    let user = this.state.user;
    user[state] = text;
    this._checkValue(state);
    this.setState({user: user});
  }

  //检查用户的输入是否符合规则
  _checkAllValue = () => {
    let flag = true;
    for (let item in  this.state.error) {
      if (!this._checkValue(item))
        flag = false;
    }
    return flag;
  }

  _checkValue = (name) => {
    let {user, error} = this.state;
    if (user[name] === undefined || (user[name].length === 0)) {
      this.input[name].shake();
      error[name] = true;
      return false;
    } else {
      error[name] = false;
    }
    return true;
  }
  //提交修改
  _submit = (e) => {
    e.preventDefault();
    this.setState({
      submitDisabled: true
    });
    if (!this._checkAllValue()) {
      this.setState({
        submitDisabled: false
      });
      return;
    }
    let user = this.state.user;
    let url = Config.URL.user + "/" + user.id;
    Request
      .put(url, user)
      .catch(err => {
        console.log("信息编辑失败!", err);
        this.Toast.show("信息编辑失败!");
      })
      .then(response => {
        // console.log("信息编辑成功",response);
        this.Toast.show("信息编辑成功!");
        Tools.SaveUserData(user, () => {
          console.log("编辑成功");
          this.timer = setTimeout(() => {
            this.props.navigation.goBack();
          }, 500);
        })
      });
    return;
  }


}

const styles = StyleSheet.create({
  container: {}
});
