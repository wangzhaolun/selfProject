/**
 * Created by lb on 2017/6/30.
 */
const pool = require('./pool');

module.exports = {
    register: (req, res)=>{
        var uname = req.body.uname;
        var upwd = req.body.upwd;
        pool.getConnection((err, conn)=>{
            conn.query("INSERT INTO t_user VALUES(NULL,?,?)",[uname, upwd],(err, result)=>{
                if(result.affectedRows===1){ //判定INSERT操作影响的行数
                    var data = {code:200, msg:'注册成功'};
                }else {
                    var data = {code:500,msg:'注册失败'}
                }
                res.json(data);
                conn.release();
            })
        })
    },
    login: (req, res)=>{
        var uname = req.body.uname;
        var upwd = req.body.upwd;
        pool.getConnection((err, conn)=>{
            conn.query('SELECT uname FROM t_user WHERE uname=? AND upwd=?',[uname, upwd], (err, result)=>{
                if(err){
                    var data = {code:-2,msg:'throw a error'};
                }else if(result.length===0){
                    var data = {code:-1,msg:'用户名或密码有误'};
                }else {
                    var data = {code:1,msg:'登陆成功',uname:result[0].uname}
                }
                res.json(data);
                conn.release();
            });
        })
    }
};