describe('Book APIs', ()=>{

    var accessToken = "";

        it(['smoke'], 'Auth Token',()=>{
            cy.readFile('cypress/fixtures/authBody.json').then((authValues)=>{
                authValues.clientName = (Math.random() + 1).toString(36).substring(5);
                authValues.clientEmail = (Math.random() + 1).toString(36).substring(5) + "@gmail.com";
    
                cy.writeFile('cypress/fixtures/authBody.json', authValues)
            })
    
           return cy.fixture('authBody.json').then((authJson)=>{
                cy.request({
                    method:'POST',
                    url: Cypress.env('base_url') + Cypress.env('authEndPoint'),
                    body:{
                            "clientName": authJson.clientName,
                            "clientEmail": authJson.clientEmail
                    }
                })
                .then((response)=>{
                    accessToken = response.body.accessToken
                    cy.log('Value of specific key:', accessToken);
                    console.log(accessToken);
                })
            })
        });

        it(['sanity'], 'List of Books',()=>{
            cy.request({
                method:'GET',
                url: Cypress.env('base_url') + Cypress.env('listOfBooks')
            })
            .its('status')
            .should('equal', 200);
        });

        it(['regression'], 'Single Book',()=>{
            cy.request({
                method:'GET',
                url: Cypress.env('base_url') + Cypress.env('singleBook')
            })
            .its('status')
            .should('equal', 200)
            })

        })