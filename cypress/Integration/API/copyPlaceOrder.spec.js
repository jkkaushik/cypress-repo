// describe('Book Orders', ()=>{

//     let authToken='';
//     let orderId ='';
//     let customer = '';

//     const grepTag = Cypress.env('grep');


//     before('Auth Token', ()=>{
//         cy.readFile('cypress/fixtures/authBody.json').then((authValues)=>{
//             authValues.clientName = (Math.random() + 1).toString(36).substring(5);
//             authValues.clientEmail = (Math.random() + 1).toString(36).substring(5) + "@gmail.com";

//             cy.writeFile('cypress/fixtures/authBody.json', authValues)
//         })

//        return cy.fixture('authBody.json').then((authJson)=>{
//             cy.request({
//                 method:'POST',
//                 url: Cypress.env('base_url') + Cypress.env('authEndPoint'),
//                 body:{
//                         "clientName": authJson.clientName,
//                         "clientEmail": authJson.clientEmail
//                 }
//             })
//             .then((response)=>{
//                 authToken = response.body.accessToken
//                 cy.log('Value of specific key:', authToken);
//                 console.log(authToken);
//             })
//         })
//     })

//         it(['sanity'],'Submit an Order', ()=>{
//             cy.readFile('cypress/fixtures/submitOrder.json').then((orderValues)=>{
//                 orderValues.customerName = (Math.random() + 1).toString(36).substring(5);
//                 cy.writeFile('cypress/fixtures/submitOrder.json', orderValues)
//             })
    
//            return cy.fixture('submitOrder.json').then((orderJson)=>{
//                 cy.request({
//                     method:'POST',
//                     url: Cypress.env('base_url') + Cypress.env('submitOrder'),
//                     headers: {
//                         Authorization: authToken
//                     },
//                     body:{
//                         "bookId" : orderJson.bookId,
//                         "customerName" : orderJson.customerName
//                     }
//                 })
//                 .then((response)=>{
//                         expect(response.status).to.equal(201)
//                         expect(response.body.created).to.be.true
//                         orderId = response.body.orderId;
//                         customer = orderJson.customerName
//                 })
//            })    
//         });

//         it(['smoke'],'Get All Orders after Deleting the order', ()=>{
//             cy.request({
//                 method:'GET',
//                 url: Cypress.env('base_url') + Cypress.env('getAllOrders'),
//                 headers:{
//                     Authorization: authToken
//                 }
//             })
//             .then((response)=>{
//                 expect(response.status).to.equal(200)
//                 try{
//                     const lastItem = response.body[response.body.length - 1]
//                     expect(lastItem).to.not.have.property('customerName', customer)   
//                 }
//                 catch(error){
//                     cy.log('Error--' + error.message);
//                 }
               
//             })
//         });

//         it(['regression'],'Try Updating an Order after deleting', ()=>{
//             cy.request({
//                 method: 'PATCH',
//                 url: Cypress.env('base_url') + Cypress.env('updateOrder') + orderId,
//                 failOnStatusCode: false,
//                 headers: {
//                     Authorization: authToken
//                 },
//                 body:{
//                     "customerName": (Math.random() + 1).toString(36).substring(5)
//                 }
//             })
//             .then((response)=>{
//                     expect(response.status).to.equal(404)
//                     expect(response.body.error).to.equal('No order with id ' + orderId + '.')
//             })
//         });

//         it(['smoke'],'Get All Orders', () => {
//             cy.request({
//               method: 'GET',
//               url: Cypress.env('base_url') + Cypress.env('getAllOrders'),
//               headers: {
//                 Authorization: authToken
//               }
//             })
//             .then((response) => {
//               console.log(response.body);
//               expect(response.status).to.equal(200);
//               const lastItem = response.body[response.body.length - 1]; 
//                 expect(lastItem).to.have.property('customerName', customer);
            
//             });
//           });
        
//           it(['regression'],'Update an Order', ()=>{
//             cy.readFile('cypress/fixtures/submitOrder.json').then((orderValues)=>{
//                 orderValues.customerName = (Math.random() + 1).toString(36).substring(5);
//                 cy.writeFile('cypress/fixtures/submitOrder.json', orderValues)
//             })
//             return cy.fixture('updateOrder.json').then((updatedName)=>{
//                 cy.request({
//                     method: 'PATCH',
//                     url: Cypress.env('base_url') + Cypress.env('updateOrder') + orderId,
//                     headers: {
//                         Authorization: authToken
//                     },
//                     body:{
//                         "customerName" : updatedName.customerName
//                     }
//                 })
//                 .then((response)=>{
//                         expect(response.status).to.equal(204)
//                         customer = updatedName.customerName
//                 })
//             })
//         });

//         it(['sanity'],'Get All Orders after Updating the order', ()=>{
//             cy.request({
//                 method:'GET',
//                 url: Cypress.env('base_url') + Cypress.env('getAllOrders'),
//                 headers:{
//                     Authorization: authToken
//                 }
//             })
//             .then((response)=>{
//                     expect(response.status).to.equal(200)
//                     const lastItem = response.body[response.body.length-1]
//                     expect(lastItem).to.have.property('customerName', customer)
//                 })
//         });
    
//         it(['regression', 'sanity'],'Delete an order', ()=>{
//             cy.request({
//                 method: 'DELETE',
//                 url: Cypress.env('base_url') + Cypress.env('deleteOrder') + orderId,
//                 headers : {
//                     Authorization: authToken
//                 }
//             })
//             .then((response)=>{
//                     expect(response.status).to.equal(204)
            
//             })
//         });

//     })