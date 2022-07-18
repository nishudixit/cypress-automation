/// <reference types="Cypress" />

describe('API testing', () => {

    it('Mocking request', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo');

        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', req => {

            req.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=dixit'

            req.continue(res => {
                expect(res.statusCode).to.equal(404);
            })
        }).as('manipulateUrl');

        cy.get("button[class='btn btn-primary']").click();
        cy.wait('@manipulateUrl');
    });
});


