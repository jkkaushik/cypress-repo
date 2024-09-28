import 'cypress-xpath';
import HomePage from '../pages/homePage';
import CommonPage from '../pages/commonPage';
import { before } from 'mocha';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('Home Page Tests',function(){
    const homePage = new HomePage();

    it('Log out', function(){
        cy.login();
        homePage.clickUserProfileIcon();
        homePage.clickLogoutBtn();
        homePage.getLoginPageHeader().should('contain', ' Login to manage');
    });

    it('verify menu items', function(){
        cy.fixture('homePage').then((data)=>{
            cy.login();
            homePage.getMenuItems(data.menuItems);
        });
    });
})
