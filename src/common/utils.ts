/*
 * @Author: WenJW
 * @Date: 2018-07-09 14:15:17
 * @Last Modified by: WenJW
 * @Last Modified time: 2018-07-09 14:51:34
 * @description
 */

/**
 * @description 获取数据类型
 * @param {*} data
 * @returns
 */
export const _GetDataType = (data) => {
  return Object.prototype.toString.call(data).toLowerCase().replace(/^\[object (\w+)\]$/, '$1')
}

/**
 * @description
 * @param {[any]} arr 要遍历的数组或对象，其它类型会返回 'error'
 * @param {*} fn 遍历执行的函数,如果 return 一个 false 的话结束当前循环{可用参数,值，健(对象)，索引}
 * @param {boolean} order 正序遍历(true)还是倒序遍历
 * @returns {fn}
 */
export const _ValMap = (data, fn, order: boolean = true) => {
  if (_GetDataType(data) === 'array') {
    order ? null : data.reverse()
    for (let i = 0, len = data.length; i < len; i++) {
      const val = fn(data[i], i)
      if (val === false) { return }
    }
  } else if (_GetDataType(data) === 'object') {
    const keys = Object.keys(data)
    order ? null : keys.reverse()
    for (let i = 0, len = keys.length; i < len; i++) {
      const val = fn(data[keys[i]], keys[i], i)
      if (val === false) { return }
    }
  } else { throw new Error(`then type is error![${data}: ${_GetDataType(data)}]`) }
}

// hash
const pad = (hash, len) => {
  while (hash.length < len) {
    hash = '0' + hash
  }
  return hash
}
const getString = (o) => Object.prototype.toString.call(o)
const fold = (hash, text) => {
  let i
  let chr
  let len

  if (text.length === 0) {
    return hash }
  for (i = 0, len = text.length; i < len; i++) {
    chr = text.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0 }
  return hash < 0 ? hash * -2 : hash
}
const foldValue = (input, value, key, seen) => {
  const hash = fold(fold(fold(input, key), getString(value)), typeof value)
  if (value === null) {
    return fold(hash, 'null')
  }
  if (value === undefined) {
    return fold(hash, 'undefined')
  }
  if (typeof value === 'object') {
    if (seen.indexOf(value) !== -1) {
      return fold(hash, '[Circular]' + key)
    }
    seen.push(value)
    return foldObject(hash, value, seen)
  }
  return fold(hash, value.toString())
}
const foldObject = (hash, o, seen) => {
  return Object.keys(o).sort().reduce(foldKey, hash)
  function foldKey (hashStr, key) {
    return foldValue(hashStr, o[key], key, seen)
  }
}

/**
 * @description 获得 hash 值
 * @param {*} o
 * @returns
 */
export const _GetHash = (o) => pad(foldValue(0, o, '', []).toString(16), 8)
