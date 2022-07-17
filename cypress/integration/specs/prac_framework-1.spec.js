/// <reference types="Cypress" />

import * as homePage from "../../support/pageObjects/HomePage";
import * as productsPage from "../../support/pageObjects/ProductsPage";

describe('Hooks, parametrization and custom commands', function () {

  before(() => {
    cy.fixture('example').then(function (data) {
      this.data = data;
    })
  })

  it('Framework level 1', function () {
    cy.visit(Cypress.env('url'))
    cy.get(homePage.nameEditBoxElement).type(this.data.name)
    cy.get(homePage.nameBindingElement).should('have.value', this.data.name)
    cy.get(homePage.nameBindingElement).should('have.attr', 'minlength', '2')
    cy.get('select').select(this.data.gender)
    cy.get(homePage.inlineRadio3Element).should('be.disabled')

    //Now proceeding with a scenario where to add a product into the cart
    cy.get(homePage.shopLinkElement).click()
    // cy.selectProduct('Samsung')
    // cy.selectProduct('Blackberry')

    // NOW IF THERE ARE 10 OR MORE PRODUCTS, THEN THIS SHOULD ALSO BE OPTIMISED
    this.data.productName.forEach(element => {
      cy.selectProduct(element)
    })
  });

  it('Framework level 2', function () {
    cy.get(productsPage.checkoutButtonElement).click()
    cy.get(productsPage.removeBtnELement).should('have.length', 2)

    let sum = 0
    let proTotalAmount
    let totalAmount
    cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
      proTotalAmount = $el.text().split(' ')
      proTotalAmount = proTotalAmount[1].trim()
      sum = Number(sum) + Number(proTotalAmount)
    }).then(() => cy.log(sum))

    cy.get('h3 strong').then(ele => {
      totalAmount = ele.text();
      totalAmount = totalAmount.split(' ')
      totalAmount = totalAmount[1].trim()
      expect(Number(totalAmount)).to.equal(sum)
    })

    cy.get(productsPage.checkoutInnerButtonElement).click()
    cy.get(productsPage.countryInputElement).type('Indi')
    cy.get(productsPage.firstSuggestionElement).click()
    cy.get(productsPage.countryInputElement).should('have.value', 'India')
    cy.get(productsPage.termsCheckboxElement).click({ force: true })
    cy.get(productsPage.termsCheckboxElement).should('be.checked')
    cy.get(productsPage.purchaseBtnElement).click()
    cy.get(productsPage.alertSuccessElement).should('be.visible')

  });
})