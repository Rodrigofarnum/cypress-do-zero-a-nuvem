Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (name, sobrenome, email, texto) => {
    // Para o relógio, preenche os campos e clica em enviar
    cy.clock()
    cy.get('input[id="firstName"]').type(name,{delay:0});
    cy.get('input[id="lastName"]').type(sobrenome,{delay:0});
    cy.get('input[id="email"]').type(email,{delay:0});
    cy.get('textarea[id="open-text-area"]').type(texto,{delay:0});
    cy.clock()
    cy.contains('button', "Enviar").click()
    //Verifica a mensagem de sucesso, avança 3 segundo e verifica se ela sumiu
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
})