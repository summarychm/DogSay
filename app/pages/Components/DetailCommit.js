import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import _ from 'lodash';
import {Button} from 'react-native-elements';
import {Request, Config} from 'saytools';

export default class DetailCommit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creationId: this.props.creationId || 0,
      commit: '',
      modalVisible: false,//是否显示浮层
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
          <TextInput
            style={styles.textInput}
            placeholder="敢不敢评论一个..."
            multiline={true}
            onFocus={() => this._setModalVisible(true)}
          />
          <Modal
            animationType='fade'
            visible={this.state.modalVisible}
            onRequestClose={() => this._setModalVisible(false)}
          >
            <TextInput
              style={styles.textInput}
              placeholder="敢不敢评论一个..."
              multiline={true}
              numberOfLines={5}
              ref={input => this.textInput = input}
            />
            <View style={styles.modalFooter}>
              <Button
                raised
                icon={{name: 'done'}}
                buttonStyle={{backgroundColor: Config.Style.Color_Main}}
                containerViewStyle={{flex: 1}}
                title='确定'
                onPress={this._submitComment}
              />
              <Button
                raised
                icon={{name: 'clear'}}
                buttonStyle={{backgroundColor: Config.Style.Color_Main}}
                containerViewStyle={{flex: 1}}
                title='取消'
                onPress={() => this._setModalVisible(false)}
              />
            </View>
          </Modal>

          <View>
            <Text style={styles.listTitle}>精彩评论:</Text>
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
        </View>
      </ScrollView>)
  }

  _submitComment = () => {
    let content = this.textInput._lastNativeText;
    if (content.length < 3) {
      Alert.alert("提示", "请输入评论内容!");
      return;
    }
    this.setState({
      commit: content,
      modalVisible: false,
    });
    let params = {
      creationId: this.state.creationId,
      replyBy: {
        avatar: "http://dummyimage.com/1280x720/abc327",
        "nickname": "韩磊"
      },
      content: content,
    };
    Request
      .post(Config.URL.comment, params)
      .then(response => {
        let comments = _.extend(this.state.comments);
        comments.unshift(response);
        this.setState({
          comments: comments
        });
        Alert.alert("提示", "恭喜发布评论成功!");
      }).catch(err => {
      console.error("发布评论失败!", err);
    });
  }
  //显隐浮层
  _setModalVisible = (val) => {
    this.setState({
      modalVisible: val
    })
  }

  //加载评论数据
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
  textInput: {
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",

  },
  listTitle: {
    padding: 5,
    fontSize: 14,
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
  },
  modalFooter: {
    flexDirection: "row",
    padding: 10,
  }
});

