describe('index page', function () {
    let registrationPage = require('../page_objects/registration-page.js');
    let userListPage = require('../page_objects/user-list-page.js');
    let modalDialogs = require('../page_objects/modal-dialogs.js');
    let navigator = require('../utils/navigator.js');
    let registrationData = require('../fixtures/data.json');

    beforeAll(function () {
        browser.get(navigator.getIndexUrl());
    });

    beforeEach(function () {
        navigator.goToIndexPage();
    });

    it('should clear registration fields', function () {
        registrationPage.setNameFieldText(registrationData.userData.name);
        registrationPage.setAddressFieldText(registrationData.userData.address);
        registrationPage.setEmailFieldText(registrationData.userData.email);
        expect(registrationPage.isResetButtonEnabled()).toBe(true);
        registrationPage.resetButtonClick();
        isRegistrationFormCleared();
    });

    it('should check name and email fields validation', function () {
        registrationPage.setNameFieldText(registrationData.invalidName);
        expect(registrationPage.isNameValid()).toBe(false);
        registrationPage.resetButtonClick();
        registrationPage.setEmailFieldText(registrationData.invalidEmail);
        expect(registrationPage.isEmailValid()).toBe(false);
        registrationPage.resetButtonClick();
    });

    it('should not add user with same name', function () {
        registrationPage.setNameFieldText(registrationData.invalidData.name);
        registrationPage.setAddressFieldText(registrationData.invalidData.address);
        registrationPage.setEmailFieldText(registrationData.invalidData.email);
        expect(registrationPage.isSubmitButtonEnabled()).toBe(true);
        registrationPage.submitButtonClick();
        isRegistrationFormCleared();
        expect(userListPage.getUserListSize()).toBe(3);
    });

    it('should add user', function () {
        registrationPage.setNameFieldText(registrationData.userData.name);
        registrationPage.setAddressFieldText(registrationData.userData.address);
        registrationPage.setEmailFieldText(registrationData.userData.email);
        expect(registrationPage.isSubmitButtonEnabled()).toBe(true);
        registrationPage.submitButtonClick();
        expect(userListPage.isUserExist(registrationData.userData.name)).toBe(true);
        isRegistrationFormCleared();
    });

    it('should edit user', function () {
        expect(userListPage.getUserListSize()).toBeGreaterThan(0);
        userListPage.editLastUser();
        expect(registrationPage.getAddressFieldText()).toEqual(registrationData.userData.address);
        expect(registrationPage.getNameFieldText()).toEqual(registrationData.userData.name);
        expect(registrationPage.getEmailFieldText()).toEqual(registrationData.userData.email);
        registrationPage.setNameFieldText(registrationData.editData.name);
        registrationPage.setAddressFieldText(registrationData.editData.address);
        registrationPage.setEmailFieldText(registrationData.editData.email);
        registrationPage.submitButtonClick();
        expect(userListPage.isUserExist(registrationData.editData.name)).toBe(true);
        isRegistrationFormCleared();
    });

    it('should remove user', function () {
        expect(userListPage.getUserListSize()).toBeGreaterThan(0);
        userListPage.removeLastUser();
        expect(modalDialogs.isDeleteUserDialogVisible()).toBe(true);
        modalDialogs.confirmDeleteUser();
        expect(userListPage.isUserExist(registrationData.editData.name)).toBe(false);
    });

    let isRegistrationFormCleared = function () {
        expect(registrationPage.getNameFieldText()).toEqual('');
        expect(registrationPage.getAddressFieldText()).toEqual('');
        expect(registrationPage.getEmailFieldText()).toEqual('');
    }
});