import React from 'react';
import _ from 'lodash';
import {View, Text, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {Card, Button} from 'react-native-elements';

import {Request, Config} from 'saytools'
import {CreationItem} from './CreationItem';
import Recording from "./Recording";
import Detail from "./Detail";


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
        renderItem={creation =>
          <CreationItem creation={creation}
                        _votedFn={this._votedFn}
                        _openPage={() => this._openPage(creation)}/>}
        keyExtractor={creation => creation.id}
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
  _openPage = (creation) => {
    console.log(this.props);
    this.props.navigation.navigate("Detail", {creation:creation})
  }
  //投票
  _votedFn = (creation) => {
    let newcreation = _.extend(creation);
    newcreation.liketotal += 1;
    let url = Config.URL.creation + "/" + creation.id;
    Request.put(url, creation)
      .then(response => {
        console.log(response);
      });
  }
  //下拉刷新
  _onRefresh = () => {
    if (!this._hasMore() || this.state.isRefreshing)
      return;
    this._fetchData(-1);
  }

  //上滑刷新
  _onRefresh() {
    this._fetchData(this.state.nextIndex);
  }

  //加载更多数据
  _fetchMore = () => {
    //加载更多创意视频数据
    if (!this._hasMore() || this.state.isLoadingTail) {
      return;
    }
    this._fetchData(this.state.nextIndex);
  }

  //加载更多数据
  _fetchData = (type) => {
    if (type > 0) { //上滑
      this.setState({
        isLoadingTail: true
      });
    } else {//下拉
      this.setState({
        isRefreshing: true
      });
    }
    Request.get(Config.URL.creation, {
      accessToken: Config.accessToken,
      _page: this.state.nextIndex,
      _limit: this.cacheData.limit
    }).then(data => {
      let newData = this.state.creations.slice();
      newData = this.state.isRefreshing ? data.concat(newData) : newData.concat(data);
      this.setState({
        isLoadingTail: false,
        isRefreshing: false,
        nextIndex: this.state.nextIndex + 1,
        creations: newData
      }, () => {
      })
    }).catch(error => {
      this.setState({
        isLoadingTail: false,
        isRefreshing: false,
      });
      console.error("_fetchData方法出错,", error)
    });
  }

  //判断是否还可以加载更多数据
  _hasMore = () => {
    return this.state.creations.length < this.cacheData.total;
  }
}
const styles = StyleSheet.create({})
