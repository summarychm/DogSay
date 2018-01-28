import {
  Dimensions
} from 'react-native';

// TabBar背景色
export const ConstStyle = {
  //主色调
  Color_Main: "#ee735c",
//距离顶部padding值
  PaddingTopVal: 25
};

/**
 * 设备的基础信息宽度与高度
 * @type {{width, height}}
 */
export const Device = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
}
