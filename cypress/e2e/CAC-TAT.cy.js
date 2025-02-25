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
    cy.get('#email').should('be.visible').type('teste@teste.com')
    cy.get('#phone').should('be.visible').type('553199999999')
    cy.get('#open-text-area').should('be.visible').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('span.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('span.error').should('be.not.visible')
    cy.get('#email').type('marcelo.com')
    cy.get('button[type="submit"]').click()
    cy.get('span.error').should('be.visible')
  })

  it('campo telefone vazio ao preencher com valor não numérico', () => {
    cy.get('#phone').type('marcelo')
    cy.get('#phone').should('have.value','')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#phone-checkbox').click()   
    cy.get('button[type="submit"]').click()
    cy.get('span.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    const first = 'Marcelo', last = 'Lima', email = 'teste@teste.com', phone = 55319898971258

    cy.get('#firstName').as('firstInput').type(first).should('have.value',first)
    cy.get('#lastName').as('lastInput').type(last).should('have.value',last)
    cy.get('#email').as('emailInput').type(email).should('have.value',email)
    cy.get('#phone').as('phoneInput').type(phone).should('have.value',phone)    

    cy.get('@firstInput').clear().should('have.value','')
    cy.get('@lastInput').clear().should('have.value','')
    cy.get('@emailInput').clear().should('have.value','')
    cy.get('@phoneInput').clear().should('have.value','')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('span.error').should('be.visible')
    cy.contains('span.error > strong', 'Valide os campos obrigatórios!');
  })

  it('envia formulário com sucesso um comando customizado', () => {
    const data = {
      firstName: 'Marcelo',
      lastName: 'Lima',
      email: 'teste@gmail.com',
      phone: '31989889989',
      text: 'Hello'
    }
    cy.fillMandatoryFieldsAndSubmit(data)  
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto pelo texto (YouTube)', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value','youtube')
  })

  it('seleciona um produto pelo valor (mentoria)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value','mentoria')
  })  

  it('seleciona um produto pelo índice (Blog)', () => {
    cy.get('#product')
      .select(1)
      .should('have.value','blog')
  })  
    
})
