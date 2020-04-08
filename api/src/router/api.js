const express = require('express');
const request = require('request');
const user = require('../controller/login');
const solution = require('../controller/solution');
const collect = require('../controller/collect');


const router = express.Router();
/* GET home page. */
router.post('/api/getOpenId', function (req, res) {
    var data = req.body
    var APP_URL = 'https://api.weixin.qq.com/sns/jscode2session'
    var APP_ID = 'wx1e862cd019aa59de'
    var APP_SECRET = 'c42553601044fbb7f8ca1c54517ac2c5'
    if (!!data.code) {
        request(`${APP_URL}?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${data.code}&grant_type=authorization_code`, (error, response, body) => {
            res.end(body)
        })
    }
})

router.get('/index', function (req, res) {
    res.json({
        name: 'hello world!'
    })
})

router.post('/api/user/register', function (req, res) {
    user.register(req, res)
})

router.post('/api/user/login', function (req, res) {
    user.login(req, res)
})

router.post('/api/addItem', function (req, res) {
    solution.add(req, res)
})
router.get('/api/getOwnList', function (req, res) {
    solution.getOwnList(req, res)
})
router.get('/api/getItem', function (req, res) {
    solution.getItem(req, res)
})
router.get('/api/getTypeList', function (req, res) {
    solution.getTypeList(req, res)
})

router.post('/api/collectItem', function (req, res) {
    collect.collectItem(req, res)
})

router.post('/api/collectCancel', function (req, res) {
    collect.collectCancel(req, res)
})

router.post('/api/isCollect', function (req, res) {
    collect.isCollect(req, res)
})
router.get('/api/getCollectList', function (req, res) {
    collect.getCollectList(req, res)
})
router.get('/api/getItemCollect', function (req, res) {
    collect.getItemCollect(req, res)
})
module.exports = router