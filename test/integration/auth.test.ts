import app from '../../app';
import {expect} from "chai";
import { nanoid } from 'nanoid';
import supertest from 'supertest';
import mongoose from 'mongoose';


describe('Auth end points', () => {
     let request:supertest.SuperAgentTest

     before(() => {
         request =supertest.agent(app)
     });

     after(()=>{
         //shutdown express server
         app.close(()=>{
             mongoose.connection.close(true)
         })
     })
     let name="user"
     let password="secret"

     const buyerUserBody = {
          name, email: `user+${nanoid(10)}@gmail.com`,password,userType:0
     };
     const sellerUserBody = {
        name, email: `user+${nanoid(10)}@gmail.com`,password, userType:1
    };

    const fakeUserTypeUserBody = {
        name,email: `user+${nanoid(10)}@gmail.com`, password:"${}+", userType:10
    };

    describe('/api/auth/register', () => {
        it('should allow a Buyer to register  at  /api/auth/register ',  async () => {
            const res = await  request.post('/api/auth/register').send(buyerUserBody)
            expect(res.status).to.equal(201);
            expect(res.body).not.to.be.empty;
            expect(res.body).to.be.an('object');
            expect(res.body.userId).to.be.an('string');
        });

        it('should allow a Sellers to register  at  /api/auth/register ',  async () => {
                const res = await  request.post('/api/auth/register').send(sellerUserBody)
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('object');
                expect(res.body.userId).to.be.an('string');
        });

        it('should allow not allow other user type to register  at  /api/auth/register ',  async () => {
                const res = await  request.post('/api/auth/register').send(fakeUserTypeUserBody)
                expect(res.status).to.equal(500);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('object');
                expect(res.body.errors).to.be.an('array');
        });
    });

    describe('/api/auth/login', () => {
        it('should not login with wrong email /api/auth/login ',  async () => {
            const res = await  request.post('/api/auth/login').send({...buyerUserBody,email:fakeUserTypeUserBody.email })
            expect(res.status).to.equal(400);
            expect(res.body).not.to.be.empty;
        });

        it('should not login with wrong password  email /api/auth/login ',  async () => {
            const res = await  request.post('/api/auth/login').send({...buyerUserBody,email:fakeUserTypeUserBody.password })
            expect(res.status).to.equal(400);
            expect(res.body).not.to.be.empty;
        });

        it('should allow a Buyer to login at /api/auth/login ',  async () => {
            const res = await  request.post('/api/auth/login').send(buyerUserBody)
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.accessToken).to.be.an('string');
        });      
        it('should allow a Sellers to login at /api/auth/login',  async () => {
            const res = await  request.post('/api/auth/login').send(sellerUserBody)
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.accessToken).to.be.an('string');
        });
    });

});