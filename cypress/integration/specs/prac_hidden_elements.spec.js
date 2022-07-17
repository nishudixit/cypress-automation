/// <reference types="Cypress" />

describe("My third test suite", function() {

    it("My third test case", function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        // visibile / not visible element example
        cy.get('#displayed-text').should('be.visible');
        cy.get('#hide-textbox').click();
        cy.get('#displayed-text').should('not.be.visible');
        cy.get('#show-textbox').click();
        cy.get('#displayed-text').should('be.visible');

        // checking radio button and verifying it
        cy.get('input[value="radio2"]').check().should('be.checked');
    });

});