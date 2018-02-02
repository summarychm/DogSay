export class Tools {
  //返回值的数据类型
  static TypeOf = (val) => {
    let type = Object.prototype.toString.call(val);
    console.log(type, Object);
    return type.slice(8, -1)
  }
}


