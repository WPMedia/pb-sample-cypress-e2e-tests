# Sample PageBuilder End-to-End Cypress Tests

A Sample cypress end to end test a PageBuilder bundle in local development environment. 

## Contents of the sample test spec

The sample `cypress/e2e/engine-editor.cy.js` file contains demonstration of testing a page in PageBuilder Editor UI named "Engine Test" with a few different scenarios:
- that has a "Raw HTML" custom feature in the final rendered page
- that have a "DisplayCountry" custom feature with a custom field "Country Code"
- test the page in PageBuilder Editor UI that makes a change to this custom field, and observe the preview iframe displaying expected outcome. 
	- This outcome tests both content source behavior for this custom field value
	- Existence of expected elements in the rendered page

Separately, we also check this content source's /pf/api call - to make sure client-side render will render properly.


# Running

Make sure you run your local PageBuilder instance with `npx fusion start` in your bundle repo before running these tests.

## Install Dependencies
`npm install`

## For CLI Runner (Headless)
`npm test`

## For UI Runner (Headful)
- `npm start`
- Select E2E option, then select one of the spec files to run

Note: UI auto-reloads failed test specs when making changes to the spec file.