describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Preciso de ajuda no curso do Cypress\n',10)

    cy.get('#firstName').should('be.visible').type('Marcelo')
    cy.get('#lastName').should('be.visible').type('Lima')
    cy.get('#email').should('be.visible').type('celo@gmail.com')
    cy.get('#phone').should('be.visible').type('553199999999')
    cy.get('#open-text-area').should('be.visible').type(longText, { delay: 5 })
    cy.get('button[type="submit"]').click()

    cy.get('span.success').should('be.visible')
  })
})
