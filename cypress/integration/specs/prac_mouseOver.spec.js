/// <reference types="Cypress" />

describe('Practice mouse over functionality', function () {

    it('Mouse over element and click', function () {

        //Check boxes
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        cy.get('div.mouse-hover-content').invoke('show')
        cy.contains('Top').click();
        //cy.contains('Top').click({ force: true })
        cy.url().should('include', 'top')
    })
})