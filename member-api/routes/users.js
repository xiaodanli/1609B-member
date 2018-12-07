var express = require('express');
var router = express.Router();

var query = require('../mysql');

var sql = require('../mysql/sql');

/* GET users listing. */
router.get('/api/userlist', function(req, res, next) {
  var pagenum = req.query.pagenum,
      pageSize = req.query.pageSize;
  
  query(sql.SELECT_COUNT,function(error,results){
    if(error){
      res.json({code:0,msg:error})
    }else{
      var count = results[0]['count(*)'];
      var total = Math.ceil(count/pageSize);
      queryUserList(total);
    }
  })

  function queryUserList(total){
    var start = (pagenum - 1)*pageSize;
    console.log(start,pageSize)
    var sqlStr = `select * from userlist order by create_time desc limit ${start},${pageSize}`;
    query(sqlStr,function(error,results){
        if(error){
          res.json({code:0,msg:error})
        }else{
          res.json({code:1,data:results,total:total})
        }
      })
  }
  
});

//添加成员信息
router.post('/api/add',function(req,res,next){
  var params = req.body,
      name = params.name,
      age = params.age,
      phone = params.phone,
      address = params.address,
      id_card = params.id_card,
      date = new Date();
  
  if(!name || !id_card){
    res.json({code:2,msg:"姓名或身份证号不能为空"})
  }else{
    //查询成员是否存在
    queryIsHas();
    
  }

  //查询成员是否存在
  function queryIsHas(){
    query(sql.SELECT_ISHAS,[id_card],function(error,results){
      if(error){
        res.json({code:0,msg:error})
      }else{
        if(results.length){
          res.json({code:2,msg:'此用户已存在'})
        }else{
          addMember();
        }
      }
    })
  }

  //添加成员
  function addMember(){
    query(sql.ADD_MEMBER,[name,age,phone,address,id_card,date],function(error,results){
      if(error){
        res.json({code:0,msg:'服务器错误'})
      }else{
        res.json({code:1,msg:'添加成功'})
      }
    })
  }
})

//删除成员
router.get('/api/del',function(req,res,next){
  var id = req.query.id;

  if(id){
    query(sql.DELETE_MEMBER,[id],function(error,results){
      if(error){
        res.json({code:0,msg:error})
      }else{
        res.json({code:1,msg:'删除成功'})
      }
    })
  }else{
    res.json({code:2,msg:'缺少参数'})
  }
})

//查询详情
router.get('/api/detail',function(req,res,next){
  var id = req.query.id;

  if(id){
    query(sql.SELECT_DETAIL,[id],function(error,results){
      if(error){
        res.json({code:0,msg:error})
      }else{
        res.json({code:1,data:results})
      }
    })
  }else{
    res.json({code:2,msg:'缺少参数'})
  }
})

//更改信息
router.post('/api/update',function(req,res,next){
  var params = req.body,
      name = params.name,
      age = params.age,
      phone = params.phone,
      address = params.address,
      id_card = params.id_card,
      date = new Date(),
      id = params.id;
  if(id){
    if(!name ||!id_card){
      res.json({code:2,msg:'用户名或身份证号不存在'})
    }else{
      query(sql.UPDATE_INFO,[name,age,phone,address,id_card,date,id],function(error,results){
        if(error){
          res.json({code:0,msg:error})
        }else{
          res.json({code:1,msg:'修改成功'})
        }
      })
    }
  }else{
    res.json({code:2,msg:'缺少参数'})
  }

})

module.exports = router;
