import 'cypress-xpath';
import HomePage from '../pages/homePage';
import PosPage from '../pages/posPage';
import CommonPage from '../pages/commonPage';
import { before } from 'mocha';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('POS Tests',function(){
    const homePage = new HomePage();
    const posPage = new PosPage();
    const commonPage = new CommonPage();

    before(()=>{
        cy.fixture('login').as('loginData');
        cy.fixture('homepage').as('homePageData');
        cy.fixture('posDiscount').as('discountData');
    })


    it('pos tests', function(){
        cy.login();
        homePage.clickPosThumbnail();
        commonPage.clickSideMenuRotateSpan();
        posPage.clickDiscountMenuBtn();
        cy.wait(2500);
        commonPage.clickSideMenuRotateSpan();
        commonPage.clickPlusIcon();
        cy.randomNumber(6).then((num)=>{
            posPage.enterDiscountCode(num);
        })
        cy.randomString(6).then((str)=>{
            posPage.enterDiscountName(str);
        })
        posPage.clickCategoryDrodown();
        posPage.selectDropdownOption(this.discountData.category);
        posPage.clickTypeDropdown();
        posPage.selectDropdownOption(this.discountData.type);
        posPage.clickTaxAppliedOnDropdown();
        posPage.selectDropdownOption(this.discountData.tax);
        posPage.enterDiscountValue("15");
        cy.randomString(8).then((str)=>{
            posPage.enterDescription(str);
        })
        cy.randomNumber(3).then((num)=>{
            posPage.enterDisplaySequence(num);
        })
        cy.randomNumber(2).then((num)=>{
            posPage.enterPriority(num);
        })
        posPage.clickDiscountOutletCodeDropdown();
        posPage.selectDropdownOption(this.discountData.outlet);
        posPage.clickSaveBtn();
        posPage.verifyToastMessage('Successfull!');
    });


    it('Create Modifier and verify "create" button is disabled if input fields are not filled', function(){
        cy.login();
        homePage.clickPosThumbnail();
        commonPage.clickSideMenuRotateSpan();
        posPage.clickModifierMenuBtn();
        cy.wait(2500);
        commonPage.clickSideMenuRotateSpan();
        commonPage.clickPlusIcon();
        cy.randomNumber(5).then((num)=>{
            posPage.enterModifierCode(num);
        })
        cy.randomString(8).then((name)=>{
            posPage.enterModifierName(name);
        })
        posPage.isModifierCreateBtnIsDisabled(); 

        cy.randomNumber(1).then((num)=>{
            if(parseInt(num)==0){
                num+=1;
            }
            posPage.enterModifierQuantity(num);
        })
        cy.randomNumber(2).then((num)=>{
            posPage.enterModifierRate(num);
        })
        posPage.clickModifierCreateButton();
        posPage.verifyToastMessage('Successfully Created ');
    });

})
