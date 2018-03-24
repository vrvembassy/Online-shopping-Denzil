var express = require('express');
var router = express();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var db  = require('../db')

//function to add the element to the inventory
router.post('/addStocks',(req,res)=> {

    let skuId = req.body.skuId;
    let qty = req.body.qty;
    db.addToInventory(skuId,qty,(err,resp) => {
        if(err) {
            return res.status(500).send("oops..! something went wrong");
        }
        if(!resp){
            return res.status(404).send("item not found");
        }
        res.status(200).send({id:resp,status : "success"});

    });
});

//function to get the element from the data base

router.get('/getStock',(req,res) => {
    db.fetchStockDetails((err,resp) =>{
        if(err) {
            return  res.status(500).send("oops..!something went wrong");
        }
        if(!resp) {
           return res.status(404).send("page not found");
        }
        return res.status(200).send({items:resp});
        //return res.status(200).send({id :resp.stid,skuId:resp.sku,qty : resp.qty})
    });
    
})

router.get('/getItemStock/:id',(req,res) => {
    let stkid = req.params.id;
    db.getItemById(stkid,(err,resp) =>{
        if(err){
            return res.status(500).send("oops..!something went wrong");
        }
        if(!resp){
            return res.status(404).send("page not found");
        }
        return res.status(200).send({items:resp});
    })
})

router.delete('/removeStock/:id',(req,res) => {
    let stkid = req.params.id;
    db.deleteItem(stkid,(err,resp) => {
        if(err) {
            return res.status(500).send("oops..!something went wron");
        } 
        if(!resp) {
            return res.status(404).send("page not found");
        }
        return res.status(200).send({status : "success"});
    })
})

router.get('/modifyItemById/:id',(req,res) =>{
    let stkid = req.params.id;
    db.getItemById(stkid,(err,resp) =>{
        if(err) {
            return res.status(500).send("oops..!something went wrong");
        }
        if(!resp) {
            return res.status(404).send("page not found");
         }
          res.status(200).send({stid : resp.stid,sku : resp.sku,qty:resp.quantity});
        //api to update the element
        router.put('/modifyItemById/'+resp.stid,(req1,res1) =>{
          
            let skuId = req1.body.sku;
            let qty = req1.body.qty;
           db.updateInventory(skuId,qty,stkid,(err1,ress) =>{
                if(err1) {
                    return res1.status(500).send("oops..!something went wrong");
                }
                if(!ress) {
                    return res1.status(404).send("page not found");
                }
                return res1.status(200).send({status : "success"});
            });
               
        });
    });
});
module.exports = router;

