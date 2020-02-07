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
         };

         const {username, password, selectedBandleader} = body;

         describe("Creates a new user", () => {

            it("register creates a new user", done => {

               chai.request(server)
                  .post("/users/register/client")
                  .send(body)
                  .end((err, res) => {
                     const expectedResponse = {
                        isAuthenticated: true,
                        username: "testClient",
                        accountType: "client",
                        setListAvailable: false,
                        selectedBandleader : "fillerbandleader@gmail.com"
                     };

                     expect(res.status).to.equal(200);

                     expect(res.body.isAuthenticated).to.equal(expectedResponse.isAuthenticated);
                     expect(res.body.username).to.equal(expectedResponse.username);
                     expect(res.body.accountType).to.equal(expectedResponse.accountType);
                     expect(res.body.setListAvailable).to.equal(expectedResponse.setListAvailable);
                     expect(res.body.selectedBandleader).to.equal(expectedResponse.selectedBandleader);

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
                     const errorMessage = 'This user has already been registered';

                     expect(res.status).to.equal(401);
                     expect(res.body.errorMessage).to.equal(errorMessage);

                     done();
               });
           });

           afterEach(done => {
            UserModel.deleteUser(username)
                     .then(response => done())
                     .catch(err => console.log(err));
            });

         })
    })

    describe("Login", () => {

         const body = {
            username : "testBandleader",
            password : "testPassword",
         };

         const {username, password} = body;

         describe("Login works", () => {

            beforeEach(done => {
               UserModel.register(username, password, "bandLeader", null)
                        .then(response => done())
                        .catch(err => console.log(err));
            });
            
            it("Login passes", done => {
               chai.request(server)
                  .post("/users/login/bandLeader")
                  .send(body)
                  .end((err, res) => {
                     const expectedResponse = { 
                        username: 'testBandleader',
                        accounttype: 'bandLeader',
                        bandleadername: null,
                        setlistavailable: false 
                     };
                     expect(res.status).to.equal(200);
                     done();
                  });

            })

            afterEach(done => {
               UserModel.deleteUser(username)
                        .then(response => done())
                        .catch(err => console.log(err));
            });

         });

         describe("Login will not pass", () => {
            it("User isn't registered", done => {
               done();
            })

            it("Wrong account type is provided", done => {
               done();
            })
   
            it("Incorrect password provided", done => {
               done();
            })
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