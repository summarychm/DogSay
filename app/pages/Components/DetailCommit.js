import React from 'react';
import {View, Text, Image, FlatList, StyleSheet, ScrollView} from 'react-native';
import {Request, Config} from 'saytools';

export default class DetailCommit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creationId: this.props.creationId || 0,
      comments: []
    };
  }

  componentDidMount() {
    if (this.state.creationId) {
      this._fetchData(this.state.creationId);
    }
  }

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
      >
        <View style={styles.container}>
          <FlatList
            data={this.state.comments}
            renderItem={commit => this._renderRow(commit.item)}
            keyExtractor={commit => commit.id}
            //消除IOS下顶部空白
            automaticallyAdjustContentInsets={false}
            //是否显示Y轴滚动条
            showsVerticalScrollIndicator={true}
            style={styles.listBox}
          />
        </View>
      </ScrollView>)
  }

  _fetchData(id) {
    let params = {
      creationId: id,
      accesstoken: Config.accessToken
    }
    Request.get(Config.URL.comment, params).then(response => {
      if (response) {
        this.setState({
          comments: response
        })
      }
    }).catch(err => {
      console.log("获取评论数据出错", err);
    })
  }

  _renderRow(data) {
    console.log(data);
    return (<View style={styles.infoBox}>
      <Image style={styles.avatar} source={{uri: data.replyBy.avatar}}/>
      <View style={styles.descBox}>
        <Text style={styles.nickname}>{data.replyBy.nickname}</Text>
        <Text style={styles.title}>{data.content}</Text>
      </View>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 150
  },
  listBox: {
    marginTop: 5,
    marginBottom: 200
  },
  infoBox: {
    flexDirection: "row",
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 25,
  },
  descBox: {
    flex: 1
  },
  nickname: {
    fontSize: 16,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    color: "#666"
  }
});

