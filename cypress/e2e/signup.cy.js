/// <reference types="cypress" />

describe("Magento Signup Test", () => {
  it("should sign up a new user and verify success message", () => {
    const randomSuffix = Math.floor(Math.random() * 100000);
    const email = `testuser${randomSuffix}@example.com`;

    cy.visit("https://magento.softwaretestingboard.com/customer/account/create/");

    cy.get("#firstname").type("John");
    cy.get("#lastname").type("Doe");
    cy.get("#email_address").type(email);
    cy.get("#password").type("Test@1234");
    cy.get("#password-confirmation").type("Test@1234");

    cy.get("button[title='Create an Account']").click();

    // Assert URL redirected to account page
    cy.url().should("match", /\/customer\/account\/?/);

    // Take a screenshot after redirect
    cy.screenshot("after-signup-redirect");

    // Assert success message is visible and contains expected text
    cy.get("div.message-success.success.message", { timeout: 10000 })
      .should("exist")
      .should("be.visible")
      .invoke("text")
      .should("include", "Thank you for registering with Main Website Store.");
  });
});
