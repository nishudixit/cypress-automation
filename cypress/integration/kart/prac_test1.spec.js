/// <reference types="Cypress" />

describe("My first test suite", function() {

    it("My first test case", function() {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.get('.search-keyword').type('ca');

        cy.wait(2000);
        // Now want to verify if there are 4 results displayed
        cy.get('.product:visible').should('have.length', 4); // here visible is used to only display visible elements in DOM
        
        // parent child chaining ---> It will find .product element with in scope of .products element
        cy.get('.products').find('.product').should('have.length', 4);

        // now I've to click 'Add to cart' button for second product
        // cy.get('.products').find('.product').eq(1).contains('ADD TO CART').click();

        //now I've to click 'ADD TO CART' button only for cashews
        cy.get('.products').find('.product').each(($el, index, $list) => {
            
            const productName = $el.find('h4.product-name').text();
            if (productName.includes('Cashews')) {
                $el.find('button[type="button"]').trigger('click');
            }
        });

        // assert if logo text is correctly displayed
        cy.get('.brand').should('have.text', 'GREENKART');
    });
});