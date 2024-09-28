import HrmsPage from "../pages/hrmsPage";

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('Hrms MetaData and Add Employee', ()=>{
    let date = '';
    let month = '';
    let year = '';
    const hrmsPage = new HrmsPage();

    it(['regression'],'create Employee Type', ()=>{
        cy.hrmsLogin();
        cy.pause();
        hrmsPage.waitForSpinnerToDisappear();
        hrmsPage.clickSetupBtn();
        hrmsPage.clickEmployeesThumbnail();
        hrmsPage.clickEmployeeTypesBtn();
        hrmsPage.clickNewEmployeementTypeBtn();
        let employmentType = '';
        cy.randomString(6).then((name)=>{
            employmentType = name;
        })
        cy.readFile('cypress/fixtures/metaData.json').then((name)=>{
            name.employeeType = employmentType;
            cy.writeFile('cypress/fixtures/metaData.json', name)
            hrmsPage.enterEmploymentTypeName(name.employeeType);
        })
        hrmsPage.waitForToastToInvisible();
        hrmsPage.clickEmploymentTypeAddBtn();
        hrmsPage.verifyToastMessage('Added successfully');
    });

    it(['sanity', 'regression'],'create Department', ()=>{
        cy.hrmsLogin();
        hrmsPage.waitForSpinnerToDisappear();
        hrmsPage.clickSetupBtn();
        hrmsPage.clickEmployeesThumbnail();
        hrmsPage.clickDepartmentsTab();
        hrmsPage.clickNewDepartmentBtn();       
        let department = '';
        cy.randomString(6).then((name)=>{
            department = name;
        })
        cy.readFile('cypress/fixtures/metaData.json').then((name)=>{
            name.department = department;
            cy.writeFile('cypress/fixtures/metaData.json', name)
            hrmsPage.enterDepartmentName(name.department);
        })
        hrmsPage.waitForToastToInvisible();
        hrmsPage.clickDepartmentAddBtn();
        hrmsPage.verifyToastMessage('Added successfully');
    });

    it(['regression'],'create employee', ()=>{
        cy.fixture('metaData').then((data)=>{
            cy.hrmsLogin();
            hrmsPage.waitForSpinnerToDisappear();
            hrmsPage.clickAllHandsSideMenu();
            hrmsPage.clickAddEmployeeBtn();
            let empName = '';
            cy.randomString(6).then((name)=>{
                empName = name;
            })
            cy.readFile('cypress/fixtures/metaData.json').then((metaDetails)=>{
                metaDetails.employeeName = empName;
                cy.writeFile('cypress/fixtures/metaData.json', metaDetails)
                hrmsPage.enterEmployeeName(metaDetails.employeeName);
            });
            cy.getDate().then((data)=>{
                date = data;
            });
            cy.getMonth().then((data)=>{
                month = data;
            });
            cy.getYear().then((data)=>{
                year = data;
            });
            hrmsPage.selectEmployeeGender('Male');
            let dob = date + '/' + month + '/' + (year-18);
            hrmsPage.enterDateOfBirth(dob);
            cy.randomString(8).then((value)=>{
                hrmsPage.enterProfessionalEmail(value + '@test.com');
            });
            hrmsPage.clickAddEmployeeNextBtn();
            hrmsPage.selectEmployemntType(data.employeeType);
            hrmsPage.selectEmployeeSeries(data.employeeSeries);
            hrmsPage.selectEmployeeDesignation(data.employeeDesignation);
            hrmsPage.selectEmployeeGrade(data.grade);
            let joiningDate = date + '/' + month + '/' + (year-2);
            hrmsPage.enterEmployeeStartDate(joiningDate);
            hrmsPage.selectReportingManager(data.reportingManager);
            hrmsPage.enterDepartment(data.department);
            hrmsPage.selectEmployeeLocation(data.location);
            hrmsPage.clickSaveAndNextBtn();
        });
    });
});