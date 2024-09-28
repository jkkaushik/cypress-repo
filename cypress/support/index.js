import './commands.js'
// cy.origin('https://fxposoperationui.azurewebsites.net/', () => {
//     Cypress.on('uncaught:exception', (err, runnable) => {
//     // returning false here prevents Cypress from failing the test
//     return false
//     })
// })

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
