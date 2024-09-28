import FxReservationPage from "../pages/fxReservationPage"
import HomePage from "../pages/homePage";
import CommonPage from "../pages/commonPage";
import '../../support/commands'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('Fx Reservation',()=>{
    const fxReservationPage = new FxReservationPage();
    const homePage = new HomePage();
    const commonPage = new CommonPage();

    // before(()=>{
    //     cy.fixture('login').as('loginData');
    //     cy.fixture('homepage').as('homePageData');
    // });

    it('create guest profile', async function(){
        cy.login();
        homePage.clickFxReservationThumbnail();
        fxReservationPage.clickCreateGuestEllipses();
        cy.randomString(6).then((name)=>{
            fxReservationPage.enterFirstName(name);
        })
        cy.randomString(6).then((name)=>{
            fxReservationPage.enterMiddleName(name);
        })
        cy.randomString(6).then((name)=>{
            fxReservationPage.enterLastName(name);
        })
        fxReservationPage.enterIsd('+91');
        cy.randomNumber(6).then((num)=>{
            fxReservationPage.enterMobile('0123'+ num);
        })
        cy.randomString(9).then((email)=>{
            fxReservationPage.enterEmail(email + '@gmail.com');
        })
        fxReservationPage.enterNationality('Indian');
        fxReservationPage.clickSaveBtn();
        commonPage.verifyToastMessage('Guest Profile Created');
    });

    it('create travel agent', function(){
        cy.login();
        homePage.clickFxReservationThumbnail();
        fxReservationPage.clickTravelAgentEllipses();
        cy.randomString(5).then((num)=>{
            fxReservationPage.enterTravelAgentCompanyCode(num);
        })
        cy.randomString(6).then((name)=>{
            fxReservationPage.enterTravelAgentCompanyName(name);
        })
        cy.randomString(7).then((contactName)=>{
            fxReservationPage.enterTravelAgentContactName(contactName);
        })
        cy.randomString(8).then((email)=>{
            fxReservationPage.enterTravelAgentEmail(email+'@gmail.com');
        })
        fxReservationPage.enterTravelAgentIsd('+91');
        cy.randomNumber(6).then((mobile)=>{
            fxReservationPage.enterTravelAgentMobile('1010'+mobile);
        })
        fxReservationPage.enterTravelAgentDesignation('SarPass');
        fxReservationPage.clickTravelAgentSaveButton();
        commonPage.verifyToastMessage('TravelAgent created successfully');
    });

    it('create company', function(){
        cy.login();
        homePage.clickFxReservationThumbnail();
        fxReservationPage.clickCompanyEllipses();
        cy.randomString(5).then((code)=>{
            fxReservationPage.enterCompanyCode(code);
        })
        cy.randomString(6).then((name)=>{
            fxReservationPage.enterCompanyName(name);
        })
        cy.randomString(7).then((contactName)=>{
            fxReservationPage.enterCompanyContactName(contactName);
        })
        cy.randomString(8).then((email)=>{
            fxReservationPage.enterCompanyEmail(email+'@gmail.com');
        })
        fxReservationPage.enterCompanyIsd('+91');
        cy.randomNumber(6).then((mobile)=>{
            fxReservationPage.enterCompanyMobile('1010'+mobile);
        })
        fxReservationPage.enterCompanyDesignation('SarPass');
        fxReservationPage.clickCompanySaveBtn();
        commonPage.verifyToastMessage('Company created successfully');
    })
})