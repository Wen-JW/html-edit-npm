const express = require('express')
const apiRoutes = express.Router()

const { _isExists } = require('../utils/file')

const config = require('../config')

apiRoutes.get('/projectInit', (req, res) => {
  _isExists(config.path.projectInit)
  .then(result => {
    console.log('exists: ', result)
    return res.json({
      code: 0,
      message: "success",
      data: result
    })
  })
})

module.exports = apiRoutes