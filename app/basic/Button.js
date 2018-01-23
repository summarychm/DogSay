import React from 'react';

import {
  ActivityIndicator,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';
import PropType from 'prop-types';
import {flexCenter} from 'ggbasic';

/**
 * 自定义button公共按钮
 */
export class Button extends React.Component {
  static defaultProps = {
    backgroundColor: "#ddd",
    color: "white",
    height: 40,
    width: 100,
    fontSize: 14,
    loading: false
  };
  onPress = () => {
    this.props.onPress && this.props.onPress();
  }

  render() {
    let isAndroid = Platform.OS === "android";
    let {backgroundColor, width, height, fontSize, color, loading, children} = this.props;
    //为安卓设置增加加粗效果
    let fontWeight = isAndroid ? "bold" : "normal";
    //在安卓设备上字体放大1.2倍
    fontSize = isAndroid ? fontSize * 1.2 : fontSize;
    //为非安卓设备增加5度的圆角
    let borderRadius = !isAndroid ? 5 : 0;
    if (loading) {
      return <View style={{backgroundColor, width, height, borderRadius,...flexCenter}}>
        <ActivityIndicator/>
      </View>
    }
    return (<TouchableOpacity onPress={this.onPress}
                              style={{backgroundColor, width, height, borderRadius,...flexCenter}}>
      <Text style={{textAlign: 'center', lineHeight: height, fontSize, color, fontWeight}}>{children}</Text>
    </TouchableOpacity>)
  }
}


