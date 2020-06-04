const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../../app");
const UsersModel = require("../../models/UsersModel");
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
            });

            after(async () => await UsersModel.deleteUser(username));
         });

         describe("Will not create a new user if the user already exists", () => {

            before(async () => await UsersModel.register(username, password, "client", selectedBandleader));
   
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

           after(async () => await UsersModel.deleteUser(username));
         });
    })

    describe("Login", () => {

         const body = {
            username : "testBandleader",
            password : "testPassword",
         };

         const {username, password} = body;

         describe("Login works", () => {

            before(async () =>  await UsersModel.register(username, password, "bandleader", null));
            
            it("Login passes", done => {
               chai.request(server)
                  .post("/users/login/bandleader")
                  .send(body)
                  .end((err, res) => {
                     const expectedResponse = { 
                        isAuthenticated: true,
                        username: 'testBandleader',
                        accountType: 'bandleader',
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

            after(async () => await UsersModel.deleteUser(username));
         });

         describe("Login will not pass", () => {

            before(async () => await UsersModel.register(username, password, "bandleader", null));
            
            it("User isn't registered", done => {
               const requestBody = {
                  username : "testClient",
                  password : "testPassword",
               };

               chai.request(server)
                  .post("/users/login/bandleader")
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
                  .post("/users/login/bandleader")
                  .send(requestBody)
                  .end((err, res) => {
                     const expectedResponse = { errorMessage: "Entered password doesn't match our records" };

                     expect(res.status).to.equal(401);
                     expect(res.body.errorMessage).to.equal(expectedResponse.errorMessage);

                     done();
                  });
            });

            after(async () => await UsersModel.deleteUser(username));
         });
    });

    describe("checkToken", () => {

         let token;

         const userInfo = {
            username : "testClient",
            password : "testPassword",
            selectedBandleader : "fillerbandleader@gmail.com"
         };

         const {username, password, selectedBandleader} = userInfo;

         before(async () => {
            return await UsersModel.register(username, password, "client", selectedBandleader)
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
                  );
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
                  };

                  expect(res.body.isAuthenticated).to.equal(expectedResponse.isAuthenticated);
                  expect(res.body.username).to.equal(expectedResponse.username);
                  expect(res.body.accountType).to.equal(expectedResponse.accountType);
                  expect(res.body.setListAvailable).to.equal(expectedResponse.setListAvailable);
                  expect(typeof(res.body.token)).to.equal("string");

                  done();
               });
         });

         after(async () => await UsersModel.deleteUser(username));
    });

    describe("Get Bandleaders", () => {
       
      const userInfo = {
         username : "testBandleader",
         password : "testPassword",
      };

      const {username, password} = userInfo;

      before(async () => await UsersModel.register(username, password, "bandleader", null));

      it("getBandleaders", done => {
         chai.request(server)
            .get("/users/getBandleaders")
            .end((err, res) => {

               expect(res.status).to.equal(200);
               expect(res.body.bandleaders.length).to.be.greaterThan(0);

               done();
            });
      });

      after(async () => await UsersModel.deleteUser(username));
    });

    describe("getClientsforBandleader", () => {

      let token;

      const bandleaderBody = {
         username : "testBandleader",
         password : "testPassword",
      };

      before(async () => {
         return await UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null)
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
               );
            })
            .catch(err => console.log(err));
      });

      const clientBody = {
         username : "testClient",
         password : "testPassword",
         selectedBandleader : "testBandleader"
      };

      before(async () =>  await UsersModel.register(clientBody.username, clientBody.password, "client", clientBody.selectedBandleader));

      it("getClientsForBandleader works", done => {
         chai.request(server)
            .get("/users/getClientsForBandleader")
            .set("Authorization", token)
            .end((err, res) => {

               expect(res.status).to.equal(200);
               expect(res.body.clientList.length).to.be.greaterThan(0);

               done();
            });
      });

      after(async () => await UsersModel.deleteUser(bandleaderBody.username));

      after(async () => await UsersModel.deleteUser(clientBody.username));
    });

    describe("clientInfo", () => {
      let clientId, token;

      const clientBody = {
         username : "testClient",
         password : "testPassword",
         selectedBandleader : "testBandleader"
      };

      before(async () => {
         return await UsersModel.register(clientBody.username, clientBody.password, "client", clientBody.selectedBandleader)
            .then(response => {
               clientId = response[0].id;
            })
            .catch(err => console.log(err));
      });

      const bandleaderBody = {
         username : "testBandleader",
         password : "testPassword",
      };

      before(async () => {
         return await UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null)
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
               );
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
            });
      });

      after(async () => await UsersModel.deleteUser(clientBody.username));

      after(async () => await UsersModel.deleteUser(bandleaderBody.username));

    });

    describe("getUserInfo", () => {

      let token;

      const clientInfo = {
         username : "testClient",
         password : "testPassword",
         selectedBandleader : "testBandleader"
      };

      before(async () => {
         return await UsersModel.register(clientInfo.username, clientInfo.password, "client", clientInfo.selectedBandleader)
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
               );
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
                  isAuthenticated : true
               };

               const userInfo = res.body;

               expect(userInfo.username).to.equal(expectedResponse.username);
               expect(userInfo.accountType).to.equal(expectedResponse.accountType);
               expect(userInfo.isAuthenticated).to.equal(expectedResponse.isAuthenticated);;

               done();
            });
      });

      after(async () => await UsersModel.deleteUser(clientBody.username));
    });

    describe("editUserInfo", () => {

      let token;

      const originalUserInfo = {
         username : "testBandleader",
         password : "testPassword",
      };

      before(async () => {
         return await UsersModel.register(originalUserInfo.username, originalUserInfo.password, "bandleader", null)
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
               );
            })
            .catch(err => console.log(err));
      });


      it("editUserInfo", done => {
         const body = {
            newUsername : "testBandleader123",
            newPassword : "testing123"
         };

         chai.request(server)
            .patch("/users/editUserInfo")
            .send(body)
            .set("Authorization", token)
            .end((err, res) => {

               const expectedResponse = { 
                  isAuthenticated: true,
                  username: "testBandleader123",
                  accountType: "bandleader" 
               };

               expect(res.status).to.equal(200);

               expect(res.body.isAuthenticated).to.equal(expectedResponse.isAuthenticated);
               expect(typeof(res.body.token)).to.equal("string");
               expect(res.body.username).to.equal(expectedResponse.username);
               expect(res.body.accountType).to.equal(expectedResponse.accountType);

               done();
            });
      });

      after(async () => await UsersModel.deleteUser(newUserInfo.newUsername));
    });

    describe("sendClientSetList", () => {

      let token;

      const userInfo = {
         username : "testClient",
         password : "testPassword",
         selectedBandleader : "testBandleader"
      };

      before(async () => {
         return await UsersModel.register(userInfo.username, userInfo.password, "client", userInfo.selectedBandleader)
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
               );
            })
            .catch(err => console.log(err));
      });

      it("sendClientSetlist works", done => {
         const body = {
            setListAvailability : true
         };
         
         chai.request(server)
            .patch("/users/sendClientSetList")
            .set("Authorization", token)
            .send(body)
            .end((err, res) => {
               const expectedResponse = { setListAvailable: true };

               expect(res.status).to.equal(200);
               expect(res.body.setListAvailable).to.equal(expectedResponse.setListAvailable);

               done();
            });
      });

      after(async () => await UsersModel.deleteUser(userInfo.username));
    });
});