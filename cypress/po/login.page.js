class LoginPage {
  constructor () {
    this.url = '/#login'
  }

  waitLoading() {
    cy.wait('@getPlugin')
    cy.get('div[class^="postBlock_"]').should('be.visible')
    cy.get('input[name="login"]').should('be.visible')
    cy.url().should('contain', this.url)
  }

  login () {
    cy.intercept('GET', `${Cypress.env('loginUrl')}/api/v1/plugin/public`).as('getPlugin')
    cy.visit(Cypress.env('loginUrl'))
    this.waitLoading()
    cy.get('input[name="login"]').type(Cypress.config('username'))
    cy.get('input[name="password"]').type(Cypress.config('password'))
    cy.get('div[class*="login-button"] button').click()
  }

  logout () {
    cy.get('div[class^=userBlock__avatar').click({ force: true })
    cy.get('div[class^=userBlock__menu-item').contains('Logout').click({ force: true })
  }
}

const loginPage = new LoginPage()

export default loginPage
