import app from '../../app';
import {expect} from "chai";
import { nanoid } from 'nanoid';
import supertest from 'supertest';


let buyerAccessToken = '';
let sellerAccessToken= ''
let productId = ''


describe('Seller end points', function(){
     let request:supertest.SuperAgentTest = supertest.agent(app)

     const buyerUserBody = {
          name:"buyerUser", email: `user+${nanoid(10)}@gmail.com`,password:"password",userType:0
     };
     const product = { name:"Beans Pie" ,price:1000.00 }

     const sellerUserBody = {
        name:"sellerUser", email: `user+${nanoid(10)}@gmail.com`,password:"password", userType:1
    };

    before( async () => {
        request =supertest.agent(app)

        // login and register buyer user
        await request.post('/api/auth/register').send(buyerUserBody)
        let res =  await  request.post('/api/auth/login').send(buyerUserBody)

        // login and register seller user
        await request.post('/api/auth/register').send(sellerUserBody)
        let sellerRes =  await  request.post('/api/auth/login').send(sellerUserBody)

        //set token as text
        buyerAccessToken = res.body.accessToken
        sellerAccessToken = sellerRes.body.accessToken
    });


    it('should allow a sellers to create a product /api/seller/create-product', async ()=>{
       let res =  await  request
            .post('/api/seller/create-product')
            .set({ Authorization: `Bearer ${sellerAccessToken}` })
            .send(product)
        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty
        expect(res.body).to.be.an('object');
        expect(res.body._id).to.be.a('string');
        productId = res.body._id
    });
     
    it('should allow sellers to create catalog /api/seller/create-catalog', async ()=> {
        let res =  await  request
            .post('/api/seller/create-catalog')
            .set({ Authorization: `Bearer ${sellerAccessToken}` })
            .send(product)
        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty
        expect(res.body).to.be.an('object');
        expect(res.body._id).to.be.a('string');
    });

    it('should allow sellers get orders /api/seller/orders', async ()=> {
       // setTimeout(done, 300);
    });

});
