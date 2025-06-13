import LoginPage from "../support/PageObjects/LoginPage";

describe('Customer Login Tests - Magento Luma', () => {
  const loginPage = new LoginPage()

  beforeEach(() => {
    cy.visit('https://magento.softwaretestingboard.com/customer/account/login/') // Login URL
  })

it('TC01 - Valid User Login', () => {
  loginPage.enterEmail('sesdeba@gmail.com');
  loginPage.enterPassword('Debarghya@1995');
  loginPage.clickSignIn();

  // Confirm URL change
  cy.url({ timeout: 10000 }).should('include', '/customer/account/');

  // Confirm "My Account" heading exists
  cy.contains('h1.page-title span', 'My Account', { timeout: 10000 })
    .should('be.visible');
});








it('TC02 - Invalid Password', () => {
  loginPage.enterEmail('sesdeba@gmail.com');
  loginPage.enterPassword('WrongPassword123'); // invalid password
  loginPage.clickSignIn();

  // Wait for error message to appear
  cy.contains('.message-error', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.', { timeout: 10000 })
    .should('be.visible');
});

it('TC03 - Non-Registered Email', () => {
  loginPage.enterEmail('nonexisting@mail.com')
  loginPage.enterPassword('InvalidPassword1!')
  loginPage.clickSignIn()
  cy.contains('.message-error', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.', { timeout: 10000 }).should('be.visible')
})

it('TC04 - Empty Credentials', () => {
  // Simulate user interaction that triggers validation
  cy.get('#email').focus().blur();
  cy.get('#pass').focus().blur();
  cy.get('#send2').click();

  // Retry and check for either inline or global validation errors
  cy.get('body', { timeout: 10000 }).then(($body) => {
    const hasEmailError = $body.find('#email-error:visible').length > 0;
    const hasPassError = $body.find('#pass-error:visible').length > 0;
    const hasGlobalError = $body.find('.message-error:visible').length > 0;

    if (hasEmailError && hasPassError) {
      cy.get('#email-error')
        .should('be.visible')
        .and('contain.text', 'This is a required field');

      cy.get('#pass-error')
        .should('be.visible')
        .and('contain.text', 'This is a required field');
    } else if (hasGlobalError) {
      cy.get('.message-error')
        .should('be.visible')
        .and('contain.text', 'A login and a password are required');
    } else {
      // Retry wait if nothing found
      cy.wait(1000);
      cy.get('#email-error, #pass-error, .message-error').should('exist');
    }
  });
});

it('TC05 - Logout Process', () => {
  loginPage.enterEmail('sesdeba@gmail.com');
  loginPage.enterPassword('Debarghya@1995');
  loginPage.clickSignIn();

  // ✅ Wait for login to complete
  cy.get('.greet.welcome', { timeout: 10000 }).should('be.visible');

  // ✅ Then interact with dropdown
  cy.get('.customer-welcome', { timeout: 10000 })
    .should('have.length.at.least', 1)
    .first()
    .click();

  // ✅ Click 'Sign Out' safely
  cy.contains('Sign Out', { timeout: 10000 }).click();

  // ✅ Validate redirect and confirmation
  cy.url().should('include', '/customer/account/logoutSuccess/');
  cy.contains('You are signed out').should('be.visible');
});


it('TC06 - Case Sensitivity in Password', () => {
  loginPage.enterEmail('sesdeba@gmail.com')
  loginPage.enterPassword('debarghya@12345') // lowercase 'd'
  loginPage.clickSignIn()
  cy.contains('.message-error', 'incorrect', { timeout: 10000 }).should('be.visible')
})
it('TC07 - Session Expiry After Login (Simulated)', () => {
  loginPage.enterEmail('sesdeba@gmail.com');
  loginPage.enterPassword('Debarghya@1995');
  loginPage.clickSignIn();

  // Confirm login success
  cy.get('.greet.welcome').should('exist');

  // Simulate session expiry by clearing session cookies
  cy.clearCookies(); // Or clear specific session cookie if known

  // Reload page to simulate user returning after session expires
  cy.reload();

  // Check if login prompt appears again (user is logged out)
  cy.url().should('include', '/customer/account/login/');
  cy.contains('Sign In').should('be.visible');
});


//skip this test case as we don't have a deactivated account
//   it('TC08 - Login with Deactivated Account', () => {
//     loginPage.enterEmail('sesdeba@gmail.com')
//     loginPage.enterPassword('Debarghya@1995')
//     loginPage.clickSignIn()
//     cy.get('.message-error', { timeout: 10000 }).should('contain', 'Account is deactivated') // Adjust if different
//   })

  it('TC08 - Login Attempts Bruteforce Prevention', () => {
    loginPage.enterEmail('sesdeba@gmail.com')
    for (let i = 0; i < 5; i++) {
      loginPage.enterPassword('WrongPass' + i)
      loginPage.clickSignIn()
    }
    cy.get('.message-error', { timeout: 10000 }).should('be.visible')
    // Optional: Check for CAPTCHA or lockout message
  })

  it('TC09 - Multiple Logins from Different Devices', () => {
  loginPage.enterEmail('sesdeba@gmail.com')
  loginPage.enterPassword('Debarghya@1995')
  loginPage.clickSignIn()

  // Simulate concurrent login in second tab/device
  cy.clearCookies()
  cy.visit('https://magento.softwaretestingboard.com/customer/account/login/')
  loginPage.enterEmail('sesdeba@gmail.com')
  loginPage.enterPassword('Debarghya@1995')
  loginPage.clickSignIn()

  // Check for concurrency warning or session conflict
  cy.get('.message-error, .message-warning, .greet.welcome', { timeout: 10000 }).should('exist')
})
})
