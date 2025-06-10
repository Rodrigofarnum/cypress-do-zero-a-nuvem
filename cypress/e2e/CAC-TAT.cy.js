//Acessa o site a cada it
describe('Central de Atendimento ao cliente TAT', () => {
  beforeEach (() => {
    cy.visit('./src/index.html')
  })
 
  //Verifica o título da página  
  it('1- verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  //Preenche os campos obrigatórios
  it('2- preenche os campos obrigatórios', () => {
    cy.get('input[id="firstName"]').as('Nome').type('Rodrigo')
    cy.get('input[id="lastName"]').as('Sobrenome').type('Farnum')
    cy.get('input[id="email"]').as('Email').type('rodrigofarnum@gmail.com')
    cy.get('input[id="phone"]').as('Telefone').type('21995105169')

    const textolongo = Cypress._.repeat('ABCDEFGHLR', 10) //Criei uma variavel para armazenar um texto longo
    cy.get('textarea[id="open-text-area"]').as('Texto').click()
    .type(textolongo,{delay:0}) //Utilizo a vaiavél  para demonstrar o delay 0

    //Verifica se os campos foram preenchidos
    cy.get('@Nome').should('have.value', 'Rodrigo')
    cy.get('@Sobrenome').should('have.value', 'Farnum')
    cy.get('@Email').should('have.value', 'rodrigofarnum@gmail.com')
    cy.get('@Telefone').should('have.value', '21995105169')
    cy.get('@Texto').should('have.value', textolongo)

    //Clica no botão Enviar
    cy.contains('button', "Enviar").click()

    //Verifica a mensagem de sucesso
    cy.get('.success').should('be.visible')
  })

  //Valida mensagem de alerta ao usuário
  it('3- exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('input[id="email"]').as('Email').type('rodrigofarnum@')
   cy.contains('button', "Enviar").click()
    cy.get('.error').should('be.visible')
  }) 
  
  //Valida se o campo telefone só está aceitando números
  it('4- se um valor não-numérico for digitado, seu valor continuará vazio.', () => {
    cy.get('input[id="phone"]').type('123abc456')
    cy.get('input[id="phone"]').should('have.value', '123456')
  }) 

  //Alerta de erro ao usuário no campo telefone 
  it('5- exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input[id="firstName"]').as('Nome').type('Rodrigo')
    cy.get('input[id="lastName"]').as('Sobrenome').type('Farnum')
    cy.get('input[id="email"]').as('Email').type('rodrigofarnum@gmail.com')
    cy.get('textarea[id="open-text-area"]') .as('Texto') .click() .type('Quero agradecer pelo ótimo atendimento prestado pelo Rodrigo Farnum quanto a Qualidade do meu site! Ele se mostrou muito experiente e com uma ótima habilidade de automação nos testes.')
    cy.get('input[id="phone-checkbox"]').check() //Faz o checkbox do retorno por telefone
    cy.contains('button', "Enviar").click()
    cy.get('.error').should('be.visible')
  }) 

  //Verifica se é possivel limpar os campos digitados
  it('6- preenche e limpa os campos nome, sobrenome, email e telefone.', () => {
    cy.get('input[id="firstName"]') .as('Nome') .type('Rodrigo')
    cy.get('input[id="lastName"]') .as('Sobrenome') .type('Gomes')
    cy.get('input[id="email"]')  .as('Email')  .type('rodrigogomes@gmail.com')
    
    //Verifica se digitou os valores
    cy.get('@Nome').should('have.value', 'Rodrigo')
    cy.get('@Sobrenome').should('have.value', 'Gomes')
    cy.get('@Email').should('have.value', 'rodrigogomes@gmail.com')
    
    //Limpa os valores
    cy.get('@Nome').clear()
    cy.get('@Sobrenome').clear()
    cy.get('@Email').clear()

    //Verifica se limpou os valores
    cy.get('@Nome').should('have.value', '')
    cy.get('@Sobrenome').should('have.value', '')
    cy.get('@Email').should('have.value', '')
  }) 

  //Verifica mensagem de alerta ao usuário sem preenchimento
  it('7- exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
    cy.contains('button', "Enviar").click()
    cy.get('.error').should('be.visible')
  })

  //Utilizando o commands.js
  it('8- exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
    cy.fillMandatoryFieldsAndSubmit('Rodrigo', 'Farnum', 'email@hotmail.com', 'TEXTO')
  })

  it('9- seleciona um produto (YouTube) por seu texto.', () => {
    cy.get('#product').select('YouTube')
    cy.get('#product').should('have.value', 'youtube')
  })

  it('10-  seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria')
    cy.get('#product').should('have.value', 'mentoria')
  })
  
  it('11- seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1)
    cy.get('#product').should('have.value', 'blog')
  })
  
  it('seleciona um produto aleatório', () => {
    cy.get('#product option').then(options => {
      // Ignora a primeira opção (índice 0), que é "Selecione"
      const validar = [...options].slice(1);
      const randomIndex = Cypress._.random(0, validar.length - 1);
      const value = validar[randomIndex].value;
      cy.get('#product').select(value);
      cy.get('#product').should('not.have.value', 'Selecione')
    });
    it('outra maneira de resolver', () => {
      cy.get('#product').select(Cypress._.random(1,4))
      })
  });

  it('12- marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type ="radio"][value="feedback"]').check()
    cy.get('input[type ="radio"][value="feedback"]').should('be.checked')
  })

  
  it('13- marca cada tipo de atendimento', () => {
    const opcoes = ["feedback", "elogio", "ajuda"];
  
    cy.wrap(opcoes).each((opcao) => {
      cy.get(`input[value= "${opcao}"]`).check();
      cy.get(`input[value= "${opcao}"]`).should('be.checked');
    });
  });
  
  it('13- marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each( opção => {
      cy.wrap(opção).check()
      cy.wrap(opção).should('be.checked')
    })
  });
  
  
  it('14- marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check()
    cy.get('input[type="checkbox"]').should('be.checked')
    cy.get('input[type="checkbox"]').last().uncheck()
    cy.get('input[type="checkbox"]').last().should('not.be.checked')
  });
    
  it('15- seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
    .then(input => {
      expect(input[0].files[0].name).to.equal('example.json') 
    })
  });

  it('16- seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
    .then(input => {
      expect(input[0].files[0].name).to.equal('example.json') 
    })
  });

  it('17- seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('arquivo')
    cy.get('input[type="file"]').selectFile('@arquivo')
    .should(input => {
      console.log(input[0].files[0].name)
      expect(input[0].files[0].name).to.equal('example.json') 
    })
  });

  it('17- verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', "Política de Privacidade")
    .should( 'have.attr','href','privacy.html')
    .and('have.attr', 'target','_blank')
  })
  
  it('18- acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click()
    cy.contains('h1', 'Política de Privacidade').should('be.visible')
  })
  
  it('19- testa a página da política de privacidade de forma independente', () => {
    cy.contains('a', "Política de Privacidade").invoke('removeAttr', 'target').click()
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
  })
})