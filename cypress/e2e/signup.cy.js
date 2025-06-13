/// <reference types="cypress" />

import signupPage from "../support/PageObjects/signupPage";

describe("Magento Signup Tests", () => {

  const baseUrl = "https://magento.softwaretestingboard.com/customer/account/create/";

  function generateUniqueEmail(prefix = "user") {
    const randomSuffix = Math.floor(Math.random() * 100000);
    return `${prefix}${randomSuffix}@example.com`;
  }

  it("TC01 - Valid User Sign Up", () => {
    const email = generateUniqueEmail("valid");
    cy.visit(baseUrl);

    signupPage.enterFirstName("John");
    signupPage.enterLastName("Doe");
    signupPage.enterEmail(email);
    signupPage.enterPassword("Test@1234");
    signupPage.enterConfirmPassword("Test@1234");
    signupPage.submitForm();

    cy.url().should("include", "/customer/account/");
    cy.get(".message-success", { timeout: 10000 })
      .should("be.visible")
      .and("contain.text", "Thank you for registering");
  });

  it("TC02 - Invalid Email Format", () => {
    cy.visit(baseUrl);
    signupPage.enterFirstName("Jane");
    signupPage.enterLastName("Smith");
    signupPage.enterEmail("invalidemail");
    signupPage.enterPassword("Test@1234");
    signupPage.enterConfirmPassword("Test@1234");
    signupPage.submitForm();

    cy.get("#email_address-error").should("be.visible");
  });

  it("TC03 - Weak Password", () => {
    const email = generateUniqueEmail("weak");
    cy.visit(baseUrl);
    signupPage.enterFirstName("Weak");
    signupPage.enterLastName("Password");
    signupPage.enterEmail(email);
    signupPage.enterPassword("123");
    signupPage.enterConfirmPassword("123");
    signupPage.submitForm();

    cy.get("#password-error").should("be.visible");
  });

  it("TC04 - Mismatched Passwords", () => {
    const email = generateUniqueEmail("mismatch");
    cy.visit(baseUrl);
    signupPage.enterFirstName("Mismatch");
    signupPage.enterLastName("Passwords");
    signupPage.enterEmail(email);
    signupPage.enterPassword("Test@1234");
    signupPage.enterConfirmPassword("Test@4321");
    signupPage.submitForm();

    cy.get("#password-confirmation-error").should("be.visible");
  });

  it("TC05 - Existing Email Registration", () => {
    cy.visit(baseUrl);
    signupPage.enterFirstName("Existing");
    signupPage.enterLastName("User");
    signupPage.enterEmail("sesdeba@gmail.com");
    signupPage.enterPassword("Test@1234");
    signupPage.enterConfirmPassword("Test@1234");
    signupPage.submitForm();

    cy.get(".message-error", { timeout: 10000 })
      .should("be.visible")
      .and("contain.text", "There is already an account");
  });

  it("TC06 - Leading/Trailing Spaces in Fields", () => {
    const email = generateUniqueEmail("space");
    cy.visit(baseUrl);
    signupPage.enterFirstName("  John  ");
    signupPage.enterLastName("  Doe  ");
    signupPage.enterEmail(`  ${email}  `);
    signupPage.enterPassword("  Test@1234  ");
    signupPage.enterConfirmPassword("  Test@1234  ");
    signupPage.submitForm();

    cy.url().should("include", "/customer/account/");
  });

  it("TC07 - Email Case Sensitivity", () => {
    const email = generateUniqueEmail("case");
    cy.visit(baseUrl);
    signupPage.enterFirstName("Case");
    signupPage.enterLastName("Test");
    signupPage.enterEmail(email.toUpperCase());
    signupPage.enterPassword("Test@1234");
    signupPage.enterConfirmPassword("Test@1234");
    signupPage.submitForm();

    cy.url().should("include", "/customer/account/");
  });

  it("TC08 - Password Edge Cases", () => {
    const email = generateUniqueEmail("edge");
    cy.visit(baseUrl);
    signupPage.enterFirstName("Edge");
    signupPage.enterLastName("Cases");
    signupPage.enterEmail(email);
    signupPage.enterPassword("🔥P@sswørd123🔥");
    signupPage.enterConfirmPassword("🔥P@sswørd123🔥");
    signupPage.submitForm();

    cy.url().should("include", "/customer/account/");
  });

  it("TC09 - Email without Domain", () => {
    cy.visit(baseUrl);
    signupPage.enterFirstName("Email");
    signupPage.enterLastName("NoDomain");
    signupPage.enterEmail("test@domain");
    signupPage.enterPassword("Test@1234");
    signupPage.enterConfirmPassword("Test@1234");
    signupPage.submitForm();

    cy.get("#email_address-error").should("be.visible");
  });

  it("TC10 - Rapid Multiple Sign-Ups", () => {
    const emails = Array.from({ length: 3 }, (_, i) => generateUniqueEmail(`rapid${i}`));
    emails.forEach((email) => {
      cy.visit(baseUrl);
      signupPage.enterFirstName("Rapid");
      signupPage.enterLastName("SignUp");
      signupPage.enterEmail(email);
      signupPage.enterPassword("Test@1234");
      signupPage.enterConfirmPassword("Test@1234");
      signupPage.submitForm();
      cy.url().should("include", "/customer/account/");
      cy.clearCookies();
    });
  });

});
