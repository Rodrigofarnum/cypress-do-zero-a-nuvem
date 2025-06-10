describe('Política e Privacidade', () => {
    beforeEach (() => {
      cy.visit('./src/privacy.html')
    })
 
    it ('Testar o titulo da pagina', () => {
      cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')    
    })
    it ('Testar o texto da pagina', () => {
      cy.contains('p', "Talking About Testing")
    })
})
