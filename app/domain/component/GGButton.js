import React from 'react';

import {
  Dimensions,
  Text
} from 'react-native';

import {Button} from "ggbasic";
import {COLOR_BUTTON} from 'ggdomain/def';

/**
 * 狗狗说APP所用Button按钮封装
 */
export class GGButton  extends React.Component {
  render() {
    return (
      <Button
        height={42}
        width={Dimensions.get("window").width - 40}
        fontSize={14}
        backgroundColor={COLOR_BUTTON}
        {...this.props}
      >{this.props.children}</Button>);
  }
}


