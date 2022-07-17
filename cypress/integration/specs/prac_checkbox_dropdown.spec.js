/// <reference types="Cypress" />

describe("My third test suite", function() {

    it("My third test case", function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        // checking the checkbox and then verifying that it has been checked and also with value
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1');

        // unchecking the checkbox and then verifying that it has been unchecked
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked');

        // checking multiple checkboxes at a time
        cy.get('input[type="checkbox"]').check(['option2', 'option3']);

        // static dropdown
        cy.get('#dropdown-class-example').select('Option1').should('have.value', 'option1');

        //dynamic dropdown
        cy.get('#autocomplete').type('ind');

        // auto complete
        cy.get('.ui-menu-item [id^="ui-id-"]').each(($el, index, $list) => {

            if($el.text() === 'India') {
                $el.trigger('click');
            }
        });

        cy.get('#autocomplete').should('have.value', 'India');
    });

});