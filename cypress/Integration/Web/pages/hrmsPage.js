import 'cypress-xpath';

class HrmsPage{

    spinner = 'div.spinner-border';
    inputEmail = '#email';
    inputPassword = '#password';
    loginBtn = '#login';
    setupBtn = '.setup_btn';
    employeeTypeBtn = 'a[href="/home/adminsetting/employees/type"]';
    employeesThumbnail = "'h4', 'Employees'";
    employeesSideMenu = "'div', 'Employees'";
    newEmploymentTypeBtn = 'button[data-toggle="modal"]';
    inputEmploymentTypeName = 'input[id="name"]';
    employmentTypeAddBtn = "button.sbmtBtnbgclr";
    toastMessage = 'div.Toastify__toast';
    departmentsTab = 'a[href="/home/adminsetting/employees/departments"]';
    newDepartmentBtn = 'button[data-toggle="modal"]';
    inputDepartmentName = '#newDepartmentName';
    departmentAddBtn = "button.sbmtBtnbgclr";
    allHandsSideMenu = "//label[contains(text(),'All Hands')]";
    addEmployeeBtn = "(//button[contains(@class,'AddEmp_btn')])[1]";
    inputEmployeeName = "input[placeholder='Enter Employee Name']";
    genderDropdown = '#gender';
    inputDateOfBirth = '#dob';
    inputProfessionalEmail = '#email';
    addEmployeeNextBtn = '.updateBtn.sbmtBtnbgclr';
    employemntTypeDropdown = '#employeeType';
    employeeSeriesDropdown = '#employeeSeriesId';
    employeeDesignationDropdown = '#designationId';
    employeeGradeDropdown = '#gradeId';
    reportingManagerDropdown = '#reportingManagerId';
    inputEmployeeStartDate = '#startDate';
    inputDepartments = "//div[text()='Select Department']";
    employeeLocationDropdown = '#locationId';
    saveAndNextBtn = "(//div[text()='Save & Next'])[1]";

    waitForSpinnerToDisappear(){
        cy.get(this.spinner, { failOnStatusCode: false }).then(($element) => {
            if ($element.length > 0) {
                cy.wrap($element).should('not.exist');
            }
        });
    }

    enterEmail(email){
        cy.get(this.inputEmail).type(email);
    }

    enterPassword(password){
        cy.get(this.inputPassword).type(password);
    }

    clickLoginBtn(){
        cy.get(this.loginBtn).click();
    }

    clickSetupBtn(){
        cy.get(this.setupBtn).first().click({force: true});
    }

    clickEmployeesThumbnail(){
        cy.contains('h4', 'Employees').click();
        // cy.contains(this.employeesThumbnail).click();
    }

    clickEmployeesSideMenu(){
        cy.contains('div', 'Employees').click();
        // cy.contains(this.employeesSideMenu).click();
    }

    clickEmployeeTypesBtn(){
        cy.get(this.employeeTypeBtn).click();
    }

    clickNewEmployeementTypeBtn(){
        // cy.contains('div', 'New Employment Type').click();
        cy.get(this.newEmploymentTypeBtn).click();
    }

    enterEmploymentTypeName(name){
        cy.get(this.inputEmploymentTypeName).type(name);
    }

    clickEmploymentTypeAddBtn(){
        // cy.contains('div', 'Add').click();
        cy.get(this.employmentTypeAddBtn).click();
    }

    waitForToastToInvisible(){
        cy.get(this.toastMessage).should('not.exist');
    }

    clickDepartmentsTab(){
        cy.get(this.departmentsTab).click();
    }

    clickNewDepartmentBtn(){
        cy.get(this.newDepartmentBtn).click();
    }

    enterDepartmentName(name){
        cy.get(this.inputDepartmentName).type(name);
    }

    clickDepartmentAddBtn(){
        cy.get(this.departmentAddBtn).click();
    }

    clickAllHandsSideMenu(){
        cy.xpath(this.allHandsSideMenu).click();
    }

    clickAddEmployeeBtn(){
        cy.xpath(this.addEmployeeBtn).click();
    }

    enterEmployeeName(name){
        cy.get(this.inputEmployeeName).type(name);
    }

    selectEmployeeGender(gender){
        cy.get(this.genderDropdown).select(gender);
    }

    enterDateOfBirth(dob){
        cy.get(this.inputDateOfBirth).type(dob);
    }

    enterProfessionalEmail(email){
        cy.get(this.inputProfessionalEmail).type(email);
    }

    clickAddEmployeeNextBtn(){
        cy.get(this.addEmployeeNextBtn).click();
    }

    selectEmployemntType(type){
        cy.get(this.employemntTypeDropdown).select(type);
    }

    selectEmployeeSeries(series){
        cy.get(this.employeeSeriesDropdown).select(series);
    }

    selectEmployeeDesignation(designation){
        cy.get(this.employeeDesignationDropdown).select(designation);
    }

    selectEmployeeGrade(grade){
        cy.get(this.employeeGradeDropdown).select(grade);
    }

    selectReportingManager(manager){
        cy.get(this.reportingManagerDropdown).select(manager);
    }

    selectEmployeeLocation(location){
        cy.get(this.employeeLocationDropdown).select(location);
    }

    enterEmployeeStartDate(date){
        cy.get(this.inputEmployeeStartDate).type(date);
    }

    enterDepartment(department){
        cy.get(this.inputDepartments).type(department);
        cy.get(this.inputDepartments).type('{enter}');
    }

    clickSaveAndNextBtn(){
        cy.xpath(this.saveAndNextBtn).click();
    }

    login(email, password){
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickLoginBtn();
    }

    verifyToastMessage(value){
        let message = "";
        cy.get(this.toastMessage).then((elem)=>{
            message = elem.text();
            return message
        }).then((message)=>{
            cy.log('message-> ' + message);
            console.log('message-> ' + message);
            // expect(message.includes(value)).to.be.true;
            expect(message).to.be.equal(value);
            })
    }

}

export default HrmsPage;