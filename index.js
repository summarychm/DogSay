import { AppRegistry } from 'react-native';
import Entry from './app/index';

//屏蔽Remote debugger is in a background tab的警告提示 
console.ignoredYellowBox = ['Remote debugger'];
AppRegistry.registerComponent('DagSay', () => Entry);
