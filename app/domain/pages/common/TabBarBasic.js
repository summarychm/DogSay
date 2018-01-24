import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TabViewAnimated, TabBar} from 'react-native-tab-view';
import styled from 'styled-components';
import {COLOR_BUTTON} from 'ggdomain/def'

const StyleTabViewAnimated = styled(TabViewAnimated)`
  background-color: #eee;
`;
export default class TabBarBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [],
      selectPageKey: 0
    }
  }

  static propTypes = {
    index: PropTypes.number,
    routes: PropTypes.array
  }

  render() {
    let {index, routes} = this.props;
    this.state = {
      index: index,
      routes: routes,
      selectPageKey: routes[index].key
    }
    return (
      <StyleTabViewAnimated
        navigationState={this.state}
        renderScene={({route}) => <route.Component/>}
        renderFooter={this._renderFooter}
        onIndexChange={this._handleIndexChange}
      />
    )
  }

  //渲染图标
  _renderIcon = ({route}) => {
    //如果是当前选中项,则切换为选中样式 style={styles.icon}
    let iconName = route.key === this.state.selectPageKey ? route.iconName : route.selectedIconName;
    return (
      <Ionicons name={iconName} size={24} color={COLOR_BUTTON}/>
    );
  }
  //渲染Footer组件 getLabelText={({route}) => (route.title)}
  _renderFooter = props => {
    return (
      <TabBar
        {...props}
        renderIcon={this._renderIcon}
        indicatorStyle={{backgroundColor: COLOR_BUTTON}}
        style={{backgroundColor: '#eee'}}
      />

    );
  }
  //index回调
  _handleIndexChange = index => {
    this.setState({
      selectPageKey: this.state.routes[index].key
    }, () => {
      this.props.handleIndexChange && this.props.handleIndexChange(index);
    })
  }
}

