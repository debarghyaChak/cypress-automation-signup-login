/// <reference types="cypress" />

describe("Magento Signup Tests", () => {

  const baseUrl = "https://magento.softwaretestingboard.com/customer/account/create/";

  function generateUniqueEmail(prefix = "user") {
    const randomSuffix = Math.floor(Math.random() * 100000);
    return `${prefix}${randomSuffix}@example.com`;
  }

  it("TC01 - Valid User Sign Up", () => {
    const email = generateUniqueEmail("valid");
    cy.visit(baseUrl);

    cy.get("#firstname").type("John");
    cy.get("#lastname").type("Doe");
    cy.get("#email_address").type(email);
    cy.get("#password").type("Test@1234");
    cy.get("#password-confirmation").type("Test@1234");
    cy.get("button[title='Create an Account']").click();

    cy.url().should("include", "/customer/account/");
    cy.get(".message-success", { timeout: 10000 })
      .should("be.visible")
      .and("contain.text", "Thank you for registering");
  });

  it("TC02 - Invalid Email Format", () => {
    cy.visit(baseUrl);
    cy.get("#firstname").type("Jane");
    cy.get("#lastname").type("Smith");
    cy.get("#email_address").type("invalidemail");
    cy.get("#password").type("Test@1234");
    cy.get("#password-confirmation").type("Test@1234");
    cy.get("button[title='Create an Account']").click();

    cy.get("#email_address-error").should("be.visible");
  });

  it("TC03 - Weak Password", () => {
    const email = generateUniqueEmail("weak");
    cy.visit(baseUrl);
    cy.get("#firstname").type("Weak");
    cy.get("#lastname").type("Password");
    cy.get("#email_address").type(email);
    cy.get("#password").type("123");
    cy.get("#password-confirmation").type("123");
    cy.get("button[title='Create an Account']").click();

    cy.get("#password-error").should("be.visible");
  });

  it("TC04 - Mismatched Passwords", () => {
    const email = generateUniqueEmail("mismatch");
    cy.visit(baseUrl);
    cy.get("#firstname").type("Mismatch");
    cy.get("#lastname").type("Passwords");
    cy.get("#email_address").type(email);
    cy.get("#password").type("Test@1234");
    cy.get("#password-confirmation").type("Test@4321");
    cy.get("button[title='Create an Account']").click();

    cy.get("#password-confirmation-error").should("be.visible");
  });

  it("TC05 - Existing Email Registration", () => {
    cy.visit(baseUrl);
    cy.get("#firstname").type("Existing");
    cy.get("#lastname").type("User");
    cy.get("#email_address").type("sesdeba@gmail.com");
    cy.get("#password").type("Test@1234");
    cy.get("#password-confirmation").type("Test@1234");
    cy.get("button[title='Create an Account']").click();

    cy.get(".message-error", { timeout: 10000 })
      .should("be.visible")
      .and("contain.text", "There is already an account");
  });

  it("TC06 - Leading/Trailing Spaces in Fields", () => {
    const email = generateUniqueEmail("space");
    cy.visit(baseUrl);
    cy.get("#firstname").type("  John  ");
    cy.get("#lastname").type("  Doe  ");
    cy.get("#email_address").type(`  ${email}  `);
    cy.get("#password").type("  Test@1234  ");
    cy.get("#password-confirmation").type("  Test@1234  ");
    cy.get("button[title='Create an Account']").click();

    cy.url().should("include", "/customer/account/");
  });

  it("TC07 - Email Case Sensitivity", () => {
    const email = generateUniqueEmail("case");
    cy.visit(baseUrl);
    cy.get("#firstname").type("Case");
    cy.get("#lastname").type("Test");
    cy.get("#email_address").type(email.toUpperCase());
    cy.get("#password").type("Test@1234");
    cy.get("#password-confirmation").type("Test@1234");
    cy.get("button[title='Create an Account']").click();

    cy.url().should("include", "/customer/account/");
  });

  it("TC08 - Password Edge Cases", () => {
    const email = generateUniqueEmail("edge");
    cy.visit(baseUrl);
    cy.get("#firstname").type("Edge");
    cy.get("#lastname").type("Cases");
    cy.get("#email_address").type(email);
    cy.get("#password").type("🔥P@sswørd123🔥");
    cy.get("#password-confirmation").type("🔥P@sswørd123🔥");
    cy.get("button[title='Create an Account']").click();

    cy.url().should("include", "/customer/account/");
  });

  it("TC09 - Email without Domain", () => {
    cy.visit(baseUrl);
    cy.get("#firstname").type("Email");
    cy.get("#lastname").type("NoDomain");
    cy.get("#email_address").type("test@domain");
    cy.get("#password").type("Test@1234");
    cy.get("#password-confirmation").type("Test@1234");
    cy.get("button[title='Create an Account']").click();

    cy.get("#email_address-error").should("be.visible");
  });

  it("TC10 - Rapid Multiple Sign-Ups", () => {
    const emails = Array.from({ length: 3 }, (_, i) => generateUniqueEmail(`rapid${i}`));
    emails.forEach((email) => {
      cy.visit(baseUrl);
      cy.get("#firstname").type("Rapid");
      cy.get("#lastname").type("SignUp");
      cy.get("#email_address").type(email);
      cy.get("#password").type("Test@1234");
      cy.get("#password-confirmation").type("Test@1234");
      cy.get("button[title='Create an Account']").click();
      cy.url().should("include", "/customer/account/");
      cy.clearCookies();
    });
  });

});