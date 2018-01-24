# 狗狗说APP android端

## APP简介
> 对原有APP进行重构,替换过时的组件和构造方式   
> 这个APP的idea主要是以狗狗的视角来录制视频进行社交(类似朋友圈),  
> 用户可以在APP中发布自己录制的小视频并对可对其配音,可以为他人发布的小视频点赞,   
> 对已发布的小视频进行管理等.  


## APP主要页面及主要功能

* 视频制作页(录制视频,录制配音,音视频合成,发布视频)
* 视频列表页(异步请求数据,懒加载,视频点赞)
* 视频详情页(视频播放,评论功能,点赞功能)
* 账户管理页(注册登录,个人资料编辑,已点赞视频管理)
* APP启动画面,过渡页面和轮播效果

## 使用到的库与插件

* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) (使用其中的Ionicons图标库)
* [react-native-tab-view](https://github.com/react-native-community/react-native-tab-view)(用来实现TabBar组件)
* [styled-componentds](https://github.com/styled-components/styled-components)(用来替换原生的style)


## 所用图标
> 使用的是
> ios-videocam  / ios-videocam-outline   
> ios-recording / ios-recording-outline   
> ios-more / ios-more-outline    

## Mock
> 使用的是taobao的[Rap2](http://rap2.taobao.org)   
> Mock根地址[http://rap2api.taobao.org/app/mock/4624/GET/creations](http://rap2api.taobao.org/app/mock/4624/GET/creations)





