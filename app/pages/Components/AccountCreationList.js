'use strict';
import React from 'react';
import {Alert, View, Text, FlatList, StyleSheet, ScrollView} from 'react-native';

import {Request, Config, Tools} from 'saytools'
import {CreationItem} from './CreationItem';

export default class AccountCreationList extends React.Component {
  constructor(props) {
    super(props);
    this.cacheData = {
      limit: 10,
      total: 30,
    }
    this.state = {
      creations: [],
      user: {}
    };
  }

  componentDidMount() {
    Tools.GetUserData((response) => {
      if (response !== undefined) {
        let user = response;
        user.avatar = user.avatar || "http://dummyimage.com/1280X720/79f2b2";
        this.setState({user: user},()=>{
          this._fetchData();
        })
      }
    })
   
  }

  render() {
    console.log("render",this.state.creations);
    return (
      <View style={styles.bodyView}>
        <ScrollView>
          <Text h3>已发布的创意视频</Text>
          <FlatList
            data={this.state.creations}
            renderItem={creation =>
              <CreationItem creation={creation}
                            _votedFn={() => {
                              Alert.alert("提示", "您无法给自己投票!")
                            }}
                            _openPage={() => {
                            }}/>}
            keyExtractor={creation => creation.id}
            //消除IOS下顶部空白
            automaticallyAdjustContentInsets={false}
            //是否显示Y轴滚动条
            showsVerticalScrollIndicator={true}
          />
        </ScrollView>
      </View>
    )
  }

  //加载更多数据
  _fetchData = () => {
    let url = Config.URL.creation + "?q=13012345786";
    Request.get(url).then(data => {
      console.log("data", data,url);
      this.setState({
        creations: data
      });
    }).catch(error => {
      console.error("_fetchData方法出错,", error)
    });
  }
}

const styles = StyleSheet.create({});
