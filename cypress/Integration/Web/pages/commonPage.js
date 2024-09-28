class CommonPage{

    loader = ".lds-spinner";
    toastMessage = "div.toast-content";
    sideMenuRotateSpan = "#rotatespan";
    dropdownOptions = 'mat-option[role="option"] span';
    spinner = '.fa.fa-spinner';
    plusIcon = ".plus-btn";
    inputUsername = "input[name='username1']";
    inputPassword = "input[type='password']";
    loginBtn = 'span:contains("Login")';
    posInputUsername = "#username";
    posInputPassword = "#password";
    posSubmitBtn = "button[type='submit']";


    loginWithConfigurtion(username, password){
        cy.get(this.inputUsername).type(username);
        cy.get(this.inputPassword).type(password);
        cy.get(this.loginBtn).click();
        this.waitForSpinnerToInvisible();
    }

    loginWithOperational(username, password){
        cy.get(this.posInputUsername).type(username);
        cy.get(this.posInputPassword).type(password);
        cy.get(this.posSubmitBtn).click();
        this.waitForSpinnerToInvisible();
    }

    waitForLoaderToInvisible(){
        // cy.get(this.loader, { failOnStatusCode: false }).then(($element) => {
        //     if ($element.length > 0) {
        //         cy.wrap($element).should('not.exist');
        //     }
        // });
        cy.get(this.loader, { failOnStatusCode: false }).should('not.exist');
    }
   
    waitForSpinnerToInvisible(){
        cy.get(this.spinner).should('not.exist');
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

    clickSideMenuRotateSpan(){
        cy.get(this.sideMenuRotateSpan).click();
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

    clickPlusIcon(){
        cy.get(this.plusIcon).click();
    }
}

export default CommonPage;