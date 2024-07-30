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