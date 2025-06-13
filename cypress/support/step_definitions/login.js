import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../PageObjects/LoginPage";

// Constants
const validEmail = "sesdeba@gmail.com";
const validPassword = "Debarghya@1995";

// TC01 - Valid Login
Given("I visit the login page", () => {
  cy.visit("https://magento.softwaretestingboard.com/customer/account/login/");
});

When("I login with valid credentials", () => {
  LoginPage.enterEmail(validEmail);
  LoginPage.enterPassword(validPassword);
  LoginPage.clickSignIn();
});

Then("I should be redirected to the account dashboard", () => {
  cy.url().should("include", "/customer/account/");
  cy.contains("h1.page-title span", "My Account").should("be.visible");
});

// TC02 - Invalid Password
When("I enter a valid email and an incorrect password", () => {
  LoginPage.enterEmail(validEmail);
  LoginPage.enterPassword("WrongPassword123");
  LoginPage.clickSignIn();
});

Then("I should see an error message for incorrect credentials", () => {
  cy.contains(".message-error", "incorrect or your account is disabled").should("be.visible");
});

// TC03 - Non-Registered Email
When("I enter an unregistered email and any password", () => {
  LoginPage.enterEmail("nonexisting@mail.com");
  LoginPage.enterPassword("InvalidPassword1!");
  LoginPage.clickSignIn();
});

Then("I should see an error message for non-existent account", () => {
  cy.contains(".message-error", "incorrect or your account is disabled").should("be.visible");
});

// TC04 - Empty Credentials
When("I submit the login form without filling in any fields", () => {
  cy.get("#email").focus().blur();
  cy.get("#pass").focus().blur();
  cy.get("#send2").click();
});

Then("I should see validation messages for required fields", () => {
  cy.get("body", { timeout: 10000 }).then(($body) => {
    const hasEmailError = $body.find("#email-error:visible").length > 0;
    const hasPassError = $body.find("#pass-error:visible").length > 0;
    const hasGlobalError = $body.find(".message-error:visible").length > 0;

    if (hasEmailError && hasPassError) {
      cy.get("#email-error").should("contain.text", "required");
      cy.get("#pass-error").should("contain.text", "required");
    } else if (hasGlobalError) {
      cy.get(".message-error").should("contain.text", "A login and a password are required");
    } else {
      cy.wait(1000);
      cy.get("#email-error, #pass-error, .message-error").should("exist");
    }
  });
});

// TC05 - Logout Process
Given("I am logged in as a valid user", () => {
  cy.visit("https://magento.softwaretestingboard.com/customer/account/login/");
  LoginPage.enterEmail(validEmail);
  LoginPage.enterPassword(validPassword);
  LoginPage.clickSignIn();
  cy.get(".greet.welcome").should("exist");
});

When("I click the logout button", () => {
  // Open dropdown first
  cy.get(".customer-welcome", { timeout: 10000 }).first().click();

  // Then click "Sign Out" forcibly since it may still be hidden briefly
  cy.contains("a", "Sign Out", { timeout: 10000 }).click({ force: true });
});

Then("I should be logged out and redirected to the homepage", () => {
  cy.url().should("include", "/customer/account/logoutSuccess/");
  cy.contains("You are signed out").should("be.visible");
});

// TC06 - Case Sensitivity in Password
When("I enter the correct email and a wrongly-cased password", () => {
  LoginPage.enterEmail(validEmail);
  LoginPage.enterPassword("debarghya@12345"); // incorrect case
  LoginPage.clickSignIn();
});

Then("I should see an error message due to case-sensitive mismatch", () => {
  cy.contains(".message-error", "incorrect").should("be.visible");
});

// TC07 - Session Expiry After Login
When("I stay idle for an extended time and try to interact", () => {
  cy.clearCookies();
  cy.reload();
});

Then("I should be prompted to re-login", () => {
  cy.url().should("include", "/customer/account/login/");
  cy.contains("Sign In").should("be.visible");
});

// TC08 - Login Attempts Bruteforce Prevention
When("I attempt multiple incorrect logins in a short time", () => {
  LoginPage.enterEmail(validEmail);
  for (let i = 0; i < 5; i++) {
    LoginPage.enterPassword("WrongPass" + i);
    LoginPage.clickSignIn();
  }
});

Then("the system should trigger a cooldown or show CAPTCHA", () => {
  cy.get(".message-error", { timeout: 10000 }).should("be.visible");
});

// TC09 - Multiple Logins from Different Devices
When("I log in from another device simultaneously", () => {
  cy.clearCookies();
  cy.visit("https://magento.softwaretestingboard.com/customer/account/login/");
  LoginPage.enterEmail(validEmail);
  LoginPage.enterPassword(validPassword);
  LoginPage.clickSignIn();
});

Then("the system should handle session concurrency or notify the user", () => {
  cy.get(".message-error, .message-warning, .greet.welcome", { timeout: 10000 }).should("exist");
});
