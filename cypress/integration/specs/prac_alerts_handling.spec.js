/// <reference types="Cypress" />

describe("My third test suite", function() {

    it("My third test case", function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        // cypress take care window alerts automatically
        cy.get('#alertbtn').click();
        cy.get('#confirmbtn').click(); // confirming alert

        // now if you want to grab text from alert
        // *********__FOR REFERENCE: https://docs.cypress.io/api/events/catalog-of-events#App-Events __***********
        cy.on('window:alert', (str) => {
            // here comes MOCHA assertion
            expect(str).to.equal('Hello , share this practice page and share your knowledge');
        });
        cy.on('window:confirm', (str) => {
            expect(str).to.equal('Hello , Are you sure you want to confirm?');
        })

        // how to deal with new tabs and windows
        // ********__CYPRESS DOESN'T SUPPORT CHILD WINDOW OR TABS, HENCE WE WILL USE JQUERY METHODS__********
        cy.get('#opentab').invoke('removeAttr', 'target').click();
        
        // verifying if new url opens
        cy.url().should('include', 'rahulshettyacademy');
        // coming back to original state
        cy.go('back');
    });

});