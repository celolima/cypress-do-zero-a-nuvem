Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Jonh',
    lastName: 'Mak',
    email: 'mak@gmail.com',
    phone: '88989889989',
    text: 'Hello there'
}) => {
    cy.get('#firstName').should('be.visible').type(data.firstName)
    cy.get('#lastName').should('be.visible').type(data.lastName)
    cy.get('#email').should('be.visible').type(data.email)
    cy.get('#phone').should('be.visible').type(data.phone)
    cy.get('#open-text-area').should('be.visible').type(data.text)
    cy.get('button[type="submit"]').click()
})