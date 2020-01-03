To Do :
1) Refactor - Verify that back end response and reducers line up properly
2) Clean up weird token error that occurs when an invalid token is found
3) Work on Error Handling/ Messaging with Errors - SHOULD NOT BE STORED IN REDUCER!
4) Client Send Set List Page - Client 
5) Client List Page => Set List Creation Page - Band Leader
6) Rearchitect reducers - I feel like it's getting a bit cluttered now - Will need to figure out error handling properly - componentDidCatch could be a solution and maybe we can make an error component ? 
https://flaviocopes.com/react-handle-errors/
https://itnext.io/javascript-error-handling-from-express-js-to-react-810deb5e5e28
7) Consider an error reducer? - Maybe look into how to only save part of my state to local storage
8) Write unit tests for front and back end
9) Maybe consider getting rid of saving state to local storage and rely on JUST the token to be stored in local storage??
10) initial state for token could be from local storage??? 