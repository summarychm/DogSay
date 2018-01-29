import React from 'react';
import {View, Text, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {Card, Button} from 'react-native-elements';

import {Request, Config} from 'saytools'
import CreationItem from './CreationItem';

export default class Creation extends React.Component {
  constructor(props) {
    super(props);
    this.cacheData = {
      limit: 10,
      total: 30,
    }
    this.state = {
      nextIndex: 1,
      isLoadingTail: false,//是否加载中
      isRefreshing: false,//是否刷新中
      creations: []
    };
  }

  componentDidMount() {
    this._fetchData(this.state.nextIndex)
  }

  render() {
    return (<View>
      <FlatList
        data={this.state.creations}
        renderItem={creation => <CreationItem creation={creation}/>}
        keyExtractor={creation => creation._id}
        //消除IOS下顶部空白
        automaticallyAdjustContentInsets={false}
        //是否显示Y轴滚动条
        showsVerticalScrollIndicator={true}
        //距离底部20dp触发就触发onEndReached回调
        onEndReachedThreshold={0.5}
        //触底刷新事件
        onEndReached={this._fetchMore}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            progressBackgroundColor="#eee"
          />
        }
      >
      </FlatList>
    </View>)
  }
  //下拉刷新
  _onRefresh() {
    this._fetchData(this.state.nextIndex);
  }
  //加载更多数据
  _fetchData = (nextIndex) => {
    if (nextIndex > 0) {
      this.setState({
        isLoadingTail: true
      });
    } else {
      this.setState({
        isRefreshing: true
      });
    }
    Request.get(Config.URL.creation, {
      accessToken: Config.accessToken,
      _page: this.state.nextIndex,
      _limit: this.cacheData.limit
    }).then(data => {
      //console.log(data);
      let newData = this.state.creations.slice();
      newData = this.state.isRefreshing ? newData.concat(data) : data.concat(newData);
      this.setState({
        isLoadingTail: false,
        isRefreshing: false,
        nextIndex: this.state.nextIndex + 1,
        creations: newData
      }, () => { })
    }).catch(error => {
      this.setState({
        isLoadingTail: false,
        isRefreshing: false,
      });
      console.error("_fetchData方法出错,", error)
    });
  }
}
const styles = StyleSheet.create({})
