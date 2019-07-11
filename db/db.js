// 导入mysql模块
const mysql = require("mysql");

// 创建数据库连接
var connection = mysql.createConnection({
  // 地址
  host: "localhost",
  // 用户名
  user: "root",
  // 用户名密码
  password: "root",
  // 数据库名称
  database: "heros"
});

// 操纵数据库
module.exports = {
  // 获取所有数据
  getHeros(callback) {
    // 连接数据库
    // connection.connect();

    connection.query(
      "SELECT id,name,skill,icon from hero where isDelete = 'false'",
      (error, results, fields) => {
        if (error) {
          throw error;
        }
        // 通过回调函数的方式，将数据传递出去
        callback(results);
      }
    );

    // 断开数据库连接
    // connection.end();
  },
  // 新增数据
  /**
   *
   * insert into hero (name, skill, icon) values("xx","xxx","xxxx")
   */
  addHero({ name, skill, icon, callback }) {
    // 连接数据库
    // connection.connect();
    connection.query(
      `insert into hero (name, skill, icon) values("${name}","${skill}","${icon}")`,
      function(error, results, fields) {
        if (error) {
          throw error;
        }
        callback(results);
      }
    );
    // 断开数据库连接
    // connection.end();
  },
  // 根据id查询数据
  /**
   *
   * select id,name,skill,icon from hero where id=xxx and isDelete=false
   */
  getHeroById({ id, callback }) {
    // 连接数据库
    // connection.connect();
    connection.query(
      `select id,name,skill,icon from hero where id=${id} and isDelete=false`,
      function(error, results, fields) {
        if (error) {
          throw error;
        }
        callback(results);
      }
    );
    // 断开数据库连接
    // connection.end();
  },
  // 根据id删除数据(软删除)
  /**
   *
   * update hero set isDelete = "true" where id = xxx
   */
  deleteHeroById({ id, callback }) {
    // 连接数据库
    // connection.connect();
    connection.query(
      `update hero set isDelete = "true" where id = ${id}`,
      (error, results, fields) => {
        if (error) {
          throw error;
        }
        callback(results);
      }
    );
    // 断开数据库连接
    // connection.end();
  },
  // 修改数据
  /**
   * updata hero set name = "name", skill = "skill", icon = "icon" where id = id
   */
  editHero({ id, name, skill, icon, callback}) {
        // 连接数据库
        // connection.connect();
        connection.query(
          `update hero set name = "${name}", skill = "${skill}", icon = "${icon}" where id = ${id}`,
          (error, results, fields) => {
            if (error) {
              throw error;
            }
            callback(results);
          }
        );
        // 断开数据库连接
        // connection.end();
  }
};
