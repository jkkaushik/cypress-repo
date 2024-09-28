class OrderEntryPage{

    orderEntryMenuBar = "li.ng-star-inserted>span";
    outletDropdown = 'mat-select[placeholder="Select an outlet"]';
    orderEntryContinueBtn = 'button.login-button';
    inputStaffLoginUsername = "//input[@id='username']";
    staffLoginButton = "//div[@class='login-button-box']/button";
    itemSearchBar = "input[placeholder='Search by item code or name']";
    menuGroup = "section.left.scroll>div>img";
    itemList = "span.name-align";
    currencyAndOtherOutletEllipsis = "button.button-dots";
    footerButtons = "div.footer button";
    tableButton = '//img[@src="./assets/image/Table.png"]';
    availableTableTab = "//div[text()='Available']";
    occupiedTableTab = "span.fas.fa-square.new-red";
    allTable = "//div[@class='tableNo']";
    availableTables = "//img[@alt='Available']/following-sibling::div[@class='tableNo']";
    itemslist = "div.item>div.image";
    serverNameDropdown = "mat-select[name='serverVaraible']";
    dropdownOptions = "mat-option>span";
    manageTableConfirmBtn = "//span[text()='Confirm']";
    kotAddBtn = 'img[src="./assets/image/icon/Save KOT.svg"]';
    checkButton = 'img[src="./assets/image/icon/Bill.svg"]';
    generateCheckBtn = 'img[alt="Generate Check"]';
    generateCheckConfirmBtn = "//mat-dialog-container//button[contains(@class,'primary-button')]";
    settleCheckBtn = 'img[alt="Settlement"]';
    paynowBtn = "//button[text()='Pay Now']";
    addPaymentTypeBtn = "//button[text()='Add Payment Type']";
    settleBillButton = "button.settle-bill-button";
    kotPopupNoButton = "//button[contains(text(),'No')]";
    toastMessage = "div[id='toast-popup']";
    openTableButton = "span.left-align>button";
    inputTableName = "input[placeholder='Table Name']";
    inputCoverCapacity = "input[placeholder='Covers Capacity']";
    openTableAddButton = "//button[contains(text(),'Add')]";

    selectOrderEntryMenu(option){
        cy.get(this.orderEntryMenuBar).each(($elem)=>{
            cy.wrap($elem).then((el)=>{
                if(el.text().trim()==option){
                    cy.wrap($elem).click();
                }
            })
        })
    }

    clickOutletDropdown(){
        cy.wait(2000);
        cy.get(this.outletDropdown).click({force:true});
    }

    clickOrderEntryContinueBtn(){
        cy.get(this.orderEntryContinueBtn).click();
    }

    enterStaffLoginUsername(username){
        cy.xpath(this.inputStaffLoginUsername).type(username);
    }

    clickStaffLoginButton(){
        cy.xpath(this.staffLoginButton).click();
    }

    enterItemNameToSearch(item){
        cy.get(this.itemSearchBar).clear().type(item);
    }

    waitForItemsToLoad(){
        cy.wait(4000);
        cy.reload();
        cy.get(this.menuGroup).eq(1).click();
        cy.wait(2000);
        cy.get(this.menuGroup).eq(0).click();
        cy.get(this.itemList).then(($elems)=>{
            cy.wrap($elems).eq(1).should('be.visible');
        })
    }

    getItemsList(item){
        const items = [];
        cy.get(this.itemList).each(($elem)=>{
            cy.wrap($elem).then((val)=>{
                items.push(val.text().trim());
            })
        }).then(()=>{
            expect(items[0]).to.deep.equal(item);
        });
    }

    clickCurrencyAndOtherOutletEllipsis(){
        cy.get(this.currencyAndOtherOutletEllipsis).click();
    }

    clickChangeCurrencyBtn(){
        cy.contains('button','Change Currency').click();
    }

    changeTheCurrency(currency){
        cy.get('#' + currency).click();
    }

    clickChangeCurrecnySaveBtn(){
        cy.contains('button','Confirm').click();
    }

    verifyCurrentCurrency(newCurrency){
        let currency = '';
        cy.contains('div', 'Currency').find('span').then((value)=>{
            cy.wrap(value).then((val)=>{
                currency = val.text();
                return currency;
        }).then((currency)=>{
            expect(currency).to.equal(newCurrency);
            })
        })
    }

    clickTableButton(){
        cy.xpath(this.tableButton).click();     
    }

    clickAvailableTableTab(){
        cy.wait(500);
        cy.xpath(this.availableTableTab).click();
    }

    clickOccupiedTableTab(){
        cy.get(this.occupiedTableTab).click();
    }

    selectAvailableTable(){
        /*
        if you need to ensure that certain actions are completed
        before moving on to the next step, you typically use the
        return statement to chain commands together and manage 
        their execution order.
        */
        return cy.xpath(this.availableTables).its('length').then((length)=>{
            return cy.randomNumForRange(1, length).then((num)=>{
               cy.xpath(this.availableTables).eq(num-1).click();
                return cy.xpath(this.availableTables).eq(num-1).invoke('text').then((text)=>{
                    return text.trim();
                })
            })
        });
    }

    selectSpecificTable(tableName){
        cy.xpath(this.allTable).each(($el) => {
            cy.wrap($el).invoke('text').then((text) => {
                if (text.includes(tableName)) {
                    cy.wrap($el).click();
                    }
                });
          });
    }

    selectRandomItem(){
        return cy.get(this.itemslist).its('length').then((length)=>{
            return cy.randomNumForRange(1, length).then((num)=>{
                return cy.get(this.itemslist).eq(num-1).click();
            });
        })
    }

    clickServerNameDropdown(){
        cy.get(this.serverNameDropdown).click();
    }

    selectDropdownOption(option){
        return cy.get(this.dropdownOptions).each(($elem)=>{
            return cy.wrap($elem).invoke('text').then(text => {
                if(text.includes(option)){
                    cy.wrap($elem).click();
                }
            });
        });
    }

    selectCoverNumber(num){
        var elem = "//td[contains(@class,'calc-buttons')]/button[text()='"+num+"']";
        cy.xpath(elem).click();
    }

    clickManageTableConfirmBtn(){
        cy.xpath(this.manageTableConfirmBtn).click();
    }

    clickKotAddBtn(){
        cy.get(this.kotAddBtn).click();
    }

    clickCheckBtn(){
        cy.get(this.checkButton).click();
    }

    clickGenerateCheckBtn(){
        cy.get(this.generateCheckBtn).click();
    }

    clickConfirmGenerateCheckPopup(){
        cy.xpath(this.generateCheckConfirmBtn, { failOnStatusCode: false }).then(($element) => {
            if ($element.length > 0) {
                cy.wrap($element).click();
            }
        });
    }

    clickSettleCheckBtn(){
        cy.get(this.settleCheckBtn).click();
    }

    clickPayNowBtn(){
        cy.wait(1500);
        cy.xpath(this.paynowBtn).click();
    }

    clickAddPaymentTypeBtn(){
        cy.xpath(this.addPaymentTypeBtn).click();
    }

    clickSettleBillButton(){
        cy.get(this.settleBillButton).click();
    }

    clickKotPopupNoButton(){
        cy.xpath(this.kotPopupNoButton).click();
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

    clickOpenTableButton(){
        cy.get(this.openTableButton).click();
    }

    enterTableName(name){
        cy.get(this.inputTableName).type(name);
    }

    enterCoverCapacity(capacity){
        cy.get(this.inputCoverCapacity).type(capacity);
    }

    clickOpenTableAddButton(){
        cy.xpath(this.openTableAddButton).click();
    }

}
export default OrderEntryPage;