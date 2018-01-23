import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimplePage from '../example/SimplePage';
import {TabViewAnimated, TabBar} from 'react-native-tab-view';

export default class BottomTabBar extends React.Component {
  state = {
    index: 0,
    routes: [
      {key: '1', title: 'First', icon: 'ios-speedometer', color: '#F44336'},
      {
        key: '2',
        title: 'Second',
        icon: 'ios-game-controller-b',
        color: '#4CAF50',
      },
      {key: '3', title: 'Third', icon: 'ios-basketball', color: '#3F51B5'},
    ],
  };
  /*_renderScene = ({route}) => (
    <SimplePage state={this.state} style={{backgroundColor: route.color}}/>
    //return this.props.
  );*/
  _renderIcon = ({ route }) => (
    <Ionicons name={route.icon} size={24} style={styles.icon} />
  );
  _renderScene=({route})=>{
    switch (route.key) {
      case '1':
        return (
          <SimplePage
            state={this.state}
            style={{ backgroundColor: '#ff4081' }}
          />
        );
      case '2':
        return (
          <SimplePage
            state={this.state}
            style={{ backgroundColor: '#673ab7' }}
          />
        );
      case '3':
        return (
          <SimplePage
            state={this.state}
            style={{ backgroundColor: '#4caf50' }}
          />
        );
      default:
        return null;
    }
  }
  _getLabelText = ({ route }) => "";
  _renderFooter = props => (
    <TabBar
      {...props}
      getLabelText={this._getLabelText}
      renderIcon={this._renderIcon}
      labelStyle={styles.label}
      tabStyle={styles.tab}
      style={styles.tabbar}
    />
  );
  _handleIndexChange = index =>
    this.setState({
      index,
    });

  render() {
    return (
      <TabViewAnimated
        navigationState={this.state}
        renderScene={this._renderScene}
        renderFooter={this._renderFooter}
        onIndexChange={this._handleIndexChange}
      >
       
        
      </TabViewAnimated>
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
