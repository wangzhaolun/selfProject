/**
 * Created by lb on 2017/6/30.
 */
const pool = require('./pool');

module.exports = {
    product: (req, res)=>{
        var pageNo = req.body.pageNo;
        var offset = (pageNo-1)*5;
        pool.getConnection((err, conn)=>{
            conn.query('SELECT * FROM t_product limit ?,5',[offset], (err, result)=>{
                res.json(result);
                conn.release();
            });
        });
    }
};