import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Provider, connect } from 'react-redux'

import getStore from './script/store'
import CreateRouter from './script/router'

import { _IsExistFile } from './script/utils/file'
import { _Get } from './script/utils/request'

import ActionsGlobal from './script/actions/global'
// 拖拽
// import './assets/css/dragula.css'
import './assets/css/index.scss'
import { throws } from 'assert';
// antd
// import 'antd/dist/antd.css'
export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routerInit: ''
    }
  }
  componentWillMount() {
    // 查询是否有项目的配置文件，没有的话切换路由(/init)生成配置文件
    _Get('/api/projectInit')
    .then(res => {
      if(res.code === 0) {
        const routerInit = !!res.data.exists ? 'info' : 'init'
        this.props.dispatch(ActionsGlobal('project', {
          routerInit: !!res.data.exists ? 'info' : 'init',
          ...res.data
        }))
        this.setState({ routerInit })
      }
      console.log('this.props.project', this.props.project)
    })
  }
  render() {
    const { routerInit } = this.state
    return (
      <div className="wrap">
        <Router>
          {routerInit && CreateRouter(routerInit)}
        </Router>
      </div>
    )
  }
}
const App = connect(state => ({
  project: state.project,
}))(Main)

// 创建store
const store = getStore()
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)