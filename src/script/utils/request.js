import axios from 'axios'

export const _Get = (url, params = {}) => {
  return axios.get(url, { params }).then((res) => res.data).catch(err => console.log(err))
}
export const _Post = (url, params = {}) => {
  return axios.post(url, params).then((res) => res.data).catch(err => console.log(err))
}
export const _All = (arr) => {
  return axios.all(arr).then((res) => res.data).catch(err => console.log(err))
}
