describe('index page', function () {
    let registrationPage = require('../page_objects/registration-page.js');
    let userListPage = require('../page_objects/user-list-page.js');
    let modalDialogs = require('../page_objects/modal-dialogs.js');
    let registrationData = require('../fixtures/data.json');

    it('should clear registration fields', function () {
        browser.get('http://localhost:8080/TestAppExample/index');
        registrationPage.setNameFieldText(registrationData.userData.name);
        registrationPage.setAddressFieldText(registrationData.userData.address);
        registrationPage.setEmailFieldText(registrationData.userData.email);
        registrationPage.resetButtonClick();
        isRegistrationFormCleared();
    });

    it('should check name validation', function () {
        registrationPage.setNameFieldText(registrationData.invalidName);
        expect(registrationPage.isNameValid()).toBe(false);
        registrationPage.resetButtonClick();
    });

    it('should check email validation', function () {
        registrationPage.setEmailFieldText(registrationData.invalidEmail);
        expect(registrationPage.isEmailValid()).toBe(false);
        registrationPage.resetButtonClick();
    });

    it('should not add user with same name', function () {
        registrationPage.setNameFieldText(registrationData.invalidData.name);
        registrationPage.setAddressFieldText(registrationData.invalidData.address);
        registrationPage.setEmailFieldText(registrationData.invalidData.email);
        registrationPage.submitButtonClick();
        isRegistrationFormCleared();
        expect(userListPage.getUserListSize()).toBe(3);
    });

    it('should add user', function () {
        registrationPage.setNameFieldText(registrationData.userData.name);
        registrationPage.setAddressFieldText(registrationData.userData.address);
        registrationPage.setEmailFieldText(registrationData.userData.email);
        registrationPage.submitButtonClick();
        expect(userListPage.isUserExist(registrationData.userData.name)).toBe(true);
    });

    it('should edit user', function () {
        userListPage.editLastUser();
        registrationPage.setNameFieldText(registrationData.editData.name);
        registrationPage.setAddressFieldText(registrationData.editData.address);
        registrationPage.setEmailFieldText(registrationData.editData.email);
        registrationPage.submitButtonClick();
        expect(userListPage.isUserExist(registrationData.editData.name)).toBe(true);
        isRegistrationFormCleared();
    });

    it('should remove user', function () {
        userListPage.removeLastUser();
        expect(modalDialogs.isDeleteUserDialogVisible()).toBe(true);
        modalDialogs.confirmDeleteUser();
        expect(userListPage.getUserListSize()).toBe(3);
    });

    let isRegistrationFormCleared = function () {
        expect(registrationPage.getNameFieldText()).toEqual('');
        expect(registrationPage.getAddressFieldText()).toEqual('');
        expect(registrationPage.getEmaiFieldText()).toEqual('');
    }
});