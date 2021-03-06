let Mock = require("mockjs");
let _ = require("lodash");
let Random = Mock.Random;
let data = {};

//生成创意视频
function generateCreations() {
  data.creations = [];
  _.times(100, (i) => {
    let id = Random.increment();
    let videos = [
      "https://www.w3cschool.cn/statics/demosource/movie.mp4",
      "http://www.zhangxinxu.com/study/media/cat.mp4",
    ];
    let userData = data.users[_.random(0, data.users.length - 1)];
    data.creations.push(Mock.mock({
      "id": id,
      "thumb": Random.image("1280X720", Random.color()),
      "author": {
        "id": userData.id,
        "nickname": userData.nickname,
        "avatar": userData.avatar,
        "phoneNumber": userData.phoneNumber,
      },
      "title": Random.cparagraph(1, 3),
      "video": videos[_.random(0, videos.length - 1)],
      "liketotal|10-200": 20,
    }))
  });
}

//生成创意视频的评论
function generateCommments() {
  data.comments = [];
  _.times(200, (i) => {
    let id = Random.increment();
    data.comments.push(Mock.mock({
      "id": id,
      "creationId|1-30": 1,
      "replyBy": {
        "avatar": Random.image('1280X720', Random.color()),
        "nickname": Random.cname()
      },
      "content": Random.cparagraph(1, 3),
    }))
  })
}

//创建虚拟用户
function generateUsers() {
  data.users = [];
  _.times(10, (i) => {
    let id = Random.increment();
    data.users.push(Mock.mock({
      "id": id,
      "phoneNumber|13012345600-13012345900": 1,
      "avatar": Random.image('1280X720', Random.color()),
      "nicName": Random.cname(),
      "accessToken": "123qwe" + id,
    }));
  })
}

module.exports = () => {
  generateUsers();
  generateCreations();
  generateCommments();
  return data;
}
