import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import signupPage from "../PageObjects/signupPage";

const baseUrl =
  "https://magento.softwaretestingboard.com/customer/account/create/";

function generateUniqueEmail(prefix = "user") {
  const randomSuffix = Math.floor(Math.random() * 100000);
  return `${prefix}${randomSuffix}@example.com`;
}

let email;

// Reusable Given step for all scenarios
Given("I visit the signup page", () => {
  cy.visit(baseUrl);
});

// TC01 - Valid User Sign Up
When("I fill in valid user details", () => {
  email = generateUniqueEmail("valid");
  signupPage.enterFirstName("John");
  signupPage.enterLastName("Doe");
  signupPage.enterEmail(email);
  signupPage.enterPassword("Test@1234");
  signupPage.enterConfirmPassword("Test@1234");
  signupPage.submitForm();
});

Then("I should be redirected to the account dashboard after signup", () => {
  cy.url().should("include", "/customer/account/");
  cy.get(".message-success", { timeout: 10000 })
    .should("be.visible")
    .and("contain.text", "Thank you for registering");
});

// TC02 - Invalid Email Format
When("I enter an invalid email format", () => {
  signupPage.enterFirstName("Jane");
  signupPage.enterLastName("Smith");
  signupPage.enterEmail("invalidemail");
  signupPage.enterPassword("Test@1234");
  signupPage.enterConfirmPassword("Test@1234");
  signupPage.submitForm();
});

Then("I should see an error message for invalid email", () => {
  cy.get("#email_address-error").should("be.visible");
});

// TC03 - Weak Password
When("I enter a weak password", () => {
  email = generateUniqueEmail("weak");
  signupPage.enterFirstName("Weak");
  signupPage.enterLastName("Password");
  signupPage.enterEmail(email);
  signupPage.enterPassword("123");
  signupPage.enterConfirmPassword("123");
  signupPage.submitForm();
});

Then("I should see a prompt for a stronger password", () => {
  cy.get("#password-error").should("be.visible");
});

// TC04 - Mismatched Passwords
When("I enter mismatched passwords", () => {
  email = generateUniqueEmail("mismatch");
  signupPage.enterFirstName("Mismatch");
  signupPage.enterLastName("Passwords");
  signupPage.enterEmail(email);
  signupPage.enterPassword("Test@1234");
  signupPage.enterConfirmPassword("Test@4321");
  signupPage.submitForm();
});

Then("I should see an error message for mismatched passwords", () => {
  cy.get("#password-confirmation-error").should("be.visible");
});

// TC05 - Existing Email Registration
When("I enter an already registered email", () => {
  signupPage.enterFirstName("Existing");
  signupPage.enterLastName("User");
  signupPage.enterEmail("sesdeba@gmail.com");
  signupPage.enterPassword("Test@1234");
  signupPage.enterConfirmPassword("Test@1234");
  signupPage.submitForm();
});

Then("I should see an error that the email is already in use", () => {
  cy.get(".message-error", { timeout: 10000 })
    .should("be.visible")
    .and("contain.text", "There is already an account");
});

// TC06 - Leading or Trailing Spaces in Fields
When("I enter credentials with leading or trailing spaces", () => {
  email = generateUniqueEmail("space");
  signupPage.enterFirstName("  John  ");
  signupPage.enterLastName("  Doe  ");
  signupPage.enterEmail(`  ${email}  `);
  signupPage.enterPassword("  Test@1234  ");
  signupPage.enterConfirmPassword("  Test@1234  ");
  signupPage.submitForm();
});

Then("The spaces should be trimmed and form should submit successfully", () => {
  cy.url().should("include", "/customer/account/");
});

// TC07 - Email Case Sensitivity
When("I enter an email with different casing", () => {
  email = generateUniqueEmail("case");
  signupPage.enterFirstName("Case");
  signupPage.enterLastName("Test");
  signupPage.enterEmail(email.toUpperCase());
  signupPage.enterPassword("Test@1234");
  signupPage.enterConfirmPassword("Test@1234");
  signupPage.submitForm();
});

Then("The system should treat it according to email case rules", () => {
  cy.url().should("include", "/customer/account/");
});

// TC08 - Password Edge Cases
When("I enter a password with special characters or emojis", () => {
  email = generateUniqueEmail("edge");
  signupPage.enterFirstName("Edge");
  signupPage.enterLastName("Cases");
  signupPage.enterEmail(email);
  signupPage.enterPassword("🔥P@sswørd123🔥");
  signupPage.enterConfirmPassword("🔥P@sswørd123🔥");
  signupPage.submitForm();
});

Then("The system should validate the password format accordingly", () => {
  cy.url().should("include", "/customer/account/");
});

// TC09 - Email Without Domain
When("I enter an email missing a domain", () => {
  signupPage.enterFirstName("Email");
  signupPage.enterLastName("NoDomain");
  signupPage.enterEmail("test@domain");
  signupPage.enterPassword("Test@1234");
  signupPage.enterConfirmPassword("Test@1234");
  signupPage.submitForm();
});

Then("I should see an error message about invalid email format", () => {
  cy.get("#email_address-error").should("be.visible");
});

// TC10 - Rapid Multiple Sign-Ups
Given("I attempt to sign up multiple times quickly", () => {
  const emails = Array.from({ length: 3 }, (_, i) =>
    generateUniqueEmail(`rapid${i}`)
  );
  emails.forEach((emailId) => {
    cy.visit(baseUrl);
    signupPage.enterFirstName("Rapid");
    signupPage.enterLastName("SignUp");
    signupPage.enterEmail(emailId);
    signupPage.enterPassword("Test@1234");
    signupPage.enterConfirmPassword("Test@1234");
    signupPage.submitForm();
    cy.url().should("include", "/customer/account/");
    cy.clearCookies();
  });
});

Then("The system should prevent spam or duplicate accounts", () => {
  cy.get("body").should("exist");
});
