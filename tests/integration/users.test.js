const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../../app");
const UserModel = require("../../models/UserModel");
const config = require("../../config/config");
const jwt = require("jsonwebtoken");

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
                        isAuthenticated: true,
                        username: 'testBandleader',
                        accountType: 'bandLeader',
                        selectedBandleader: null,
                        setListAvailable: false 
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

         describe("Login will not pass", () => {

            beforeEach(done => {
               UserModel.register(username, password, "bandLeader", null)
                        .then(response => done())
                        .catch(err => console.log(err));
            });
            
            it("User isn't registered", done => {
               const requestBody = {
                  username : "testClient",
                  password : "testPassword",
               }

               chai.request(server)
                  .post("/users/login/bandLeader")
                  .send(requestBody)
                  .end((err, res) => {
                     const expectedResponse = { errorMessage: "This user isn't registered on our site!" };
                     expect(res.status).to.equal(401);
                     expect(res.body.errorMessage).to.equal(expectedResponse.errorMessage);
                     done();
                  });
            })

            it("Wrong account type is provided", done => {
               chai.request(server)
                  .post("/users/login/client")
                  .send(body)
                  .end((err, res) => {
                     const expectedResponse = { errorMessage: "Wrong account type for this user!" };
                     expect(res.status).to.equal(401);
                     expect(res.body.errorMessage).to.equal(expectedResponse.errorMessage);
                     done();
                  });
            })
   
            it("Incorrect password provided", done => {
               const requestBody = {
                  username : "testBandleader",
                  password : "testPassword123",
               };
               chai.request(server)
                  .post("/users/login/bandLeader")
                  .send(requestBody)
                  .end((err, res) => {
                     const expectedResponse = { errorMessage: "Entered password doesn't match our records" };
                     expect(res.status).to.equal(401);
                     expect(res.body.errorMessage).to.equal(expectedResponse.errorMessage);
                     done();
                  });
            })

            afterEach(done => {
               UserModel.deleteUser(username)
                        .then(response => done())
                        .catch(err => console.log(err));
            });
         })

    })

    describe("checkToken", () => {

         let token;

         const body = {
            username : "testClient",
            password : "testPassword",
            selectedBandleader : "fillerbandleader@gmail.com"
         };

         const {username, password, selectedBandleader} = body;

         beforeEach(done => {
            UserModel.register(username, password, "client", selectedBandleader)
                     .then(response => {
                        const specificUserInfo = response[0];
                        const {id, accounttype} = specificUserInfo;
                        token = jwt.sign(
                           {
                              id : id,
                              username : specificUserInfo.username,
                              accountType : accounttype
                           },
                           config.jwtSecret,
                           {expiresIn : 3600000}
                        )
                        done()
                     })
                     .catch(err => console.log(err));
         });

         it("checkToken works when provided valid jwt in the headers", done => {

            chai.request(server)
               .get("/users/checkToken")
               .set("Authorization", token)
               .end((err, res) => {
                  const expectedResponse = { 
                     isAuthenticated: true,
                     username: "testClient",
                     accountType: "client",
                     setListAvailable: false,
                     selectedBandleader: "fillerbandleader@gmail.com" 
                  }

                  expect(res.body.isAuthenticated).to.equal(expectedResponse.isAuthenticated);
                  expect(res.body.username).to.equal(expectedResponse.username);
                  expect(res.body.accountType).to.equal(expectedResponse.accountType);
                  expect(res.body.setListAvailable).to.equal(expectedResponse.setListAvailable);
                  expect(typeof(res.body.token)).to.equal("string");

                  done();
               })
         });

         afterEach(done => {
            UserModel.deleteUser(username)
                     .then(response => done())
                     .catch(err => console.log(err));
         });

    })

    describe("Get Bandleaders", () => {
       
      const body = {
         username : "testBandleader",
         password : "testPassword",
      };

      const {username, password} = body;

      beforeEach(done => {
         UserModel.register(username, password, "bandLeader", null)
                  .then(response => done())
                  .catch(err => console.log(err));
      });

      it("getBandleaders", done => {
         chai.request(server)
            .get("/users/getBandleaders")
            .end((err, res) => {
               expect(res.status).to.equal(200);
               expect(res.body.bandLeaders.length).to.be.greaterThan(0);
            });
         done();
      });

      afterEach(done => {
         UserModel.deleteUser(username)
                  .then(response => done())
                  .catch(err => console.log(err));
      });

    });

    describe("getClientsforBandLeader", () => {

      let token;

      const bandleaderBody = {
         username : "testBandleader",
         password : "testPassword",
      };

      const clientBody = {
         username : "testClient",
         password : "testPassword",
         selectedBandleader : "testBandleader"
      };

      before(done => {
         UserModel.register(bandleaderBody.username, bandleaderBody.password, "bandLeader", null)
                  .then(response => {
                     const specificUserInfo = response[0];
                     const {id, username, accounttype} = specificUserInfo;
                     token = jwt.sign(
                        {
                           id : id,
                           username : username,
                           accountType : accounttype
                        },
                        config.jwtSecret,
                        {expiresIn : 3600000}
                     )
                     done();
                  })
                  .catch(err => console.log(err));
      });

      before(done => {
         UserModel.register(clientBody.username, clientBody.password, "client", clientBody.selectedBandleader)
                  .then(response => done())
                  .catch(err => console.log(err));
      })

      it("getClientsForBandleader works", done => {
         chai.request(server)
               .get("/users/getClientsForBandleader")
               .set("Authorization", token)
               .end((err, res) => {
                  expect(res.status).to.equal(200);
                  expect(res.body.clientList.length).to.be.greaterThan(0);
                  done();
               })
      });

      after(done => {
         UserModel.deleteUser(bandleaderBody.username)
                  .then(response => done())
                  .catch(err => console.log(err));
      });

      after(done => {
         UserModel.deleteUser(clientBody.username)
                  .then(response => done())
                  .catch(err => console.log(err));
      });

    })

    describe("clientInfo", () => {
      const clientBody = {
         username : "testClient",
         password : "testPassword",
         selectedBandleader : "testBandleader"
      };

      const bandleaderBody = {
         username : "testBandleader",
         password : "testPassword",
      };

      let clientId, token;

      before(done => {
         UserModel.register(clientBody.username, clientBody.password, "client", clientBody.selectedBandleader)
                  .then(response => {
                     clientId = response[0].id;
                     done();
                  })
                  .catch(err => console.log(err));
      });

      before(done => {
         UserModel.register(bandleaderBody.username, bandleaderBody.password, "bandLeader", null)
                  .then(response => {
                     const specificUserInfo = response[0];
                     const {id, username, accounttype} = specificUserInfo;
                     token = jwt.sign(
                        {
                           id : id,
                           username : username,
                           accountType : accounttype
                        },
                        config.jwtSecret,
                        {expiresIn : 3600000}
                     )
                     done();
                  })
                  .catch(err => console.log(err));
      });

      it("clientInfo works", done => {
         chai.request(server)
               .get(`/users/clientInfo/${clientId}`)
               .set("Authorization", token)
               .end((err, res) => {
                  expect(res.status).to.equal(200);

                  const expectedResponse = { 
                     id: clientId,
                     username: "testClient",
                     accountType: "client",
                     bandleaderName: "testBandleader",
                     setlistAvailable: false 
                  }
                  const {clientInfo} = res.body;

                  expect(clientInfo.id).to.equal(expectedResponse.id);
                  expect(clientInfo.username).to.equal(expectedResponse.username);
                  expect(clientInfo.accounttype).to.equal(expectedResponse.accountType);
                  expect(clientInfo.bandleadername).to.equal(expectedResponse.bandleaderName);
                  expect(clientInfo.setlistavailable).to.equal(expectedResponse.setlistAvailable);

                  done();
               })
      })

      after(done => {
         UserModel.deleteUser(clientBody.username)
                  .then(response => done())
                  .catch(err => console.log(err));
      });

      after(done => {
         UserModel.deleteUser(bandleaderBody.username)
                  .then(response => done())
                  .catch(err => console.log(err));
      });

    });

    describe("getUserInfo", () => {

      let token;

      const clientBody = {
         username : "testClient",
         password : "testPassword",
         selectedBandleader : "testBandleader"
      };

      before(done => {
         UserModel.register(clientBody.username, clientBody.password, "client", clientBody.selectedBandleader)
                  .then(response => {
                     const specificUserInfo = response[0];
                     const {id, username, accounttype} = specificUserInfo;
                     token = jwt.sign(
                        {
                           id : id,
                           username : username,
                           accountType : accounttype
                        },
                        config.jwtSecret,
                        {expiresIn : 3600000}
                     )
                     done();
                  })
                  .catch(err => console.log(err));
      });

      it("getUserInfo works", done => {
         chai.request(server)
            .get("/users/getUserInfo")
            .set("Authorization", token)
            .end((err, res) => {

               expect(res.status).to.equal(200);
               
               const expectedResponse = { 
                  username: "testClient",
                  accountType: "client",
                  bandleaderName: "testBandleader",
                  setlistAvailable: false 
               };

               const {userInfo} = res.body;

               expect(userInfo.username).to.equal(expectedResponse.username);
               expect(userInfo.accounttype).to.equal(expectedResponse.accountType);
               expect(userInfo.bandleadername).to.equal(expectedResponse.bandleaderName);
               expect(userInfo.setlistavailable).to.equal(expectedResponse.setlistAvailable);

               done();
            })
      });

      after(done => {
         UserModel.deleteUser(clientBody.username)
                  .then(response => done())
                  .catch(err => console.log(err));
      });

    });

    describe("editUserInfo", () => {

      let token;

      const newUserInfo = {
         newUsername : "testBandleader123",
         newPassword : "testing123"
      };

      const originalUserInfo = {
         username : "testBandleader",
         password : "testPassword",
      };

      before(done => {
         UserModel.register(originalUserInfo.username, originalUserInfo.password, "bandLeader", null)
                  .then(response => {
                     const specificUserInfo = response[0];
                     const {id, username, accounttype} = specificUserInfo;
                     token = jwt.sign(
                        {
                           id : id,
                           username : username,
                           accountType : accounttype
                        },
                        config.jwtSecret,
                        {expiresIn : 3600000}
                     )
                     done();
                  })
                  .catch(err => console.log(err));
      });


      it("editUserInfo", done => {
         chai.request(server)
            .patch("/users/editUserInfo")
            .send(newUserInfo)
            .set("Authorization", token)
            .end((err, res) => {

               const expectedResponse = { 
                  isAuthenticated: true,
                  username: "testBandleader123",
                  accountType: "bandLeader" 
               };

               expect(res.status).to.equal(200);

               expect(res.body.isAuthenticated).to.equal(expectedResponse.isAuthenticated);
               expect(typeof(res.body.token)).to.equal("string");
               expect(res.body.username).to.equal(expectedResponse.username);
               expect(res.body.accountType).to.equal(expectedResponse.accountType);

               done();
            });
      });

      after(done => {
         UserModel.deleteUser(newUserInfo.username)
                  .then(response => done())
                  .catch(err => console.log(err));
      });

    });

    describe("sendClientSetlist", () => {
      it("sendClientSetlist works", done => {
         done();
      })
    })

});