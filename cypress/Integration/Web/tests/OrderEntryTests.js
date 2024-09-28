import 'cypress-xpath';
import CommonPage from '../pages/commonPage';
import OrderEntryPage from '../pages/orderEntryPage';
import { before } from 'mocha';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('Order Entry Tests', ()=>{

    const orderEntryPage = new OrderEntryPage();
    const commonPage = new CommonPage();

    before(()=>{
        cy.fixture('login').as('loginData');
        cy.fixture('homepage').as('homePageData');
        cy.fixture('orderEntry').as('orderEntryData');
    })

    beforeEach(()=>{
        cy.fixture('login').as('loginData');
        cy.fixture('homepage').as('homePageData');
        cy.fixture('orderEntry').as('orderEntryData');
        cy.fixture('login').then((data)=>{
            cy.visit(Cypress.env('posUrl'));
            cy.posLogin();
            orderEntryPage.selectOrderEntryMenu('Order Entry');
            commonPage.waitForLoaderToInvisible();
            orderEntryPage.clickOutletDropdown();
        })
        cy.fixture('orderEntry').then((data)=>{
            commonPage.selectDropdownOption(data.outlet);
        })
        orderEntryPage.clickOrderEntryContinueBtn();  
        commonPage.waitForLoaderToInvisible(); 
        // orderEntryPage.enterStaffLoginUsername('User1');
        // orderEntryPage.clickStaffLoginButton();

    })

    it(['sanity'],'search item',function(){
        orderEntryPage.waitForItemsToLoad();
        orderEntryPage.enterItemNameToSearch(this.orderEntryData.searchItem);
        cy.pause();
        orderEntryPage.getItemsList(this.orderEntryData.searchItem);
    });

    it(['smoke', 'sanity'],'change currency', function(){
        orderEntryPage.waitForItemsToLoad();
        orderEntryPage.clickCurrencyAndOtherOutletEllipsis();
        orderEntryPage.clickChangeCurrencyBtn();
        orderEntryPage.changeTheCurrency(this.orderEntryData.newCurrency);
        orderEntryPage.clickChangeCurrecnySaveBtn();
        orderEntryPage.verifyCurrentCurrency(this.orderEntryData.newCurrency);
    });

    it(['sanity', 'regression'],'save kot', function(){
        cy.fixture('orderEntry').then((data)=>{
            orderEntryPage.waitForItemsToLoad();
            orderEntryPage.clickTableButton();
            orderEntryPage.clickAvailableTableTab();
            orderEntryPage.selectAvailableTable().then((tableName)=>{
                cy.readFile('cypress/fixtures/orderEntry.json').then((orderData)=>{
                    orderData.tableName = tableName;
                    cy.writeFile('cypress/fixtures/orderEntry.json', orderData);
                })
            });
            orderEntryPage.clickServerNameDropdown();
            orderEntryPage.selectDropdownOption(data.serverName);
            orderEntryPage.selectCoverNumber(data.cover);
            orderEntryPage.clickManageTableConfirmBtn();
            orderEntryPage.selectRandomItem();
            orderEntryPage.selectRandomItem();
            orderEntryPage.clickKotAddBtn();
            commonPage.waitForLoaderToInvisible();
            orderEntryPage.clickKotPopupNoButton();
            orderEntryPage.verifyToastMessage(data.kotSuccessMessage);
        });
    });

    it(['sanity'],'open table without name', ()=>{
        orderEntryPage.waitForItemsToLoad();
        orderEntryPage.clickTableButton();
        orderEntryPage.clickOpenTableButton();
        // orderEntryPage.enterTableName('');
        cy.randomNumber(1).then((num)=>{
            orderEntryPage.enterCoverCapacity(num);
        });
        orderEntryPage.clickOpenTableAddButton();
        orderEntryPage.verifyToastMessage('Table Name & Covers Capacity are required');
    });

    it(['sanity', 'regression'],'settle bill', function(){
        cy.fixture('orderEntry').then((data)=>{
            orderEntryPage.waitForItemsToLoad();
            orderEntryPage.clickTableButton();
            orderEntryPage.selectSpecificTable(data.tableName);
            // orderEntryPage.clickConfirmGenerateCheckPopup();
            orderEntryPage.clickCheckBtn();
            orderEntryPage.clickGenerateCheckBtn();
            orderEntryPage.clickConfirmGenerateCheckPopup();
            orderEntryPage.clickSettleCheckBtn();
            commonPage.waitForLoaderToInvisible();
            orderEntryPage.clickPayNowBtn();
            orderEntryPage.clickAddPaymentTypeBtn();
            orderEntryPage.clickSettleBillButton();
            orderEntryPage.verifyToastMessage(data.settlementSuccessMessage);
        });
    });

    it(['regression'],'open table', ()=>{
        orderEntryPage.waitForItemsToLoad();
        orderEntryPage.clickTableButton();
        orderEntryPage.clickOpenTableButton();
        cy.randomString(5).then((name)=>{
            orderEntryPage.enterTableName(name);
        });
        cy.randomNumber(1).then((num)=>{
            orderEntryPage.enterCoverCapacity(num);
        });
        orderEntryPage.clickOpenTableAddButton();
        orderEntryPage.verifyToastMessage('Open table created successfully.');
    }); 

    it(['sanity', 'regression'],'select table without server', ()=>{
        cy.fixture('orderEntry').then((data)=>{
            orderEntryPage.waitForItemsToLoad();
            orderEntryPage.clickTableButton();
            orderEntryPage.clickAvailableTableTab();
            orderEntryPage.selectAvailableTable();
            orderEntryPage.selectCoverNumber(data.cover);
            orderEntryPage.clickManageTableConfirmBtn();
            orderEntryPage.verifyToastMessage('Please select a server to proceed');
        });
    });


})