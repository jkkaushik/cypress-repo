describe('My Test Suite', function() 
{

    before(() => {
        cy.on('uncaught:exception', (error) => {
          // Log the error
          console.error('Unexpected error:', error.message);
          
          // Return false to prevent the error from failing the test
          return false;
        });
      });
 
    it(['smoke'], 'My FirstTest case',function() {
    
    //Check boxes
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

    // check the option1 checkbox and verify it
    cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
    // uncheck it and verify
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked')

    cy.pause();

    // check multiple checkboxes
    cy.get('input[type="checkbox"]').check(['option2','option3'])
    
    //Static Dropdown
    
    cy.get('select').select('option2').should('have.value','option2')

    //radio buttons
    
    cy.get('[value="radio2"]').check().should('be.checked')
    
    })
 
})