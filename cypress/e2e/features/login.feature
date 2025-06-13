Feature: Magento Login Functionality

  Scenario: TC01 - Valid User Login
    Given I visit the login page
    When I login with valid credentials
    Then I should be redirected to the account dashboard

  Scenario: TC02 - Invalid Password
    Given I visit the login page
    When I enter a valid email and an incorrect password
    Then I should see an error message for incorrect credentials

  Scenario: TC03 - Non-Registered Email
    Given I visit the login page
    When I enter an unregistered email and any password
    Then I should see an error message for non-existent account

  Scenario: TC04 - Empty Credentials
    Given I visit the login page
    When I submit the login form without filling in any fields
    Then I should see validation messages for required fields

  Scenario: TC05 - Logout Process
    Given I am logged in as a valid user
    When I click the logout button
    Then I should be logged out and redirected to the homepage

  Scenario: TC06 - Case Sensitivity in Password
    Given I visit the login page
    When I enter the correct email and a wrongly-cased password
    Then I should see an error message due to case-sensitive mismatch

  Scenario: TC07 - Session Expiry After Login
    Given I am logged in as a valid user
    When I stay idle for an extended time and try to interact
    Then I should be prompted to re-login

  Scenario: TC08 - Login Attempts Bruteforce Prevention
    Given I visit the login page
    When I attempt multiple incorrect logins in a short time
    Then the system should trigger a cooldown or show CAPTCHA

  Scenario: TC09 - Multiple Logins from Different Devices
    Given I am logged in as a valid user
    When I log in from another device simultaneously
    Then the system should handle session concurrency or notify the user
