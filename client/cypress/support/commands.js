/// <reference types="cypress" />

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("clientLogin", (username, password) => {
    // visit login page
    // stub request
    // login button
    // stub get client songs request
    // assert that the user is on the client home page
});

Cypress.Commands.add("bandleaderLogin", () => {
    // visit login page
    // stub request
    // login button
    // assert that the user is on the bandleader home page
});

Cypress.Commands.add("logout", () => {
    // click navbar
    // click logout
    // assert that you're back to landing page
});