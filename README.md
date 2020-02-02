To Do :
1) Client List Page => Set List Creation Page - Band Leader - Check for client setlistavailable status on users table for client list page for statuses - populate clients that have the bandleader marked as their bandleader
2) Write unit tests for front and back end
3) CI/CD Pipeline with AWS set up
4) fix token error again
5) fix logic for redirect - circle back on this later

Client Info Page :
1) Set up styling and components

Working On Now : 
1) Unit tests for front and back end
2) Clean models/routes/controllers to exclude password from response for users

Mocha / Chai Resources and Ideas :
1) https://www.techighness.com/post/unit-testing-expressjs-controller-part-1/
2) https://www.freecodecamp.org/news/how-to-write-a-production-ready-node-and-express-app-f214f0b17d8c/
3) http://gregjopa.com/2014/02/testing-and-code-coverage-with-node-js-apps/
4) https://medium.com/kanssfer-consulting/testing-expressjs-rest-api-with-mocha-and-chai-90bf4178f15e
http://developmentnow.com/2015/02/05/make-your-node-js-api-bulletproof-how-to-test-with-mocha-chai-and-supertest/

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