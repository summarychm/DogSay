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
    let images = [
      "http://dummyimage.com/1280x720/abc327",
      "http://dummyimage.com/1280x720/7f1874",
      "http://dummyimage.com/1280x720/e9f01d",
      "http://dummyimage.com/1280x720/e9ae6a",
      "http://dummyimage.com/1280x720/199475"
    ];
    data.creations.push(Mock.mock({
      "id": id,
      "thumb": images[_.random(0, images.length - 1)],
      "author": {
        "avatar": images[_.random(0, images.length - 1)],
        "nickname": Random.cname()
      },
      "title": Random.cparagraph(1, 3),
      "video": videos[_.random(0, videos.length)],
      "liketotal|1-200": 20,
    }))
  });
}

//生成创意视频的评论
function generateCommments() {
  data.comments = [];
  let images = [
    "http://dummyimage.com/1280x720/abc327",
    "http://dummyimage.com/1280x720/7f1874",
    "http://dummyimage.com/1280x720/e9f01d",
    "http://dummyimage.com/1280x720/e9ae6a",
    "http://dummyimage.com/1280x720/199475"
  ];

  _.times(200, (i) => {
    let id = Random.increment();
    data.comments.push(Mock.mock({
      "id": id,
      "creationId|1-30": 1,
      "replyBy": {
        "avatar": images[_.random(0, images.length - 1)],
        "nickname": Random.cname()
      },
      "content": Random.cparagraph(1, 3),
    }))
  })
}

//创建虚拟用户
function generateUsers() {
  data.user = [];
  let images = [
    "http://dummyimage.com/1280x720/abc327",
    "http://dummyimage.com/1280x720/7f1874",
    "http://dummyimage.com/1280x720/e9f01d",
    "http://dummyimage.com/1280x720/e9ae6a",
    "http://dummyimage.com/1280x720/199475"
  ];
  _.times(10, (i) => {
    let id = Random.increment();
    data.user.push(Mock.mock({
      "id": id,
      "phoneNumber|13012345600-13012345900": 1,
      "avatar": images[_.random(0, images.length - 1)],
      "accessToken": "123qwe123"
    }));
  })
}

module.exports = () => {
  generateCreations();
  generateCommments();
  generateUsers();
  return data;
}
