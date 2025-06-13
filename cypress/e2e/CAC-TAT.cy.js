describe('Central de Atendimento ao cliente TAT', () => {
  beforeEach (() => {
    cy.visit('./src/index.html')
  })
 
  it('1- verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('2- preenche os campos obrigatórios e envia', () => {
    //Criei uma variavel para armazenar um texto longo
    const textolongo = Cypress._.repeat('ABCDEFGHLR', 10)
    //Preenche os campos
    cy.get('input[id="firstName"]').as('Nome').type('Rodrigo',{delay:0})
    cy.get('input[id="lastName"]').as('Sobrenome').type('Bardo',{delay:0})
    cy.get('input[id="email"]').as('Email').type('rodrigobardo@gmail.com',{delay:0})
    cy.get('input[id="phone"]').as('Telefone').type('21995105169',{delay:0})
    cy.get('textarea[id="open-text-area"]').as('Texto').type(textolongo,{delay:0}) 
    //Verifica se os campos foram preenchidos
    cy.get('@Nome').should('have.value', 'Rodrigo')
    cy.get('@Sobrenome').should('have.value', 'Bardo')
    cy.get('@Email').should('have.value', 'rodrigobardo@gmail.com')
    cy.get('@Telefone').should('have.value', '21995105169')
    cy.get('@Texto').should('have.value', textolongo)
    //Pausa o relógio e clica no botão Enviar
    cy.clock()
    cy.contains('button', "Enviar").click()
    //Verifica a mensagem de sucesso, avança 3 segundos do relógio e verifica se a mensagem sumiu
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  it('3- exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    //Pausa o relógio, preenche os campos e clica em enviar
    cy.clock() 
    cy.get('input[id="email"]').as('Email').type('rodrigotenebro@',{delay:0})
    cy.contains('button', "Enviar").click()
    // Verifica mensagem de erro, avança 3 segundo e verifica se ela sumiu
    cy.get('.error').should('be.visible')
    cy.tick(3000) 
    cy.get('.error').should('not.be.visible')
  }) 
  
  it('4- se um valor não-numérico for digitado no campo telefone, seu valor continuará vazio.', () => {
    cy.get('input[id="phone"]').type('123abc456')
    cy.get('input[id="phone"]').should('have.value', '123456')
  }) 

  it('5- exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock() //Pausa o relógio
    //Preenche os campos
    cy.get('input[id="firstName"]').as('Nome').type('Rodrigo',{delay:0})
    cy.get('input[id="lastName"]').as('Sobrenome').type('Silva',{delay:0})
    cy.get('input[id="email"]').as('Email').type('rodrigosilva@gmail.com',{delay:0})
    cy.get('input[type ="radio"][value="feedback"]').check()
    cy.get('textarea[id="open-text-area"]') .as('Texto') .click() .type('Quero agradecer pelo ótimo atendimento prestado pelo Rodrigo Silva quanto a Qualidade do meu site! Ele se mostrou muito experiente e com uma ótima habilidade de automação nos testes.',{delay:0})
    //Faz o checkbox do retorno por telefone e envia
    cy.get('input[id="phone-checkbox"]').check() 
    cy.contains('button', "Enviar").click()
    // Verifica a mensagem de erro, avança 3 segundos do relógio e verifica se ela sumiu
    cy.get('.error').should('be.visible') 
    cy.tick(3000) 
    cy.get('.error').should('not.be.visible') 
  }) 

  it('6- preenche e limpa os campos nome, sobrenome, email e telefone.', () => {
    //Digita os valores
    cy.get('input[id="firstName"]').as('Nome').invoke('val','Rodrigo')
    cy.get('input[id="lastName"]').as('Sobrenome').invoke('val','Gomes')
    cy.get('input[id="email"]').as('Email').invoke('val','rodrigogomes@gmail.com')
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

  it('7- exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
    //Pausa o relógio, preenche os campos e verifica a mensagem
    cy.clock()
    cy.contains('button', "Enviar").click()
    cy.get('.error').should('be.visible')
    //Avança 3 segundo do relógio e verifica se mensagem de erro sumiu
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('8- exibe mensagem de sucesso ao preencher o formulário corretamente e enviar.', () => {
    //Utilizando o commands.js
    cy.fillMandatoryFieldsAndSubmit('Rodrigo', 'Tenebres', 'email@hotmail.com', 'TEXTO')
  })

  it('9- seleciona um produto (YouTube) por seu texto.', () => {
    cy.get('#product').select('YouTube')
    cy.get('#product').should('have.value', 'youtube')
  })

  it('10-  seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria')
    cy.get('#product').should('have.value', 'mentoria')
  })
  
  it('11- seleciona um produto (Blog) por seu índice e seleciona um produto aleatório', () => {
    cy.get('#product').select(1)
    cy.get('#product').should('have.value', 'blog')
  })
  
  it('seleciona um produto aleatório', () => {
    cy.get('#product option').then(options => {
      // Ignora a primeira opção (índice 0), armazena um indice aleatório e cria a variavel
      const validar = [...options].slice(1);
      const randomIndex = Cypress._.random(0, validar.length - 1);
      const value = validar[randomIndex].value;
      //Seleciona o produto da variavel e verifica se está visivel
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
    //Armazena os valores de cada opção
    const opcoes = ["feedback", "elogio", "ajuda"];
    //O comando wrap separa cada opção e o comando each repete a operação até terminar o array
    cy.wrap(opcoes).each((opcao) => {  
      cy.get(`input[value= "${opcao}"]`).check();
      cy.get(`input[value= "${opcao}"]`).should('be.checked');
    });
  });
  
  it('outra forma de fazer', () => {
    // Com o retorno do próprio get você consegue usar o comando each
    cy.get('input[type="radio"]').each( opção => { 
      cy.wrap(opção).check()
      cy.wrap(opção).should('be.checked')
    })
  });
  
  it('14- marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check()
    cy.get('input[type="checkbox"]').should('be.checked')
    cy.get('input[type="checkbox"]').last().uncheck() // Obs: Também podemos usar .first() 
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
      expect(input[0].files[0].name).to.equal('example.json') 
    })
  });

  it('18- verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
   // Como a target da tag <a> é _blank, sabemos que abrirá em outra página
    cy.contains('a', "Política de Privacidade")
    .should( 'have.attr','href','privacy.html')
    .and('have.attr', 'target','_blank') 
  })
  
  it('19- acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click()
    cy.contains('h1', 'Política de Privacidade').should('be.visible')
  })
  
  //Repete o teste 3 vezes 
  Cypress._.times(3, () => {
  it('20- usando o Cypress._.times() para rodar o teste várias vezes', () => {
    // Para o relógio e cria a variavel com o valor do texto
    cy.clock() 
    const textolongo = Cypress._.repeat('ABCDEFGHLR', 10) 
    //Preenche os campos
    cy.get('input[id="firstName"]').as('Nome').type('Rodrigo',{delay:0})
    cy.get('input[id="lastName"]').as('Sobrenome').type('Barão',{delay:0})
    cy.get('input[id="email"]').as('Email').type('rodrigobarao@gmail.com',{delay:0})
    cy.get('input[id="phone"]').as('Telefone').type('21995105169',{delay:0})
    cy.get('textarea[id="open-text-area"]').as('Texto').type(textolongo,{delay:0}) 
    //Verifica se preencheu os campos
    cy.get('@Nome').should('have.value', 'Rodrigo')
    cy.get('@Sobrenome').should('have.value', 'Barão')
    cy.get('@Email').should('have.value', 'rodrigobarao@gmail.com')
    cy.get('@Telefone').should('have.value', '21995105169')
    cy.get('@Texto').should('have.value', textolongo)
    //Clica em enviar, verifica a mensagem de sucesso, avança 3 segundos do relógio e verifica se ela sumiu
    cy.contains('button', "Enviar").click()
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
    })

  }) 

  it('21- exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    //Verifica se a mensagem de sucesso não está aparecendo e força a mensagem aparecer
    cy.get('.success').should('not.visible')
    cy.get('.success').invoke('show').should('be.visible')
    cy.contains('span', "Mensagem enviada com sucesso.")
    //Força a mensagem de sucesso a ficar oculta 
    cy.get('.success').invoke('hide').should('not.visible')
    //Verifica se a mensagem de erro não está aparecendo e força a mensagem aparecer
    cy.get('.error').invoke('show').should('be.visible')
    cy.contains('span', "Valide os campos obrigatórios!")
    //Força a mensagem de erro a ficar oculta 
    cy.get('.error').invoke('hide').should('not.visible')
  })  
  
  it('22- preenche o campo da área de texto usando o comando invoke()', () => {
    //Cria uma variavel que armazena o valor do campo 8x
    const nome = Cypress._.repeat('Bruno Pernambuco Segundo Mestre Real,', 8)
    //Preenche os campos no formato CTRL + V
    cy.get('#open-text-area').invoke('val', nome)
    cy.get('#open-text-area').should('have.value', nome)
  })  

  it('23- faz uma requisição HTTP', () => {
   cy.request('GET', 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html').as ('Requicição')
   cy.get('@Requicição').its('status').should('be.equal', 200)
   cy.get('@Requicição').its('statusText').should('be.equal', 'OK')
   cy.get('@Requicição').its('body').should('include', 'CAC TAT')
   })

  it('24- Desafio (encontre o gato) 🐈', () => {
  cy.get('span[id="cat"]').invoke('show')
  cy.get('span[id="cat"]').should('be.visible')
  cy.get('span[id="cat"]').invoke('hide')
  cy.get('span[id="cat"]').should('not.visible')
   })
  })

