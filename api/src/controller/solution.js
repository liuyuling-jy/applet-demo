const models = require('../models/solution');
exports.add = function (req, res) {
    models.solution.create(req.body, (err, data) => {
        if (err) {
            res.send({
                'status': 500,
                'message': '新增失败',
                'data': err
            })
        } else {
            res.send({
                'status': 200,
                'message': '新增成功',
                'data': true
            });
        }
    })
};

exports.getOwnList = function (req1, res1) {
    let openId = req1.query.openId
    models.solution.find({
        openId: openId
    }, {
        title: 1
    }, (err, data1) => {
        if (err) {
            res1.send({
                'status': 500,
                'message': '查询失败',
                'data': err
            })
        } else {
            res1.send({
                'status': 200,
                'message': '查询成功',
                'data': data1
            });
        }
    })
};

exports.getItem = function (req1, res1) {
    let id = req1.query.id
    models.solution.find({
        _id: id
    }, (err, data1) => {
        if (err) {
            res1.send({
                'status': 500,
                'message': '查询失败',
                'data': err
            })
        } else {
            console.log(data1);
            res1.send({
                'status': 200,
                'message': '查询成功',
                'data': data1
            });
        }
    })
};

exports.getTypeList = function (req1, res1) {
    let id = req1.query.id
    models.solution.find({
        classify: id
    }, {
        title: 1
    }, (err, data1) => {
        if (err) {
            res1.send({
                'status': 500,
                'message': '查询失败',
                'data': err
            })
        } else {
            res1.send({
                'status': 200,
                'message': '查询成功',
                'data': data1
            });
        }
    })
};