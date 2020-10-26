const express = require('express'); //用commonjs全局引入express
const app = express();
const port = 3000; //设置端口号
const mysql = require('mysql');
const { query } = require('express');
app.all("/*", function(req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next()
});
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'novel'
});
connection.connect();

// 首页

// 首页轮播图
app.get('/index-img', (req, res) => {
    connection.query('select * from swiper;', (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 本期强推
app.get('/index/qiangtui', (req, res) => {
    connection.query(`select * from yuedu where tabs1='本期强推' limit 0,10;`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 新书抢鲜
app.get('/index/xinshu', (req, res) => {
    connection.query(`select * from yuedu where tabs1='新书抢鲜' limit 0,4;`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 限时免费
app.get('/index/mianfei', (req, res) => {
    connection.query(`select * from yuedu where tabs1='限时免费' limit 0,4;`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 编辑推荐
app.get('/index/bianji', (req, res) => {
    connection.query(`select * from yuedu where tabs1='编辑推荐' limit 0,10;`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 全部
app.get('/index/all', (req, res) => {
    connection.query(`select * from yuedu;`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 详情
app.get('/detail', (req, res) => {
    connection.query(`select * from yuedu where id=${req.query.id};`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 现代言情
app.get('/yanqing', (req, res) => {
    connection.query(`select * from yuedu where first='现代言情';`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 科幻空间
app.get('/kehuan', (req, res) => {
    connection.query(`select * from yuedu where first='科幻空间';`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 古代言情
app.get('/gudai', (req, res) => {
    connection.query(`select * from yuedu where first='古代言情';`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 玄幻言情
app.get('/xuanhuan', (req, res) => {
    connection.query(`select * from yuedu where first='玄幻言情';`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 游戏竞技
app.get('/youxi', (req, res) => {
    connection.query(`select * from yuedu where first='游戏竞技';`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 仙侠奇缘
app.get('/xianxia', (req, res) => {
    connection.query(`select * from yuedu where first='仙侠奇缘';`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 模糊查询
app.get('/search', (req, res) => {
    connection.query(`select * from yuedu where title like '%${req.query.txt}%' or author like '%${req.query.txt}%';`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 用户登陆
app.get('/user', (req, res) => {
    connection.query(`select * from users;`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 用户注册
app.get('/user/add', (req, res) => {
    connection.query(`insert into users(user,password) values(${req.query.user},${req.query.password});`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 书架
app.get('/user/bookcase', (req, res) => {
    connection.query(`select * from users where user=${req.query.user};`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 添加到书架
app.get('/user/addbook', (req, res) => {
    connection.query(`update users set star='${req.query.s}' where user=${req.query.user};`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

// 添加到书架
app.get('/user/changename', (req, res) => {
    connection.query(`update users set name='${req.query.name}' where user=${req.query.user};`, (err, result) => {
        const obj = {
            status: 200,
            data: result
        }
        res.json(obj)
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) // 监听端口