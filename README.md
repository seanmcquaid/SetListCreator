# Set List Creator

I have more or less finished the app now, it will be primarily refactoring to clean up things that bother me about the app before considering this completed.

Tests Left For Unit Testing on Front End : 
1) BandleaderPages - Client Edit Set List, Client Final Set List, Set List Creator

Next :
1) Client Edit Set List 
2) Client Final Set List 
3) Set List Creator

Things to do :
1) Unit Tests - Front End
2) Refactor unit tests to implement screen per the creator of RTL's recommendation and review testing patterns/unify patterns, remove unneeded setting of store initial state
3) Refactoring / Code Review - Front End - look at adding timeout to reducers so isloading actually can render loadingspinner for appropriate period of time & add in axios cancelling like the changes on the client setlist approval page
4) Review ALL tests and make sure it's accurately mocking expected app behavior - I speculate that my back end tests aren't as accurate as they could be
5) End to End tests in Cypress
6) Remove unused packages
7) Documentation