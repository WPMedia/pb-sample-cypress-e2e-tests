const URL_STANDALONE_PAGE = 'http://localhost/pf/engine-test/?_website=the-gazette'
const URL_CS_SUCCESSFUL = 'http://localhost/pf/api/v3/content/fetch/country?query=%7B%22code%22%3A%22FR%22%7D&_website=the-gazette'
const URL_PB_EDITOR_PAGES = 'http://localhost/pagebuilder/pages'

describe('engine and editor', () => {
  it('engine can render a standalone page', () => {
    cy.visit(URL_STANDALONE_PAGE)
    cy.contains('Raw HTML').should('be.visible')
  })

  it('engine content source /pf/api call returns successful response', () => {
    cy.request(URL_CS_SUCCESSFUL).as('response')
    cy.get('@response').its('status').should('eq', 200)
    cy.get('@response').its('body').should('have.property', 'name')
    cy.get('@response').its('body').its('name').should('eq', 'France')
  })

  it('editor render list of pages', () => {
    cy.visit(URL_PB_EDITOR_PAGES)
    cy.get('.browser__list').find('.page__actions__dropdown')
      .should('have.length.greaterThan', 2)
  })

  it('editor updates on custom fields are reflected in the preview', () => {
    cy.visit(URL_PB_EDITOR_PAGES)
    cy.contains('Engine Test').click()

    // Make a change in a custom field
    cy.get('#editor-panel', { timeout: 30000 }).contains('global DisplayCountry').click()
    cy.contains('Country Code').parent().parent().find('input').clear().type('DE{enter}')
    // Observe the preview picked up the change with re-render
    cy.iframe('#editor-preview-iframe').contains('Germany', { timeout: 10000 })
      .should('be.visible')

    // Make one more change
    cy.contains('Country Code').parent().parent().find('input').clear().type('FR{enter}')
    cy.iframe('#editor-preview-iframe').contains('France', { timeout: 10000 })
      .should('be.visible')
  })
})
