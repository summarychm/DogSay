let Mock = require("mockjs");
let _ = require("lodash");
let Random = Mock.Random;
let data = {};


function generateCreation() {
  data.creation = [];
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
    data.creation.push(Mock.mock({
      "_id": id,
      "thumb": images[_.random(0, images.length)],
      "author": {
        "avatar": images[_.random(0, images.length)],
        "nickname": Random.cname()
      },
      "title": Random.cparagraph(1, 3),
      "video": videos[_.random(0, videos.length)],
      "liketotal|1-200": 20,
    }))
  });
}

module.exports = () => {
  generateCreation();
  return data;
}
