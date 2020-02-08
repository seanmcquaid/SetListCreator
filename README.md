To Do :
1) Client List Page => Set List Creation Page - Band Leader - Check for client setlistavailable status on users table for client list page for statuses - populate clients that have the bandleader marked as their bandleader
2) Unit tests for front end
3) Unit tests for back end
4) Clean models/routes/controllers to exclude password from response for users
5) Review all controllers and create cohesion with responses
6) CI/CD Pipeline with AWS set up
7) fix token error again
8) fix logic for redirect - circle back on this later
9) Review all pages and lifecycle methods selected
10) Add in end to end tests with cypress

Client Info Page :
1) Set up styling and components

Working On Now : 
1) Integration Tests - client, bandleaders
2) Controller Tests - Users, client, bandleaders
3) Model Tests - Users, Client, Bandleaders
4) Middleware Tests - CheckToken
5) Review all naming conventions and refactor for unit tests

Mocha / Chai Resources and Ideas :
1) https://www.techighness.com/post/unit-testing-expressjs-controller-part-1/
2) https://www.freecodecamp.org/news/how-to-write-a-production-ready-node-and-express-app-f214f0b17d8c/
3) http://gregjopa.com/2014/02/testing-and-code-coverage-with-node-js-apps/
4) https://medium.com/kanssfer-consulting/testing-expressjs-rest-api-with-mocha-and-chai-90bf4178f15e
http://developmentnow.com/2015/02/05/make-your-node-js-api-bulletproof-how-to-test-with-mocha-chai-and-supertest/
https://itnext.io/mocking-expressjs-request-and-response-objects-63405e9c58ff
https://stackoverflow.com/questions/28053206/node-express-testing-mock-res-statusstatus-jsonobj

Mock Server for Testing Back End?

ALWAYS use set up and clean up steps

Routes - Integration Tests - Test that these routes return valid info with proper set up

Controller - That the the controller method itself responds properly

Model - Test That Each of the DB Methods respond properly

Enzyme / Jest Resources and Ideas :
1) https://www.toptal.com/react/tdd-react-unit-testing-enzyme-jest
2) https://www.robinwieruch.de/react-testing-jest-enzyme
3) https://blog.bitsrc.io/how-to-test-react-components-with-jest-and-enzyme-in-depth-145fcd06b90

Things to Test in Components : 
1) Snapshot
2) Check specific element values
3) Check state values if stateful
4) Simulate click actions
5) reducers - test return from action firing off
6) actions - test return value