'use strict'

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../server');

describe("Get all product from inventory",function() {
    this.timeout(5000);

    //test for valid request
    it('Display inventory',function() {
        return chai.request(app)
        .get('/admin/getStock')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
         });
    });

    //test case for invalid request
    
    it('Get Invelid path',function() {
        return chai.request(app)
        .get('/somepath')
        .then(function() {
            throw new Error('page not found')
         })
         .catch(function(err) {
            expect(err).to.have.status(404);
         });
    });
});

//test case for post data to the server
describe('post request',function() {
    this.timeout(5000);
    it('store data to inventory',function() {
        return chai.request(app)
        .post('/admin/addStocks')
        .set('Content-Type','application/json')
        .send({
            "skuId" : "POS987987",
            "qty" : 30
        })
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
            expect(res.body).to.be.an('object').that.have.key({id:"anything",status : "success"});
        });
     }); 
    it('invalid post request',function() {
            return chai.request(app)
            .post('/nopost/')
            .set('Content-Type','application/json')
            .send({
                "something" : "something"    
             })
            .then(function(res) {
                throw new Error('page not found');
            })
            .catch(function(err) {
                expect(err).to.have.status(404);
            });
    
    });
});

describe('Delete item from Inventory',function() {
    this.timeout(5000);
    it('Post new data to the inventory',function() {
        return chai.request(app)
        .post('/admin/addStocks')
        .set('Content-Type','application/json')
        .send({
            "skuId" : "POS987987",
            "qty" : 30
        })
        .then(function(res) {
            chai.request(app)
            .delete('/admin/removeStock/'+res.body.id)
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.be.an('object').that.have.key({status : "success"});
             })
         
        });
     }); 

});

describe('Modify the inventory records',function() {
    this.timeout(5000);
    it('Post new data to the inventory',function() {
        return chai.request(app)
        .post('/admin/addStocks')
        .set('Content-Type','application/json')
        .send({
            "skuId" : "POS987987",
            "qty" : 30
         })
         .then(function(res) {
             chai.request(app)
            .get('/admin/modifyItemById/'+res.body.id)
            .then(function(res) {
                 chai.request(app)
                .put('/admin/modifyItemById/'+res.body.stid)
                .set('Content-Type','application/json')
                .send({
                    "sku" : "ABd008",
                    "qty" : 100
                 })
                 .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.be.an('object').that.have.key({status : "success"});
                 });
              }); 
          });
      
     }); 

});


