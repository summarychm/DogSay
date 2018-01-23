import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';


export default class TabBarBasic extends React.Component {
  static propTypes={
    tabs:PropTypes.shape({
      index: PropTypes.number,
      routes: PropTypes.array
    })
  }
  //渲染图标
  _renderIcon = ({route}) => (
    <Ionicons name={route.icon} size={24} style={styles.icon}/>
  );
  //渲染Children
  _renderScene = ({route}) => {
    return <route.Component/>
  }
  //渲染Footer组件
  _renderFooter = props => (
    <TabBar
      {...props}
      getLabelText={({route}) => (route.title)}
      renderIcon={this._renderIcon}
      labelStyle={styles.label}
      tabStyle={styles.tab}
      style={styles.tabbar}
    />
  );
  //index回调
  _handleIndexChange = index => {
    this.props.handleIndexChange && this.props.handleIndexChange(index);
  }


  render() {
    return (
      <TabViewAnimated
        navigationState={this.props.tabs}
        renderScene={this._renderScene}
        renderFooter={this._renderFooter}
        onIndexChange={this._handleIndexChange}
      />
    )
  }
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#222',
  },
  tab: {
    padding: 0,
  },
  icon: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  indicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0084ff',
    margin: 6,
  },
  badge: {
    marginTop: 4,
    marginRight: 32,
    backgroundColor: '#f44336',
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -2,
  },
});
