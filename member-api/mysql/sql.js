module.exports = {
    //查询所有的成员信息
    'SELECT_ALL':'select * from userlist order by create_time desc',
    //查询数据总条数
    'SELECT_COUNT':'select count(*) from userlist',
    //添加成员信息
    'ADD_MEMBER':'insert into userlist (name,age,phone,address,id_card,create_time) values (?,?,?,?,?,?)',
    //查询成员是否存在
    'SELECT_ISHAS':'select * from userlist where id_card=?',
    //删除成员
    'DELETE_MEMBER':'delete from userlist where id=?',
    //查询详情
    'SELECT_DETAIL':'select * from userlist where id=?',
    //更改信息
    'UPDATE_INFO':'update userlist set name=?,age=?,phone=?,address=?,id_card=?,create_time=? where id=?'
}