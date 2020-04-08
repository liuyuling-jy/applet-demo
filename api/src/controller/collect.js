const models = require('../models/collect');
const modelsSolution = require('../models/solution');

exports.collectItem = function (req, res) {
    models.collect.create(req.body, (err, data) => {
        if (err) {
            res.send({
                'status': 500,
                'message': '收藏失败',
                'data': err
            })
        } else {
            res.send({
                'status': 200,
                'message': '收藏成功',
                'data': true
            });
        }
    })
};

exports.collectCancel = function (req, res) {
    models.collect.deleteOne(req.body, (err, data) => {
        if (err) {
            res.send({
                'status': 500,
                'message': '取消收藏失败',
                'data': err
            })
        } else {
            res.send({
                'status': 200,
                'message': '取消收藏成功',
                'data': true
            });
        }
    })
};

exports.isCollect = function (req, res) {
    models.collect.findOne(req.body, (err, data) => {
        if (err) {
            res.send({
                'status': 500,
                'message': '查询失败',
                'data': err
            })
        } else {
            let a = false;
            if (data) {
                a = true;
            } else {
                a = false;
            }
            console.log(a);
            res.send({
                'status': 200,
                'message': '查询成功',
                'data': a
            });
        }
    })
};

exports.getCollectList = function (req1, res1) {
    let openId = req1.query.openId;

    // models.collect.aggregate([
    //     {
    //       $lookup:
    //         {
    //           from:'solution',
    //           localField: "itemId",
    //           foreignField: "_id",
    //           as: "collect_all"
    //         }
    //    }
    //  ],(err, data1) => {
    //     if (err) {
    //         res1.send({
    //             'status': 500,
    //             'message': '查询失败',
    //             'data': err
    //         })
    //     } else {
    //         console.log(data1);
    //         res1.send({
    //             'status': 200,
    //             'message': '查询成功',
    //             'data': data1
    //         });
    //     }
    // })
    models.collect.find({
        collectOpenId: openId
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
            console.log(data1);
            res1.send({
                'status': 200,
                'message': '查询成功',
                'data': data1
            });
        }
    })
};

exports.getItemCollect = function (req1, res1) {
    let id = req1.query.id
    console.log(id);
    models.collect.find({
        _id: id
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
// exports.getOwnList = function (req1, res1) {
//     let openId = req1.query.openId
//     console.log(openId);
//     models.solution.find({
//         openId: openId
//     }, (err, data1) => {
//         console.log('+++')
//         if (err) {
//             res1.send({
//                 'status': 500,
//                 'message': '查询失败',
//                 'data': err
//             })
//         } else {
//             res1.send({
//                 'status': 200,
//                 'message': '查询成功',
//                 'data': data1
//             });
//         }
//     })
// };

// exports.getItem = function (req1, res1) {
//     let id = req1.query.id
//     models.solution.find({
//         _id: id
//     }, (err, data1) => {
//         if (err) {
//             res1.send({
//                 'status': 500,
//                 'message': '查询失败',
//                 'data': err
//             })
//         } else {
//             res1.send({
//                 'status': 200,
//                 'message': '查询成功',
//                 'data': data1
//             });
//         }
//     })
// };

// exports.getTypeList = function (req1, res1) {
//     let id = req1.query.id
//     models.solution.find({
//         classify: id
//     }, (err, data1) => {
//         if (err) {
//             res1.send({
//                 'status': 500,
//                 'message': '查询失败',
//                 'data': err
//             })
//         } else {
//             res1.send({
//                 'status': 200,
//                 'message': '查询成功',
//                 'data': data1
//             });
//         }
//     })
// };