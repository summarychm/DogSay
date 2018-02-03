export class Tools {
  //返回值的数据类型
  static TypeOf = (val) => {
    let type = Object.prototype.toString.call(val);
    console.log(type, Object);
    return type.slice(8, -1)
  }

  // 获取用户信息
  static async GetUserData(fn) {
    await storage.load({
      key: 'user',
    }).catch(err => { /*console.warn(err.name,err.message);*/
    }).then(ret => {
      // console.log("ret", ret);
      fn && fn(ret);
    })
  }

  //保存用户数据 
  static async SaveUserData(data, fn) {
    if (!data.id)
      return;
    var value = await storage.save({key: 'user', data: data})
      .catch(err => {
        console.error("保存用户数据失败", err);
      })
      .then(ret => {
        fn && fn();
      });
  }

  //清除用户数据
  static async RemoveUserData(fn) {
    await storage.remove({key: 'user'});
    fn && fn();
  }
}


