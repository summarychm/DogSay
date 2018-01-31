import {AppRegistry} from 'react-native';
import Entry from './app/index';
import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';

let storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24 * 365,
  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,
});
global.storage = storage;


//屏蔽Remote debugger is in a background tab的警告提示 
console.ignoredYellowBox = ['Remote debugger'];
AppRegistry.registerComponent('DagSay', () => Entry);
