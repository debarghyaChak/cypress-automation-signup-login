This project implements automated end-to-end tests for the Magento Luma website's customer login and signup functionalities using Cypress and Cucumber (BDD-style).

✅ Built with:

Cypress 12+

@badeball/cypress-cucumber-preprocessor

BDD Gherkin syntax (.feature files)

Page Object Model for maintainability

Tests written for real-world edge cases

📁 Project Structure

.
├── cypress
│ ├── e2e
│ │ ├── features
│ │ │ ├── login.feature ← BDD scenarios for login
│ │ │ └── signup.feature ← BDD scenarios for signup
│ ├── support
│ │ ├── PageObjects
│ │ │ ├── LoginPage.js
│ │ │ └── SignupPage.js
│ │ ├── step_definitions
│ │ │ ├── login.js ← Login step definitions
│ │ │ └── signup.js ← Signup step definitions
│ │ └── commands.js
├── cypress.config.cjs ← Cypress + BDD configuration
├── package.json

🧪 Test Cases Covered

Login.feature

TC01: Valid User Login

TC02: Invalid Password

TC03: Non-Registered Email

TC04: Empty Credentials

TC05: Logout Process

TC06: Password Case Sensitivity

TC07: Session Expiry (Simulated)

TC08: Brute Force Prevention

TC09: Concurrent Logins (Different Devices)

Signup.feature

TC01: Valid User Signup

TC02: Invalid Email Format

TC03: Weak Password

TC04: Mismatched Passwords

TC05: Existing Email Registration

TC06: Leading/Trailing Spaces in Fields

TC07: Email Case Sensitivity

TC08: Password Edge Cases (Emojis/Symbols)

TC09: Email Without Domain

TC10: Rapid Multiple Signups

⚙️ Setup Instructions

Clone the Repository

git clone https://github.com/debarghyaChak/cypress-automation-signup-login.git
cd cypress-automation-signup-login

Install Dependencies

npm install

Run Tests

Run tests in interactive mode:

npx cypress open

Run tests headlessly:

npx cypress run

Folder Structure Notes

Feature files: cypress/e2e/features/*.feature

Step Definitions: cypress/support/step_definitions/*.js

Page Objects: cypress/support/PageObjects/*.js

🔒 Notes on Security

All secrets and sensitive files (e.g. node_modules, environment variables, SSH keys) have been excluded and cleaned from the repository for secure public sharing.

📦 GitHub Push Protection

All pushes are scanned for secrets using GitHub's Secret Scanning. Pushes containing private keys or sensitive data will be blocked.

🙌 Author

Debarghya Chakravarty
Software Engineer
GitHub: github.com/debarghyaChak
