describe('Book Orders', ()=>{


    let authToken='';
    // let orderId ='';
    // let customer = '';

    before('Auth Token', ()=>{
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
                authToken = response.body.accessToken
                cy.log('Value of specific key:', authToken);
                console.log(authToken);
            })
        })
    })

    // submit and verify the order in all orders
    it(['smoke'] ,'Submit an Order', ()=>{
        cy.readFile('cypress/fixtures/submitOrder.json').then((orderValues)=>{
            orderValues.customerName = (Math.random() + 1).toString(36).substring(5);
            cy.writeFile('cypress/fixtures/submitOrder.json', orderValues)
        })

       return cy.fixture('submitOrder.json').then((orderJson)=>{
            cy.request({
                method:'POST',
                url: Cypress.env('base_url') + Cypress.env('submitOrder'),
                headers: {
                    Authorization: authToken
                },
                body:{
                    "bookId" : orderJson.bookId,
                    "customerName" : orderJson.customerName
                }
            })
            .then((response)=>{
                    // expect(response.status).to.equal(201)
                    expect(response.status).to.equal(400)
                    expect(response.body.created).to.be.true
                    let customer = orderJson.customerName
                    return customer
            })
            .then((customer)=>{
                cy.request({
                    method: 'GET',
                    url: Cypress.env('base_url') + Cypress.env('getAllOrders'),
                    headers: {
                      Authorization: authToken
                    }
                  })
                  .then((response) => {
                    console.log(response.body);
                    expect(response.status).to.equal(200);
                    const lastItem = response.body[response.body.length - 1]; 
                    expect(lastItem).to.have.property('customerName', customer);
                  });
            })
       })    
    })


    // submit and update the order
    it(['sanity'],'Submit and update the Order', ()=>{
        cy.readFile('cypress/fixtures/submitOrder.json').then((orderValues)=>{
            orderValues.customerName = (Math.random() + 1).toString(36).substring(5);
            cy.writeFile('cypress/fixtures/submitOrder.json', orderValues)
        })
       return cy.fixture('submitOrder.json').then((orderJson)=>{
            cy.request({
                method:'POST',
                url: Cypress.env('base_url') + Cypress.env('submitOrder'),
                headers: {
                    Authorization: authToken
                },
                body:{
                    "bookId" : orderJson.bookId,
                    "customerName" : orderJson.customerName
                }
            })
            .then((response)=>{
                    // expect(response.status).to.equal(201)
                    expect(response.status).to.equal(400)
                    expect(response.body.created).to.be.true
                    let orderId = response.body.orderId;
                    return orderId;
            })
            .then((orderId)=>{
                cy.readFile('cypress/fixtures/submitOrder.json').then((orderValues)=>{
                    orderValues.customerName = (Math.random() + 1).toString(36).substring(5);
                    cy.writeFile('cypress/fixtures/submitOrder.json', orderValues)
                })
                return cy.fixture('updateOrder.json').then((updatedName)=>{
                    cy.request({
                        method: 'PATCH',
                        url: Cypress.env('base_url') + Cypress.env('updateOrder') + orderId,
                        headers: {
                            Authorization: authToken
                        },
                        body:{
                            "customerName" : updatedName.customerName
                        }
                    })
                    .then((response)=>{
                            expect(response.status).to.equal(204)
                            let customerNewName = updatedName.customerName
                            return customerNewName;
                    })
                })
                .then((customerNewName)=>{
                    cy.request({
                        method:'GET',
                        url: Cypress.env('base_url') + Cypress.env('getAllOrders'),
                        headers:{
                            Authorization: authToken
                        }
                    })
                    .then((response)=>{
                            expect(response.status).to.equal(200)
                            const lastItem = response.body[response.body.length-1]
                            expect(lastItem).to.have.property('customerName', customerNewName)
                        })
                })
            })
       })    
    })


    //submit an order and delete it
    // negative case (user should get neagtive response while checking the deleted order in all Orders)
    // handling the situation where the number of orders are zero
    // negative case (user should get error status code while trying to update the deleted Order.)
    it(['regression'],'Submit and delete the Order', ()=>{
        cy.readFile('cypress/fixtures/submitOrder.json').then((orderValues)=>{
            orderValues.customerName = (Math.random() + 1).toString(36).substring(5);
            cy.writeFile('cypress/fixtures/submitOrder.json', orderValues)
        })

       return cy.fixture('submitOrder.json').then((orderJson)=>{
            cy.request({
                method:'POST',
                url: Cypress.env('base_url') + Cypress.env('submitOrder'),
                headers: {
                    Authorization: authToken
                },
                body:{
                    "bookId" : orderJson.bookId,
                    "customerName" : orderJson.customerName
                }
            })
            .then((response)=>{
                    expect(response.status).to.equal(201)
                    expect(response.body.created).to.be.true
                    let orderId = response.body.orderId;
                    let customer = orderJson.customerName
                    let values = [orderId, customer]
                    return values
            })
            .then((values)=>{
                cy.request({
                    method: 'DELETE',
                    url: Cypress.env('base_url') + Cypress.env('deleteOrder') + values[0],
                    headers : {
                        Authorization: authToken
                    }
                })
                .then((response)=>{
                        expect(response.status).to.equal(204)
                        return values
                })
                .then((values)=>{
                    cy.request({
                        method:'GET',
                        url: Cypress.env('base_url') + Cypress.env('getAllOrders'),
                        headers:{
                            Authorization: authToken
                        }
                    })
                    .then((response)=>{
                        expect(response.status).to.equal(200)
                        try{
                            const lastItem = response.body[response.body.length - 1]
                            expect(lastItem).to.not.have.property('customerName', values[1])   
                        }
                        catch(error){
                            cy.log('Error--' + error.message);
                        }
                    })
                    .then((values)=>{
                        cy.request({
                            method: 'PATCH',
                            url: Cypress.env('base_url') + Cypress.env('updateOrder') + values[0],
                            failOnStatusCode: false,
                            headers: {
                                Authorization: authToken
                            },
                            body:{
                                "customerName": (Math.random() + 1).toString(36).substring(5)
                            }
                        })
                        .then((response)=>{
                                expect(response.status).to.equal(404)
                                expect(response.body.error).to.equal('No order with id ' + values[0] + '.')
                        })
                    })
                })
            })
       })    
    })

})