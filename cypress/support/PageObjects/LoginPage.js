class LoginPage {
  enterEmail(email) {
    cy.get('#email').clear().type(email)
  }

  enterPassword(password) {
    cy.get('#pass').clear().type(password)
  }

  clickSignIn() {
    cy.get('#send2').click()
  }
}

export default LoginPage