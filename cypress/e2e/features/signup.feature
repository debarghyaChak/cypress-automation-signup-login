Feature: Magento Signup Functionality

Scenario: TC01 - Valid User Sign Up
Given I visit the signup page
When I fill in valid user details
Then I should be redirected to the account dashboard after signup

Scenario: TC02 - Invalid Email Format
Given I visit the signup page
When I enter an invalid email format
Then I should see an error message for invalid email

Scenario: TC03 - Weak Password
Given I visit the signup page
When I enter a weak password
Then I should see a prompt for a stronger password

Scenario: TC04 - Mismatched Passwords
Given I visit the signup page
When I enter mismatched passwords
Then I should see an error message for mismatched passwords

Scenario: TC05 - Existing Email Registration
Given I visit the signup page
When I enter an already registered email
Then I should see an error that the email is already in use

Scenario: TC06 - Leading or Trailing Spaces in Fields
Given I visit the signup page
When I enter credentials with leading or trailing spaces
Then The spaces should be trimmed and form should submit successfully

Scenario: TC07 - Email Case Sensitivity
Given I visit the signup page
When I enter an email with different casing
Then The system should treat it according to email case rules

Scenario: TC08 - Password Edge Cases
Given I visit the signup page
When I enter a password with special characters or emojis
Then The system should validate the password format accordingly

Scenario: TC09 - Email Without Domain
Given I visit the signup page
When I enter an email missing a domain
Then I should see an error message about invalid email format

Scenario: TC10 - Rapid Multiple Sign-Ups
Given I attempt to sign up multiple times quickly
Then The system should prevent spam or duplicate accounts