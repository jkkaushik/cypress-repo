import 'cypress-xpath'

class FxReservationPage{

    createGuestEllipses = "//button[contains(@class,'input-guest-search')]/following-sibling::button/i";
    travelAgentEllipses = "(//div[@class='input-icon'])[2]/button/i";
    inputFirstName = "input[placeholder='First Name']";
    inputMiddleName = "input[placeholder='Middle Name']";
    inputLastName = "input[placeholder='Last Name']";
    inputEmail = "input[placeholder='Email']";
    inputISD = "input[placeholder='ISD']";
    inputMobile = "input[placeholder='Mobile']";
    inputNationality = "input[placeholder='Nationality']";
    saveButton = "//button[@class='button primary-button' and text()='Save']";
    inputTravelAgentCompanyCode = "input[formcontrolname='CompanyCode']";
    inputTravelAgentCompanyName = "input[formcontrolname='CompanyName']";
    inputTravelAgentContactName = "input[formcontrolname='ContactName']";
    inputTravelAgentEmail = "input[formcontrolname='Email']";
    inputTravelAgentIsd = "input[formcontrolname='ISD']";
    inputTravelAgentMobile = "input[formcontrolname='Mobile']";
    inputTravelAgentDesignation = "input[formcontrolname='Designation']";
    travelAgentSaveBtn = "//button[text()='Save']";
    companyEllipses = "(//div[@class='input-icon'])[3]/button/i";
    inputCompanyCode = "input[formcontrolname='CompanyCode']";
    inputCompanyName = "input[formcontrolname='CompanyName']";
    inputCompanyContactName = "input[formcontrolname='ContactName']";
    inputCompanyEmail = "input[formcontrolname='Email']";
    inputCompanyIsd = "input[formcontrolname='ISD']";
    inputCompanyMobile = "input[formcontrolname='Mobile']";
    inputCompanyDesignation = "input[formcontrolname='Designation']";
    companySaveBtn = "//button[text()='Save']"; // company created successfully

    clickCreateGuestEllipses(){
        cy.xpath(this.createGuestEllipses).click();
    }

    enterFirstName(name){
        cy.get(this.inputFirstName).clear().type(name);
    }
    enterMiddleName(name){
        cy.get(this.inputMiddleName).clear().type(name);
    }
    enterLastName(name){
        cy.get(this.inputLastName).clear().type(name);
    }
    enterEmail(email){
        cy.get(this.inputEmail).clear().type(email);
    }
    enterIsd(isd){
        cy.get(this.inputISD).clear().type(isd);
    }
    enterMobile(mobile){
        cy.get(this.inputMobile).clear().type(mobile);
    }
    enterNationality(nation){
        cy.get(this.inputNationality).clear().type(nation);
    }

    clickSaveBtn(){
        cy.xpath(this.saveButton).click();
    }

    clickTravelAgentEllipses(){
        cy.xpath(this.travelAgentEllipses).click();
    }

    enterTravelAgentCompanyCode(code){
        cy.get(this.inputTravelAgentCompanyCode).type(code);
    }

    enterTravelAgentCompanyName(name){
        cy.get(this.inputTravelAgentCompanyName).type(name);
    }

    enterTravelAgentContactName(contact){
        cy.get(this.inputTravelAgentContactName).type(contact);
    }

    enterTravelAgentEmail(email){
        cy.get(this.inputTravelAgentEmail).type(email);
    }

    enterTravelAgentIsd(isd){
        cy.get(this.inputTravelAgentIsd).type(isd);
    }

    enterTravelAgentMobile(mobile){
        cy.get(this.inputTravelAgentMobile).type(mobile);
    }

    enterTravelAgentDesignation(designation){
        cy.get(this.inputTravelAgentDesignation).type(designation);
    }

    clickTravelAgentSaveButton(){
        cy.xpath(this.travelAgentSaveBtn).click();
    }

    clickCompanyEllipses(){
        cy.xpath(this.companyEllipses).click();
    }

    enterCompanyCode(code){
        cy.get(this.inputCompanyCode).type(code);
    }

    enterCompanyName(companyName){
        cy.get(this.inputCompanyName).type(companyName);
    }

    enterCompanyContactName(contactName){
        cy.get(this.inputCompanyContactName).type(contactName);
    }

    enterCompanyEmail(email){
        cy.get(this.inputCompanyEmail).type(email);
    }

    enterCompanyIsd(isd){
        cy.get(this.inputCompanyIsd).type(isd);
    }

    enterCompanyMobile(mobile){
        cy.get(this.inputCompanyMobile).type(mobile);
    }

    enterCompanyDesignation(designation){
        cy.get(this.inputCompanyDesignation).type(designation);
    }

    clickCompanySaveBtn(){
        cy.xpath(this.companySaveBtn).click();
    }

}
export default FxReservationPage;