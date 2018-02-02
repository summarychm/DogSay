import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import Toast from 'react-native-easy-toast';

import {Config, Request} from 'saytools';

export default class AccountEdit extends React.Component {
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

  render() {
    let {user, error} = this.state;
    //昵称,品种,年龄,性别
    return (<View style={styles.container}>
      <Text>{user.id}</Text> 
      <View>
        <FormLabel>昵称</FormLabel>
        <FormInput
          ref={node => this.input.nickname = node}
          onChangeText={(text) => this._changeUserState('nickname', text)}
          value={user.nickname || ""}
        />
        {error.nickname && <FormValidationMessage>请输入狗狗的昵称!</FormValidationMessage>}
      </View>
      <View>
        <FormLabel>品种</FormLabel>
        <FormInput
          ref={node => this.input.breed = node}
          onChangeText={(text) => this._changeUserState('breed', text)}
          value={user.breed || ""}
        />
        {error.breed && <FormValidationMessage>请输入狗狗的品种!</FormValidationMessage>}
      </View>
      <View>
        <FormLabel>年龄</FormLabel>
        <FormInput
          ref={node => this.input.age = node}
          onChangeText={(text) => this._changeUserState('age', text)}
          keyboardType={'numeric'}
          value={user.age || ""}
        />
        {error.age && <FormValidationMessage>请输入狗狗的年龄!</FormValidationMessage>}
      </View>
      <Button
        title="提交修改"
        icon={{name: "ios-checkmark", type: "ionicon", size: 32}}
        disabled={this.state.submitDisabled}
        backgroundColor={this.state.submitDisabled ? "#9E9E9E" : Config.Style.Color_Main}
        onPress={this._submit}
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
    this.setState({user: user});
  }
  //检查用户的输入是否符合规则
  _checkValidation = () => {
    let flag = true;
    let {user, error} = this.state;
    for (let item in  error) {
      console.log(item, !!item, user[item], this.input[item]);
      //空值进行shake提示 
      if (user[item] === undefined || (user[item].length = 0)) {
        this.input[item].shake();
        error[item] = true;
        flag = false;
      }
    }
    return flag;
  }

  //提交修改
  _submit = () => {
    this.setState({
      submitDisabled: true
    });
    if (!this._checkValidation()) {
      this.setState({
        submitDisabled: false
      });
      return;
    }
    let user = this.state.user;
    let url = Config.URL.creation + "/" + user.id;
    Request
      .put(url, user)
      .catch(err => {
        console.log("信息编辑失败!", err);
        this.Toast.show("信息编辑失败!");
      })
      .then(response => {
        this.Toast.show("信息编辑成功!");
       /* setTimeout(() => {
          this.props.navigation.goBack();
        }, 200)*/
      });


  }


}

const styles = StyleSheet.create({
  container: {}
});
