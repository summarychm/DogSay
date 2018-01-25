import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  View,
  Text,
  RefreshControl,
} from 'react-native';

import {ConstStyle, Device, ConstURL} from 'ggdomain/def';
import {Request} from 'ggdomain/component';

import {ItemComponent} from './ItemComponent';

//创意视频列表页面
export class Creation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.localData = {
      nextIndex: 1, //当前页面
      item: [],  //已加载创意视频集合
      total: 0 //在线创意视频总数
    };
    this.state = {
      isLoadingTail: false,//是否加载中
      isRefreshing: false,//是否刷新中
      data: []
    };
  }

  componentDidMount = () => {
    this._fetchData(this.localData.nextIndex);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>列表页面</Text>
        </View>
        <FlatList
          ListFooterComponent={this._renderFooter}
          data={this.state.data}
          renderItem={({item}) => this._renderRow(item)}
          keyExtractor={item => item._id}
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
              colors={[ConstStyle.Color_Main, '#00ff00']}
              progressBackgroundColor="#00ff00"
            />
          }
        />
      </View>
    )
  }

  //FlatList底部footer组件,用于loading效果
  _renderFooter = () => {
    if (!this._hasMore() && this.localData.total != 0) {
      return (
        <View style={styles.loadingMore}>
          <Text style={styles.loadingText}>没有更多数据了!</Text>
        </View>)
    }
    return <ActivityIndicator style={styles.loadingMore}/>;
  }


  //FlatList行渲染事件
  _renderRow = (item) => {
    return (
      <ItemComponent item={item}/>
    )
  }

  //FlatList更新回调
  _onRefresh = () => {
    if (!this._hasMore() || this.state.isRefreshing)
      return;
    this._fetchData(-1);
  }

  //下滑加载更多事件
  _fetchMore = () => {
    //console.log("触发More");
    //加载更多创意视频数据
    if (!this._hasMore() || this.state.isLoadingTail) {
      return;
    }
    this.setState({
      isLoadingTail: true,
    }, () => {
      this._fetchData(this.localData.nextIndex);
    });
  }

  //加载最新的创意视频信息
  _fetchData = (pageIndex) => {
    console.log("pageIndex", pageIndex);
    if (pageIndex > 0) {
      this.setState({
        isLoadingTail: true
      });
    } else {
      this.setState({
        isRefreshing: true
      });
    }
    Request.get(ConstURL.CREATIONS_GET, {
      accesstoken: 'abc123',
      index: pageIndex
    }).then((responseJson) => {
      if (!responseJson.success || !responseJson.data) {
        console.warn("请求数据失败,详细信息为:", responseJson)
        return;
      }
      //如果是刷新就追加数据,如果是获取最新则将新数据前置
      let newData = this.localData.item.slice()
      newData = (pageIndex > 0) ? newData.concat(responseJson.data) : responseJson.data.concat(newData);
      this.localData.item = newData;
      this.localData.nextIndex += 1;
      this.localData.total = responseJson.total;
      this.setState({
        isLoadingTail: false,
        isRefreshing: false,
        data: newData
      });
    }).catch((error) => {
      console.error(error);
      this.setState({
        isLoadingTail: false,
        isRefreshing: false
      });
    });
  }

  //判断是否还有更多视频
  _hasMore() {
    return this.localData.total > this.localData.item.length;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  header: {
    paddingBottom: 12,
    paddingTop: ConstStyle.PaddingTopVal,
    backgroundColor: ConstStyle.Color_Main
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  },

  loadingMore: {
    marginVertical: 20
  },
  loadingText: {
    color: '#777',
    textAlign: 'center'
  }
})
