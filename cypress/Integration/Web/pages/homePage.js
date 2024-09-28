import 'cypress-xpath';
class HomePage{

    menuItems = "//span[contains(@class,'menu-span')]/following-sibling::span[@class='nav-text']";
    posThumbnail = "//div[contains(@title,'FX POS')]";
    userProfileIcon = ".avatar";
    loginPageHeader = ".login-box-new>h3";
    fxReservationThumbnail = "//img[contains(@src,'FXReservations')]";

    getMenuItems(menuItems){
        const items = [];
        cy.xpath(this.menuItems).each(($elem, index, $list)=>{
            cy.wrap($elem).then((val)=>{
                items.push(val.text().trim());
            })
        }).then(()=>{
            expect(menuItems).to.deep.equal(items);
        })
    }

    clickPosThumbnail(){
        cy.xpath(this.posThumbnail, {timeout:10000}).click();
    }

    clickUserProfileIcon(){
        cy.get(this.userProfileIcon).click();
    }

    clickLogoutBtn(){
        cy.contains('a','Logout').click();
    }

    getLoginPageHeader(){
        return cy.get(this.loginPageHeader);
    }

    clickFxReservationThumbnail(){
        cy.xpath(this.fxReservationThumbnail, {timeout: 12000}).click();
    }
}
export default HomePage;

/*
In JavaScript, the default keyword is used in the context of ES6 modules to export a single value 
or entity from a module. This value or entity can be a variable, function, class, object, etc.
When you use export default, you are specifying the default export of the module, which can then be 
imported without using curly braces.
*/