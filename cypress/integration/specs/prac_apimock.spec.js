/// <reference types="Cypress" />

describe('API testing', () => {

    it('Mocking response', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo');

        cy.intercept({
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
            method: 'GET'
        }, {
            statusCode: 200,
            body: [
                {
                    "book_name": "cypress API",
                    "isbn": "SPY40",
                    "aisle": "2529857"
                },
                {
                    "book_name": "cypress Automation",
                    "isbn": "984353",
                    "aisle": "982053"
                }
            ]
        }).as('mockApi');

        cy.get("button[class='btn btn-primary']").click();
        cy.wait('@mockApi').should(({request, response}) =>
        {
            cy.get('tr').should('have.length', response.body.length + 1);
            if (response.body.length < 2) {
                cy.get('p').should('have.text', 'Oops only 1 Book available');
            } else {
                cy.log('There are more than 1 book available');
            }
        });
    });
});


