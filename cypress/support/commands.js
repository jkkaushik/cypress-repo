Cypress.Commands.add('softAssert', (conditionFn, message) => {
    const condition = conditionFn();
    cy.log(`Soft assertion: ${message}`);
    Cypress.softAssertions.push({ condition, message });
  });

  // commands.js
Cypress.Commands.add('checkSoftAssertions', () => {
    Cypress.softAssertions.forEach(({ condition, message }) => {
      if (!condition) {
        throw new Error(`Soft assertion failed: ${message}`);
      }
    });
  });

  import CommonPage from "../Integration/Web/pages/commonPage";
  import Hrms from "../integration/pages/hrmsPage";

const commanPage = new CommonPage();
const hrms = new Hrms();

Cypress.Commands.add('login', () => {
    cy.visit(Cypress.env('url'));
   cy.fixture('login.json').then((users)=>{
    commanPage.loginWithConfigurtion(users.email, users.password);
   })
})

Cypress.Commands.add('posLogin', () => {
    cy.visit(Cypress.env('posUrl'));
    cy.fixture('login.json').then((users)=>{
        commanPage.loginWithOperational(users.email, users.password);   
    })
})

Cypress.Commands.add('hrmsLogin', () => {
    cy.visit(Cypress.env('hrmsUrl'));
    cy.fixture('login.json').then((users)=>{
        hrms.login(users.hrmsEmail, users.hrmsPassword);   
    })
})

Cypress.Commands.add('randomString', (length)=>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
})

Cypress.Commands.add('randomNumber', (length)=>{
    const characters = '0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
})

Cypress.Commands.add('randomNumForRange', (min, max)=>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
})

Cypress.Commands.add('getDate', ()=>{
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${day}`;
})

Cypress.Commands.add('getMonth', ()=>{
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
    return `${month}`;
})

Cypress.Commands.add('getYear', ()=>{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    return `${year}`;
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })