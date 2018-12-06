/*
 * @Author: 李晓丹 
 * @Date: 2018-12-05 08:33:42 
 * @Last Modified by: 李晓丹
 * @Last Modified time: 2018-12-05 08:47:11
 */
var mysql = require('mysql');

var config = {
    port:'3306',
    user:'root',
    password:'root',
    database:'1609B',
    host:'localhost',
    connectionLimit:100
}

var pool = mysql.createPool(config);

/**
 * 连接mysql数据库，进行sql查询
 * @param {string} sql sql语句      select * from userlist
 * @param {array} query 查询的参数 [,]
 * @param {function} fn 回调函数
 */
// (sql,fn)

// (sql,,fn)

module.exports = function(sql,query,fn){
    fn = fn ? fn : query;

    query = query || [];

    pool.getConnection(function(error,con){
        if(error){
            fn(error);
        }else{
            con.query(sql,query,function(err,results){
                con.release();
                queryCallback(err,results);
            })
        }
    })

    function queryCallback(err,results){
        if(err){
            fn(err);
        }else{
            fn(null,results);
        }
    }
}
