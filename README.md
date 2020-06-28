# Set List Creator

I have more or less finished the app now, it will be primarily refactoring to clean up things that bother me about the app before considering this completed.

Tests Left For Unit Testing on Front End : 
1) BandleaderPages - Add Songs, Edit Song, Home, Login, Profile, Register, Client Edit Set List, Client Final Set List, Client Info, Client List, Set List Creator
2) ClientPages - Send Set List, Set List Approval, Finalized Set List

Things to do :
1) Unit Tests - Front End
2) Refactor unit tests to implement screen per the creator of RTL's recommendation and review testing patterns/unify patterns
3) Review from a user stand point and edit code to reflect UI/UX updates
4) Refactoring / Code Review - Front End - look at adding timeout to reducers so isloading actually can render loadingspinner for appropriate period of time
5) Review ALL tests and make sure it's accurately mocking expected app behavior - I speculate that my back end tests aren't as accurate as they could be
6) End to End tests in Cypress
7) Remove unused packages
8) Documentation