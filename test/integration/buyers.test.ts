import app from '../../app';
import {expect} from "chai";
import { nanoid } from 'nanoid';
import supertest from 'supertest';
import mongoose from 'mongoose';


let accessToken = '';

describe('Buyers end points', function(){
    this.slow(300000)
     let request:supertest.SuperAgentTest

     const buyerUserBody = {
          name:"buyerUser", email: `user+${nanoid(10)}@gmail.com`,password:"password",userType:0
     };

     const sellerUserBody = {
        name:"sellerUser", email: `user+${nanoid(10)}@gmail.com`,password:"password", userType:1
    };

     before(function(done){
        request =supertest.agent(app)
     });

     after(function(){
         //shutdown express server
         app.close(()=>{
             mongoose.connection.close()
         })
     })
    
    it('should allow a buyers to get list of sellers at /api/buyer/list-of-sellers', async ()=>{
        const res = await  request.post('/api/auth/register').send(buyerUserBody)
        expect(res.status).to.equal(201);
        // returnsetTimeout(done, 300);
    });
     
    it('should allow buyers get the seller catalog at /api/buyer/seller-catalog/:seller_id', async ()=> {
        //setTimeout(done, 300);
    });

    it('should allow buyers create and order to a seller  /api/buyer/create-order/:seller_id', async ()=> {
       // setTimeout(done, 300);
    });

});
