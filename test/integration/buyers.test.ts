import app from '../../app';
import {expect} from "chai";
import { nanoid } from 'nanoid';
import supertest from 'supertest';
import mongoose from 'mongoose';


let buyerAccessToken = '';
let sellerAccessToken= ''
let seller_id =''


describe('Buyers end points', function(){
     let request:supertest.SuperAgentTest = supertest.agent(app)

     const buyerUserBody = {
          name:"buyerUser", email: `user+${nanoid(10)}@gmail.com`,password:"password",userType:0
     };

     const products = []

     const sellerUserBody = {
        name:"sellerUser", email: `user+${nanoid(10)}@gmail.com`,password:"password", userType:1
    };

    before( async () => {
        request =supertest.agent(app)

        // login and register buyer user
        let register_res = await request.post('/api/auth/register').send(buyerUserBody)
        seller_id =  register_res.body.user_id
        let res =  await  request.post('/api/auth/login').send(buyerUserBody)

        // login and register seller user
        await request.post('/api/auth/register').send(sellerUserBody)
        let sellerRes =  await  request.post('/api/auth/login').send(sellerUserBody)

        //set token as text
        buyerAccessToken = res.body.accessToken
        sellerAccessToken = sellerRes.body.accessToken
    });


    it('should allow a buyers get list of sellers at /api/buyer/list-of-sellers', async ()=>{
       let res =  await  request
            .get('/api/buyer/list-of-sellers')
            .set({ Authorization: `Bearer ${buyerAccessToken}` })
            .send()
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty
        expect(res.body).to.be.an('object');
        expect(res.body.sellers).to.be.an('array');
        expect(res.body.sellers.length).greaterThan(0)
    });
     
    it('should allow buyers get the seller catalog at /api/buyer/seller-catalog/:seller_id', async ()=> {
        let res =  await  request
            .get(`/api/buyer/seller-catalog/${seller_id}`)
            .set({ Authorization: `Bearer ${buyerAccessToken}` })
            .send()
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty
        expect(res.body).to.be.an('object');
        expect(res.body.products).to.be.an('array');
        for(let product in res.body.products ){
            products.push(product['_id'])
        }
    });

    it('should allow buyers create and order /api/buyer/create-order/:seller_id', async ()=> {
       let res =  await  request
            .post(`/api/buyer/create-order/${seller_id}`)
            .set({ Authorization: `Bearer ${buyerAccessToken}` })
            .send({products})
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty
        expect(res.body).to.be.an('object');
        // expect(res.body.products).to.be.an('array');
    });

});
