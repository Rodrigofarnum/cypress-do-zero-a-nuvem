Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (name, sobrenome, email, texto) => {
    cy.get('input[id="firstName"]').type(name);
    cy.get('input[id="lastName"]').type(sobrenome);
    cy.get('input[id="email"]').type(email);
    cy.get('textarea[id="open-text-area"]').type(texto);
    cy.contains('button', "Enviar").click()
    cy.get('.success').should('be.visible')
})