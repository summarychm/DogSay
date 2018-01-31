//返回值的数据类型
export const TypeOf = (val) => {
  let type = Object.prototype.toString.call(val);
  return type.slice(8, -1)
}
