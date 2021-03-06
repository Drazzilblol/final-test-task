let registrationPage = require('../pageObjects/registrationPage.js');
let userListPage = require('../pageObjects/userListPage.js');
let modalDialogs = require('../pageObjects/modalDialogs.js');
let navigator = require('../utils/navigator.js');
let registrationData = require('../fixtures/data.json');
let updateButtonText = 'Update';
let addButtonText = 'Add';
let lastUserName;

describe('Check user editing', function () {
    beforeAll(function () {
        navigator.goToIndexPage();
        expect(userListPage.getUserListSize()).toBeGreaterThan(0);
    });

    it('In the list of users, click the Edit button in the last user line', function () {
        userListPage.editLastUser();
        expect(registrationPage.getAddressFieldText()).toEqual(userListPage.getLastUserAddressRowText());
        expect(registrationPage.getNameFieldText()).toEqual(userListPage.getLastUserNameRowText());
        expect(registrationPage.getEmailFieldText()).toEqual(userListPage.getLastUserEmailRowText());
        expect(registrationPage.getSubmitButtonText()).toEqual(updateButtonText);
    });

    it('Fill Name, Address, Email fields', function () {
        registrationPage.setNameFieldText(registrationData.editData.name);
        registrationPage.setAddressFieldText(registrationData.editData.address);
        registrationPage.setEmailFieldText(registrationData.editData.email);
        expect(registrationPage.isSubmitButtonEnabled()).toBe(true);
    });

    it('Click on the Update button', function () {
        registrationPage.submitButtonClick();
        expect(userListPage.isUserExist(registrationData.editData.name)).toBe(true);
        registrationPage.isRegistrationFormCleared();
        expect(registrationPage.getSubmitButtonText()).toEqual(addButtonText);
    });
});

describe('Check cancel user deleting', function () {
    beforeAll(function () {
        navigator.goToIndexPage();
        expect(userListPage.getUserListSize()).toBeGreaterThan(0);
        lastUserName = userListPage.getLastUserNameRowText()
    });

    it('In the list of users, click the Remove button in the last user line', function () {
        userListPage.removeLastUser();
        expect(modalDialogs.isDeleteUserDialogVisible()).toBe(true);
    });

    it('Cancel deletion in the dialog by clicking the Cancel button', function () {
        modalDialogs.cancelDeleteUser();
        expect(userListPage.isUserExist(lastUserName)).toBe(true);
        expect(modalDialogs.isDeleteUserDialogVisible()).toBe(false);
    });
});

describe('Check user deleting', function () {
    beforeAll(function () {
        navigator.goToIndexPage();
        expect(userListPage.getUserListSize()).toBeGreaterThan(0);
        lastUserName = userListPage.getLastUserNameRowText()
    });

    it('In the list of users, click the Remove button in the last user line', function () {
        userListPage.removeLastUser();
        expect(modalDialogs.isDeleteUserDialogVisible()).toBe(true);
        expect(modalDialogs.isDeleteDialogContainUserName(lastUserName)).toBe(true);
    });

    it('Confirm deletion in the dialog by clicking the Ok button', function () {
        modalDialogs.confirmDeleteUser();
        expect(userListPage.isUserExist(lastUserName)).toBe(false);
    });
});