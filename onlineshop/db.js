var pg = require('pg')
let connectionParam = {
    
    host : "localhost",
    port : 5432,
    user : "nodeuser",
    password : "jamblisco",
    database : "onlineshop"
}



module.exports.addToInventory = function(sku,qty,cb) {
   const conn = new pg.Client(connectionParam)

   conn.connect();
   let query1 = "insert into stocks(sku,quantity) values($1,$2) RETURNING stid as retid";
   conn.query(query1,[sku,qty],(err,resp) => {
        if(err) {
            if(cb) {
                cb(err,null);
                return;
            }
        }
    
            if(cb){
             //    console.log(resp.rows[0])
                 cb(null,resp.rows[0].retid);
            }
            conn.end();
    
  });
}

module.exports.fetchStockDetails = function(cb) {
    const conn = new pg.Client(connectionParam)

    conn.connect();
    let query1  = "select * from stocks";
    
 //let query1  = "select stid,sku,quantity from stocks";
    conn.query(query1,(err,resp) =>{
        if(err) {
            if(cb) {
                cb(err,null);
                return;
            }
        }
        if(cb) {
            cb(null,resp);
            return;
        }
        conn.end();

    })
}

module.exports.getItemById = function(sid,cb) {
    const conn = new pg.Client(connectionParam)

    conn.connect();
    let query1 = "select stid,sku,quantity from stocks where stid=$1";
    conn.query(query1,[sid],(err,resp) => {
        if(err) {
            if(cb) {
                cb(err,null);
                return;
            }
        }
        if(cb) {
            //console.log(resp);
            cb(null,resp.rows[0]);
        
        }
        conn.end();
    });
}

module.exports.deleteItem = function(sid,cb) {
    const conn = new pg.Client(connectionParam)

    conn.connect();
    let query1 = "delete from stocks where stid=$1";
    conn.query(query1,[sid],(err,resp) =>{
        if(err) {
            if(cb) {
                cb(err,null);
                return
            }
        }
        if(cb) {
           // console.log(resp);
            cb(null,resp)
        }
        conn.end();
    });
}

module.exports.updateInventory = function(sku,qty,sid,cb) {
    const conn = new pg.Client(connectionParam)

    conn.connect();
    let query1 = "update stocks set sku=$1,quantity=$2 where stid=$3";
    conn.query(query1,[sku,qty,sid],(err,resp) =>{
        if(err) {
            if(cb) {
                cb(err,null);
                return
            }
        }
        if(cb) {
            
            cb(null,resp)
        }
        conn.end();
    });
}
