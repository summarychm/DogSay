# 狗言狗语APP

## APP简介
> 这个APP的idea主要是以狗狗的视角来录制视频进行社交(类似朋友圈).     
> 用户可以在APP中发布自己录制的狗狗小视频并对可对视频进行配音.   
> 用户可以为他人发布的小视频点赞,评论等.      
> 用户对已发布的小视频进行管理等.  

## APP示例
待开发完成后添加

## APP主要页面及主要功能

* 视频制作页(录制视频,录制配音,音视频合成,发布视频)
* 视频列表页(异步请求数据,懒加载,视频点赞)
* 视频详情页(视频播放,评论功能,点赞功能)
* 账户管理页(注册登录,个人资料编辑,已点赞视频管理)
* APP启动画面,过渡页面和轮播效果   
* 对原有APP进行重构,替换过时的组件和构造方式  

## 使用到的库与插件

* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) (使用其中的Ionicons图标库)
* [react-native-elements](https://github.com/react-native-training/react-native-elements)(使用其中的组件,也取代tab-view组件,MIT协议)
* [react-navigation](https://github.com/react-navigation/react-navigation)(导航组件)
* [query-string](https://github.com/sindresorhus/query-string)(用来序列化网络请求参数)
* [lodash](https://github.com/lodash/lodash)(使用lodash提供的很多实用方法)
* [mockjs](https://github.com/nuysoft/Mock)(用来创建json-server所需的模拟数据)
* [json-server](https://github.com/typicode/json-server)(用来创建REST ful 服务端)
* ~~[react-native-tab-view](https://github.com/react-native-community/react-native-tab-view)(用来实现TabBar组件)~~
* ~~[styled-componentds](https://github.com/styled-components/styled-components)(用来替换原生的style)~~[放弃使用该插件,感觉对RN支持力度不够,使用繁琐,在ReactJS项目中再使用]
* [react-native-video](https://github.com/react-native-community/react-native-video) (视频播放组件)

## Mock
> ~~使用的是taobao的[Rap2](http://rap2.taobao.org)~~    
> 使用json-server+Mock.js实现完整的REST ful


## 所用图标
> ios-videocam  / ios-videocam-outline   
> ios-recording / ios-recording-outline   
> ios-more / ios-more-outline    
> ios-play   
> ios-chatboxes-outline       






