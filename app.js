// 导入模块
const express = require("express");
// 导入body-parser
const bodyParser = require("body-parser");
// 导入fs模块
const fs = require("fs");
// 导入path模块
const path = require("path");
// 导入multer模块
const multer = require("multer");

// 导入db模块
const db = require("./db/db");

// 设置上传文件路径及文件名称
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    const type = file.originalname.split(".")[1];
    cb(null, file.fieldname + "-" + Date.now() + "." + type);
  }
});

var upload = multer({ storage: storage });

// 实例化路由对象
const app = express();

app.use(express.static("public"));

// 使用body-parser解析post的数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// 获取英雄列表 无参数 get请求
app.get("/list", (req, res) => {
  db.getHeros(data => {
    res.send({
      msg: "获取成功",
      code: 200,
      data
    });
  });
});
// 新增英雄 有参数 有文件 post请求 参数类型为form-data
app.post("/add", upload.single("icon"), (req, res) => {
  // 获取参数
  const { name, skill } = req.body;
  const icon = req.file.path;
  db.addHero({
    name,
    skill,
    icon,
    callback(data) {
      if (data.affectedRows == 1) {
        // 成功
        res.send({
          msg: "新增成功",
          code: 200
        });
      } else {
        // 失败
        res.send({
          msg: "参数错误",
          code: 400
        });
      }
    }
  });
});
// 根据传入的id删除英雄 有参数 get请求
app.get("/delete", (req, res) => {
  // 获取要删除的英雄id
  const id = req.query.id;
  db.deleteHeroById({
    id,
    callback(data) {
      if (data.affectedRows == 1) {
        // 成功
        res.send({
          msg: "删除成功",
          code: 200
        });
      } else {
        // 失败
        res.send({
          msg: "参数错误",
          code: 400
        });
      }
    }
  });
});
// 根据id查询英雄 有参数 get请求
app.get("/search", (req, res) => {
  const id = req.query.id;
  db.getHeroById({
    id,
    callback(data) {
      if (data.length) {
        res.send({
          code: 200,
          msg: "查询成功",
          data
        });
      } else {
        res.send({
          code: 400,
          msg: "参数错误"
        });
      }
    }
  });
});
// 编辑英雄 有参数 有文件 post请求 参数类型 form-data
app.post("/edit", upload.single("icon"), (req, res) => {
  const { id, name, skill } = req.body;
  const icon = req.file.path;
  db.editHero({
    id,
    name,
    skill,
    icon,
    callback(data) {
      if (data.affectedRows == 1) {
        // 成功
        res.send({
          msg: "修改成功",
          code: 200
        });
      } else {
        // 失败
        res.send({
          msg: "参数错误",
          code: 400
        });
      }
    }
  });
});
// 开启监听
app.listen(4399, () => {
  console.log("success");
});
