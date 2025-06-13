class SignUpPage{
     // Personal Information Fields
    get firstNameField() { return cy.get('#firstname'); }
    get lastNameField() { return cy.get('#lastname'); }

    // Sign-In Information Fields
    get emailField() { return cy.get('#email_address'); }
    get passwordField() { return cy.get('#password'); }
    get confirmPasswordField() { return cy.get('#password-confirmation'); }
    get passwordStrength() { return cy.get('.password-strength-meter'); }  // Captures password strength text

    // Actions
    enterFirstName(firstName) { this.firstNameField.type(firstName); }
    enterLastName(lastName) { this.lastNameField.type(lastName); }
    enterEmail(email) { this.emailField.type(email); }
    enterPassword(password) { this.passwordField.type(password); }
    enterConfirmPassword(confirmPassword) { this.confirmPasswordField.type(confirmPassword); }
    
    // Submit Form
    get signUpButton() { return cy.get('button[title="Create an Account"]'); }
    submitForm() { this.signUpButton.click(); }
}

export default new SignUpPage();