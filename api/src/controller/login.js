const models = require('../models/schema');
exports.register = function(req, res) {
    models.find({
        name: req.body.name
    }, (err, data) => {
        if (err) {
            res.send({
                'status': 500,
                'message': '查询失败',
                'data': err
            })
        } else {
            if (data.length > 0) {
                res.send({
                    'status': 201,
                    'message': '该用户名已被注册'
                });
            } else {
                let newName = new models({
                    name: req.body.name,
                    password: req.body.password
                });
                newName.save((err, data) => {
                    if (err) {
                        res.send({
                            'status': 501,
                            'message': '注册失败',
                            'data': err
                        })
                    } else {
                        res.send({
                            'status': 200,
                            'message': '注册成功'
                        });
                    }
                })
            }
        }
    })
};
exports.login = function(req, res) {
    models.find({
        name: req.body.name
    }, (err, data) => {
        if (err) {
            res.send({
                'status': 500,
                'message': '查询失败',
                'data': err
            })
        } else {
            if (data.length > 0) {
                if (data[0].password === req.body.password) {
                    res.send({
                        'status': 200,
                        'message': '登录成功'
                    });
                } else {
                    res.send({
                        'status': 201,
                        'message': '密码错误'
                    });
                }

            } else {
                res.send({
                    'status': 201,
                    'message': '用户未注册'
                });
            }
        }
    })
};
// router.get('/api/user/userList', (req, res) => {
//     models.find( (err, data) => {
//         if (err) {
//             res.send({
//                 'status': 500,
//                 'message': '查询失败',
//                 'data': err
//             })
//         } else {
//             if (data.length > 0) {
//                 console.log(data);
//                 // res.send({
//                 //     'status': 200,
//                 //     'message': '查询成功',
//                 //     'data': data
//                 // }); 
//                 return res.json({
//                     'status': 200,
//                     'message': '查询成功',
//                     'data': data
//                 })
//             } else {
//                 res.send({
//                     'status': 200,
//                     'message': '列表无数据'
//                 });
//             }

//         }
//     })
// })
// router.post('/api/user/delete', (req, res) => {
//     console.log({name: req.body.name});
//     models.remove({name: req.body.name}, (err, data) => {
//         if (err) {
//             res.send({
//                 'status': 500,
//                 'message': '删除失败',
//                 'data': err
//             })
//         } else {
//             console.log({name: req.body.name});
//         }
//     })
//     models.find((err,data1) => {
//         if (err) {
//             res.send({
//                 'status': 500,
//                 'message': '删除后更新失败',
//                 'data': err
//             })
//         } else {
//             console.log(data1);
//             res.send({'status': 200, 'message': '删除成功！', 'data': data1});
//         }
//     });
// })
// module.exports = router;