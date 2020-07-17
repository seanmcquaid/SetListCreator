# Set List Creator
This has been a long standing passion project of mine that I spent roughly 10 months working on every day after work and on the weekends. The idea came to me after talking to a bandleader for a wedding band who mentioned that his biggest problem is spending time trying to create an ideal set list for a client. After meeting with him a few times to get loose requirements, I started working on it. 

The app features two different kinds of accounts that have a slew of different functionality for each account type : 

### Client
The main focus for the Client account is to easily allow clients to select their bandleader, enter both songs that they want played and songs they ABSOLUTELY don't want played at their wedding. Once a client has submitted their requests to their bandleader, they then wait for the bandleader to send them a proposed set list. 

The client then has the option to add comments and then either approve or disapprove the proposed set list. If the set list isn't approved, it is sent back to the bandleader for review. If it is approved, then the client is able to view their finalized set list.

### Bandleader
The main focus of the Bandleader account is to allow bandleader to add songs to their song database, and manage their various client set lists. 

Once a client has submitted their requests for review, the client will see their status change from "In Progress" to "Ready" on the Clients List Page. The algorithm will spit out a recommended set list based on what the bandleader knows and what the client has requested they do and don't play. Once a bandleader has finished the set list, they can then send it to the client for review. Depending on the client's response, the bandleader can either address their concerns or their set list process is done!

## Focuses For the Project

#### Performance - Front End
I really wanted to make sure that I limited the amount of unneeded renders for components that had no change in props. I made sure to utilize various hooks such as useMemo, useCallback and React.memo to assist with this goal. Ultimately, it lead to much more performant front end code with the bare minimum of renders occuring for each component. 

#### Full Test Coverage - Front End
I wanted to make sure I had both solid unit tests and integration tests with React Testing Library. I found that the most value for my testing came from integration testing the various pages to ensure business logic was working with every change made. I definitely think that going forward, I will most likely heavily focus on integration testing and only write component unit tests when logic is present within the component.

#### Full Test Coverage - Back End
In addition to my focus on Front End testing, I felt it would be even more important to work on heavy testing for every line of code on the back end. Unlike the front end where the most value came from integration testing, I found that every test on my back end had an immense amount of value. 

#### Automated End to End Testing
After finishing the main project, I started working on E2E tests in Cypress. This process really didn't take too long and I made sure to set up plenty of reusable commands to speed up development. My current role at work really helped me conceptualize pre condition set up to create more stable E2E tests. I made sure to include as many assertions as I could to make sure that the tests would remain stable and wait appropriately for elements to be visible before continuing. One common issue I encountered that I have never dealt with at work is that Cypress is almost TOO fast sometimes. It leads to cases where I could get false failures but that naturally happens with any sort of E2E testing.

#### Refactoring
Throughout the project, as I would learn and read more interesting solutions for problems I experienced, I would take the time to refactor as much of the code I could to reflect these new design patterns. Ultimately, I think that while this was incredibly helpful for learning purposes, this wasn't the best use of my time. I would've preferred to finish this faster and then have a chance to review the code for any enhancements I could add.