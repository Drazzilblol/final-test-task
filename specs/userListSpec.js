describe('user list', function () {
    let registrationPage = require('../pageObjects/registrationPage.js');
    let userListPage = require('../pageObjects/userListPage.js');
    let modalDialogs = require('../pageObjects/modalDialogs.js');
    let navigator = require('../utils/navigator.js');
    let registrationData = require('../fixtures/data.json');
    let updateButtonText = 'Update';
    let addButtonText = 'Add';

    beforeEach(function () {
        navigator.goToIndexPage();
    });

    it('should edit user', function () {
        expect(userListPage.getUserListSize()).toBeGreaterThan(0);
        userListPage.editLastUser();
        expect(registrationPage.getAddressFieldText()).toEqual(registrationData.userData.address);
        expect(registrationPage.getNameFieldText()).toEqual(registrationData.userData.name);
        expect(registrationPage.getEmailFieldText()).toEqual(registrationData.userData.email);
        expect(registrationPage.getSubmitButtonText()).toEqual(updateButtonText);
        registrationPage.setNameFieldText(registrationData.editData.name);
        registrationPage.setAddressFieldText(registrationData.editData.address);
        registrationPage.setEmailFieldText(registrationData.editData.email);
        expect(registrationPage.isSubmitButtonEnabled()).toBe(true);
        registrationPage.submitButtonClick();
        expect(userListPage.isUserExist(registrationData.editData.name)).toBe(true);
        registrationPage.isRegistrationFormCleared();
        expect(registrationPage.getSubmitButtonText()).toEqual(addButtonText);
    });

    it('should cancel remove user', function () {
        expect(userListPage.getUserListSize()).toBeGreaterThan(0);
        userListPage.removeLastUser();
        expect(modalDialogs.isDeleteUserDialogVisible()).toBe(true);
        modalDialogs.cancelDeleteUser();
        expect(userListPage.isUserExist(registrationData.editData.name)).toBe(true);
        expect(modalDialogs.isDeleteUserDialogVisible()).toBe(false);
    });

    it('should remove user', function () {
        expect(userListPage.getUserListSize()).toBeGreaterThan(0);
        userListPage.removeLastUser();
        expect(modalDialogs.isDeleteUserDialogVisible()).toBe(true);
        expect(modalDialogs.isDeleteDialogContainUserName(registrationData.editData.name)).toBe(true);
        modalDialogs.confirmDeleteUser();
        expect(userListPage.isUserExist(registrationData.editData.name)).toBe(false);
    });
});