/// <reference types="Cypress" />

describe("My second test suite", function() {

    it("My second test case", function() {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.get('.search-keyword').type('ca');

        cy.wait(2000);

        //now I've to click 'ADD TO CART' button only for cashews
        cy.get('.products').find('.product').each(($el, index, $list) => {
            
            const productName = $el.find('h4.product-name').text();
            if (productName.includes('Cashews')) {
                $el.find('button[type="button"]').trigger('click');
            }
        });

        // assert if logo text is correctly displayed
        cy.get('.brand').should('have.text', 'GREENKART');

        cy.get('.cart-icon').click();
        cy.contains('PROCEED TO CHECKOUT').click();
        cy.contains('Place Order').click();
    });
});