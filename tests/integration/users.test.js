const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../../app");
const UserModel = require("../../models/UserModel");

chai.use(chaiHttp);

describe("User Routes", () => {

    describe("Register", () => {

         const body = {
            username : "testClient",
            password : "testPassword",
            selectedBandleader : "fillerbandleader@gmail.com"
         }

         const {username, password, selectedBandleader} = body;

         describe("Creates a new user", () => {

            it("register creates a new user", done => {

               chai.request(server)
                  .post("/users/register/client")
                  .send(body)
                  .end((err, res) => {

                     const expectedResponse = {
                        isAuthenticated: true,
                        username: 'testClient',
                        accountType: 'client',
                        setListAvailable: false 
                     }

                     expect(res.status).to.equal(200);

                     const response = {
                        isAuthenticated: res.body.isAuthenticated,
                        username: res.body.username,
                        accountType: res.body.accountType,
                        setListAvailable: res.body.setListAvailable
                     }

                     expect(response.isAuthenticated).to.equal(expectedResponse.isAuthenticated);
                     expect(response.username).to.equal(expectedResponse.username);
                     expect(response.accountType).to.equal(expectedResponse.accountType);
                     expect(response.setListAvailable).to.equal(expectedResponse.setListAvailable);

                     done();
                  });

            })

            afterEach(done => { 
               UserModel.deleteUser(username)
                        .then(response => done())
                        .catch(err => console.log(err));
               
            });

         });

         describe("Will not create a new user if the user already exists", () => {

            beforeEach(done => {
               UserModel.register(username, password, "client", selectedBandleader)
                        .then(response => done())
                        .catch(err => console.log(err));
            });
   
            it("register will not be successful if a user exists", done => {
               chai.request(server)
                  .post("/users/register/client")
                  .send(body)
                  .end((err, res) => {
                     expect(res.status).to.equal(401);
                     if(err){
                        console.log(res.body);
                     }
                     done();
               });
           });
   
           afterEach(done => {
            UserModel.deleteUser(username)
                     .then(response => {
                        done();
                     })
                     .catch(err => console.log(err));
            });

         })
    })

    describe("Login", () => {

        it("login fails", done => {
            done();
         })

         it("login passes", done => {
            done();
         })

         it("login will not work if the password is incorrect", done => {
            done();
         })
    })

    describe("checkToken", () => {

        it("checkToken works when provided valid jwt", done => {
            done();
         })

         it("checkToken will fail", done => {
            done();
         })
    })

    it("getBandleaders", done => {
       done();
    })

    it("getClientsForBandleader", done => {
       done();
    })

    it("clientInfo", done => {
       done();
    })

    it("getUserInfo", done => {
       done();
    })

    it("editUserInfo", done => {
       done();
    })

    it("sendClientSetlist", done => {
       done();
    })

});