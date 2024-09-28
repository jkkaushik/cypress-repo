class PosPage{

    discountMenuBtn = "'.nav-text', 'Discount'";
    codeInputField = 'input[formcontrolname="Code"]';
    nameInputField = 'input[formcontrolname="Name"]';
    categoryDropdown = 'mat-select[formcontrolname="Category"]';
    dropdownOptions = 'mat-option[role="option"] span';
    discountTypeDropdown = 'mat-select[formcontrolname="Type"]';
    taxAppliedOnDropdown = 'mat-select[formcontrolname="TaxAppliedOn"]';
    valueInputField = 'input[formcontrolname="Value"]';
    descriptionInputField = 'input[formcontrolname="Description"]';
    displaySequenceInputField = 'input[formcontrolname="DisplaySequence"]';
    priorityInputField = 'input[formcontrolname="Priority"]';
    discountOutletCodeDropdown = 'mat-select[formcontrolname="DiscountOutletCode"]';
    backAndSaveBtn = "button.mat-raised-button";
    inputModifierCode = 'input[formcontrolname="ModifierCode"]';
    inputModifierName = 'input[formcontrolname="ModifierName"]';
    inputModifierQuantity = 'input[formcontrolname="ModifierQuantity"]';
    inputModifierRate = 'input[formcontrolname="ModifierRate"]';
    modifierCreateButton = "button[type='submit']";
    toastMessage = "#toast-popup";

    clickDiscountMenuBtn(){
        cy.contains('.nav-text', 'Discount').click();
    }

    enterDiscountCode(code){
        cy.get(this.codeInputField).clear().type(code);
    }

    enterDiscountName(name){
        cy.get(this.nameInputField).clear().type(name);
    }

    clickCategoryDrodown(){
        cy.get(this.categoryDropdown).click();
    }

    selectDropdownOption(value){
        cy.get(this.dropdownOptions).each(($elem)=>{
            cy.wrap($elem).then(($val)=>{
                if($val.text().trim()==value){
                    cy.wrap($val).click();
                }
            })
        })
    }

    clickTypeDropdown(){
        cy.get(this.discountTypeDropdown).click();
    }

    clickTaxAppliedOnDropdown(){
        cy.get(this.taxAppliedOnDropdown).click();
    }

    enterDiscountValue(value){
        cy.get(this.valueInputField).clear().type(value);
    }

    enterDescription(value){
        cy.get(this.descriptionInputField).clear().type(value);
    }

    enterDisplaySequence(value){
        cy.get(this.displaySequenceInputField).clear().type(value);
    }

    enterPriority(value){
        cy.get(this.priorityInputField).clear().type(value);
    }

    clickDiscountOutletCodeDropdown(){
        cy.get(this.discountOutletCodeDropdown).click();
    }    

    clickSaveBtn() {
        cy.get(this.backAndSaveBtn).eq(1).click({ force: true });
    }

    clickModifierMenuBtn(){
        cy.contains('.nav-text', 'Modifier').click();
    }

    enterModifierCode(code){
        cy.get(this.inputModifierCode).type(code);
    }

    enterModifierName(name){
        cy.get(this.inputModifierName).type(name);
    }

    enterModifierQuantity(num){
        cy.get(this.inputModifierQuantity).type(num);
    }

    enterModifierRate(rate){
        cy.get(this.inputModifierRate).type(rate);
    }

    clickModifierCreateButton(){
        cy.get(this.modifierCreateButton).click();
    }

    isModifierCreateBtnIsDisabled(){
        cy.get(this.modifierCreateButton).invoke('attr', 'class').then((attributeValue)=>{
            expect(attributeValue).to.include('disabledSubmit');
        })
    }

    verifyToastMessage(value){
        let message = "";
        cy.get(this.toastMessage).then((elem)=>{
            message = elem.text();
            return message
        }).then((message)=>{
            expect(message.includes(value)).to.be.true;
            })
        }

}
export default PosPage;