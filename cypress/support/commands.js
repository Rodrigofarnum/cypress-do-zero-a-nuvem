Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (name, sobrenome, email, texto) => {
    cy.get('input[id="firstName"]').type(name,{delay:0});
    cy.get('input[id="lastName"]').type(sobrenome,{delay:0});
    cy.get('input[id="email"]').type(email,{delay:0});
    cy.get('textarea[id="open-text-area"]').type(texto,{delay:0});
    cy.clock()
    cy.contains('button', "Enviar").click()
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
})