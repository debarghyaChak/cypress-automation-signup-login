import SignupPage from "../support/PageObjects/SignupPage";

describe('User Sign-Up Automation', () => {
    beforeEach(() => {
        cy.visit('https://magento.softwaretestingboard.com/customer/account/create/');
    });

    it('Should successfully create a new account', () => {
        SignupPage.enterFirstName('Debarghya');
        SignupPage.enterLastName('Chakravarty');
        SignupPage.enterEmail(`test${Date.now()}@email.com`);
        SignupPage.enterPassword('SecurePass@123');
        SignupPage.enterConfirmPassword('SecurePass@123');
        SignupPage.submitForm();

        cy.contains('Thank you for registering',{timeout:10000}).should('be.visible');
    });
});