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
    data.creations.push(Mock.mock({
      "id": id,
      "thumb": Random.image("1280X720", Random.color()),
      "author": {
        "avatar": Random.image("1280X720", Random.color()),
        "nickname": Random.cname()
      },
      "title": Random.cparagraph(1, 3),
      "video": videos[_.random(0, videos.length)],
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
  data.user = [];
  _.times(10, (i) => {
    let id = Random.increment();
    data.user.push(Mock.mock({
      "id": id,
      "phoneNumber|13012345600-13012345900": 1,
      "avatar": Random.image('1280X720', Random.color()),
      "nicName": Random.cname(),
      "accessToken": "123qwe" + id,
    }));
  })
}

module.exports = () => {
  generateCreations();
  generateCommments();
  generateUsers();
  return data;
}
