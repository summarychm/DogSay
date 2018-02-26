# 狗狗说 APP

## APP简介
> 这个APP的idea主要是以狗狗的视角来录制视频进行社交(类似朋友圈).        
> 用户可以在APP中发布自己录制并配音的狗狗小视频.   
> 用户可以浏览他人发布的狗狗小视频,支持评论,点赞等功能.    
> 用户可以编辑自己的狗狗的个人信息,如头像,昵称,性别等.      
> 用户对已发布的小视频进行管理等.
> 
  

## 项目截图 (开发完成后上传)
![项目演示](./app/images/DogSay.gif)

### [功能流程图(processon)](https://www.processon.com/view/link/5a7414a9e4b059c41ab208e1)


## APP主要页面及主要功能

* 视频制作页(录制视频,录制配音,音视频合成,发布视频)
* 视频列表页(异步请求数据,懒加载,视频点赞)
* 视频详情页(视频播放,评论功能,点赞功能)
* 账户管理页(注册登录,个人资料编辑,已点赞视频管理)
* APP启动画面,过渡页面和轮播效果   
* 对原有APP进行重构,替换过时的组件和构造方式  

## 运行方式

```bash
# git clone
git clone 

# use yarn or npm install the package
yarn install

# modification json-server ip
# 将router字段下BASE_URL字段中的ip修改为本机ip.
/->app->tools->router.js->BASE_URL

# start the package server
react-native run-android
```


## TodoList
### 第一阶段
- [x]  1.启动页
    - [x]  使用react-navigation中(TabNavigation+StackNavigator)实现页面导航功能
    - [x]  将页面navigation路由配置整理成单独的模块.
    - [x]  封装fetch为公共方法,将其追加为global的属性,方便调用   
    - [x]  使用json-server进行数据模拟
- [x]  2.登录页
    - [x]  实现定时发送短信功能.
    - [x]  实现用户名密码登录功能,密码错误进行提示.
    - [x]  登陆成功后跳转到视频列表页
- [x]  3.视频列表页
    - [x]  实现数据分页加载,支持上滑加载,下拉刷新.
    - [x]  将视频项封装成为了单独组件,方便共用与管理.
    - [x]  点击视频项跳转到视频详情页.
- [x]  4.视频详情页
    - [x]  实现视频播放功能.
    - [x]  实现用户评论展示功能,支持上滑加载,下拉刷新.
    - [x]  实现视频评论功能.
- [x]  5.狗狗信息页
    - [x]  展示狗狗的详细信息.
    - [x]  列出了自己所有的已发布视频.
    - [x]  可以编辑自己的狗狗信息.

### 第二阶段(开发中)
- [ ]  完成编辑创意视频详情功能
- [ ]  完成更换头像功能
- [ ]  完成启动页功能
- [ ]  使用Redux替换State进行状态管理
- [ ]  


## 所用技术
*  ES5/ES6
*  React
*  Flexbox
*  AsyncStorage
*  fetch api
*  Mock(json-server+Mock.js)



## 第三方库

* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) (使用其中的Ionicons图标库)
* [react-native-elements](https://github.com/react-native-training/react-native-elements)(使用其中的组件,也取代tab-view组件,MIT协议)
* [react-navigation](https://github.com/react-navigation/react-navigation)(导航组件)
* [query-string](https://github.com/sindresorhus/query-string)(用来序列化网络请求参数)
* [lodash](https://github.com/lodash/lodash)(使用lodash提供的很多实用方法)
* [mockjs](https://github.com/nuysoft/Mock)(用来创建json-server所需的模拟数据)
* [json-server](https://github.com/typicode/json-server)(用来创建REST ful 服务端)
* [react-native-video](https://github.com/react-native-community/react-native-video) (视频播放组件)
* [react-native-sk-countdown](https://github.com/shigebeyond/react-native-sk-countdown)[倒计时组件]
* [react-native-storage](https://github.com/sunnylqm/react-native-storage)(AsyncStorage的封装,RN中文网维护)
* [react-native-easy-toast](https://github.com/crazycodeboy/react-native-easy-toast)(跨平台Toast组件)
* [react-native-image-picker](https://github.com/react-community/react-native-image-picker)(相册组件)
