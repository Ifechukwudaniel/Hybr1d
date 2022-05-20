// import app from '../../app';
// import {expect} from "chai";
// import { nanoid } from 'nanoid';
// import supertest from 'supertest';
// import mongoose from 'mongoose';


// let accessToken = '';

// describe('Seller end points', () => {
//      let request:supertest.SuperAgentTest

//      const buyerUserBody = {
//           name:"buyerUser", email: `user+${nanoid(10)}@gmail.com`,password:"password",userType:0
//      };

//      const sellerUserBody = {
//         name:"sellerUser", email: `user+${nanoid(10)}@gmail.com`,password:"password", userType:1
//     };

//      before(async () => {
//          request =supertest.agent(app)
//      });

//      after(()=>{
//          //shutdown express server
//          app.close(()=>{
//              mongoose.connection.close(true)
//          })
//      })
    
//     it('should allow a seller crete product at /api/buyer/list-of-sellers',  async () => {
//         await  request.post('/api/auth/register').send(buyerUserBody)
//         const buyerRes = await  request.post('/api/auth/login').send(buyerUserBody)
//         accessToken =  buyerRes.body.accessToken    
//     });
     
//     it('should allow buyers get the seller catalog at /api/buyer/seller-catalog/:seller_id',  async () => {
            
//     });

//     it('should allow buyers create and order to a seller  /api/buyer/create-order/:seller_id',  async () => {
             
//     });

// });
